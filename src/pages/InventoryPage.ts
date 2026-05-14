import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private readonly pageTitle      = this.page.locator('.title');
  private readonly inventoryList  = this.page.locator('.inventory_list');
  private readonly inventoryItems = this.page.locator('.inventory_item');
  private readonly sortDropdown   = this.page.locator('[data-test="product-sort-container"]');
  private readonly cartBadge      = this.page.locator('.shopping_cart_badge');
  private readonly cartIcon       = this.page.locator('.shopping_cart_link');
  private readonly burgerMenu     = this.page.locator('#react-burger-menu-btn');
  private readonly logoutLink     = this.page.locator('#logout_sidebar_link');

  constructor(page: Page) {
    super(page);
  }

  async addItemToCart(productName: string) {
    const itemCard = this.page.locator('.inventory_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName })
    });
    await itemCard.locator('button').click();
  }

  async removeItemFromCart(productName: string) {
    const itemCard = this.page.locator('.inventory_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName })
    });
    await itemCard.locator('button').click();
  }

  async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.clickElement(this.cartIcon);
  }

  async logout() {
    await this.clickElement(this.burgerMenu);
    await this.clickElement(this.logoutLink);
  }

  async getCartCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? '0', 10);
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getAllPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async assertOnInventoryPage() {
    await this.assertVisible(this.inventoryList);
    await this.assertText(this.pageTitle, 'Products');
    await this.assertURL('/inventory.html');
  }

  async assertCartCount(expectedCount: number) {
    if (expectedCount === 0) {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(String(expectedCount));
    }
  }

  async assertSortedByPriceLowToHigh() {
    const prices = await this.getAllPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }

  async assertSortedAZ() {
    const names = await this.getAllProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  }
}
