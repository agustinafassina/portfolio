# Portfolio

A static personal portfolio built with Astro 7, Tailwind CSS 4 and MDX. Three languages
(English, Spanish, Italian), a projects gallery, a blog, an interactive travel map and a
contact form. No client-side framework, and the only JavaScript shipped is a theme toggle
and the Leaflet map.

Because the source code carries no comments by design, this README is the documentation.
If something in the codebase looks surprising, the explanation is here.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

The dev server runs at `http://localhost:4321`. Visiting `/` redirects to `/en/`.

Copy `.env.example` to `.env.local` and fill in every value before running `npm run dev` or
`npm run build`. The build fails with a clear error if any required variable is missing.
`.env.local` is gitignored and must never be committed.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR at `localhost:4321` |
| `npm run build` | Type-safe production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | `astro check`: TypeScript and template diagnostics |

## Environment variables

Every variable is validated at build time by `src/lib/config.ts` using `astro/zod`. A
missing or malformed value fails the build with a message naming the offending key, rather
than rendering a page with `undefined` in it.

| Variable | Required | Format | Used for |
| --- | --- | --- | --- |
| `PUBLIC_SITE_URL` | yes | URL | Canonical URLs, sitemap, RSS, absolute OG image URLs |
| `PUBLIC_SITE_NAME` | yes | non-empty | Header wordmark, page title suffix, feed title |
| `PUBLIC_AUTHOR_NAME` | yes | non-empty | `author` meta tag, RSS author, footer copyright |
| `PUBLIC_CONTACT_EMAIL` | yes | email | The mailto link on the contact page |
| `PUBLIC_FORMSPREE_ENDPOINT` | yes | URL | The contact form `action` |
| `PUBLIC_GITHUB_URL` | yes | URL | Social links in footer and contact page |
| `PUBLIC_LINKEDIN_URL` | yes | URL | Social links in footer and contact page |
| `PUBLIC_TWITTER_URL` | no | URL or empty | Optional; the link is omitted entirely when unset |

### None of these are secrets

`output: 'static'` means the entire site is HTML and JS generated at build time. Every
environment value is **inlined into the shipped output**, and the `PUBLIC_` prefix does not
change that. Anyone can read them with View Source.

What `src/lib/config.ts` buys you is centralised, validated, non-hardcoded, gitignored
configuration, so the same codebase can be deployed to staging and production with
different values. It buys you nothing in terms of confidentiality.

If you later need a real secret, such as a mail API key, it cannot live in this repo. It
requires a serverless function on a host like Vercel or Netlify, which is also the point at
which you would add an Astro adapter and stop being fully static.

`astro.config.mjs` cannot read `import.meta.env`, because the config is evaluated before
Vite's env plugin runs. It uses Vite's `loadEnv` instead, which is why `PUBLIC_SITE_URL`
appears to be read twice.

## Project structure

```
public/                     favicon, apple touch icon, served as-is
src/
├── assets/                 images processed and optimised by Astro
├── components/             Astro components, all zero-JS except ThemeToggle and TravelMap
├── content/
│   ├── blog/{en,es,it}/    MDX posts
│   └── projects/{en,es,it}/ Markdown projects
├── data/travels.json       travel entries, pure data
├── i18n/
│   ├── ui.ts               typed UI string dictionary
│   └── utils.ts            useTranslations, locale path helpers
├── layouts/                BaseLayout, BlogLayout
├── lib/
│   ├── config.ts           validated env
│   ├── content.ts          the only place that calls getCollection()
│   ├── flags.ts            inlines country flag SVGs at build time
│   └── utils.ts            date formatting, sorting, excerpts
├── pages/
│   ├── index.astro         does not exist; / is handled by a config redirect
│   ├── 404.astro
│   └── [lang]/             every page, emitted once per locale
├── styles/global.css       Tailwind v4 theme, all design tokens
├── content.config.ts       collection schemas and loaders
└── env.d.ts                types for import.meta.env
```

## Internationalisation

English is the default locale and **every** URL is prefixed: `/en/`, `/es/`, `/it/`. The
bare `/` is a static redirect to `/en/`.

### One file per page, not three

Astro's documented i18n layout expects physical `src/pages/en/`, `src/pages/es/` and
`src/pages/it/` directories, which means writing every page three times. This project uses
a single `src/pages/[lang]/*.astro` per page whose `getStaticPaths()` emits all three
locales instead. The output URLs are identical.

The tradeoff: Astro's built-in `i18n.fallback` option works by mirroring page *files*
between locale folders, so it does not apply to dynamic `[lang]` routes. That is fine here,
because content needs per-entry fallback rather than per-page fallback, which is
implemented in `src/lib/content.ts`.

### UI strings

`src/i18n/ui.ts` holds a dictionary keyed by locale. English is the source of truth: its
key set becomes the `UIKey` type, and the Spanish and Italian objects are typed as
`Record<UIKey, string>`. A missing translation is therefore a **compile error**, not a
blank space on the page. Run `npm run check` to catch it.

### Content translation and fallback

Blog and project entries live in a locale folder and carry `lang` and `translationKey` in
frontmatter. Listings show only the active locale; when an entry has no translation for
that locale, the English one is shown with a visible notice.

`translationKey` is what ties translations together, and it is what makes localised slugs
work. `/es/blog/el-cron-que-mintio` correctly links to `/en/blog/the-cron-job-that-lied`
because the language switcher resolves through the key rather than swapping a path segment.

The post `comments-that-earn-their-keep` is deliberately **not** translated into Italian, so
`/it/blog/comments-that-earn-their-keep` exercises the fallback path. Do not "fix" it by
adding a translation without first adding another untranslated entry, or the fallback stops
being covered.

### Adding a fourth language

1. Add the code to `locales` in `src/i18n/ui.ts` and add entries to `localeNames` and
   `ogLocales`.
2. Add a matching dictionary object. TypeScript will list every key you still owe.
3. Add the code to `i18n.locales` and the sitemap `i18n.locales` map in `astro.config.mjs`.
4. Create `src/content/blog/<code>/` and `src/content/projects/<code>/`. Anything you do not
   translate falls back to English automatically.

Routing, `hreflang`, the RSS feed and the language switcher all derive from `locales`, so
nothing else needs touching.

## Adding content

### A project

Create `src/content/projects/<locale>/<name>.md`:

```md
---
title: Thing I Built
description: One sentence for the card and the meta description.
lang: en
translationKey: thing-i-built
slug: thing-i-built
stack: [Python, PostgreSQL]
repoUrl: https://github.com/you/thing
demoUrl: https://thing.example.com
cover: ../../../assets/project-automation.png
coverAlt: Describe the image for screen readers.
featured: false
order: 4
startedOn: 2026-01-20
---

The body is markdown and renders on the detail page.
```

`translationKey` must match across locales. `slug` may be localised. `cover` is a path
relative to the markdown file and is type-checked, so a typo fails the build. `order` sorts
ascending and ties break by `startedOn` descending. Set `draft: true` to hide an entry from
production builds while keeping it visible in dev.

### An article

Same idea in `src/content/blog/<locale>/<name>.mdx`, with `category` and `pubDate` instead
of `stack` and `startedOn`, and an optional `updatedDate`. Being MDX, posts can import
components:

```mdx
import Callout from '../../../components/Callout.astro';

<Callout variant="warning" title="Careful">
  Renders as a styled aside.
</Callout>
```

`Callout` accepts `variant` of `note`, `warning` or `success`.

### A country

One entry in `src/data/travels.json`. Coordinates are written once and shared by all
locales, so they cannot drift:

```json
{
  "id": "peru",
  "country": "Peru",
  "countryCode": "pe",
  "lat": -13.5319,
  "lng": -71.9675,
  "visitedOn": "2025-07-04",
  "photo": "travel-peru.png",
  "translations": {
    "en": { "title": "Cusco, Peru", "summary": "...", "photoAlt": "..." },
    "es": { "title": "Cusco, Perú", "summary": "...", "photoAlt": "..." },
    "it": { "title": "Cusco, Perù", "summary": "...", "photoAlt": "..." }
  }
}
```

Then drop the image at `src/assets/travel-peru.png`. The filename must start with `travel-`,
because `src/lib/content.ts` picks up travel images with a glob on that prefix.

The map pin needs no work: `countryCode` is an ISO 3166-1 alpha-2 code and `src/lib/flags.ts`
reads the matching SVG out of `flag-icons` at build time. An unknown code fails the build
with a message naming it.

## Design

The whole look is derived from the illustration at `src/assets/desk.jpg` rather than chosen
independently, so the site is art-directed by a single existing asset.

The palette was sampled from the actual pixels of that image. The illustration turned out to
be overwhelmingly warm, dominated by oranges and browns in the hue 18-30 range against a deep
indigo night, with no real teal or green anywhere except the continents on the wall map. The
tokens in `src/styles/global.css` reflect what was measured rather than what a "cosy dark
theme" is assumed to look like.

Dark mode is the default because the illustrated scene is at night; light mode is the same
room in daylight. That makes the toggle meaningful rather than decorative.

The illustration also doubles as the site map. The whiteboard is projects, the pinned wall map
is travels, the bookshelf is the blog, the window over Buenos Aires is contact. `PageHeader.astro`
crops to the relevant region with `object-position`, so four section identities cost no extra
assets. Crops are used at thumbnail scale on purpose: the source is 1024px wide and upscaling
it goes soft.

### Theming

Tailwind v4 is configured in CSS, not in a `tailwind.config.js`, which no longer exists.
Colours are declared twice: as raw CSS variables on `:root` and `.dark`, then re-exported
through `@theme inline` so Tailwind generates utilities that reference the variables instead
of baking in a fixed value. That is what lets `bg-surface` switch with the theme.

Dark mode needs an explicit `@custom-variant dark (&:where(.dark, .dark *))`; the v3
`darkMode: 'class'` option is gone.

An inline script in `<head>` reads `localStorage` before first paint to avoid a flash of the
wrong theme. It must stay inline and un-deferred. This is also why `<ClientRouter />` is not
used: view transitions re-run the DOM swap and reliably break no-flash theme scripts, and
"smooth" is handled with CSS instead.

## Performance notes

The only JavaScript on the site is the theme toggle, which is small enough that Astro inlines
it, and Leaflet, which loads on `/[lang]/travels/` and nowhere else. Home, blog, projects and
contact ship no module scripts at all.

Fonts are self-hosted variable fonts via Fontsource, avoiding a Google Fonts round trip.

Country flags are **not** loaded via `flag-icons`' stylesheet. Importing it would have cost
28 KB of CSS and caused Vite to copy all 271 flag SVGs (2 MB) into `dist` to serve five of
them. `src/lib/flags.ts` reads only the flags actually referenced and inlines them as data
URIs, so there are no extra requests and no unused assets.

Images are declared through the `image()` schema helper and rendered with `<Image />`, so they
are type-checked, converted to WebP and emitted at multiple widths.

## Data layer and the path to a dashboard

Content is never hardcoded into templates. Each collection declares a loader and a schema in
`src/content.config.ts`, and the format is chosen per collection based on what the data is:

- **blog**: MDX. Prose that needs components.
- **projects**: Markdown with frontmatter. Structured metadata plus a prose body.
- **travels**: one JSON file read with the `file()` loader. Pure data with no prose, so
  fifteen markdown files with empty bodies would be pointless.

### The insulation layer

`src/lib/content.ts` is the **only** module that calls `getCollection()`. Pages call
`getPosts(lang)`, `getProjects(lang)` and `getTravels(lang)`. Locale filtering and English
fallback live in exactly one place.

This is what makes a future dashboard cheap. Swapping the source means changing the loader in
`content.config.ts` and, at most, `content.ts`. No page changes at all:

```ts
loader: async () => {
  const res = await fetch('https://dashboard.example/api/projects');
  return (await res.json()).map((p) => ({ id: p.slug, ...p }));
};
```

The usual thing that breaks that migration is body rendering, and it is already handled: a
custom loader receives `renderMarkdown()` in its context, so markdown coming out of a database
can be stored as `rendered` and `render()` plus `<Content />` keep working unchanged.

### Why not live collections

Live collections (`src/live.config.ts`, `getLiveCollection()`) fetch per request with no
rebuild, which is the real endgame for a dashboard. They are out of scope here because they
require an adapter, meaning the site stops being static, and they support neither MDX nor
image optimisation. Worth revisiting once the dashboard actually exists.

### A trap worth knowing about

The `glob()` loader derives an entry `id` from the **filename**, not the path. With content
split into locale folders, `projects/en/ship-gate.md`, `projects/es/ship-gate.md` and
`projects/it/ship-gate.md` all resolve to the id `ship-gate` and silently overwrite each
other, leaving only the last one. It surfaces as a `Duplicate id` warning in the build log and
as mysteriously missing pages.

Both collections therefore pass an explicit `generateId` that keeps the locale directory in
the id. Do not remove it.

## SEO

- Per-page `title`, `description`, `keywords`, canonical URL and Open Graph tags.
- `hreflang` alternates for all three locales plus `x-default` on every page, resolved through
  `translationKey` so they stay correct across localised slugs.
- `og:image` derived from the desk illustration, generated at exactly 1200x630 and referenced
  absolutely, which is required by every scraper.
- One RSS feed per locale at `/[lang]/rss.xml`, linked from `<head>` and the footer.
- `sitemap-index.xml` with i18n alternates, produced by `@astrojs/sitemap`.
- `404.astro` for hosts that serve a custom 404.

## Deployment

The build output in `dist/` is plain static files and works on any static host: Netlify,
Vercel, Cloudflare Pages, GitHub Pages, S3 plus CloudFront.

- Build command: `npm run build`
- Publish directory: `dist`
- Node: 22.12 or newer, which Astro 7 requires

Set the environment variables in the host's dashboard before the first deploy.
`PUBLIC_SITE_URL` must be the real public origin with no trailing slash, or canonical URLs,
the sitemap, the feeds and the OG image URL will all point somewhere wrong.

The `/` to `/en/` redirect is emitted as a static HTML page with a meta refresh, so it works
without host configuration. If your host supports real redirects, a 301 from `/` to `/en/` is
faster and worth configuring.

## Conventions

- No comments in `.astro`, `.ts`, `.mjs`, `.css` or `.json` source. Explanation belongs here.
  Code examples inside blog posts are content, not code, and are exempt.
- Every component declares a typed `Props` interface.
- Pages never call `getCollection()`; they go through `src/lib/content.ts`.
- Colours are referenced through semantic tokens such as `bg-surface`, `text-fg-muted` and
  `border-edge`. No raw hex values in components, so the light and dark themes stay in sync.
