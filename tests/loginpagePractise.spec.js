const { test, expect } = require('@playwright/test');

test('logs in and verifies the iPhone X product', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('learning');
  await page.locator('input[type="checkbox"]').check();
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/shop/);
  await expect(page.getByText('iPhone X')).toBeVisible();
});
