import type { SitemapPage } from '@/types/sitemap';

export const JUMPER_URL = 'https://jumper.exchange';
export const LIFI_URL = 'https://li.fi';
export const EXPLORER_URL = 'https://explorer.li.fi';
export const DISCORD_URL = 'https://discord.gg/lifi';
export const X_URL = 'https://x.com/JumperExchange';
export const GITHUB_URL = 'https://github.com/lifinance/';
export const DOCS_URL = 'https://docs.li.fi/';
export const AUDITS_URL = 'https://docs.li.fi/smart-contracts/audits';
export const X_SHARE_URL = 'https://x.com/share';
export const FB_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php';
export const LINKEDIN_SHARE_URL = 'https://www.linkedin.com/shareArticle';
export const JUMPER_LEARN_PATH = '/learn';
export const JUMPER_LOYALTY_PATH = '/profile';
export const JUMPER_MEMECOIN_PATH = '/memecoins';
export const JUMPER_BUY_PATH = '/buy';
export const JUMPER_REFUEL_PATH = '/refuel';
export const JUMPER_GAS_PATH = '/gas';
export const JUMPER_EXCHANGE_PATH = '/exchange';
export const JUMPER_SWAP_PATH = '/swap';
export const STRAPI_URL_PATH = 'https://strapi.li.finance';

// prepare sitemap
export const pages: SitemapPage[] = [
  { path: '', priority: 1 },
  { path: JUMPER_LEARN_PATH, priority: 0.9 },
  { path: JUMPER_LOYALTY_PATH, priority: 0.8 },
  { path: JUMPER_BUY_PATH, priority: 0.7 },
  { path: JUMPER_EXCHANGE_PATH, priority: 0.7 },
  { path: JUMPER_SWAP_PATH, priority: 0.7 },
  { path: JUMPER_REFUEL_PATH, priority: 0.7 },
  { path: JUMPER_GAS_PATH, priority: 0.7 },
];
