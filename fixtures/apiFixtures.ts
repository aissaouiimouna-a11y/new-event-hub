import { test as base, expect, Page } from '@playwright/test';
import { ApiClient } from '../api/ApiClient';

const API_EMAIL = 'aissaouiimouna@gmail.com';
const API_PASSWORD = 'Taissaoui123';

type ApiFixtures = {
  apiClient: ApiClient;
  authenticatedPage: Page;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    const client = new ApiClient(request);
    await client.login(API_EMAIL, API_PASSWORD);
    await use(client);
  },

  authenticatedPage: async ({ page, apiClient }, use) => {
    await page.addInitScript((token) => {
      window.localStorage.setItem('token', token);
    }, apiClient.getToken());

    await page.goto('https://rahulshettyacademy.com/client');
    await use(page);
  },
});

export { expect };
