export const UTM_SOURCE = 'jumper';

/*
  Name of an action that a user makes on the site. 
  GA: in GA this is the name of the event that is fired
*/
export enum TrackingAction {
  // WalletMenu
  ConnectWallet = 'action_connect_wallet',
  CopyAddressToClipboard = 'action_copy_addr_to_clipboard',
  DisconnectWallet = 'action_disconnect_wallet',
  OpenBlockchainExplorer = 'action_open_blockchain_explorer',
  SwitchChain = 'action_switch_chain',

  // Widget
  OnRouteExecutionStarted = 'action_on_route_exec_started',
  OnRouteExecutionCompleted = 'action_on_route_exec_completed',
  OnRouteExecutionFailed = 'action_on_route_exec_failed',
  OnRouteExecutionUpdated = 'action_on_route_exec_updated',
  OnRouteHighValueLoss = 'action_on_route_high_value_loss',
  OnSourceChainAndTokenSelection = 'action_on_source_selection',
  OnDestinationChainAndTokenSelection = 'action_on_destination_selection',
  OnWidgetExpanded = 'action_on_widget_expanded',
  OnAvailableRoutes = 'action_available_routes',

  // Welcome_Screen
  ShowWelcomeMessageScreen = 'action_show_welcome_screen',
  CloseWelcomeScreen = 'action_close_welcome_screen',
  OpenToolModal = 'action_open_stats_modal',
  OpenWelcomeMessageLink = 'action_open_welcome_message_link',

  // Feature Card
  ClickFeatureCard = 'action_click_feature_card',
  CloseFeatureCard = 'action_close_feature_card',
  DisplayFeatureCard = 'action_display_feature_card',

  // Menu
  OpenMenu = 'action_open_submenu',
  PageLoad = 'action_pageload',
  SwitchLanguage = 'action_switch_language',
  SwitchTab = 'action_switch_tab',
  SwitchTheme = 'action_switch_theme',
  SwitchThemeTemplate = 'action_switch_theme_template',
  DownloadBrandAssets = 'action_dl_brand_assets',
  ClickConnectToWidget = 'action_click_connect_to_jumper',
  ClickXLink = 'action_click_x_link',
  ClickDiscordLink = 'action_click_discord_link',
  ClickJumperLearnLink = 'action_click_jumper_learn_link',
  ClickJumperProfileLink = 'action_click_jumper_profile_link',
  ClickLifiExplorerLink = 'action_click_lifi_explorer_link',

  // Blog
  SeeAllPosts = 'action_see_all_posts',
  ClickArticleCard = 'action_click_article_card',
  ClickFeaturedArticle = 'action_click_featured_article',
  ClickBlogCTA = 'action_click_blog_cta',
  SwipeCarousel = 'action_swipe_carousel',
  ClickShareArticleFB = 'action_share_article_fb',
  ClickShareArticleLinkedIn = 'action_share_article_linked',
  ClickShareArticleX = 'action_share_article_x',
  ClickShareArticleLink = 'action_share_article_link',

  // Pagination
  ClickPagination = 'action_click_pagination',

  // Discord
  JoinDiscordCommunity = 'action_join_discord_community',

  PoweredBy = 'action_click_powered_by',
}

export enum TrackingCategory {
  MainMenu = 'cat_main_menu',
  Menu = 'cat_menu',
  FeatureCard = 'cat_feature_card',
  Navigation = 'cat_navigation',
  LanguageMenu = 'cat_language_menu',
  ThemesMenu = 'cat_themes_menu',
  SubMenu = 'cat_submenu',
  ThemeSection = 'cat_theme_section',
  DiscordBanner = 'cat_discord_banner',
  Wallet = 'cat_wallet',
  WalletMenu = 'cat_wallet_menu',
  WalletSelectMenu = 'cat_wallet_select_menu',
  WelcomeScreen = 'cat_welcome_screen',
  Widget = 'cat_widget',
  WidgetEvent = 'cat_widget_event',
  PoweredBy = 'cat_powered_by',
  BlogCarousel = 'cat_blog_carousel',
  BlogFeaturedArticle = 'cat_blog_featured_article',
  BlogArticlesBoard = 'cat_blog_articles_board',
  BlogArticle = 'cat_blog_article',
}

// can be used as custom dimensions / metrics
export enum TrackingEventParameter {
  FeatureCardTitle = 'param_feature_card_title',
  FeatureCardId = 'param_feature_card_id',
  Tab = 'param_tab',
  PrevMenu = 'param_prev_menu',
  ChainId = 'param_chain_id',
  ChainName = 'param_chain_name',
  ChainIdAdded = 'param_chain_added',
  Menu = 'param_menu',
  ToolModal = 'param_stats_modal',
  WelcomeMessageLink = 'param_welcome_message_link',
  SwitchedChain = 'param_switched_chain',
  SwitchedTheme = 'param_switched_theme',
  SwitchedTemplate = 'param_switched_template',
  SwitchedLanguage = 'param_switched_language',
  AddedTokenAddress = 'param_added_token_address',
  AddedTokenName = 'param_added_token_name',
  Wallet = 'param_wallet',
  Ecosystem = 'param_ecosystem',

  // Widget:
  SourceChainSelection = 'param_source_chain',
  SourceTokenSelection = 'param_source_token',
  DestinationChainSelection = 'param_destination_chain',
  DestinationTokenSelection = 'param_destination_token',

  // Transaction:
  RouteId = 'param_route_id',
  FromToken = 'param_from_token',
  FromChainId = 'param_from_chain_id',
  ToToken = 'param_to_token',
  Timestamp = 'param_timestamp',
  Status = 'param_status',
  Error = 'param_error',
  Message = 'param_message',
  GasCostUSD = 'param_gas_cost_usd',
  TxHash = 'param_tx_hash',
  TxLink = 'param_tx_link',
  ToChainId = 'param_to_chain_id',
  FromAmount = 'param_from_amount',
  ToAmount = 'param_to_amount',
  ToAmountUSD = 'param_to_amount_usd',
  ToAmountMin = 'param_to_amount_min',
  FromAmountUSD = 'param_from_amount_usd',
  Variant = 'param_variant',
  Type = 'param_type',
  ErrorCode = 'param_error_code',
  ErrorMessage = 'param_error_message',
  InsuranceState = 'param_insurance_state',
  InsuranceFeeAmountUSD = 'param_insurance_fee_amount_usd',
  ValueLoss = 'param_value_loss',
  AvailableRoutesCount = 'param_available_routes_count',

  // Blog
  ArticleCardTitle = 'param_article_card_title',
  ArticleCardId = 'param_article_card_id',
  SwipeDirection = 'param_swipe_direction',
  ArticleTitle = 'param_article_title',
  ArticleID = 'param_article_id',

  // Pagination
  Pagination = 'param_pagination',
  PaginationCat = 'param_pagination_cat',
}
