import {
  blue,
  greenBright,
  bold,
  cyan,
  yellow,
  blueBright,
  yellowBright,
  whiteBright,
} from "picocolors";

export const DEFAULT_TAGET_DIR = "vite-project";

export const helpMessage = `\
${bold(yellow("Usage:"))} vite-template [OPTION]... [DIRECTORY]

${bold("Create a new Vite project in TypeScript.")} 
With no arguments, start the CLI in interactive mode.

${bold(cyan("Options:"))}
  ${blue("-t, --template NAME")}        use a specific template

${bold(cyan("Available templates:"))}
  ${bold(greenBright("vue"))}
  ${bold(greenBright("react"))}
  ${bold(greenBright("monorepo"))}
  ${bold(greenBright("simple"))}
`;

export const FRAMEWORKS: Framework[] = [
  {
    name: "vue",
    display: "Vue",
    color: greenBright,
  },
  {
    name: "react",
    display: "React",
    color: blueBright,
  },
  {
    name: "monorepo",
    display: "Monorepo",
    color: yellowBright,
  },
  {
    name: "simple",
    display: "Simple",
    color: whiteBright,
  },
];
