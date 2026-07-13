const { test, expect } = require('@playwright/test');

test('adds a product to the cart from the GreenKart shop', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

  const productName = 'Cauliflower - 1 Kg';
  const productCard = page.locator('.product').filter({ has: page.getByRole('heading', { name: productName }) });

  await expect(productCard).toBeVisible();
  await productCard.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.getByRole('link', { name: 'Cart' }).click();

  const cartPanel = page.locator('.cart-preview').or(page.locator('.cart-item-list')).or(page.locator('.cart-icon-wrapper'));

  await expect(page.locator('.cart-icon')).toContainText('1');
  await expect(cartPanel).toContainText(productName);
});
