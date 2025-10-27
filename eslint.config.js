// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import storybook from "eslint-plugin-storybook";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig([
  {
    ignores: ["src/api/gen", "out", "next-env.d.ts"],
  },
  tseslint.configs.recommendedTypeChecked,
  // @ts-expect-error @vitest/eslint-plugin types are broken
  vitest.configs.recommended,
  ...storybook.configs["flat/recommended"],
  ...compat.config({
    extends: [
      "eslint:recommended",
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
    ],
  }),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      // Disable hooks rules outside of React files
      "react-hooks/rules-of-hooks": "off",
    },
  },
]);
