import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "ignoreRestSiblings": true,
          "varsIgnorePattern": "^_",
          "argsIgnorePattern": "^_"
        },
      ],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
