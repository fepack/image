import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: '@fepack/image',
    dir: './src',
    environment: 'jsdom',
    globals: true,
    coverage: { provider: 'istanbul' },
    browser: {
      enabled: true,
      name: 'chrome', // browser name is required
    },
  },
})
