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
---

Shared expenses in one spreadsheet. Chores in another chat. The calendar somewhere else.
That split is how most couples run a house until something falls through the cracks.

I built Perri.Sync so that stuff lives in one place: expenses, calendar, habits, chores,
meals, a small chat, and pet care. Four repos make up the product. A Next.js dashboard, a
landing page, a .NET API, and a WebGL game that turns “who does the dishes?” into something
you open because you want to, not only because you should.

## The pieces

| Piece | Repo | Role |
| --- | --- | --- |
| **Dashboard** | [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) | Main app, all household features |
| **Landing** | [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) | Marketing and sign-up |
| **API** | [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) | REST backend (Auth0 JWT, EF Core) |
| **Game** | [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) | Interactive chore layer |

## Landing

Public face of the product: what it does, pricing tiers, and how you get in.

<video src="/projects/perri-sync/landingpage.mp4" autoplay loop muted playsinline></video>

## Dashboard

**Next.js 15** (App Router), **React 18**, **TypeScript**, **Tailwind CSS**, **Auth0**,
**TanStack Query**, and **Recharts**. Three themes through `next-themes`:

- **Light** for everyday use
- **Dark** for night
- **Game** for a Sims-inspired UI that matches the WebGL layer

<video src="/projects/perri-sync/dashboard.mp4" autoplay loop muted playsinline></video>

The game theme is not a sticker on a spreadsheet. Same data model, same API calls, different
skin. Shared chores feel less like a nagging list and more like a shared space.

## Game

Assignments sync from the API. Instead of only ticking a checkbox, you finish tasks inside a
**WebGL** life-sim scene: walk the character to the sink, the laundry, the fridge.

<video src="/projects/perri-sync/game.mp4" autoplay loop muted playsinline></video>

What you assign in the dashboard shows up in-game. Complete it interactively or fall back to
the checklist. Same household, two ways in.

## API

**.NET 10**, layered the usual way: controllers → services → repositories → models.
**FluentValidation** on request DTOs, **Auth0** JWT on every route, and an `X-Household-Id`
header so one user can sit in more than one household without mixing data.

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

A typical authenticated call:

```http
GET /api/v1/expenses/monthly?year=2026
Authorization: Bearer {jwt}
X-Household-Id: {household-guid}
```

Free households get chat and expenses. Premium unlocks chores and higher member limits.
Swagger stays available in development at `/swagger`.

## Repositories

- [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) (Next.js app)
- [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) (landing)
- [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) (.NET REST API)
- [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) (Unity WebGL build)

The repos are private. Collaborators can open the links; this page shows the product, not the
source tree.
