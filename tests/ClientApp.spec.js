const {test, expect} = require('@playwright/test');

test("@webtest clientapp login", async ({page}) => {

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

    expect(titles).toContain(productName);

    const count = await products.count();
    console.log(count);
    expect(count).toBeGreaterThan(0);
});
