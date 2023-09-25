import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "@fepack/react-image",
    dir: "./src",
    environment: "jsdom",
    globals: true,
    coverage: { provider: "istanbul" },
  },
});
