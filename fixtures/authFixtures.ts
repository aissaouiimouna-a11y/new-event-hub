import { test as base, expect } from '@playwright/test';
import { LoginPracticePage, VALID_USERNAME, VALID_PASSWORD } from '../pages/LoginPracticePage';

type MyFixtures = {
  loginPage: LoginPracticePage;
  loggedInPage: LoginPracticePage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPracticePage(page);
    await use(loginPage);
  },

  loggedInPage: async ({ loginPage }, use) => {
    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await use(loginPage);
  },
});

export { expect };
