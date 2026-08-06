import type { Locale } from '../i18n/ui';
import { READING_WPM } from './consts';

const dateLocales: Record<Locale, string> = {
  en: 'en-GB',
  es: 'es-AR',
  it: 'it-IT',
};

export function formatDate(date: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function readingTime(body: string, lang: Locale): string {
  const words = body.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / READING_WPM));
  const unit = { en: 'min read', es: 'min de lectura', it: 'min di lettura' };
  return `${minutes} ${unit[lang]}`;
}
