import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    viewport: { width: 1280, height: 1420 },
    headless: false,
    baseURL: 'https://app.staging.fixahr.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  }, 
});
