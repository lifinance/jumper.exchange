import { locales } from '@/i18n/i18next-locales';

export const replacePathInUrl = (currentPath: string, newPath: string) => {
  const urlParts = currentPath.split('/');
  const localeIndex = 1; // The index of the locale in the URL
  const slicedUrl = urlParts.slice(0, localeIndex + 1);
  const currentLocale = urlParts[localeIndex];
  let output;
  if (locales.includes(currentLocale)) {
    output = [...slicedUrl, newPath];
    // Replace the existing locale with the new one or remove it if the new locale is the default one
  } else {
    // If the URL doesn't contain a locale or it contains an unsupported locale, insert the new locale at the correct position
    output = [newPath];
  }
  // Join the cleaned URL parts back together, trim any trailing slashes, and remove any leading slashes
  let updatedUrl = output.join('/');
  updatedUrl = updatedUrl.replace(/\/+$/, ''); // Remove trailing slashes
  updatedUrl = updatedUrl.replace(/^\/+/, ''); // Remove leading slashes

  // Update the URL using window.history.replaceState()
  window.history.replaceState(null, '', updatedUrl);

  return updatedUrl;
};
