---
title: Perri.Sync
description: App condivisa per la casa: spese, calendario, abitudini e faccende, con un layer di gioco WebGL e un'API .NET dietro.
lang: it
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
coverAlt: Gioco WebGL di Perri.Sync, Household World isometrico con faccende, abitudini e metriche condivise
featured: true
order: 0
startedOn: 2024-09-01
---

Spese su un foglio. Faccende in un'altra chat. Il calendario da un'altra parte. È così che
molte coppie gestiscono la casa, finché qualcosa si perde tra le app.

Ho costruito Perri.Sync perché tutto stia in un posto solo: spese, calendario, abitudini,
faccende, pasti, una chat piccola e cura degli animali. Quattro repository. Una dashboard
Next.js, una landing, un'API .NET e un gioco WebGL che rende “chi lava i piatti?” qualcosa
che apri perché ti va, non solo perché tocca.

## I pezzi

| Pezzo | Repo | Ruolo |
| --- | --- | --- |
| **Dashboard** | [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) | App principale, tutte le funzioni |
| **Landing** | [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) | Marketing e registrazione |
| **API** | [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) | Backend REST (Auth0 JWT, EF Core) |
| **Game** | [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) | Layer interattivo delle faccende |

## Landing

La facciata pubblica: cosa fa, i piani e come si entra.

<video src="/projects/perri-sync/landingpage.mp4" autoplay loop muted playsinline></video>

## Dashboard

**Next.js 15** (App Router), **React 18**, **TypeScript**, **Tailwind CSS**, **Auth0**,
**TanStack Query** e **Recharts**. Tre temi con `next-themes`:

- **Light** per il quotidiano
- **Dark** per la notte
- **Game** con una UI tipo Sims allineata al layer WebGL

<video src="/projects/perri-sync/dashboard.mp4" autoplay loop muted playsinline></video>

Il tema game non è un adesivo su un foglio di calcolo. Stesso modello dati, stesse chiamate
API, un'altra pelle. Le faccende condivise sembrano meno un rimprovero e più uno spazio in
comune.

## Gioco

Le assegnazioni arrivano dall'API. Invece di spuntare solo una casella, le completi dentro
una scena **WebGL** life-sim: porti il personaggio al lavandino, al bucato, al frigo.

<video src="/projects/perri-sync/game.mp4" autoplay loop muted playsinline></video>

Quello che assegni in dashboard compare nel gioco. Lo finisci giocando o torni alla vista
checklist. Stessa casa, due modi di entrare.

## API

**.NET 10**, a strati come di consueto: controllers → services → repositories → models.
**FluentValidation** sui DTO, JWT **Auth0** su ogni route, e l'header `X-Household-Id`
così un utente può stare in più famiglie senza mescolare i dati.

| Dominio | Endpoints | Feature |
| --- | --- | --- |
| Expenses | `GET /expenses/monthly`, `GET /expenses/summary` | Griglia spese condivise |
| Calendar | CRUD `/calendar/events`, OAuth Google | Calendario di casa |
| Chores | `GET /chores/assignments`, `PUT /chores/assignments` | Faccende quotidiane → gioco |
| Habits | `GET /habits/today`, `PUT /habits/completions` | Tracciamento abitudini |
| Settings | `GET /settings`, `POST /settings/members` | Famiglie multi-membro |
| Chat | `GET/POST /chat/messages` | Note in-app |
| Meals | `GET/POST /meals/menus` | Pianificazione pasti |
| Animals | CRUD `/animals/animals` | Cura animali |
| Avatar | `GET/PUT /avatar` | Profilo / personaggio di gioco |

Una richiesta autenticata tipica:

```http
GET /api/v1/expenses/monthly?year=2026
Authorization: Bearer {jwt}
X-Household-Id: {household-guid}
```

Le famiglie free hanno chat e spese. Premium sblocca chores e più membri. Swagger resta in
sviluppo su `/swagger`.

## Repository

- [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) (app Next.js)
- [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) (landing)
- [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) (API REST .NET)
- [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) (build Unity WebGL)

I repo sono privati. I collaboratori aprono i link; questa pagina mostra il prodotto, non
l'albero del codice.
