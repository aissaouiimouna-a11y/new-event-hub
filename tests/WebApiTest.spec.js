const {test, expect} = require('@playwright/test');

const orderPayload = { orders: [{ country: "Syrian Arab Republic", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let token;

test.beforeAll(async ({request}) => {
    const loginResponse = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: {
            userEmail: "aissaouiimouna@gmail.com",
            userPassword: "Taissaoui123"
        }
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
});

test("@placeorder", async ({page, request}) => {

    const productName = "ZARA COAT 3";
    const products = page.locator('.card-body');

    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    expect(titles).toContain(productName);

    const count = await products.count();
    console.log(count);
    expect(count).toBeGreaterThan(0);

    const orderResponse = await request.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: orderPayload,
        headers: {
            Authorization: token


            
        }
    });
    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    console.log(orderResponseJson);
});
