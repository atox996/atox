import { build } from "unbuild";
import fs from "node:fs";
import path from "node:path";

import ignore from "ignore";

import { copy } from "../src/utils";

const cwd = process.cwd();

async function main() {
  await build("./", false, {
    entries: ["src/index.ts"],
    outDir: "dist",
    rollup: {
      inlineDependencies: true,
      esbuild: {
        target: "node18",
        minify: true,
      },
    },
    alias: {
      // we can always use non-transpiled code since we support node 18+
      prompts: "prompts/lib/index.js",
    },
  });
  console.log("\ncopying templates...");

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
    const targetPath = path.join(cwd, "templates", file);
    copy(path.join(templatesDir, file), targetPath, (srcPath) => {
      const pathname = path.relative(rootDir, srcPath);
      return ig.ignores(pathname);
    });
  }
  console.log("\nDone\n");
}

main().catch(console.error);
