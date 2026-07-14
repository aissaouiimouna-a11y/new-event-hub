import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Visual regression - Login page', () => {
  test('la page de login correspond au design de référence', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('le formulaire de login seul correspond à la référence', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page.locator('#login')).toHaveScreenshot('login-form.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});