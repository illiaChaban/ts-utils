import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Default for all tests
    environment: 'node',

    // Per-file overrides
    environmentMatchGlobs: [
      // Pattern: all test files with `.browser.` in the name use jsdom
      ['**/*.browser.test.ts', 'jsdom'],
    ],
  },
})