import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test.describe('Login Flow', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('tafara@fixarwanda.com', '0784526338Mit2@');

    // Assertion for redirection to dashboard
    await expect(page).toHaveURL(/dashboard|employees/);
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('invalid@fixarwanda.com', 'wrongpassword');

    // Assert error message appears
    const error = page.locator('text=Invalid email or password');
    await expect(error).toBeVisible();
  });
});
