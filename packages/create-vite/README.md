### @atox/create-vite <a href="https://npmjs.com/package/@atox/create-vite"><img src="https://img.shields.io/npm/v/@atox/create-vite" alt="npm package"></a>

## Scaffolding Your First Vite Project

> **Compatibility Note:**  
> Vite requires [Node.js](https://nodejs.org/en/) version 18+ or 20+. Some templates may require a higher Node.js version. Please upgrade if your package manager displays a warning.

### Installation

You can install `@atox/create-vite` globally using the following commands:

#### Install with NPM:

```bash
$ npm install @atox/create-vite --global
```

#### Install with Yarn:

```bash
$ yarn add @atox/create-vite --global
```

#### Install with PNPM:

```bash
$ pnpm add @atox/create-vite --global
```

Once installed, you can use the `create-vite` command to scaffold a Vite project.

### Usage

To create a new project, run the following command:

```bash
$ create-vite
```

This will prompt you to select a template and create a new project in the current directory.

#### Create a Project in a Specific Directory

You can specify a subdirectory for the project, like this:

```bash
$ create-vite my-project
```

This will create the project inside a directory named `my-project`.

#### Select a Template

Use the `-t` or `--template` option to specify a template:

```bash
$ create-vite -t vue
```

This will create a Vue project in the current directory.

#### Available Templates

- **vvt-starter**: Vite + Vue + TDesign Vue Next
- **vue**: A Vue 3 project
- **react**: A React project
- **monorepo**: A monorepo project based on Vite
- **simple**: A minimal Vite project

#### Check Version

Use the `-v` option to check the current version:

```bash
$ create-vite -v
```

### Examples

- `create-vite` – Creates a new project in the current directory and prompts you to select a template.
- `create-vite my-project` – Creates a new project in the `my-project` directory and prompts you to select a template.
- `create-vite -t vue` – Creates a Vue project in the current directory.
- `create-vite my-project -t react` – Creates a React project in the `my-project` directory.
