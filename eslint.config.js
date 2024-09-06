import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "packages/create-vite/templates/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended
);
