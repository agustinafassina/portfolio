import type { Locale } from '../i18n/ui';
import { ogLocales } from '../i18n/ui';
import { siteConfig, socialLinks } from './config';

interface HomeSchemaInput {
  lang: Locale;
  description: string;
}

interface ArticleSchemaInput {
  lang: Locale;
  title: string;
  description: string;
  canonical: string;
  imageUrl: string;
  publishedTime: Date;
  modifiedTime?: Date;
  category?: string;
}

function personId(siteUrl: string): string {
  return `${siteUrl}/#person`;
}

function websiteId(siteUrl: string): string {
  return `${siteUrl}/#website`;
}

function authorPerson(siteUrl: string) {
  return {
    '@type': 'Person',
    '@id': personId(siteUrl),
    name: siteConfig.author,
    url: siteUrl,
    email: siteConfig.email,
    sameAs: socialLinks.map((link) => link.url),
  };
}

export function buildHomeJsonLd({ lang, description }: HomeSchemaInput) {
  const siteUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      authorPerson(siteUrl),
      {
        '@type': 'WebSite',
        '@id': websiteId(siteUrl),
        name: siteConfig.name,
        url: siteUrl,
        description,
        inLanguage: ogLocales[lang],
        author: { '@id': personId(siteUrl) },
      },
    ],
  };
}

export function buildArticleJsonLd({
  lang,
  title,
  description,
  canonical,
  imageUrl,
  publishedTime,
  modifiedTime,
  category,
}: ArticleSchemaInput) {
  const siteUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: [imageUrl],
    datePublished: publishedTime.toISOString(),
    dateModified: (modifiedTime ?? publishedTime).toISOString(),
    inLanguage: ogLocales[lang],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    author: authorPerson(siteUrl),
    publisher: {
      '@type': 'Person',
      name: siteConfig.author,
      url: siteUrl,
    },
    ...(category ? { articleSection: category } : {}),
  };
}

export function isHomePath(pathname: string): boolean {
  return pathname === '/' || /^\/(en|es|it)\/?$/.test(pathname);
}
