
// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

const environment = process.env.ENV || 'dev';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`) });

const config = ({
  testDir: './tests',
  reporter: 'html',
  timeout: 60*1000,
  expect: {
    timeout: 10000,
  },
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
module.exports = config;