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
diagram: ../../../assets/projects/perri-sync/workflow.png
diagramAlt: Product workflow from Landing and Auth0 through Dashboard household pick to the .NET API and WebGL game, sharing JWT plus X-Household-Id
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

Four repos, one product. The diagram above is the path a user takes: landing → Auth0 →
dashboard (pick household) → API, with the WebGL game reusing the same JWT and
`X-Household-Id`. Why not a monolith? The game build, the marketing site, and the
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
FluentValidation on request DTOs. A sample of the surface (there are more domains:
calendar, habits, chat, meals, pets):

| Domain | Endpoints | Feature |
| --- | --- | --- |
| Expenses | `GET /expenses/monthly`, `GET /expenses/summary` | Shared spending grid |
| Chores | `GET /chores/assignments`, `PUT /chores/assignments` | Daily tasks → game |
| Settings | `GET /settings`, `POST /settings/members` | Multi-member households |
| Avatar | `GET/PUT /avatar` | Profile / game character |

```http
GET /api/v1/expenses/monthly?year=2026
Authorization: Bearer {jwt}
X-Household-Id: {household-guid}
```

## Security / blast radius

Auth0 JWT on every route. `X-Household-Id` scopes the request. Membership is checked server
side so one household cannot read another by swapping the header (classic IDOR if you skip
that check). The workflow diagram above is the product path. The dashboard keeps the active
household in `localStorage` and sends it on every call; switching homes changes the header,
not the JWT claims. Tenant IDs stay out of the token on purpose: membership is a DB join on
Auth0 `sub` + household id. Fail closed in the service layer:

```csharp
Member? member = await _householdContextResolver.ResolveMemberAsync(
    auth0Id,
    householdId,
    includeHousehold: false,
    includeNotificationPrefs: false);

if (member == null)
    return Array.Empty<ChoreDto>(); // fail closed

return await _choreRepo.GetByHouseholdIdAsync(member.HouseholdId, cancellationToken);
```

Free households get chat and expenses. Premium unlocks chores and higher member limits.
That gate lives on the API. Swagger stays available in development at `/swagger` only.

Blast radius of a leaked JWT is one user across the households they belong to, not the
whole product, as long as household authorization stays honest.

## Ops

Collaborators open the private repo links; this page shows the product walkthroughs above.
Swagger for local API work. Themes and Auth0 config are part of the app deploy, not a
separate console product.
