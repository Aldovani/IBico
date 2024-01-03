import tsConfigPaths from 'vitest-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    setupFiles: './test/setup.ts',
    globals: true,
    coverage: {
      provider: 'v8',
    },
  },
})
