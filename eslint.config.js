// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import storybook from "eslint-plugin-storybook";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    ignores: ["out", "next-env.d.ts"],
  },
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
];

export default config;
