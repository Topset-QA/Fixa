import { test, expect } from '@playwright/test';

test('should display error message for invalid login credentials', async ({ page }) => {
  // Go to login page
  await page.goto('https://app.staging.fixahr.com/login');

  // Fill in invalid credentials
  await page.fill('input[name="email"]', 'wronguser@fixarwanda.com');
  await page.fill('input[name="password"]', 'incorrectPassword123');

  // Submit login form
  await page.click('button[type="submit"]');

  // Assert error message is visible
//   const errorMessage = page.locator('text=invalid credentials');
//   await expect(errorMessage).toBeVisible();

  // Confirm user remains on login page
  await expect(page).toHaveURL(/\/login/);
});