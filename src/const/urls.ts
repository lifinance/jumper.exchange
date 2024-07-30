import type { SitemapPage } from '@/types/sitemap';

export const JUMPER_URL = 'https://jumper.exchange';
export const EXPLORER_URL = 'https://explorer.li.fi';
export const DISCORD_URL = 'https://discord.gg/jumperexchange';
export const DISCORD_URL_INVITE = 'https://discord.com/invite/jumperexchange';
export const X_URL = 'https://x.com/JumperExchange';
export const GITHUB_URL = 'https://github.com/jumperexchange';
export const DOCS_URL = 'https://docs.li.fi/';
export const AUDITS_URL = 'https://docs.li.fi/smart-contracts/audits';
export const X_SHARE_URL = 'https://x.com/share';
export const FB_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php';
export const LINKEDIN_SHARE_URL = 'https://www.linkedin.com/shareArticle';
export const JUMPER_LEARN_PATH = '/learn';
export const JUMPER_LOYALTY_PATH = '/profile';
export const JUMPER_FEST_PATH = '/superfest';
export const JUMPER_MEMECOIN_PATH = '/memecoins';

// prepare sitemap
export const pages: SitemapPage[] = [
  { path: '', priority: 1 },
  { path: JUMPER_LEARN_PATH, priority: 0.9 },
  { path: JUMPER_LOYALTY_PATH, priority: 0.8 },
  { path: '/buy', priority: 0.7 },
  { path: '/exchange', priority: 0.7 },
  { path: '/swap', priority: 0.7 },
  { path: '/refuel', priority: 0.7 },
  { path: '/gas', priority: 0.7 },
];
