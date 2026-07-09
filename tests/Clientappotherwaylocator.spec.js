const {test, expect} = require('@playwright/test');

test.only("@webtest clientapp login", async ({page}) => {

    const email = "aissaouiimouna@gmail.com";
    const password = "Taissaoui123";
    const productName = "ZARA COAT 3";
    const products = page.locator('.card-body');

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    await page.locator('.card-body').filter({ hasText: productName }).getByRole('button', { name: 'Add To Cart' }).click();
    await page.locator('[routerlink="/dashboard/cart"]').click();
    await page.locator('div li').first().waitFor();

    const bool = await page.getByText(productName).isVisible();
    expect(bool).toBeTruthy();

    await page.getByText('Checkout').click();
    await page.getByPlaceholder('Select Country').pressSequentially('ind', { delay: 150 });
    await page.getByRole('button', { name: 'India' }).nth(1).click();
    await page.getByText('Place Order').click();

    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
});