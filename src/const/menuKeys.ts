export const MenuKeys = {
  Main: 'Main',
  WalletSelect: 'WalletSelect',
  WalletSelectMore: 'WalletSelectMore',
  Wallet: 'Wallet',
  Chains: 'Chains',
  Devs: 'Devs',
  Language: 'Language',
  EcosystemSelect: 'EcosystemSelect',
  Theme: 'Theme',
  None: 'None',
};

export enum MenuKeysEnum {
  Main = 'Main',
  WalletSelect = 'WalletSelect',
  WalletSelectMore = 'WalletSelectMore',
  Wallet = 'Wallet',
  Chains = 'Chains',
  Devs = 'Devs',
  Language = 'Language',
  EcosystemSelect = 'EcosystemSelect',
  Theme = 'Theme',
  None = 'None',
}

type MenuMainKeys =
  | MenuKeysEnum.Main
  | MenuKeysEnum.Chains
  | MenuKeysEnum.Wallet
  | MenuKeysEnum.WalletSelect
  | MenuKeysEnum.EcosystemSelect;
type MenuSubKeys = Exclude<MenuKeysEnum, MenuMainKeys>;

type MenuMainType = {
  [key in MenuMainKeys]: MenuKeysEnum;
};

type MenuSubType = {
  [key in MenuSubKeys]: MenuKeysEnum;
};

export const MenuMain: MenuMainType = {
  [MenuKeysEnum.Main]: MenuKeysEnum.Main,
  [MenuKeysEnum.Chains]: MenuKeysEnum.Chains,
  [MenuKeysEnum.Wallet]: MenuKeysEnum.Wallet,
  [MenuKeysEnum.EcosystemSelect]: MenuKeysEnum.EcosystemSelect,
  [MenuKeysEnum.WalletSelect]: MenuKeysEnum.WalletSelect,
};

export const MenuSub: MenuSubType = {
  [MenuKeysEnum.Devs]: MenuKeysEnum.Devs,
  [MenuKeysEnum.Language]: MenuKeysEnum.Language,
  [MenuKeysEnum.WalletSelectMore]: MenuKeysEnum.WalletSelectMore,
  [MenuKeysEnum.None]: MenuKeysEnum.None,
  [MenuKeysEnum.Theme]: MenuKeysEnum.Theme,
};
