const { expect } = require('@playwright/test');

class LoginPagePractisePage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.termsCheckbox = page.locator('input[type="checkbox"]');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async acceptTermsAndSignIn() {
    await this.termsCheckbox.check();
    await this.signInButton.click();
  }

  async waitForShopPage() {
    await this.page.waitForURL(/\/shop/);
  }

  async verifyProductDisplayed(productName) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }
}

module.exports = { LoginPagePractisePage };
