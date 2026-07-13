import { Page, Locator } from '@playwright/test';

const LOGIN_URL = 'https://rahulshettyacademy.com/loginpagePractise/';

export const VALID_USERNAME = 'rahulshettyacademy';
export const VALID_PASSWORD = 'Learning@830$3mK2';

export class LoginPracticePage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  static readonly url = LOGIN_URL;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.rememberMeCheckbox = page.locator('input[type="checkbox"]');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.locator('.alert-danger');
  }

  async goto() {
    await this.page.goto(LOGIN_URL);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.signInButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }

  async isErrorVisible(): Promise<boolean> {
  try {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
    return true;
  } catch {
    return false;
  }

}}