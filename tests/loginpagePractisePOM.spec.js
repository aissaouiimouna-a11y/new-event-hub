const { test } = require('@playwright/test');
const { LoginPagePractisePage } = require('./pageObjects/LoginPagePractisePage');

test('logs in and verifies the iPhone X product', async ({ page }) => {
  const loginPage = new LoginPagePractisePage(page);

  await loginPage.goto();
  await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');
  await loginPage.acceptTermsAndSignIn();
  await loginPage.waitForShopPage();
  await loginPage.verifyProductDisplayed('iPhone X');
});
