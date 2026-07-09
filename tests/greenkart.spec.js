const { test, expect } = require('@playwright/test');

test('searches for a product, adds it to the cart, and verifies the cart', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

  const searchBox = page.getByPlaceholder('Search for Vegetables and Fruits');
  await searchBox.fill('ca');

  const cauliflowerHeading = page.getByRole('heading', { name: 'Cauliflower - 1 Kg', exact: true });
  await expect(cauliflowerHeading).toBeVisible();

  const cauliflowerCard = cauliflowerHeading.locator('..');
  await expect(cauliflowerCard).toBeVisible();
  await cauliflowerCard.locator('.product-action').getByRole('button', { name: 'ADD TO CART' }).click();

  await page.locator('.cart-icon').click();

  const cartItems = page.locator('.cart-preview .cart-items .cart-item');
  await expect(cartItems).toContainText('Cauliflower');
});
