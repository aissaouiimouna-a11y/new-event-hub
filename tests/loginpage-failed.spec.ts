import { test, expect } from '../fixtures/authFixtures';
import { LoginPracticePage } from '../pages/LoginPracticePage';

test.describe('Login - identifiants invalides', () => {
  test('1.2.a - invalid username with valid password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('wronguser123', 'Learning@830$3mK2');

    await expect(loginPage.page).toHaveURL(LoginPracticePage.url);
    expect(await loginPage.isErrorVisible()).toBeTruthy();
  });

  test('1.2.b - valid username with invalid password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('rahulshettyacademy', 'WrongPassword123!');

    await expect(loginPage.page).toHaveURL(LoginPracticePage.url);
    expect(await loginPage.isErrorVisible()).toBeTruthy();
  });

  test('1.2.c - both username and password invalid', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('wronguser123', 'WrongPassword123!');

    await expect(loginPage.page).toHaveURL(LoginPracticePage.url);
    expect(await loginPage.isErrorVisible()).toBeTruthy();
  });
});