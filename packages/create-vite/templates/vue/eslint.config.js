import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const autoImports = require("./.eslintrc-auto-import.json");

export default tseslint.config(
  {
    ignores: ["**/dist/**"],
    languageOptions: autoImports,
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended
);
