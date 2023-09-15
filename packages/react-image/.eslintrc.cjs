module.exports = {
  root: true,
  extends: ["@fepack/eslint-config"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: ["*.js*", "dist", "coverage"],
};
