import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginJest from 'eslint-plugin-jest';

export default tseslint.config(
  { ignores: ["dist/", "node_modules/", "coverage/", "*.js", "docs/"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {...globals.browser, ...pluginJest.environments.globals.globals},
    },
    rules: {
      "func-style": ["error", "expression", { allowArrowFunctions: true }],
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-undef": "error",
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "warn",
      "no-var": "error",
      "no-shadow": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      semi: ["error", "always"],
      quotes: ["error", "single"],
      indent: ["error", "tab"],
      "no-multi-spaces": "error",
      "space-before-blocks": ["error", "always"],
      "space-infix-ops": "error",
      "keyword-spacing": ["error", { before: true, after: true }],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "comma-dangle": ["error", "never"],
      "comma-spacing": ["error", { before: false, after: true }],
      "comma-style": ["error", "last"],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-dupe-keys": "error",
      "no-unreachable": "error",
      "valid-typeof": "error",
      "no-extra-boolean-cast": "error",
      "no-irregular-whitespace": "error",
      "no-unexpected-multiline": "error",
      "use-isnan": "error",
      "dot-notation": "error",
    },
  },
);
