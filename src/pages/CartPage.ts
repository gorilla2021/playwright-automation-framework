import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly pageTitle             = this.page.locator('.title');
  private readonly cartItems             = this.page.locator('.cart_item');
  private readonly checkoutButton        = this.page.locator('[data-test="checkout"]');
  private readonly continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');

  constructor(page: Page) {
    super(page);
  }

  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton);
  }

  async continueShopping() {
    await this.clickElement(this.continueShoppingButton);
  }

  async removeItem(productName: string) {
    const item = this.page.locator('.cart_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName })
    });
    await item.locator('button').click();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async assertOnCartPage() {
    await this.assertVisible(this.checkoutButton);
    await this.assertText(this.pageTitle, 'Your Cart');
    await this.assertURL('/cart.html');
  }

  async assertItemInCart(productName: string) {
    const item = this.page.locator('.cart_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName })
    });
    await expect(item).toBeVisible();
  }

  async assertCartHasItems(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async assertCartIsEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }
}
