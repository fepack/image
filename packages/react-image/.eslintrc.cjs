/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@fepack/eslint-config/react-ts'],
  ignorePatterns: ['dist', 'coverage'],
}
