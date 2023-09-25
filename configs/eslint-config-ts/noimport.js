/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:jsdoc/recommended-typescript",
    "@fepack/eslint-config-js/noimport",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["jsdoc", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "jsdoc/require-returns": "off",
    "jsdoc/require-description": "warn",
    "jsdoc/check-param-names": "error",
  },
};
