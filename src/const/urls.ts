import type { SitemapPage } from '@/types/sitemap';

export const JUMPER_URL = 'https://jumper.exchange';
export const DISCORD_URL = 'https://discord.gg/jumperexchange';
export const DISCORD_URL_INVITE = 'https://discord.com/invite/jumperexchange';
export const X_URL = 'https://x.com/JumperExchange';
export const GITHUB_URL = 'https://github.com/jumperexchange';
export const X_SHARE_URL = 'https://x.com/share';
export const FB_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php';
export const LINKEDIN_SHARE_URL = 'https://www.linkedin.com/shareArticle';
export const JUMPER_LEARN_PATH = '/learn/';
export const JUMPER_LOYALTY_PATH = '/profile/';
export const JUMPER_SCAN_PATH = '/scan/';
export const JUMPER_TX_PATH = '/tx/';
export const JUMPER_WALLET_PATH = '/wallet/';
export const JUMPER_FEST_PATH = '/superfest/';
export const JUMPER_MEMECOIN_PATH = '/memecoins/';

// jumper api endpoints
export const JUMPER_ANALYTICS_EVENT = '/analytics/event';
export const JUMPER_ANALYTICS_TRANSACTION = '/analytics/transaction';

export const GALXE_ENDPOINT = 'https://graphigo.prd.galaxy.eco/query';

// prepare sitemap
export const pages: SitemapPage[] = [
  { path: '/', priority: 1.0 },
  { path: JUMPER_LEARN_PATH, priority: 0.9 },
  { path: JUMPER_LOYALTY_PATH, priority: 0.8 },
  { path: '/buy/', priority: 0.7 },
  { path: '/gas/', priority: 0.7 },
];
