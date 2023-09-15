/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "@fepack/eslint-config-js/noimport",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-unused-vars": "error",
  },
};
