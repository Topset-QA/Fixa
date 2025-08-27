import { Page } from '@playwright/test';

export class EmployeePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://app.staging.fixahr.com/employees?page=1&perPage=10');
    await this.page.waitForSelector('table');
  }

  async getEmployeeRows() {
    return this.page.locator('table tbody tr');
  }

  }
