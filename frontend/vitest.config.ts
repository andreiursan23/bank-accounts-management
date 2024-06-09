import path from 'node:path'
import { defineConfig } from 'vitest/config'
import configuration from './vite.config'

export default defineConfig({
  ...configuration,
  resolve: {
    alias: {
      ...configuration?.resolve?.alias,
      test: path.resolve(__dirname, './test')
    }
  },
  test: {
    globals: true,
    setupFiles: path.resolve(__dirname, 'test/setup.ts'),
    environmentMatchGlobs: [
      ['**/*.test.tsx', 'jsdom'],
      ['**/*.component.test.ts', 'jsdom']
    ],
    coverage: {
      include: ['src/**/*'],
      exclude: [
        'test/**',
        'vite.*.ts',
        '**/*.d.ts',
        '**/*.test.{ts,tsx,js,jsx}',
        '**/*.config.*',
        '**/snapshot-tests/**',
        '**/*.solution.tsx',
        '**/coverage/**',
        '**/main.tsx'
      ],
      all: true
    }
  }
})
