// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

const config = ({
  testDir: './tests',
  reporter: 'html',
  timeout: 60*1000,
  expect: {
    timeout: 10000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
module.exports = config;