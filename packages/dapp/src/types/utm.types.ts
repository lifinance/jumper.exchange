type UtmMedium =
  | 'feature_card'
  | 'welcome_screen'
  | 'menu'
  | 'testnet_banner'
  | 'powered_by';

type UtmCampaign =
  | 'jumper_to_lifi'
  | 'jumper_to_docs'
  | 'jumper_to_explorer'
  | 'testnet_to_jumper';

export interface UtmParams {
  utm_medium?: UtmMedium;
  utm_campaign?: UtmCampaign;
  utm_term?: string;
  utm_content?: string;
}
