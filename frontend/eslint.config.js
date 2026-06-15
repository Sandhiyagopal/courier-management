import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx}"],

    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
      },
    },

    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",
      "no-empty-pattern": "error",
      "no-constant-binary-expression": "error",
      "no-unused-vars": "off",
      "no-sequences": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_"
        },
      ],

      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "CallExpression[callee.property.name='sort'][arguments.length=0]",
          message:
            "Bad practice: Array.prototype.sort() should always use a compare function."
        },
        {
          selector:
            "CallExpression[callee.property.name='toSorted'][arguments.length=0]",
          message:
            "Bad practice: Array.prototype.toSorted() should always use a compare function."
        }
      ],
    },
  },
]);