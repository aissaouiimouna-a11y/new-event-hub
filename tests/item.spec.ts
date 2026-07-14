import { test, expect } from '../fixtures/apiFixtures';

test('retrieves all items from the backend via API', async ({ apiClient }) => {
  const products = await apiClient.getAllProducts();

  expect(Array.isArray(products.data)).toBeTruthy();
  expect(products.data.length).toBeGreaterThan(0);

  console.log(`Retrieved ${products.data.length} items`);
});