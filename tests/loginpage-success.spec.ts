import { test, expect } from '../fixtures/authFixtures';

test('successful login with valid credentials', async ({ loggedInPage }) => {
  await expect(loggedInPage.page).toHaveURL(/shop/);
});