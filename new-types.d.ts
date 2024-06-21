/// <reference types="next" />

declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
    DEV: boolean;
    MODE: 'development' | 'production' | 'staging' | 'localhost';
    PROD: boolean;
    SSR: boolean;
    NEXT_PUBLIC_ENVIRONMENT: string;
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_ADDRESSABLE_TID: string;
    NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID: string;
    NEXT_PUBLIC_HOTJAR_ID: number;
    NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION: number;
    SENTRY_AUTH_TOKEN: string;
    NEXT_PUBLIC_CUSTOM_RPCS: string;
    NEXT_PUBLIC_DKEY: string;
    NEXT_PUBLIC_WIDGET_INTEGRATOR: string;
    NEXT_PUBLIC_INTEGRATOR_REFUEL: string;
    NEXT_PUBLIC_INTEGRATOR_MOBILE: string;
    NEXT_PUBLIC_LIFI_API_URL: string;
    NEXT_PUBLIC_ONRAMPER_ENABLED: string;
    NEXT_PUBLIC_ONRAMPER_API_KEY: string;
    NEXT_PUBLIC_STRAPI_DEVELOP: string;
    NEXT_PUBLIC_STRAPI_URL: string;
    NEXT_PUBLIC_STRAPI_API_TOKEN: string;
    NEXT_PRIVATE_STRAPI_LOCAL_URL: string;
    NEXT_PUBLIC_LOCAL_STRAPI_API_TOKEN: string;
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
    NEXT_PUBLIC_GATEWAY_URL: string;
    NEXT_PUBLIC_GATEWAY_API_KEY: string;
    NEXT_PUBLIC_GATEWAY_API_TOKEN: string;
  }
}
