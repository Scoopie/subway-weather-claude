import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Only look inside dedicated e2e directory.
  testDir: './e2e',
  // Explicit pattern - only files inside e2e directory.
  testMatch: '**/e2e/**/*.spec.ts',
  // Extra guard to ignore any accidental sibling specs.
  testIgnore: ['**/src/**', '**/node_modules/**'],
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  // For first green, just run chromium; we can re-enable cross-browser once stable.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env['CI'],
    timeout: 30_000,
  },
});
