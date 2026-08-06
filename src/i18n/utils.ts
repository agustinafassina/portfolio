import { getRelativeLocaleUrl } from 'astro:i18n';
import { locales, defaultLocale, ui, type Locale, type UIKey } from './ui';

export function isLocale(value: string | undefined): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function useTranslations(lang: Locale) {
  const dictionary = ui[lang];
  return function t(key: UIKey): string {
    return dictionary[key];
  };
}

export function getLangFromUrl(url: URL): Locale {
  const segment = url.pathname.split('/').filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

export function localizedPath(lang: Locale, path = ''): string {
  return getRelativeLocaleUrl(lang, path.replace(/^\/+/, ''));
}

export function switchLocalePath(url: URL, target: Locale): string {
  const segments = url.pathname.split('/').filter(Boolean);
  if (isLocale(segments[0])) {
    segments.shift();
  }
  return localizedPath(target, segments.join('/'));
}

export function localeStaticPaths() {
  return locales.map((lang) => ({ params: { lang }, props: { lang } }));
}
