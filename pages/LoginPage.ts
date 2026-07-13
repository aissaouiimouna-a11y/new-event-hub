import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object représentant la page de login.
 * Toute la logique d'interaction avec cette page (sélecteurs + actions)
 * vit ici, et nulle part ailleurs. Les tests ne connaissent jamais
 * un sélecteur CSS directement : ils appellent des méthodes métier.
 */
export class LoginPage {
  readonly page: Page;

  // --- Sélecteurs (le SEUL endroit du projet où ils sont écrits) ---
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly errorMessage: Locator;
  readonly loggedInHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#submit');
    this.logoutButton = page.getByRole('link', { name: 'Log out' });
    this.errorMessage = page.locator('#error');
    this.loggedInHeading = page.getByRole('heading', { name: 'Logged In Successfully' });
  }

  /** Navigue vers la page de login. */
  async goto() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  /**
   * Remplace le bloc dupliqué :
   *   await page.locator('#username').fill(user);
   *   await page.locator('#password').fill(password);
   *   await page.locator('#login').click();
   * par un seul appel métier.
   */
  async login(user: string, password: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Se déconnecte (suppose qu'on est déjà connecté). */
  async logout() {
    await this.logoutButton.click();
  }

  /**
   * Vérifie si l'utilisateur est actuellement connecté.
   * Retourne un booléen plutôt que de faire l'assertion elle-même,
   * pour que ce soit le TEST qui décide quoi vérifier et comment.
   */
  async isLogged(): Promise<boolean> {
    return this.loggedInHeading.isVisible();
  }

  /** Récupère le message d'erreur affiché en cas d'échec de connexion. */
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }
}
