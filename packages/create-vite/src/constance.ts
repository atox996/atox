import pcolor from "picocolors";

const OPTIONS = [
  {
    name: "-t, --template NAME",
    description: "Use a specific template",
    color: pcolor.blue,
  },
  {
    name: "-v, --version",
    description: "Show current version",
    color: pcolor.blue,
  },
  {
    name: "[DIRECTORY]",
    description: "Project directory, defaults to current directory",
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
    description: "Create in interactive mode",
    color: pcolor.yellow,
  },
  {
    name: "create-vite -t vue",
    description: "Create vue template in current directory",
    color: pcolor.yellow,
  },
  {
    name: "create-vite -t react vite-project",
    description: "Create react template in ./vite-project",
    color: pcolor.yellow,
  },
  {
    name: "create-vite /path/to/vite-project",
    description: "Manually select template for /path/to/vite-project",
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
${pcolor.bold(pcolor.yellow("Usage:"))} create-vite [OPTION]... [DIRECTORY]

${pcolor.bold("Create a new Vite project with ESLint, Prettier and TypeScript.")} 

${pcolor.bold(pcolor.cyan("Options:"))}
  ${OPTIONS.map((item) => `${item.color(item.name)}${getSpaces(maxNameLength - item.name.length)}${item.description || ""}`).join("\n  ")}

${pcolor.bold(pcolor.cyan("Available templates:"))}
  ${FRAMEWORKS.map((item) => `${item.color(item.name)}${getSpaces(maxNameLength - item.name.length)}${item.description || ""}`).join("\n  ")}

${pcolor.bold(pcolor.cyan("Examples:"))}
  ${EXAMPLES.map((item) => `${item.color(item.name)}${getSpaces(maxNameLengthForExample - item.name.length)}${item.description || ""}`).join("\n  ")}
  `;
