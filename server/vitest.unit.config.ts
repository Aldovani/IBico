import { defineConfig, mergeConfig, configDefaults } from 'vitest/config'
import vitestConfig from './vitest.config'

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      exclude: [
        ...configDefaults.exclude,
        '**/*.e2e-{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        '**/*.e2e.spec.ts',
        './build/**',
      ],

      coverage: {
        provider: 'v8',

        exclude: ['build/'],
      },
    },
  }),
)
