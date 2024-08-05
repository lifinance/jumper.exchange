import { locales } from '@/i18n/i18next-locales';
import { fallbackLng } from '@/i18n/i18next-settings';

export const replaceLocaleInUrl = (currentPath: string, newLocale: string) => {
  const urlParts = currentPath.split('/');
  const localeIndex = 1; // The index of the locale in the URL

  // Check if the URL contains a locale
  const currentLocale = urlParts[localeIndex];
  if (locales.includes(currentLocale)) {
    // Replace the existing locale with the new one or remove it if the new locale is the default one
    urlParts[localeIndex] = newLocale === fallbackLng ? '' : newLocale;
  } else if (newLocale !== fallbackLng) {
    // If the URL doesn't contain a locale or it contains an unsupported locale, insert the new locale at the correct position
    urlParts.splice(localeIndex, 0, newLocale);
  }

  // Remove any empty or duplicated locale segments
  const cleanedUrlParts = urlParts.filter(
    (part, index) => index === 1 || !locales.includes(part),
  );

  // Join the cleaned URL parts back together, trim any trailing slashes, and remove any leading slashes
  let updatedUrl = cleanedUrlParts.join('/');
  updatedUrl = updatedUrl.replace(/\/+$/, ''); // Remove trailing slashes
  updatedUrl = updatedUrl.replace(/^\/+/, ''); // Remove leading slashes

  // Ensure the URL ends with a single slash
  if (!updatedUrl.endsWith('/')) {
    updatedUrl += '/';
  }

  // Update the URL using window.history.replaceState()
  const relativePath = `/${updatedUrl}`;
  window.history.replaceState(null, '', relativePath);

  return updatedUrl;
};
