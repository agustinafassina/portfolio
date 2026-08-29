# 🌐 Portfolio
Static personal portfolio built with Astro 7, Tailwind CSS 4 and MDX. Three languages
(English, Spanish, Italian), projects, blog, travel map and contact form. No client-side
framework; the only shipped JavaScript is a theme toggle and the Leaflet map.
Because the source code carries no comments by design, this README is the documentation.

## 🚀 Quick start
```bash
npm install
cp .env.example .env.local
npm run dev
```

Dev server: `http://localhost:4321`. `/` redirects to `/en/`.

Fill in every value in `.env.local` before `npm run dev` or `npm run build`. The build fails
with a clear error if anything is missing. `.env.local` is gitignored.

Images use Astro's asset pipeline and require **`sharp`**. If covers break in dev, restart
the dev server after `npm install` — a stale `astro dev` process returns 500 on `/_image`.

## 📜 Scripts
| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run check` | TypeScript and template diagnostics |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run format` / `format:check` | Prettier |

Before pushing or deploying: `npm run check && npm run lint && npm run build`.

## 🔐 Environment variables
Validated at build time in `src/lib/config.ts`. See `.env.example` for the full list.

| Variable | Required | Used for |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | yes | Canonical URLs, sitemap, RSS, OG images |
| `PUBLIC_SITE_NAME` | yes | Header, titles, feed |
| `PUBLIC_AUTHOR_NAME` | yes | Author meta, RSS, footer |
| `PUBLIC_CONTACT_EMAIL` | yes | Contact mailto link |
| `PUBLIC_FORMSPREE_ENDPOINT` | yes | Contact form action |
| `PUBLIC_GITHUB_URL` | yes | Social links |
| `PUBLIC_LINKEDIN_URL` | yes | Social links |
| `PUBLIC_TWITTER_URL` | no | Omitted when unset |
| `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` | no | Optional Cloudflare Web Analytics beacon |
| `PUBLIC_TURNSTILE_SITE_KEY` | no | Cloudflare Turnstile on contact |
| `PUBLIC_GA_MEASUREMENT_ID` | no | Google Analytics 4 (`G-XXXXXXXX`) |

All `PUBLIC_*` values are inlined into the static output — they are configuration, not
secrets. `PUBLIC_SITE_URL` must be the real origin with **no trailing slash**.

## 📁 Project structure
```
src/
├── assets/              images (projects, travels)
├── components/
├── content/
│   ├── blog/{en,es,it}/     MDX posts
│   └── projects/{en,es,it}/ Markdown projects
├── data/travels.json
├── i18n/ui.ts           UI strings (typed per locale)
├── layouts/
├── lib/                 config, content, consts, flags, json-ld, utils
├── pages/[lang]/        all routes, one file per page × three locales
└── styles/global.css
public/_headers          security headers (Netlify / Cloudflare Pages)
```

## 🌍 Internationalisation
Every URL is prefixed: `/en/`, `/es/`, `/it/`. Pages live under `src/pages/[lang]/` and
emit all locales via `getStaticPaths()`.

- **UI strings:** `src/i18n/ui.ts` — English keys are the source of truth; missing
  translations are compile errors.
- **Content:** blog and project entries use `lang` + `translationKey` in frontmatter.
  Listings prefer the active locale; missing translations fall back to English with a
  notice. The language switcher resolves through `translationKey`, not path segments.
- **Adding a locale:** extend `locales` in `ui.ts` and `astro.config.mjs`, add dictionary
  keys, create `content/blog/<code>/` and `content/projects/<code>/`.

## ✏️ Adding content

### 📦 A project
`src/content/projects/<locale>/<name>.md` — see an existing entry for the full frontmatter
shape. Key fields: `translationKey` (shared across locales), `slug` (may differ per locale),
`cover`, optional `diagram` / `diagramAlt`, `featured`, `order`, `draft`.

### 📝 A blog post
`src/content/blog/<locale>/<name>.mdx` — same pattern with `category`, `pubDate`, optional
`cover` and `draft`. Categories: `postmortem`, `infrastructure`, `craft`, `automation`
(`src/lib/blog-categories.ts`). MDX posts can import `Callout` from
`src/components/Callout.astro`.

Home shows the latest posts up to `HOME_POSTS_LIMIT`; featured projects up to
`HOME_FEATURED_PROJECTS_LIMIT` (both in `src/lib/consts.ts`).

### 🗺️ A travel entry
One object in `src/data/travels.json` plus images under `src/assets/travels/<country>/`.
Coordinates and `countryCode` (ISO 3166-1 alpha-2) are shared; copy lives under
`translations` and `photos[].alt` per locale. Upload originals to `images/originals/`
(gitignored).

## 🏗️ Architecture notes
- `src/lib/content.ts` is the only module that calls `getCollection()`. Pages use
  `getPosts`, `getProjects`, `getFeaturedProjects`, `getTravels`.
- Blog/projects loaders use a custom `generateId` that includes the locale folder — do not
  remove it, or entries with the same filename across locales will collide.
- `draft: true` hides content in production builds; dev still shows it.

## 🚢 Deployment
Static output in `dist/`. Works on Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, or
**Docker + nginx** behind the Hetzner compose stack.

- Build: `npm run build`
- Output: `dist/`
- Node: **22.12+** (Astro 7 requirement)
- Container: listens on **port 80** (`Dockerfile` + `nginx.conf`)

```bash
docker build \
  --build-arg PUBLIC_SITE_URL=https://your-domain.com \
  --build-arg PUBLIC_SITE_NAME="Agustina Fassina" \
  --build-arg PUBLIC_AUTHOR_NAME="Agustina Fassina" \
  --build-arg PUBLIC_CONTACT_EMAIL=you@example.com \
  --build-arg PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id \
  --build-arg PUBLIC_GITHUB_URL=https://github.com/agustinafassina \
  --build-arg PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/agustina-fassina-458247163 \
  -t portfolio:local .
```

Orchestration lives in [Hetzner.Server.Infrastructure](https://github.com/agustinafassina/Hetzner.Server.Infrastructure)
(`portfolio` service → Caddy → `PORTFOLIO_SITE`).

Set all `PUBLIC_*` variables in the host dashboard (or compose build args) before the first deploy.

**Formspree:** create a form at [formspree.io](https://formspree.io/), set
`PUBLIC_FORMSPREE_ENDPOINT`. Honeypot field `_gotcha` is already wired in `contact.astro`.

**Cloudflare Turnstile (CAPTCHA):** create a widget at
[dash.cloudflare.com → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile),
set `PUBLIC_TURNSTILE_SITE_KEY` (site key) in the build env, and paste the **secret key**
in Formspree → form Settings → CAPTCHA → Cloudflare Turnstile. Enable CAPTCHA on that form.

**Google Analytics 4:** set `PUBLIC_GA_MEASUREMENT_ID` (or `PORTFOLIO_PUBLIC_GA_MEASUREMENT_ID`
in compose) to your `G-XXXXXXXX` ID. Leave empty to omit the tag. Rebuild after changing it.

**Headers:** `public/_headers` is picked up automatically on Netlify and Cloudflare Pages.
The Docker image applies the same policy in `nginx.conf`.

Preview with a real origin:

```bash
PUBLIC_SITE_URL=https://your-domain.com npm run build
npm run preview
```

## 📋 Conventions
- No comments in source — explanation belongs here.
- Components declare a typed `Props` interface.
- Pages never call `getCollection()` directly.
- Use semantic colour tokens (`bg-surface`, `text-fg-muted`, `border-edge`), not raw hex.
