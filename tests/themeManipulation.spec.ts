import { test, expect } from '@playwright/test';
import { closeWelcomeScreen } from './testData/commonFunctions';

test.describe('Switch between dark and light theme and check background color', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test.use({ colorScheme: 'dark' });
  test('Should able to change color to Dark', async ({ page }) => {
    await closeWelcomeScreen(page);
    await page.locator('#main-burger-menu-button').click();
    await page.locator('xpath=//*[@id="tab-key-1"]').click();
    await page.locator('#main-burger-menu-button').click(); //Close menu
    const backgroundColor = await page.locator('xpath=/html/body/div[1]');
    expect(backgroundColor).toHaveCSS(
      'background-color',
      'rgba(101, 0, 254, 0.1)',
    );
  });

  test.use({ colorScheme: 'light' });
  test('Should able to change color to Light', async ({ page }) => {
    await closeWelcomeScreen(page);
    await page.locator('#main-burger-menu-button').click();
    await page.locator('xpath=//*[@id="tab-key-0"]').click();
    await page.locator('#main-burger-menu-button').click(); // Close menu
    const backgroundColor = await page.locator('xpath=/html/body/div[1]');
    expect(backgroundColor).toHaveCSS(
      'background-color',
      'rgba(101, 0, 254, 0.1)',
    );
  });
});
