import js from "@eslint/js";
import ts from "typescript-eslint";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import node from "eslint-plugin-n";
import vitest from "eslint-plugin-vitest";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default ts.config(
  // TypeScript
  {
    files: ["**/*.{ts,mts}"],
    extends: [
      js.configs.recommended,
      ...ts.configs.recommendedTypeChecked,
      comments.recommended,
      node.configs["flat/recommended-module"],
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.es2023,
      },
    },
    rules: {
      "n/no-unsupported-features/es-syntax": "off",
      "n/no-missing-import": "off",
      // ここにルールを追加...
    },
  },
  // TypeScript のテストファイル
  {
    files: ["src/**/*.spec.mts"],
    extends: [vitest.configs.recommended, vitest.configs.env],
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    rules: {
      // ここにルールを追加...
    },
  },
  // JavaScript
  {
    files: ["**/*.mjs"],
    extends: [
      js.configs.recommended,
      comments.recommended,
      node.configs["flat/recommended-module"],
    ],
    languageOptions: {
      globals: {
        ...globals.es2023,
      },
    },
    rules: {
      // ここにルールを追加...
    },
  },
  prettier,
);
