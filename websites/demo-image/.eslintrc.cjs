/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@fepack/eslint-config-ts/typescript",
    "@fepack/eslint-config-js/javascript",
  ],
  ignorePatterns: ["*.js*", "dist", "coverage"],
};
