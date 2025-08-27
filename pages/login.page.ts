import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://app.staging.fixahr.com/login');
  }

  async login(username: string, password: string) {
    //login
    await this.page.fill('input[name="email"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
    await this.page.waitForURL('**/onboarding');
  }
}
