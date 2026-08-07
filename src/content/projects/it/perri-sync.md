---
title: Perri.Sync
description: Dashboard condiviso per spese, calendario, abitudini e faccende domestiche — con layer di gioco WebGL e API .NET dietro.
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
coverAlt: Gioco WebGL di Perri.Sync — Household World isometrico con faccende, abitudini e metriche condivise
featured: true
order: 0
startedOn: 2024-09-01
---

Perri.Sync è un sistema operativo per la casa per coppie e persone che vivono insieme — spese,
calendario, abitudini, faccende, pasti, chat e cura degli animali in un unico posto. Il
prodotto copre quattro repository: una dashboard Next.js, una landing di marketing, un API .NET
e un gioco WebGL che trasforma le faccende quotidiane in qualcosa che hai voglia di aprire.

## L ecosistema

| Pezzo | Repo | Ruolo |
| --- | --- | --- |
| **Dashboard** | [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) | App principale — tutte le funzioni |
| **Landing** | [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) | Marketing e registrazione |
| **API** | [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) | Backend REST (Auth0 JWT, EF Core) |
| **Game** | [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) | Layer interattivo delle faccende |

## Landing

La facciata pubblica del prodotto — proposta di valore, piani e percorso verso l app.

<video src="/projects/perri-sync/landingpage.mp4" autoplay loop muted playsinline></video>

## Dashboard

Costruita con **Next.js 15** (App Router), **React 18**, **TypeScript**, **Tailwind CSS**,
**Auth0**, **TanStack Query** e **Recharts**. Tre temi visivi con `next-themes`:

- **Light** — uso quotidiano
- **Dark** — modalità notte
- **Game** — UI ispirata ai Sims che combacia con il layer WebGL

<video src="/projects/perri-sync/dashboard.mp4" autoplay loop muted playsinline></video>

Il tema game non è un ornamento su un foglio di calcolo — è lo stesso modello dati, le stesse
chiamate API, un altra pelle che fa sentire le faccende condivise meno come rimprovero.

## Gioco

Le faccende assegnate si sincronizzano dall API. Invece di spuntare solo una casella, le
completi dentro una scena **WebGL** life-sim — porta il personaggio al lavandino, al bucato,
al frigo.

<video src="/projects/perri-sync/game.mp4" autoplay loop muted playsinline></video>

Le faccende della dashboard compaiono nel gioco. Terminalle in modo interattivo o torna alla
vista checklist. Stessa casa, due modi di partecipare.

## API

Il backend è **.NET 10** con architettura a strati: controllers → services → repositories →
models. **FluentValidation** sui DTO, JWT **Auth0** su ogni route, e header `X-Household-Id`
così un utente può appartenere a più famiglie senza mescolare i dati.

Superficie rappresentativa:

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

I piani di abbonamento limitano alcune feature — famiglie free hanno chat e spese; premium
sblocca chores e più membri. Swagger disponibile in sviluppo su `/swagger`.

## Repository

- [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) — app Next.js
- [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) — landing
- [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) — API REST .NET
- [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) — build Unity WebGL

Repo privati — i link funzionano per i collaboratori; il portfolio mostra il prodotto, non l albero del codice.
