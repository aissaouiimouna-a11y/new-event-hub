import { Page, Locator } from '@playwright/test';

/**
 * Page Object pour le catalogue de produits (dashboard) de l'application client.
 */
export class ProductsPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly cartIconLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.card-body');
    this.cartIconLink = page.locator('[routerlink="/dashboard/cart"]');
  }

  /** Attend que la liste de produits soit chargée avant toute interaction. */
  async waitForProductsToLoad() {
    await this.page.locator('.card-body b').first().waitFor();
  }

  /** Utile pour du debug ou des assertions sur le catalogue affiché. */
  async getProductTitles(): Promise<string[]> {
    return this.page.locator('.card-body b').allTextContents();
  }

  async addToCart(productName: string) {
    await this.productCards
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add To Cart' })
      .click();
  }

  async goToCart() {
    await this.cartIconLink.click();
  }
}