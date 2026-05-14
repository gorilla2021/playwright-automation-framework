import { test, expect } from '../../src/fixtures/fixtures';
import { Users, ErrorMessages } from '../../src/utils/TestData';

test.describe('Login Page', () => {
  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('should display the login page correctly', async ({ loginPage }) => {
    await loginPage.assertLoginPageLoaded();
  });

  test('should show error when username is missing', async ({ loginPage }) => {
    await loginPage.login('', Users.STANDARD.password);
    await loginPage.assertErrorMessage(ErrorMessages.MISSING_USERNAME);
  });

  test('should show error when password is missing', async ({ loginPage }) => {
    await loginPage.login(Users.STANDARD.username, '');
    await loginPage.assertErrorMessage(ErrorMessages.MISSING_PASSWORD);
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    await loginPage.loginAsLockedUser();
    await loginPage.assertErrorMessage(ErrorMessages.LOCKED_USER);
  });

  test('should not expose password in the URL', async ({ loginPage, page }) => {
    await loginPage.loginAsStandardUser();
    expect(page.url()).not.toContain(Users.STANDARD.password);
  });
});
