---
title: Perri.Sync
description: A shared household app for expenses, calendar, habits, and chores, with a WebGL game layer and a .NET API behind it.
lang: en
translationKey: perri-sync
slug: perri-sync
stack:
  - .NET 10
  - Next.js
  - React
  - TypeScript
  - Auth0
  - WebGL
  - Tailwind CSS
repoUrl: https://github.com/agustinafassina/Perri.Sync.Dashboard.New
cover: ../../../assets/projects/perri-sync-cover.png
coverAlt: Perri.Sync WebGL game, Household World isometric home with chores, habits, and shared metrics
featured: true
order: 2
startedOn: 2024-09-01
outcome: One household product for expenses, calendar, habits, and chores, with a .NET API and Auth0 multi-tenant households.
problem: Couples run a house across spreadsheets and chats until something falls through the cracks.
decision: Four repos (dashboard, landing, API, WebGL game) with JWT plus household scoping, instead of a monolith or a shared-password mess.
result: Shared house ops live in one product surface, including a game layer so chores get opened on purpose.
metrics:
  - label: Tenant blast radius
    value: 1 household
  - label: Auth gate
    value: JWT + membership
---

## Context

Shared expenses in one spreadsheet. Chores in another chat. The calendar somewhere else.
That split is how most couples run a house until something falls through the cracks.

I built Perri.Sync so that stuff lives in one place: expenses, calendar, habits, chores,
meals, a small chat, and pet care. The game layer turns “who does the dishes?” into
something you open because you want to, not only because you should.

## Constraints

- Repos stay private. This page has to show the product without the source tree.
- One person can belong to more than one household without mixing data.
- Free vs premium has to be enforceable on the API, not only on a pricing page.
- The WebGL layer must use the same assignments as the checklist UI. Two skins, one model.

## Architecture decision

Four repos, one product. Why not a monolith? The game build, the marketing site, and the
API release on different clocks. Why not a shared password for the house? Auth0 per user
plus household membership is the trust model.

| Piece | Repo | Role |
| --- | --- | --- |
| **Dashboard** | [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) | Main app, all household features |
| **Landing** | [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) | Marketing and sign-up |
| **API** | [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) | REST backend (Auth0 JWT, EF Core) |
| **Game** | [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) | Interactive chore layer |

**Landing** is the public face: what it does, pricing tiers, how you get in.

<video src="/projects/perri-sync/landingpage.mp4" autoplay loop muted playsinline></video>

**Dashboard** is Next.js 15, React 18, TypeScript, Tailwind, Auth0, TanStack Query,
Recharts. Three themes through `next-themes`: Light, Dark, and Game (Sims-inspired UI that
matches the WebGL layer). Same data model, same API calls, different skin.

<video src="/projects/perri-sync/dashboard.mp4" autoplay loop muted playsinline></video>

**Game** syncs assignments from the API. You finish tasks inside a WebGL life-sim scene or
fall back to the checklist. Same household, two ways in.

<video src="/projects/perri-sync/game.mp4" autoplay loop muted playsinline></video>

**API** is .NET 10, layered controllers → services → repositories → models, with
FluentValidation on request DTOs.

| Domain | Endpoints | Feature |
| --- | --- | --- |
| Expenses | `GET /expenses/monthly`, `GET /expenses/summary` | Shared spending grid |
| Calendar | CRUD `/calendar/events`, Google OAuth link | Household calendar |
| Chores | `GET /chores/assignments`, `PUT /chores/assignments` | Daily tasks → game |
| Habits | `GET /habits/today`, `PUT /habits/completions` | Habit tracking |
| Settings | `GET /settings`, `POST /settings/members` | Multi-member households |
| Chat | `GET/POST /chat/messages` | In-app notes |
| Meals | `GET/POST /meals/menus` | Meal planning |
| Animals | CRUD `/animals/animals` | Pet care |
| Avatar | `GET/PUT /avatar` | Profile / game character |

```http
GET /api/v1/expenses/monthly?year=2026
Authorization: Bearer {jwt}
X-Household-Id: {household-guid}
```

## Security / blast radius

Auth0 JWT on every route. `X-Household-Id` scopes the request. Membership is checked server
side so one household cannot read another by swapping the header (classic IDOR if you skip
that check).

Free households get chat and expenses. Premium unlocks chores and higher member limits.
That gate lives on the API. Swagger stays available in development at `/swagger` only.

Blast radius of a leaked JWT is one user across the households they belong to, not the
whole product, as long as household authorization stays honest.

## Ops

Collaborators open the private repo links; this page shows the product walkthroughs above.
Swagger for local API work. Themes and Auth0 config are part of the app deploy, not a
separate console product.

## What I would do differently

- Publish a short auth-flow diagram on this page (JWT + `X-Household-Id` + membership
  check) so private repos do not hide the trust model.
- Add a GIF or MP4 specifically for the household switcher and an IDOR-safe failure case.
- Move plan limits into a single policy module so free/premium rules are not sprinkled
  across controllers.
