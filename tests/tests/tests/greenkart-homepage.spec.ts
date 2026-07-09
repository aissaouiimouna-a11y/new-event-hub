import { test, expect } from '@playwright/test';

const HOME_URL = 'https://rahulshettyacademy.com/seleniumPractise/';

test('2.1 - verify home page loads and products are visible', async ({ page }) => {
  await page.goto(HOME_URL);

  await expect(page).toHaveURL(/seleniumPractise/);

  await expect(page.locator('.brand.greenLogo')).toBeVisible();

  await expect(page.getByText('Brocolli - 1 Kg')).toBeVisible();
  await expect(page.getByRole('button', { name: 'ADD TO CART' }).first()).toBeVisible();
});