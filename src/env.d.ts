interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SITE_NAME: string;
  readonly PUBLIC_AUTHOR_NAME: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_FORMSPREE_ENDPOINT: string;
  readonly PUBLIC_GITHUB_URL: string;
  readonly PUBLIC_LINKEDIN_URL: string;
  readonly PUBLIC_TWITTER_URL?: string;
  readonly PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
