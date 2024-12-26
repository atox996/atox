import pcolor from "picocolors";
import minimist from "minimist";
import path from "node:path";
import fs from "node:fs";
import prompts from "prompts";
import {
  copy,
  emptyDir,
  findAvailablePackageManager,
  formatTargetDir,
  getProjectName,
  isEmpty,
  isValidPackageName,
  toValidPackageName,
} from "./utils";
import { FRAMEWORKS, helpMessage } from "./constance";
import { fileURLToPath } from "node:url";
import ignore from "ignore";
import pkgJson from "../package.json";

const argv = minimist<{
  v?: boolean;
  version?: boolean;
  h?: boolean;
  help?: boolean;

  t?: string;
  template?: string;
}>(process.argv.slice(2), {
  default: { version: false, help: false },
  alias: { v: "version", h: "help", t: "template" },
  string: ["_"],
});

const cwd = process.cwd();

async function init() {
  const targetDir = formatTargetDir(argv._[0] || cwd);
  const argTemplate = argv.template || argv.t;

  const version = argv.version;
  if (version) {
    console.log(pkgJson.version);
    return;
  }

  const help = argv.help;
  if (help) {
    console.log(helpMessage);
    return;
  }
  let projectName = toValidPackageName(getProjectName(targetDir));

  let result: prompts.Answers<"overwrite" | "framework">;

  prompts.override({
    overwrite: argv.overwrite,
  });

  try {
    result = await prompts(
      [
        {
          type: "text",
          name: "projectName",
          message: pcolor.reset("Project name:"),
          initial: projectName,
          validate: (dir) =>
            isValidPackageName(dir) || "Invalid package.json name",
          onState: (state) => {
            projectName = toValidPackageName(state.value);
          },
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "select",
          name: "overwrite",
          message: () =>
            `Target directory "${targetDir}" is not empty. Please choose how to proceed:`,
          initial: 0,
          choices: [
            {
              title: "Remove existing files and continue",
              value: "yes",
            },
            {
              title: "Cancel operation",
              value: "no",
            },
            {
              title: "Ignore files and continue",
              value: "ignore",
            },
          ],
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === "no") {
              throw new Error("Operation cancelled");
            }
            return null;
          },
          name: "overwriteChecker",
        },
        {
          type:
            argTemplate && FRAMEWORKS.find((item) => item.name === argTemplate)
              ? null
              : "select",
          name: "framework",
          message:
            typeof argTemplate === "string" &&
            !FRAMEWORKS.find((item) => item.name === argTemplate)
              ? pcolor.reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `,
                )
              : pcolor.reset("Select a framework:"),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => ({
            title: framework.color(framework.display),
            value: framework.name,
          })),
        },
      ],
      {
        onCancel: () => {
          throw new Error("Operation cancelled");
        },
      },
    );
  } catch (cancelled) {
    if (cancelled instanceof Error) {
      console.log(pcolor.red("x ") + cancelled.message);
    }
    return;
  }

  // user choice associated with prompts
  const { framework, overwrite } = result;

  if (overwrite === "yes") {
    emptyDir(targetDir);
  } else if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // determine template
  const template: string = framework || argTemplate;

  console.log(`\nScaffolding project in ${targetDir}...`);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../../templates",
    template,
  );

  const ig = ignore();
  const gitignorePath = path.join(templateDir, "_gitignore");
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
    ig.add(gitignoreContent);
  }
  ig.add([
    "pnpm-lock.yaml",
    "yarn.lock",
    "package-lock.json",
    "package.json",
    "_gitignore",
  ]);

  const files = fs.readdirSync(templateDir);
  const filteredFiles = files.filter((file) => !ig.ignores(file));

  for (const file of filteredFiles) {
    const targetPath = path.join(targetDir, file);
    copy(path.join(templateDir, file), targetPath, (srcPath) =>
      ig.ignores(path.relative(templateDir, srcPath)),
    );
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, "package.json"), "utf-8"),
  );
  pkg.name = projectName;
  fs.writeFileSync(
    path.join(targetDir, "package.json"),
    JSON.stringify(pkg, null, 2) + "\n",
  );

  copy(gitignorePath, path.join(targetDir, ".gitignore"));

  const cdProjectName = targetDir.startsWith(cwd)
    ? path.relative(cwd, targetDir)
    : targetDir;
  console.log(`\nDone. Now run:\n`);
  if (cdProjectName) {
    console.log(
      `  cd ${
        cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName
      }`,
    );
  }

  const pkgManager = await findAvailablePackageManager();
  if (!pkgManager) {
    console.log(
      "No package manager is available. Please install one and try again.",
    );
  } else {
    console.log(`  ${pkgManager} install`);
    console.log(`  ${pkgManager} run start`);
  }
  console.log();
}

init().catch((e) => console.error(e));
