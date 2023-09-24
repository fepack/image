/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    es2020: true,
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["*.spec.ts*", "*.test.ts*"],
      plugins: ["vitest"],
      extends: ["plugin:vitest/recommended"],
    },
  ],
  rules: {
    "arrow-body-style": ["warn", "as-needed"],
    "newline-before-return": "warn",
  },
};
