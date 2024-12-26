import pcolor from "picocolors";

const OPTIONS = [
  {
    name: "-t, --template NAME",
    description: "Specify a template from available frameworks",
    color: pcolor.blue,
  },
  {
    name: "-v, --version",
    description: "Show current version",
    color: pcolor.blue,
  },
  {
    name: "[DIRECTORY]",
    description:
      "Project directory. If omitted, the project is created in the current directory",
    color: pcolor.blue,
  },
];

export const FRAMEWORKS: Framework[] = [
  {
    name: "vvt-starter",
    display: "VVT Starter",
    description: "Vite + Vue + TDesign Vue Next",
    color: pcolor.green,
  },
  {
    name: "vue",
    display: "Vue",
    color: pcolor.green,
  },
  {
    name: "react",
    display: "React",
    color: pcolor.green,
  },
  {
    name: "monorepo",
    display: "Monorepo",
    color: pcolor.green,
  },
  {
    name: "simple",
    display: "Simple",
    color: pcolor.green,
  },
];

const EXAMPLES = [
  {
    name: "create-vite",
    description:
      "Create a new project in the current directory, choose a template interactively",
    color: pcolor.yellow,
  },
  {
    name: "create-vite my-project",
    description:
      "Create a new project in a subdirectory named 'my-project' and choose a template interactively",
    color: pcolor.yellow,
  },
  {
    name: "create-vite -t vue",
    description: "Create a Vue project in the current directory",
    color: pcolor.yellow,
  },
  {
    name: "create-vite my-project -t react",
    description: "Create a React project in 'my-project' directory",
    color: pcolor.yellow,
  },
];

const maxNameLength = Math.max(
  ...OPTIONS.map((opt) => opt.name.length),
  ...FRAMEWORKS.map((fw) => fw.name.length),
);

const maxNameLengthForExample = Math.max(
  ...EXAMPLES.map((ex) => ex.name.length),
);

const getSpaces = (len: number) => " ".repeat(len + 4);

export const helpMessage = `\n
${pcolor.bold(pcolor.yellow("Usage:"))} create-vite [DIRECTORY] [OPTION]...

${pcolor.bold("Create a new Vite project with ESLint, Prettier, and TypeScript.")}

${pcolor.bold(pcolor.cyan("Options:"))}
  ${OPTIONS.map((item) => `${item.color(item.name)}${getSpaces(maxNameLength - item.name.length)}${item.description || ""}`).join("\n  ")}

${pcolor.bold(pcolor.cyan("Available frameworks:"))}
  ${FRAMEWORKS.map((item) => `${item.color(item.name)}${getSpaces(maxNameLength - item.name.length)}${item.description || ""}`).join("\n  ")}

${pcolor.bold(pcolor.cyan("Examples:"))}
  ${EXAMPLES.map((item) => `${item.color(item.name)}${getSpaces(maxNameLengthForExample - item.name.length)}${item.description || ""}`).join("\n  ")}
`;
