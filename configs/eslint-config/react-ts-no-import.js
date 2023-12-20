/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["./react.js", "@fepack/eslint-config-ts/no-import"],
  rules: {
    "jsdoc/check-tag-names": ["warn", { jsxTags: true }],
    "jsdoc/require-param": ["off"],
  },
};
