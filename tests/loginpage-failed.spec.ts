import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://rahulshettyacademy.com/loginpagePractise/';

test('1.2.a - invalid username with valid password', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.locator('#username').fill('wronguser123');
  await page.locator('#password').fill('Learning@830$3mK2');
  await page.locator('input[type="checkbox"]').check();
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('.alert-danger')).toBeVisible();
});

test('1.2.b - valid username with invalid password', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('WrongPassword123!');
  await page.locator('input[type="checkbox"]').check();
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('.alert-danger')).toBeVisible();
});

test('1.2.c - both username and password invalid', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.locator('#username').fill('wronguser123');
  await page.locator('#password').fill('WrongPassword123!');
  await page.locator('input[type="checkbox"]').check();
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('.alert-danger')).toBeVisible();
});