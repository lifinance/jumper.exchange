interface Resources {
  language: {
    language: {
      key: 'Language';
      value: 'English';
    };
  };
  translation: {
    navbar: {
      welcome: {
        title: 'Find the best route';
        subtitle: '<0>4x audited</0> multi-chain liquidity aggregator powered by <1>LI.FI</1>';
        cta: 'Get started';
      };
      poweredByLifi: '<0>Powered by </0><1>LI.FI</1>';
      links: {
        exchange: 'Exchange';
        dashboard: 'Dashboard';
        refuel: 'Gas';
        buy: 'Buy';
      };
      statsCards: {
        dexs: 'DEXs';
        bridges: 'Bridges';
        chains: 'Chains';
      };
      connect: 'Connect';
      walletSelectMenu: {
        connectWallet: 'Connect a wallet';
        wallets: 'Wallets';
        ecosystemSelectMenu: {
          selectEcosystem: 'Select wallet ecosystem';
          noEcosystemAdapter: 'No appropriate ecosystem adapter found';
        };
      };
      seeAllWallets: 'See all wallets';
      navbarMenu: {
        brandAssets: 'Brand Assets';
        theme: 'Theme';
        developers: 'Developers';
        lifiExplorer: 'LI.FI Explorer';
        aboutLIFI: 'About LI.FI';
        support: 'Support';
        profile: 'Profile';
      };
      walletMenu: {
        disconnect: 'Disconnect';
        chains: 'Chains';
        switchChain: 'Switch Chain';
        copy: 'Copy';
        explore: 'Explore';
        copiedMsg: 'Wallet address copied';
        walletNotInstalled: '{{wallet}} is not installed';
        connectAnotherWallet: 'Connect another wallet';
      };
      themes: {
        switchToLight: 'Switch to Light Theme';
        switchToDark: 'Switch to Dark Theme';
        switchToSystem: 'Switch to System';
      };
      developers: {
        github: 'GitHub';
        documentation: 'Documentation';
      };
    };
    alert: {
      info: 'You’re using Testnet';
      testnet: 'Any transactions or actions performed on the Testnet will not be reflected on the Mainnet.';
      switchToMainnet: 'Switch to Mainnet';
    };
    discordBanner: {
      ctaHeadline: 'Join our Discord to learn more';
      ctaButton: 'Join our Discord';
    };
    blog: {
      title: 'Tips and tutorials';
      categories: 'Categories';
      allCategories: 'All';
      subtitle: 'TL;DR step-by-step guides to DeFi and crypto for all levels';
      minRead: '{{minRead}} min read';
      seeAllPosts: 'See all posts';
      recentPosts: 'Recent Posts';
      similarPosts: 'Similar Posts';
      goToArticle: 'Go to article';
      openApp: 'Open app';
      faq: 'FAQ';
      jumperCta: 'Try jumper.exchange';
      copiedLink: 'Copied Link';
      shareLinkedIn: 'Share article on LinkedIn';
      shareFb: 'Share article on Facebook';
      shareX: 'Share article on X';
      shareLink: 'Share the link';
    };
    solanaAlert: {
      title: 'Limited Solana token support';
      subtitle: 'Currently only USDC and USDT can be bridged to and from Solana.';
    };
    featureCard: {
      learnMore: 'Learn more';
    };
    button: {
      okay: 'Okay';
    };
    error: {
      message: 'Something went wrong. Please try reloading the page. If the problem persists, contact our support.';
    };
    multisig: {
      connected: {
        title: 'Multisig wallet connected';
        description: 'Please notify other wallet participants to be ready to sign.';
      };
      transactionInitiated: {
        title: 'Multiple signatures required';
        description: 'Please notify other multisig wallet participants to sign before the transaction expires.';
      };
      alert: {
        title: 'Multisig wallet connected';
        description: 'Destination wallet address is required to complete the exchange.';
      };
    };
    questCard: {
      completed: 'Completed';
      join: 'Join';
    };
    missions: {
      available: 'Available Missions';
      completed: 'Completed Missions';
    };
    profile_page: {
      mobileTitle: 'Only available on Desktop';
      mobileDescription: 'The Profile page is not available on small screens yet. We are working on it.';
    };
  };
}

export default Resources;
