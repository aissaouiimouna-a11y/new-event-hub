import { test, expect } from '@playwright/test';
import { ClientLoginPage } from '../pages/ClientLoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('@webtest clientapp login', () => {
  test('ajoute un produit au panier et passe la commande', async ({ page }) => {
    const email = 'aissaouiimouna@gmail.com';
    const password = 'Taissaoui123';
    const productName = 'ZARA COAT 3';

    const loginPage = new ClientLoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(email, password);

    await productsPage.waitForProductsToLoad();
    console.log(await productsPage.getProductTitles());

    await productsPage.addToCart(productName);
    await productsPage.goToCart();

    await cartPage.waitForItems();
    expect(await cartPage.isProductInCart(productName)).toBeTruthy();

    await cartPage.checkout('ind');
    expect(await cartPage.isOrderConfirmed()).toBeTruthy();
  });
});