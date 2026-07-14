import { test, expect } from '../fixtures/authFixtures';

test('logs in and verifies the iPhone X product', async ({ loggedInPage }) => {
  await expect(loggedInPage.page).toHaveURL(/shop/);
  await loggedInPage.page.waitForLoadState('networkidle');
  await expect(loggedInPage.page.getByText('iPhone X')).toBeVisible();
});