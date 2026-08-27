FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

ARG PUBLIC_SITE_URL=https://agustinafassina.com.ar
ARG PUBLIC_SITE_NAME=Agustina Fassina
ARG PUBLIC_AUTHOR_NAME=Agustina Fassina
ARG PUBLIC_CONTACT_EMAIL=agustinafassina@gmail.com
ARG PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/mqpkzrdr
ARG PUBLIC_GITHUB_URL=https://github.com/agustinafassina
ARG PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/agustina-fassina-458247163
ARG PUBLIC_TWITTER_URL=
ARG PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=
ARG PUBLIC_TURNSTILE_SITE_KEY=

ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL \
    PUBLIC_SITE_NAME=$PUBLIC_SITE_NAME \
    PUBLIC_AUTHOR_NAME=$PUBLIC_AUTHOR_NAME \
    PUBLIC_CONTACT_EMAIL=$PUBLIC_CONTACT_EMAIL \
    PUBLIC_FORMSPREE_ENDPOINT=$PUBLIC_FORMSPREE_ENDPOINT \
    PUBLIC_GITHUB_URL=$PUBLIC_GITHUB_URL \
    PUBLIC_LINKEDIN_URL=$PUBLIC_LINKEDIN_URL \
    PUBLIC_TWITTER_URL=$PUBLIC_TWITTER_URL \
    PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=$PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN \
    PUBLIC_TURNSTILE_SITE_KEY=$PUBLIC_TURNSTILE_SITE_KEY \
    NODE_ENV=production

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health > /dev/null || exit 1
