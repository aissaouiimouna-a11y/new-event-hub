import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  // Exécuté avant CHAQUE test : navigation systématique vers la page de login.
  // Fini le "await page.goto(...)" copié-collé dans chaque fichier.
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('connexion réussie avec des identifiants valides', async () => {
    await loginPage.login('student', 'Password123');

    expect(await loginPage.isLogged()).toBeTruthy();
  });

  test('déconnexion après une connexion réussie', async () => {
    await loginPage.login('student', 'Password123');
    expect(await loginPage.isLogged()).toBeTruthy();

    await loginPage.logout();
    expect(await loginPage.isLogged()).toBeFalsy();
  });

  test('connexion échoue avec un mot de passe invalide', async () => {
    await loginPage.login('student', 'wrongPassword');

    expect(await loginPage.isLogged()).toBeFalsy();
    expect(await loginPage.getErrorMessage()).toContain('Your password is invalid!');
  });

  test('connexion échoue avec un nom d\'utilisateur invalide', async () => {
    await loginPage.login('wrongUser', 'Password123');

    expect(await loginPage.isLogged()).toBeFalsy();
    expect(await loginPage.getErrorMessage()).toContain('Your username is invalid!');
  });
});
