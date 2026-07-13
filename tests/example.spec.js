const { test, expect } = require('@playwright/test');

test('@webtest clientapp login', async ({ page }) => {
  const email = 'aissaouiimouna@gmail.com';
  const password = 'Taissaoui123';
  const productName = 'ZARA COAT 3';
  const baseUrl = 'https://rahulshettyacademy.com/client';

  await test.step('Login to the application', async () => {
    await page.goto(baseUrl);
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.card-body b').first()).toBeVisible();
  });

  await test.step('Add the selected product to the cart', async () => {
    const productCard = page.locator('.card-body').filter({ hasText: productName });
    await expect(productCard).toBeVisible();
    await productCard.getByRole('button', { name: 'Add To Cart' }).click();
  });

  await test.step('Validate the cart and place the order', async () => {
    await page.locator('[routerlink="/dashboard/cart"]').click();
    await expect(page.getByText(productName).first()).toBeVisible();
    await page.getByText('Checkout').click();
    await page.getByPlaceholder('Select Country').pressSequentially('ind', { delay: 150 });
    await page.getByRole('button', { name: 'India' }).nth(1).click();
    await page.getByText('Place Order').click();
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
  });
});