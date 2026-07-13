import { Page, Locator } from '@playwright/test';

/**
 * Page Object pour le panier et le tunnel de commande (checkout)
 * de l'application client.
 */
export class CartPage {
  readonly page: Page;
  readonly checkoutLink: Locator;
  readonly countryInput: Locator;
  readonly placeOrderButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutLink = page.getByText('Checkout');
    this.countryInput = page.getByPlaceholder('Select Country');
    this.placeOrderButton = page.getByText('Place Order');
    this.confirmationMessage = page.getByText('Thankyou for the order.');
  }

  async waitForItems() {
    await this.page.locator('div li').first().waitFor();
  }

  async isProductInCart(productName: string): Promise<boolean> {
    return this.page.getByText(productName).first().isVisible();
  }

  /**
   * Va jusqu'au checkout, remplit le formulaire de paiement et valide
   * la commande pour le pays donné.
   */
  async checkout(country: string) {
    await this.checkoutLink.click();
    await this.countryInput.pressSequentially(country, { delay: 150 });
    await this.page.getByRole('button', { name: 'India' }).nth(1).click();

    // CVV : même structure que "Name on Card", pas de vrai placeholder HTML
    await this.page
      .locator('.field')
      .filter({ hasText: 'CVV Code' })
      .locator('input')
      .fill('123');

    // Name on Card : idem
    await this.page
      .locator('.field')
      .filter({ hasText: 'Name on Card' })
      .locator('input')
      .fill('Imouna Aissaoui');

    await this.placeOrderButton.click();
  }

  async isOrderConfirmed(): Promise<boolean> {
  try {
    await this.confirmationMessage.waitFor({ state: 'visible', timeout: 10000 });
    return true;
  } catch {
    return false;
  }
}}