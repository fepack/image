import { defineConfig } from "tsup";

export default defineConfig({
  banner: { js: '"use client"' },
  format: ["cjs", "esm"],
  entry: ["src/*.{ts,tsx}", "!**/*.{spec,test}.*"],
  sourcemap: true,
  dts: true,
  splitting: false,
});
