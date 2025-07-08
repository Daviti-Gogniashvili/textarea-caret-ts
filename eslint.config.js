import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint"],
    extends: [
      "eslint:recommended",
      "@typescript-eslint/recommended",
      "@typescript-eslint/recommended-requiring-type-checking",
    ],
    env: {
      browser: true,
      es6: true,
      node: true,
      jest: true,
    },
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-const": "error",
      "@typescript-eslint/no-inferrable-types": "error",

      // General rules
      "no-console": "warn",
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "brace-style": ["error", "1tbs"],
      "comma-dangle": ["error", "never"],
      quotes: ["error", "single", { avoidEscape: true }],
      semi: ["error", "always"],
    },
  },
  { ignores: ["dist/", "node_modules/", "coverage/", "*.js", "docs/"] },
);
