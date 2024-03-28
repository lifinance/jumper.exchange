import 'i18next';
import language from './en/language.json';
import translation from './en/translation.json';

const defaultResource = { language, translation };

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: typeof defaultResource;
  }
}
