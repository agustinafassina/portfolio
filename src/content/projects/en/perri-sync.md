---
title: Perri.Sync
description: A shared household dashboard for expenses, calendar, habits, and daily tasks — with a WebGL game layer and a .NET API behind it.
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
coverAlt: Perri.Sync WebGL game — Household World isometric home with chores, habits, and shared metrics
featured: true
order: 0
startedOn: 2024-09-01
---

Perri.Sync is a household operating system for couples and people living together — expenses,
calendar, habits, chores, meals, chat, and pet care in one place. The product spans four
repositories: a Next.js dashboard, a marketing landing page, a .NET API, and a WebGL game
that turns daily chores into something you actually want to open.

## The ecosystem

| Piece | Repo | Role |
| --- | --- | --- |
| **Dashboard** | [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) | Main app — all household features |
| **Landing** | [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) | Marketing and sign-up |
| **API** | [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) | REST backend (Auth0 JWT, EF Core) |
| **Game** | [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) | Interactive chore layer |

## Landing

The public face of the product — value proposition, pricing tiers, and the path into the app.

<video src="/projects/perri-sync/landingpage.mp4" autoplay loop muted playsinline></video>

## Dashboard

Built with **Next.js 15** (App Router), **React 18**, **TypeScript**, **Tailwind CSS**,
**Auth0**, **TanStack Query**, and **Recharts**. Three visual themes via `next-themes`:

- **Light** — everyday use
- **Dark** — night mode
- **Game** — Sims-inspired UI that matches the WebGL layer

<video src="/projects/perri-sync/dashboard.mp4" autoplay loop muted playsinline></video>

The game theme is not a gimmick on top of a spreadsheet app — it is the same data model,
the same API calls, a different skin that makes shared chores feel less like nagging.

## Game

Daily chore assignments sync from the API. Instead of only checking a box, you complete tasks
inside a **WebGL** life-sim scene — walk your character to the sink, the laundry, the fridge.

<video src="/projects/perri-sync/game.mp4" autoplay loop muted playsinline></video>

Chores assigned in the dashboard show up in-game. Finish them interactively or fall back to
the checklist view. Same household, two ways to engage.

## API

The backend is **.NET 10** with layered architecture: controllers → services → repositories →
models. **FluentValidation** on request DTOs, **Auth0** JWT on every route, and an
`X-Household-Id` header so one user can belong to multiple households without mixing data.

Representative surface:

| Domain | Endpoints | Product feature |
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

A typical authenticated request looks like this:

```http
GET /api/v1/expenses/monthly?year=2026
Authorization: Bearer {jwt}
X-Household-Id: {household-guid}
```

Subscription tiers gate some features — free households get chat and expenses; premium unlocks
chores and higher member limits. Swagger is available in development at `/swagger`.

## Repositories

- [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) — Next.js app
- [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) — landing site
- [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) — .NET REST API
- [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) — Unity WebGL build

Private repos — links work for collaborators; the portfolio shows the product, not the source tree.
