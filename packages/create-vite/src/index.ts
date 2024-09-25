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
import { DEFAULT_TAGET_DIR, FRAMEWORKS, helpMessage } from "./constance";
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

const pkgManager = await findAvailablePackageManager();

async function init() {
  const argTargetDir = formatTargetDir(argv._[0]);
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
  let targetDir = argTargetDir || DEFAULT_TAGET_DIR;

  let result: prompts.Answers<
    "projectName" | "overwrite" | "packageName" | "framework"
  >;

  prompts.override({
    overwrite: argv.overwrite,
  });

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : "text",
          name: "projectName",
          message: pcolor.reset("Project name:"),
          initial: DEFAULT_TAGET_DIR,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || DEFAULT_TAGET_DIR;
          },
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "select",
          name: "overwrite",
          message: () =>
            (targetDir === "."
              ? "Current directory"
              : `Target directory "${targetDir}"`) +
            ` is not empty. Please choose how to proceed:`,
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
              throw new Error(pcolor.red("✖") + " Operation cancelled");
            }
            return null;
          },
          name: "overwriteChecker",
        },
        {
          type: () =>
            isValidPackageName(getProjectName(targetDir)) ? null : "text",
          name: "packageName",
          message: pcolor.reset("Package name:"),
          initial: () => toValidPackageName(getProjectName(targetDir)),
          validate: (dir) =>
            isValidPackageName(dir) || "Invalid package.json name",
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
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color;
            return {
              title: frameworkColor(framework.display),
              value: framework,
            };
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(pcolor.red("✖") + " Operation cancelled");
        },
      },
    );
  } catch (cancelled) {
    if (cancelled instanceof Error) {
      console.log(cancelled.message);
    }
    return;
  }

  // user choice associated with prompts
  const { framework, overwrite, packageName } = result;

  const root = path.join(cwd, targetDir);

  if (overwrite === "yes") {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  // determine template
  const template: string = framework?.name || argTemplate;

  console.log(`\nScaffolding project in ${root}...`);

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
    const targetPath = path.join(root, file);
    copy(path.join(templateDir, file), targetPath, (srcPath) =>
      ig.ignores(path.relative(cwd, srcPath)),
    );
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, "package.json"), "utf-8"),
  );
  pkg.name = packageName || getProjectName(targetDir);
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(pkg, null, 2) + "\n",
  );

  copy(gitignorePath, path.join(root, ".gitignore"));

  const cdProjectName = path.relative(cwd, root);
  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(
      `  cd ${
        cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName
      }`,
    );
  }
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
