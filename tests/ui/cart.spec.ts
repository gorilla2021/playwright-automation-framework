import { test, expect } from '../../src/fixtures/fixtures';
import { CartPage }      from '../../src/pages/CartPage';
import { Products }      from '../../src/utils/TestData';

test.describe('Shopping Cart', () => {
  test('should show added items in cart', async ({ loggedInPage, page }) => {
    await loggedInPage.addItemToCart(Products.BACKPACK);
    await loggedInPage.addItemToCart(Products.BIKE_LIGHT);
    await loggedInPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.assertOnCartPage();
    await cartPage.assertItemInCart(Products.BACKPACK);
    await cartPage.assertItemInCart(Products.BIKE_LIGHT);
    await cartPage.assertCartHasItems(2);
  });

  test('should be empty when no items added', async ({ loggedInPage, page }) => {
    await loggedInPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.assertCartIsEmpty();
  });

  test('should allow removing items from the cart', async ({ loggedInPage, page }) => {
    await loggedInPage.addItemToCart(Products.BACKPACK);
    await loggedInPage.addItemToCart(Products.BIKE_LIGHT);
    await loggedInPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.removeItem(Products.BACKPACK);
    await cartPage.assertCartHasItems(1);
    await cartPage.assertItemInCart(Products.BIKE_LIGHT);
  });

  test('should navigate to checkout from cart', async ({ loggedInPage, page }) => {
    await loggedInPage.addItemToCart(Products.BACKPACK);
    await loggedInPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('full E2E: add, verify, remove, verify updated cart', async ({ loggedInPage, page }) => {
    await loggedInPage.addItemToCart(Products.BACKPACK);
    await loggedInPage.addItemToCart(Products.BIKE_LIGHT);
    await loggedInPage.addItemToCart(Products.ONESIE);
    await loggedInPage.assertCartCount(3);
    await loggedInPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.assertCartHasItems(3);
    await cartPage.removeItem(Products.BIKE_LIGHT);
    await cartPage.assertCartHasItems(2);
    await cartPage.assertItemInCart(Products.BACKPACK);
    await cartPage.assertItemInCart(Products.ONESIE);
  });
});
