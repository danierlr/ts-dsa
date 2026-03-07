// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      "prettier/prettier": "warn",
      curly: "error",

      // TS
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",

      // General
      "no-console": "off", // console.log is the whole point here
      "prefer-const": "warn",
      "no-var": "warn",

      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-unused-vars": "off",
      "no-constant-condition": "warn",
      "no-empty": "warn",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-empty-object-type": "off",

      "no-unreachable": "off",
      "no-prototype-builtins": "off",
      "no-empty-pattern": "off",
    },
  }
);
