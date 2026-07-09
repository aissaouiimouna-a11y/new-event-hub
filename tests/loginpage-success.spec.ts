import { test, expect } from '@playwright/test';

test('successful login with valid credentials', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');
  await page.locator('input[type="checkbox"]').check();
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/shop/);
});
