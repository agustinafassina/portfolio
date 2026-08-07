import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { locales, ui, type Locale } from '../../i18n/ui';
import { blogCategoryLabelKey } from '../../lib/blog-categories';
import { getPosts } from '../../lib/content';
import { siteConfig } from '../../lib/config';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang }, props: { lang } }));
}

export async function GET(context: APIContext) {
  const { lang } = context.props as { lang: Locale };
  const posts = await getPosts(lang);
  const site = context.site ?? new URL(siteConfig.url);

  return rss({
    title: `${siteConfig.name} · ${ui[lang]['blog.title']}`,
    description: ui[lang]['blog.description'],
    site,
    trailingSlash: false,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>${lang}</language>`,
    items: posts.map((post) => ({
      title: post.entry.data.title,
      description: post.entry.data.description,
      pubDate: post.entry.data.pubDate,
      link: post.href,
      categories: [ui[lang][blogCategoryLabelKey(post.entry.data.category)]],
      author: siteConfig.author,
    })),
  });
}
