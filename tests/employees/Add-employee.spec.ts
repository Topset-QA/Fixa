import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('should add a new employee manually', async ({ page }) => {
  // Login
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('tafara@fixarwanda.com', '0784526338Mit2@');

  // Navigate to employee list
  await page.goto('https://app.staging.fixahr.com/employees?page=1&perPage=10');
  await expect(page).toHaveURL(/\/employees/);

  // Close chat widget if visible
  const chatWidget = page.locator("(//button[@title='Chat widget']//div)[2]");
  if (await chatWidget.isVisible()) {
    await chatWidget.click({ force: true });
  }

  // Start Add Employee flow
  await page.getByText('Add Employee', { exact: true }).click();
  await expect(page).toHaveURL('https://app.staging.fixahr.com/employees/add');

  // Select employee type
  await page.getByText('Casual(Contract-Test)', { exact: true }).click();
  await page.locator('button[data-slot="button"]').click();

  // Choose manual entry
  await page.locator('//h6[normalize-space(text())="Add Employee Manually"]').click();

  // Fill employee details
  await page.fill('input[name="idNumber"]', '1234567890123456');
  await page.fill('input[name="firstName"]', 'Ayobami');
  await page.fill('input[name="lastName"]', 'Tester');
  await page.fill('input[name="phoneNumber"]', '08012345');

  // Select gender
  await page.locator('button[role="combobox"]').click();
  await page.getByText('Female', { exact: true }).click();

  // Wait for warning to disappear before submitting
  await page.waitForSelector('p.text-xs.text-orange-500', { state: 'detached' });

  // Submit form
  await page.locator('button[type="submit"]').click();

  // Confirm redirection or success
  await expect(page).toHaveURL(/\/employees/);
});
