import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.locator('[data-test="username"]');
  private readonly passwordInput = this.page.locator('[data-test="password"]');
  private readonly loginButton   = this.page.locator('[data-test="login-button"]');
  private readonly errorMessage  = this.page.locator('[data-test="error"]');
  private readonly loginLogo     = this.page.locator('.login_logo');

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string) {
    await this.fillField(this.usernameInput, username);
    await this.fillField(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async loginAsStandardUser() {
    await this.login('standard_user', 'secret_sauce');
  }

  async loginAsLockedUser() {
    await this.login('locked_out_user', 'secret_sauce');
  }

  async assertLoginPageLoaded() {
    await this.assertVisible(this.loginLogo);
    await this.assertVisible(this.loginButton);
  }

  async assertErrorMessage(expectedText: string) {
    await this.assertVisible(this.errorMessage);
    await this.assertText(this.errorMessage, expectedText);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
}
