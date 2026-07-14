import { test, expect } from '../fixtures/apiFixtures';

const orderPayload = {
  orders: [{ country: 'Syrian Arab Republic', productOrderedId: '6960eac0c941646b7a8b3e68' }],
};

test('@placeorder', async ({ authenticatedPage, apiClient }) => {
  const productName = 'ZARA COAT 3';
  const products = authenticatedPage.locator('.card-body');

  await authenticatedPage.locator('.card-body b').first().waitFor();
  const titles = await authenticatedPage.locator('.card-body b').allTextContents();
  expect(titles).toContain(productName);

  const count = await products.count();
  expect(count).toBeGreaterThan(0);

  const orderResponseJson = await apiClient.createOrder(orderPayload);
  expect(orderResponseJson.message).toBe('Order Placed Successfully');

  console.log(orderResponseJson);
});