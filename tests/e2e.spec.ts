import { expect, test } from '@playwright/test';
import {
  findTheBestRoute,
  itemInMenu,
  tabInHeader,
  openMainMenu,
} from './testData/commonFunctions';

test.describe('Jumper full e2e flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Should navigate to the homepage and change tabs', async ({ page }) => {
    const buyETHButton = page
      .frameLocator('iframe[title="Onramper widget"]')
      .locator('button:has-text("Buy ETH")');
    // await closeWelcomeScreen(page);
    const featureCard = page.locator(
      'xpath=//div[@class="MuiBox-root mui-1393eub"]',
    );
    await tabInHeader(page, 'Exchange');
    await expect(
      page.locator('[id="widget-header-\\:r0\\:"]').getByText('Exchange'),
    ).toBeVisible();
    await tabInHeader(page, 'Gas');
    await expect(page.locator('#tab-Gas-1')).toBeVisible();
    await tabInHeader(page, 'Buy');
    await expect(buyETHButton).toBeEnabled();
    await expect(
      page
        .frameLocator('iframe[title="Onramper widget"]')
        .getByText('Buy crypto'),
    ).toBeVisible();
    await expect(featureCard).toBeVisible();
  });

  test.skip('Should handle welcome screen', async ({ page }) => {
    const headerText = 'Find the best route';
    await findTheBestRoute(page);
    expect(headerText).toBe('Find the best route');
    await page.locator('#get-started-button').click();
    const connectWalletButton = page.locator(
      'xpath=(//button[text()="Connect wallet"])[1]',
    );
    await expect(connectWalletButton).toBeVisible();
  });

  test.skip('Should show again welcome screen when clicking jumper logo', async ({
    page,
  }) => {
    const headerText = 'Find the best route';
    await findTheBestRoute(page);
    expect(headerText).toBe('Find the best route');
    await page.locator('#get-started-button').click();
    await page.locator('#jumper-logo').click();
    expect(headerText).toBe('Find the best route');
  });

  test('Should be able to open menu and click away to close it', async ({
    page,
  }) => {
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await expect(page.getByRole('menuitem')).toHaveCount(11);
    await page.locator('body').click();
    await expect(page.getByRole('menu')).not.toBeVisible();
  });

  test('Should be able to navigate to profile', async ({ page }) => {
    let profileUrl = `${await page.url()}profile/`;
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await itemInMenu(page, 'Jumper Profile');
    expect(await page.url()).toBe(profileUrl);
    await page.locator('.profile-page').isVisible({ timeout: 15000 });
  });

  test('Should be able to navigate to jumper learn', async ({ page }) => {
    let learnUrl = `${await page.url()}learn/`;
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await itemInMenu(page, 'Jumper Learn');

    expect(await page.url()).toBe(learnUrl);
    await page.waitForLoadState('load', { timeout: 15000 });
    await page.locator('.learn-page').isVisible();
  });

  test('Should be able to navigate to lifi explorer', async ({ page }) => {
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

  test('Should be able to navigate to X', async ({ page, context }) => {
    let xUrl = 'https://x.com/JumperExchange';
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await page.getByRole('link', { name: 'X', exact: true }).click();
    const newPage = await context.waitForEvent('page');
    expect(newPage.url()).toBe(xUrl);
  });
  test('Should be able to navigate to Discord', async ({ page, context }) => {
    let discordUrl = 'https://discord.com/invite/jumperexchange';
    // await closeWelcomeScreen(page);
    await openMainMenu(page);
    await expect(page.getByRole('menu')).toBeVisible();
    await page.getByRole('link', { name: 'Discord' }).click();
    const newPage = await context.waitForEvent('page');
    expect(newPage.url()).toBe(discordUrl);
  });
  test('API test - Feature Cards', async ({ request }) => {
    const apiURL = 'https://strapi.li.finance/api/feature-cards';
    const bearerToken =
      'Bearer 2350647febb39fe14dea85ee80e0f90384266c8dce548cf7d1d8190159b6b820fd1fbab76603abb7724293f76bf42b0f02b4a12f599eec0d0fcd1519d767ccb0a37380142e0223d7272c488f31614976a84ed424050516081b73b68776dcdaa265f6a200dca33c9d8b85840913b9a54053c6fb2cc8203bb3b0eea6c705f1b2b0';
    const response = await request.get(apiURL, {
      headers: {
        Authorization: bearerToken,
      },
      params: {
        'populate[BackgroundImageLight]': '*',
        'populate[BackgroundImageDark]': '*',
        'populate[featureCardsExclusions][fields][0]': 'uid',
        'filters[PersonalizedFeatureCard][%24nei]': 'false',
        'filters[minlevel][%24lte]': '4',
        'filters[maxLevel][%24gte]': '4',
      },
    });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('meta');
    expect(responseBody.meta).toHaveProperty('pagination');
    expect(responseBody.meta.pagination).toMatchObject({
      pageSize: 25,
    });
  });
});
