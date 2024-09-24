import pcolor from "picocolors";

export const DEFAULT_TAGET_DIR = "vite-project";

export const helpMessage = `\
${pcolor.bold(pcolor.yellow("Usage:"))} vite-template [OPTION]... [DIRECTORY]

${pcolor.bold("Create a new Vite project in TypeScript.")} 
With no arguments, start the CLI in interactive mode.

${pcolor.bold(pcolor.cyan("Options:"))}
  ${pcolor.blue("-t, --template NAME")}        use a specific template

${pcolor.bold(pcolor.cyan("Available templates:"))}
  ${pcolor.bold(pcolor.greenBright("vvt-starter"))}
  ${pcolor.bold(pcolor.greenBright("vue"))}
  ${pcolor.bold(pcolor.greenBright("react"))}
  ${pcolor.bold(pcolor.greenBright("monorepo"))}
  ${pcolor.bold(pcolor.greenBright("simple"))}
`;

export const FRAMEWORKS: Framework[] = [
  {
    name: "vvt-starter",
    display: "VVT Starter",
    color: pcolor.cyanBright,
  },
  {
    name: "vue",
    display: "Vue",
    color: pcolor.greenBright,
  },
  {
    name: "react",
    display: "React",
    color: pcolor.blueBright,
  },
  {
    name: "monorepo",
    display: "Monorepo",
    color: pcolor.yellowBright,
  },
  {
    name: "simple",
    display: "Simple",
    color: pcolor.whiteBright,
  },
];
