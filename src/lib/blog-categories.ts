import type { UIKey } from '../i18n/ui';

export const blogCategories = ['postmortem', 'infrastructure', 'craft', 'automation'] as const;

export type BlogCategory = (typeof blogCategories)[number];

export function isBlogCategory(value: string): value is BlogCategory {
  return (blogCategories as readonly string[]).includes(value);
}

export function blogCategoryLabelKey(category: BlogCategory): UIKey {
  return `blog.category.${category}`;
}

export function blogCategoryAboutKey(category: BlogCategory): UIKey {
  return `blog.category.${category}.about`;
}
