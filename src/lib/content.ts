import { getCollection, type CollectionEntry } from 'astro:content';
import { HOME_FEATURED_PROJECTS_LIMIT } from './consts';
import { defaultLocale, locales, type Locale } from '../i18n/ui';
import { localizedPath } from '../i18n/utils';

type BlogEntry = CollectionEntry<'blog'>;
type ProjectEntry = CollectionEntry<'projects'>;
type TravelEntry = CollectionEntry<'travels'>;

export interface ResolvedPost {
  entry: BlogEntry;
  translationKey: string;
  slug: string;
  href: string;
  isFallback: boolean;
}

export interface ResolvedProject {
  entry: ProjectEntry;
  translationKey: string;
  slug: string;
  href: string;
  isFallback: boolean;
}

export interface ResolvedTravel {
  id: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  visitedOn?: Date;
  photos: Array<{
    src: ImageMetadata;
    alt: string;
  }>;
  title: string;
  summary?: string;
  isFallback: boolean;
}

const travelImages = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/travels/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const isPublished = <T extends { data: { draft: boolean } }>(entry: T): boolean =>
  import.meta.env.PROD ? !entry.data.draft : true;

function pickForLocale<T extends { data: { lang: Locale; translationKey: string } }>(
  entries: T[],
  lang: Locale,
): Array<{ entry: T; isFallback: boolean }> {
  const byKey = new Map<string, Map<Locale, T>>();

  for (const entry of entries) {
    const variants = byKey.get(entry.data.translationKey) ?? new Map<Locale, T>();
    variants.set(entry.data.lang, entry);
    byKey.set(entry.data.translationKey, variants);
  }

  const resolved: Array<{ entry: T; isFallback: boolean }> = [];

  for (const variants of byKey.values()) {
    const exact = variants.get(lang);
    if (exact) {
      resolved.push({ entry: exact, isFallback: false });
      continue;
    }
    const fallback = variants.get(defaultLocale);
    if (fallback) {
      resolved.push({ entry: fallback, isFallback: true });
    }
  }

  return resolved;
}

export async function getPosts(lang: Locale): Promise<ResolvedPost[]> {
  const entries = (await getCollection('blog')).filter(isPublished);

  return pickForLocale(entries, lang)
    .map(({ entry, isFallback }) => ({
      entry,
      translationKey: entry.data.translationKey,
      slug: entry.data.slug,
      href: localizedPath(lang, `blog/${entry.data.slug}`),
      isFallback,
    }))
    .sort((a, b) => b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf());
}

export async function getProjects(lang: Locale): Promise<ResolvedProject[]> {
  const entries = (await getCollection('projects')).filter(isPublished);

  return pickForLocale(entries, lang)
    .map(({ entry, isFallback }) => ({
      entry,
      translationKey: entry.data.translationKey,
      slug: entry.data.slug,
      href: localizedPath(lang, `projects/${entry.data.slug}`),
      isFallback,
    }))
    .sort((a, b) => {
      if (a.entry.data.order !== b.entry.data.order) {
        return a.entry.data.order - b.entry.data.order;
      }
      return b.entry.data.startedOn.valueOf() - a.entry.data.startedOn.valueOf();
    });
}

export async function getFeaturedProjects(
  lang: Locale,
  limit = HOME_FEATURED_PROJECTS_LIMIT,
): Promise<ResolvedProject[]> {
  const projects = await getProjects(lang);
  const featured = projects.filter((project) => project.entry.data.featured);

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const rest = projects.filter((project) => !project.entry.data.featured);
  return [...featured, ...rest].slice(0, limit);
}

export async function getTravels(lang: Locale): Promise<ResolvedTravel[]> {
  const entries: TravelEntry[] = await getCollection('travels');
  const resolved: ResolvedTravel[] = [];

  for (const entry of entries) {
    const exact = entry.data.translations[lang];
    const copy = exact ?? entry.data.translations[defaultLocale];
    if (!copy) continue;

    const photos: ResolvedTravel['photos'] = [];
    const realPhotos = entry.data.photos ?? [];
    const generatedCover = travelImages[`../assets/travels/${entry.data.id}/cover.png`];
    if (generatedCover) {
      photos.push({
        src: generatedCover.default,
        alt: copy.title,
      });
    }

    for (const photo of realPhotos) {
      const image = travelImages[`../assets/${photo.src}`];
      if (!image) {
        throw new Error(
          `Travel entry "${entry.data.id}" references missing image src/assets/${photo.src}`,
        );
      }
      photos.push({
        src: image.default,
        alt: photo.alt[lang] ?? photo.alt[defaultLocale],
      });
    }

    resolved.push({
      id: entry.data.id,
      country: entry.data.country,
      countryCode: entry.data.countryCode.toLowerCase(),
      lat: entry.data.lat,
      lng: entry.data.lng,
      visitedOn: entry.data.visitedOn,
      photos,
      title: copy.title,
      summary: copy.summary,
      isFallback: exact === undefined,
    });
  }

  return resolved.sort((a, b) => {
    if (a.visitedOn && b.visitedOn) return b.visitedOn.valueOf() - a.visitedOn.valueOf();
    if (a.visitedOn) return -1;
    if (b.visitedOn) return 1;
    return a.title.localeCompare(b.title, lang);
  });
}

export async function getPostBySlug(lang: Locale, slug: string): Promise<ResolvedPost | undefined> {
  const posts = await getPosts(lang);
  return posts.find((post) => post.slug === slug);
}

export async function getProjectBySlug(
  lang: Locale,
  slug: string,
): Promise<ResolvedProject | undefined> {
  const projects = await getProjects(lang);
  return projects.find((project) => project.slug === slug);
}

async function translationHrefs(
  collection: 'blog' | 'projects',
  translationKey: string,
): Promise<Record<Locale, string>> {
  const segment = collection === 'blog' ? 'blog' : 'projects';
  const hrefs = {} as Record<Locale, string>;

  for (const lang of locales) {
    const resolved = collection === 'blog' ? await getPosts(lang) : await getProjects(lang);
    const match = resolved.find((item) => item.translationKey === translationKey);
    hrefs[lang] = match ? match.href : localizedPath(lang, segment);
  }

  return hrefs;
}

export const getPostTranslationHrefs = (translationKey: string) =>
  translationHrefs('blog', translationKey);

export const getProjectTranslationHrefs = (translationKey: string) =>
  translationHrefs('projects', translationKey);
