import fs from "node:fs";
import path from "node:path";
import { copy, emptyDir } from "../src/utils";
import ignore from "ignore";

const cwd = process.cwd();

function main() {
  console.log("\nClearing templates...");

  const targetDir = path.join(cwd, "templates");
  emptyDir(targetDir);

  console.log("\nCopying templates...");

  const rootDir = path.resolve(cwd, "../../");
  const ig = ignore();
  const gitignorePath = path.join(rootDir, ".gitignore");
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
    ig.add(gitignoreContent);
  }
  ig.add(["pnpm-lock.yaml", "yarn.lock", "package-lock.json"]);

  const templatesDir = path.resolve(rootDir, "templates");
  const files = fs.readdirSync(templatesDir);
  const filteredFiles = files.filter((file) => !ig.ignores(file));
  for (const file of filteredFiles) {
    const targetPath = path.join(targetDir, file);
    copy(path.join(templatesDir, file), targetPath, (srcPath) => {
      const pathname = path.relative(rootDir, srcPath);
      return ig.ignores(pathname);
    });
  }

  console.log("\nCopy templates done.");
}

main();
