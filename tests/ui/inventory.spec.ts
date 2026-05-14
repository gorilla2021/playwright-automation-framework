import { test, expect } from '../../src/fixtures/fixtures';
import { Products, SortOptions } from '../../src/utils/TestData';

test.describe('Inventory Page', () => {
  test('should display the products page after login', async ({ loggedInPage }) => {
    await loggedInPage.assertOnInventoryPage();
  });

  test('should display 6 products on the page', async ({ loggedInPage }) => {
    const count = await loggedInPage.getItemCount();
    expect(count).toBe(6);
  });

  test('should sort products alphabetically A to Z', async ({ loggedInPage }) => {
    await loggedInPage.sortProductsBy(SortOptions.A_TO_Z);
    await loggedInPage.assertSortedAZ();
  });

  test('should sort products by price low to high', async ({ loggedInPage }) => {
    await loggedInPage.sortProductsBy(SortOptions.PRICE_LOW_HIGH);
    await loggedInPage.assertSortedByPriceLowToHigh();
  });

  test('should add one item to cart', async ({ loggedInPage }) => {
    await loggedInPage.addItemToCart(Products.BACKPACK);
    await loggedInPage.assertCartCount(1);
  });

  test('should add multiple items to cart', async ({ loggedInPage }) => {
    await loggedInPage.addItemToCart(Products.BACKPACK);
    await loggedInPage.addItemToCart(Products.BIKE_LIGHT);
    await loggedInPage.assertCartCount(2);
  });

  test('should remove an item from cart', async ({ loggedInPage }) => {
    await loggedInPage.addItemToCart(Products.BACKPACK);
    await loggedInPage.removeItemFromCart(Products.BACKPACK);
    await loggedInPage.assertCartCount(0);
  });

  test('should navigate to cart page', async ({ loggedInPage, page }) => {
    await loggedInPage.goToCart();
    await expect(page).toHaveURL(/cart\.html/);
  });

  test('should logout successfully', async ({ loggedInPage, page }) => {
    await loggedInPage.logout();
    await expect(page).toHaveURL(/\/$/);
  });
});
