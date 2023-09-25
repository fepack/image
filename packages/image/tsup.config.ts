import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["src/*.{ts,tsx}", "!**/*.{spec,test}.*"],
  sourcemap: true,
  dts: true,
  splitting: false,
});
