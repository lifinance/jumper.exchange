import { defineWalletSetup } from '@synthetixio/synpress';
import { MetaMask, getExtensionId } from '@synthetixio/synpress';
import 'dotenv/config';

export const SEED_PHRASE =
  'test test test test test test test test test test test junk';
export const PASSWORD = 'Testing1234!';

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  // This is a workaround for the fact that the MetaMask extension ID changes.
  // This workaround won't be needed in the near future! 😁
  const extensionId = await getExtensionId(context, 'MetaMask');

  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);

  await metamask.importWallet(SEED_PHRASE);

  const page = await context.newPage();

  // Go to a locally hosted MetaMask Test Dapp.
  // await page.goto('/');

  // await page.locator('#connect-wallet-button').click();
  // await page
  //   .locator(
  //     'xpath=(//li[contains(@class,"MuiButtonBase-root MuiMenuItem-root")]/following-sibling::li)[3]',
  //   )
  //   .click();
  // await page.locator('xpath=(//button[@type="button"])[2]').click();

  // await metamask.connectToDapp(['Account 1']);
});
