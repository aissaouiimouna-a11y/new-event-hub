const { test, expect } = require('@playwright/test');

test('retrieves all items from the backend via API', async ({ playwright }) => {
  const apiContext = await playwright.request.newContext();

  try {
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
      data: {
        userEmail: 'aissaouiimouna@gmail.com',
        userPassword: 'Taissaoui123'
      }
    });
    expect(loginResponse.ok()).toBeTruthy();

    const loginData = await loginResponse.json();
    const token = loginData.token;
    expect(token).toBeTruthy();

    const productsResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products', {
      headers: {
        Authorization: token
      }
    });
    expect(productsResponse.ok()).toBeTruthy();

    const products = await productsResponse.json();
    expect(Array.isArray(products.data)).toBeTruthy();
    expect(products.data.length).toBeGreaterThan(0);

    console.log(`Retrieved ${products.data.length} items`);
  } finally {
    await apiContext.dispose();
  }
});