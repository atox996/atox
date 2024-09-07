import { red, reset } from "picocolors";
import minimist from "minimist";
import path from "node:path";
import fs from "node:fs";
import prompts from "prompts";
import {
  copy,
  emptyDir,
  formatTargetDir,
  getProjectName,
  isEmpty,
  isValidPackageName,
  toValidPackageName,
} from "./utils";
import { DEFAULT_TAGET_DIR, FRAMEWORKS, helpMessage } from "./constance";
import { fileURLToPath } from "node:url";
import ignore from "ignore";

const argv = minimist<{
  t?: string;
  template?: string;
  help?: boolean;
  h?: boolean;
}>(process.argv.slice(2), {
  default: { help: false },
  alias: { h: "help", t: "template" },
  string: ["_"],
});

const cwd = process.cwd();

async function init() {
  const argTargetDir = formatTargetDir(argv._[0]);
  const argTemplate = argv.template || argv.t;

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
          message: reset("Project name:"),
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
              throw new Error(red("✖") + " Operation cancelled");
            }
            return null;
          },
          name: "overwriteChecker",
        },
        {
          type: () =>
            isValidPackageName(getProjectName(targetDir)) ? null : "text",
          name: "packageName",
          message: reset("Package name:"),
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
              ? reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `,
                )
              : reset("Select a framework:"),
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
          throw new Error(red("✖") + " Operation cancelled");
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
  const gitignorePath = path.join(templateDir, ".gitignore");
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
    ig.add(gitignoreContent);
  }
  ig.add(["pnpm-lock.yaml", "package.json"]);

  const files = fs.readdirSync(templateDir);
  const filteredFiles = files.filter((file) => !ig.ignores(file));

  for (const file of filteredFiles) {
    const targetPath = path.join(root, file);
    copy(path.join(templateDir, file), targetPath);
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, "package.json"), "utf-8"),
  );
  pkg.name = packageName || getProjectName(targetDir);
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(pkg, null, 2) + "\n",
  );

  const cdProjectName = path.relative(cwd, root);
  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(
      `  cd ${
        cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName
      }`,
    );
  }

  console.log("  pnpm install");
  console.log("  pnpm run start");
  console.log();
}

init().catch((e) => console.error(e));
