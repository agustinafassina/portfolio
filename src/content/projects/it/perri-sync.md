---
title: Perri.Sync
description: "App condivisa per la casa: spese, calendario, abitudini e faccende, con un layer di gioco WebGL e un'API .NET dietro."
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
diagram: ../../../assets/projects/perri-sync/workflow.png
diagramAlt: Flusso del prodotto da Landing e Auth0, scelta della famiglia in Dashboard, API .NET e gioco WebGL, con JWT e X-Household-Id condivisi
featured: true
order: 2
startedOn: 2024-09-01
outcome: Un prodotto per la casa su spese, calendario, abitudini e faccende, con API .NET e household multi-tenant via Auth0.
problem: Le coppie gestiscono la casa tra fogli e chat finché qualcosa si perde tra le app.
decision: Quattro repo (dashboard, landing, API, gioco WebGL) con JWT e scope per household, invece di un monolite o password condivise.
result: L'operatività condivisa della casa vive in un solo prodotto, con un layer di gioco così le faccende si aprono perché vuoi, non solo perché tocca.
metrics:
  - label: Blast radius del tenant
    value: 1 household
  - label: Gate di auth
    value: JWT + membership
---

## Contesto

Spese su un foglio. Faccende in un'altra chat. Il calendario da un'altra parte. È così che
molte coppie gestiscono la casa, finché qualcosa si perde tra le app.

Ho costruito Perri.Sync perché tutto stia in un posto solo: spese, calendario, abitudini,
faccende, pasti, una chat piccola e cura degli animali. Il layer di gioco rende “chi lava i
piatti?” qualcosa che apri perché ti va, non solo perché tocca.

## Vincoli

- I repo restano privati. Questa pagina deve mostrare il prodotto senza l'albero del
  codice.
- Una persona può stare in più famiglie senza mescolare i dati.
- Free vs premium deve essere esigibile sull'API, non solo su una pagina prezzi.
- Il layer WebGL usa le stesse assegnazioni della UI checklist. Due pelli, un modello.

## Decisione di architettura

Quattro repo, un prodotto. Il diagramma sopra è il percorso utente: landing → Auth0 →
dashboard (scegli household) → API, e il gioco WebGL riusa lo stesso JWT e
`X-Household-Id`. Perché non un monolite? Il build del gioco, il sito marketing e l'API
escono su orologi diversi. Perché non una password condivisa per la casa? Auth0 per
utente più membership del household è il trust model.

| Pezzo | Repo | Ruolo |
| --- | --- | --- |
| **Dashboard** | [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) | App principale, tutte le funzioni |
| **Landing** | [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) | Marketing e registrazione |
| **API** | [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) | Backend REST (Auth0 JWT, EF Core) |
| **Game** | [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) | Layer interattivo delle faccende |

**Landing** è la facciata pubblica: cosa fa, i piani e come si entra.

<video src="/projects/perri-sync/landingpage.mp4" autoplay loop muted playsinline></video>

**Dashboard** è Next.js 15, React 18, TypeScript, Tailwind, Auth0, TanStack Query,
Recharts. Tre temi con `next-themes`: Light, Dark e Game (UI tipo Sims allineata al layer
WebGL). Stesso modello dati, stesse chiamate API, un'altra pelle.

<video src="/projects/perri-sync/dashboard.mp4" autoplay loop muted playsinline></video>

**Game** sincronizza le assegnazioni dall'API. Completi i task in una scena WebGL life-sim
o torni alla checklist. Stessa casa, due modi di entrare.

<video src="/projects/perri-sync/game.mp4" autoplay loop muted playsinline></video>

**API** è .NET 10 a strati controllers → services → repositories → models, con
FluentValidation sui DTO. Un campione della superficie (ci sono altri domini: calendar,
habits, chat, meals, pets):

| Dominio | Endpoints | Feature |
| --- | --- | --- |
| Expenses | `GET /expenses/monthly`, `GET /expenses/summary` | Griglia spese condivise |
| Chores | `GET /chores/assignments`, `PUT /chores/assignments` | Faccende quotidiane → gioco |
| Settings | `GET /settings`, `POST /settings/members` | Famiglie multi-membro |
| Avatar | `GET/PUT /avatar` | Profilo / personaggio di gioco |

```http
GET /api/v1/expenses/monthly?year=2026
Authorization: Bearer {jwt}
X-Household-Id: {household-guid}
```

## Sicurezza / blast radius

JWT Auth0 su ogni route. `X-Household-Id` fa lo scope della request. La membership si
controlla sul server così una famiglia non ne legge un'altra cambiando l'header (IDOR
classico se salti quel check). Il diagramma di workflow sopra è il percorso del prodotto.
La dashboard tiene la famiglia attiva in `localStorage` e la invia su ogni call; cambiare
casa cambia l'header, non i claim del JWT. Il tenant non è embedded nel token di proposito:
la membership è un join in DB tra Auth0 `sub` e household id. Fail closed nel service layer:

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

Le famiglie free hanno chat e spese. Premium sblocca chores e più membri. Quel gate vive
sull'API. Swagger resta in sviluppo su `/swagger` soltanto.

Blast radius di un JWT filtrato: un utente nelle famiglie a cui appartiene, non tutto il
prodotto, finché l'autorizzazione per household resta onesta.

## Ops

I collaboratori aprono i link dei repo privati; questa pagina mostra i walkthrough sopra.
Swagger per lavoro locale sull'API. Temi e Auth0 fanno parte del deploy dell'app, non di un
prodotto console a parte.
