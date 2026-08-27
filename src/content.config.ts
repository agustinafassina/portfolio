import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { blogCategories } from './lib/blog-categories';
import { locales } from './i18n/ui';

const localeEnum = z.enum(locales);

const localeScopedId = ({ entry }: { entry: string }) => entry.replace(/\.[^.]+$/, '');

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}',
    generateId: localeScopedId,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      lang: localeEnum,
      translationKey: z.string().min(1),
      slug: z.string().min(1),
      category: z.enum(blogCategories),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.{md,mdx}',
    generateId: localeScopedId,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      lang: localeEnum,
      translationKey: z.string().min(1),
      slug: z.string().min(1),
      stack: z.array(z.string().min(1)).min(1),
      repoUrl: z.url().optional(),
      demoUrl: z.url().optional(),
      cover: image(),
      coverAlt: z.string().min(1),
      diagram: image().optional(),
      diagramAlt: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().int().default(0),
      startedOn: z.coerce.date(),
      draft: z.boolean().default(false),
      outcome: z.string().min(1).optional(),
      problem: z.string().min(1).optional(),
      decision: z.string().min(1).optional(),
      result: z.string().min(1).optional(),
      metrics: z
        .array(
          z.object({
            label: z.string().min(1),
            value: z.string().min(1),
          }),
        )
        .max(3)
        .optional(),
    }),
});

const travelTranslation = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).optional(),
});

const travelPhoto = z.object({
  src: z.string().min(1),
  alt: z.record(z.enum(locales), z.string().min(1)),
});

const travels = defineCollection({
  loader: file('src/data/travels.json'),
  schema: z.object({
    id: z.string().min(1),
    country: z.string().min(1),
    countryCode: z.string().length(2),
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    visitedOn: z.coerce.date().optional(),
    photos: z.array(travelPhoto).optional(),
    translations: z.record(z.enum(locales), travelTranslation),
  }),
});

export const collections = { blog, projects, travels };
