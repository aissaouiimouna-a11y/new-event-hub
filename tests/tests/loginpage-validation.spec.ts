import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://rahulshettyacademy.com/loginpagePractise/';

test('1.3 - required field validation', async ({ page }) => {
  await page.goto(LOGIN_URL);

  await page.locator('input[type="checkbox"]').check();
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('.alert-danger')).toBeVisible();
  await expect(page.locator('.alert-danger')).toContainText('Empty username/password');
});