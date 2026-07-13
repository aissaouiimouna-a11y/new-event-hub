import { test, expect } from '@playwright/test';
import { LoginPracticePage, VALID_USERNAME, VALID_PASSWORD } from '../pages/LoginPracticePage';

test('successful login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPracticePage(page);
  await loginPage.goto();
  await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

  await expect(page).toHaveURL(/shop/);
});