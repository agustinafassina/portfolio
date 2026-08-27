import { z } from 'astro/zod';

const envSchema = z.object({
  PUBLIC_SITE_URL: z.url(),
  PUBLIC_SITE_NAME: z.string().min(1),
  PUBLIC_AUTHOR_NAME: z.string().min(1),
  PUBLIC_CONTACT_EMAIL: z.email(),
  PUBLIC_FORMSPREE_ENDPOINT: z.url(),
  PUBLIC_GITHUB_URL: z.url(),
  PUBLIC_LINKEDIN_URL: z.url(),
  PUBLIC_TWITTER_URL: z.url().optional().or(z.literal('')),
  PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN: z.string().min(1).optional().or(z.literal('')),
  PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional().or(z.literal('')),
});

const rawEnv = {
  PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
  PUBLIC_SITE_NAME: import.meta.env.PUBLIC_SITE_NAME,
  PUBLIC_AUTHOR_NAME: import.meta.env.PUBLIC_AUTHOR_NAME,
  PUBLIC_CONTACT_EMAIL: import.meta.env.PUBLIC_CONTACT_EMAIL,
  PUBLIC_FORMSPREE_ENDPOINT: import.meta.env.PUBLIC_FORMSPREE_ENDPOINT,
  PUBLIC_GITHUB_URL: import.meta.env.PUBLIC_GITHUB_URL,
  PUBLIC_LINKEDIN_URL: import.meta.env.PUBLIC_LINKEDIN_URL,
  PUBLIC_TWITTER_URL: import.meta.env.PUBLIC_TWITTER_URL,
  PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN: import.meta.env.PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN,
  PUBLIC_TURNSTILE_SITE_KEY: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
};

const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('\n');

  throw new Error(
    [
      'Invalid or missing environment variables.',
      'Copy .env.example to .env.local and fill in every value.',
      '',
      details,
      '',
    ].join('\n'),
  );
}

const env = parsed.data;

export const siteConfig = {
  url: env.PUBLIC_SITE_URL.replace(/\/$/, ''),
  name: env.PUBLIC_SITE_NAME,
  author: env.PUBLIC_AUTHOR_NAME,
  email: env.PUBLIC_CONTACT_EMAIL,
  formspreeEndpoint: env.PUBLIC_FORMSPREE_ENDPOINT,
  cloudflareAnalyticsToken: env.PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN || '',
  turnstileSiteKey: env.PUBLIC_TURNSTILE_SITE_KEY || '',
} as const;

export const socialLinks = [
  { key: 'github', label: 'GitHub', url: env.PUBLIC_GITHUB_URL },
  { key: 'linkedin', label: 'LinkedIn', url: env.PUBLIC_LINKEDIN_URL },
  ...(env.PUBLIC_TWITTER_URL ? [{ key: 'twitter', label: 'X', url: env.PUBLIC_TWITTER_URL }] : []),
] as const;

export type SocialLink = (typeof socialLinks)[number];
