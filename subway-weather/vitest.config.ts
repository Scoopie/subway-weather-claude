import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    include: [
      'src/tests/**/*.spec.ts',
      'src/tests/**/*.contract.spec.ts',
      'src/tests/**/*.integration.spec.ts'
    ],
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    reporters: ['default'],
    coverage: {
      reporter: ['text', 'html'],
    },
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@services': path.resolve(__dirname, './src/services'),
      '@models': path.resolve(__dirname, './src/models'),
      '@state': path.resolve(__dirname, './src/state')
    }
  }
});
