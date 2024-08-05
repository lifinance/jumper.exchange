import { expect, test } from '@playwright/test';
import {
  findTheBestRoute,
  itemInMenu,
  openMainMenu,
} from './testData/commonFunctions';

test.describe('Jumper full e2e flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to the homepage and change tabs', async ({ page }) => {
    const buyETHButton = page
      .frameLocator('iframe[title="Onramper widget"]')
      .locator('button:has-text("Buy ETH")');
    // await closeWelcomeScreen(page);
    await page.getByRole('tab', { name: 'Exchange' }).click();
    await expect(
      page.locator('[id="widget-header-\\:r0\\:"]').getByText('Exchange'),
    ).toBeVisible();
    await page.getByRole('tab', { name: 'Gas' }).click();
    await expect(page.locator('#tab-Gas-1')).toBeVisible();
    await page.getByRole('tab', { name: 'Buy' }).click();
    await expect(buyETHButton).toBeEnabled();
    await expect(
      page
        .frameLocator('iframe[title="Onramper widget"]')
        .getByText('Buy crypto'),
    ).toBeVisible();
  });

  test.skip('should handle welcome screen', async ({ page }) => {
    const headerText = 'Find the best route';
    await findTheBestRoute(page);
    expect(headerText).toBe('Find the best route');
    await page.locator('#get-started-button').click();
    const connectWalletButton = page.locator(
      'xpath=(//button[text()="Connect wallet"])[1]',
    );
    await expect(connectWalletButton).toBeVisible();
  });

  test.skip('should show again welcome screen when clicking jumper logo', async ({
    page,
  }) => {
    const headerText = 'Find the best route';
    await findTheBestRoute(page);
    expect(headerText).toBe('Find the best route');
    await page.locator('#get-started-button').click();
    await page.locator('#jumper-logo').click();
    expect(headerText).toBe('Find the best route');
  });

  test('should be able to open menu and click away to close it', async ({
    page,
  }) => {
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await expect(page.getByRole('menuitem')).toHaveCount(11);
    await page.locator('body').click();
    await expect(page.getByRole('menu')).not.toBeVisible();
  });

  test('should be able to navigate to profile', async ({ page }) => {
    let profileUrl = `${await page.url()}profile/`;
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await itemInMenu(page, 'Jumper Profile');
    expect(await page.url()).toBe(profileUrl);
    await page.locator('.profile-page').isVisible({ timeout: 15000 });
  });

  test('should be able to navigate to jumper learn', async ({ page }) => {
    let learnUrl = `${await page.url()}learn/`;
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await itemInMenu(page, 'Jumper Learn');

    expect(await page.url()).toBe(learnUrl);
    await page.waitForLoadState('load', { timeout: 15000 });
    await page.locator('.learn-page').isVisible();
  });

  test('should be able to navigate to Jumper Scan', async ({ page }) => {
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await itemInMenu(page, 'Jumper Scan');
    // const newPage = await page.waitForEvent('popup', { timeout: 15000 });
    expect(page).toHaveURL('http://localhost:3000/scan/');
  });
  test('should be able to navigate to supefest', async ({ page }) => {
    const learnMoreButton = page.locator('#learn-more-button');
    await openMainMenu(page);
    await itemInMenu(page, 'Superfest Festival');
    await expect(learnMoreButton).toBeVisible();
    await expect(page).toHaveURL('http://localhost:3000/superfest/');
  });
  test('should be able to navigate to X', async ({ page, context }) => {
    let xUrl = 'https://x.com/JumperExchange';
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await page.getByRole('link', { name: 'X', exact: true }).click();
    const newPage = await context.waitForEvent('page');
    expect(newPage.url()).toBe(xUrl);
  });
  test('should be able to navigate to Discord', async ({ page, context }) => {
    let discordUrl = 'https://discord.com/invite/jumperexchange';
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await page.getByRole('link', { name: 'Discord' }).click();
    const newPage = await context.waitForEvent('page');
    expect(newPage.url()).toBe(discordUrl);
  });
});
