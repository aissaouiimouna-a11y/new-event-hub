import { test, expect } from '@playwright/test';
import { LoginPracticePage } from '../pages/LoginPracticePage';

test.describe('Login - identifiants invalides', () => {
  let loginPage: LoginPracticePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPracticePage(page);
    await loginPage.goto();
  });

  test('1.2.a - invalid username with valid password', async ({ page }) => {
    await loginPage.login('wronguser123', 'Learning@830$3mK2');
    await expect(page).toHaveURL(LoginPracticePage.url);
    expect(await loginPage.isErrorVisible()).toBeTruthy();
  });

  test('1.2.b - valid username with invalid password', async ({ page }) => {
    await loginPage.login('rahulshettyacademy', 'WrongPassword123!');
    await expect(page).toHaveURL(LoginPracticePage.url);
    expect(await loginPage.isErrorVisible()).toBeTruthy();
  });

  test('1.2.c - both username and password invalid', async ({ page }) => {
    await loginPage.login('wronguser123', 'WrongPassword123!');
    await expect(page).toHaveURL(LoginPracticePage.url);
    expect(await loginPage.isErrorVisible()).toBeTruthy();
  });
});