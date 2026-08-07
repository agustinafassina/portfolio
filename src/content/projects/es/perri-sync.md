---
title: Perri.Sync
description: Dashboard compartido para gastos, calendario, hábitos y tareas del hogar — con capa de juego WebGL y una API .NET detrás.
lang: es
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
coverAlt: Juego WebGL de Perri.Sync — Household World isométrico con tareas, hábitos y métricas compartidas
featured: true
order: 0
startedOn: 2024-09-01
---

Perri.Sync es un sistema operativo del hogar para parejas y personas que viven juntas — gastos,
calendario, hábitos, tareas, comidas, chat y cuidado de mascotas en un solo lugar. El producto
abarca cuatro repositorios: un dashboard en Next.js, una landing de marketing, una API .NET y
un juego WebGL que convierte las tareas diarias en algo que dan ganas de abrir.

## El ecosistema

| Pieza | Repo | Rol |
| --- | --- | --- |
| **Dashboard** | [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) | App principal — todas las funciones |
| **Landing** | [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) | Marketing y registro |
| **API** | [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) | Backend REST (Auth0 JWT, EF Core) |
| **Game** | [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) | Capa interactiva de tareas |

## Landing

La cara pública del producto — propuesta de valor, planes y el camino hacia la app.

<video src="/projects/perri-sync/landingpage.mp4" autoplay loop muted playsinline></video>

## Dashboard

Construido con **Next.js 15** (App Router), **React 18**, **TypeScript**, **Tailwind CSS**,
**Auth0**, **TanStack Query** y **Recharts**. Tres temas visuales con `next-themes`:

- **Light** — uso cotidiano
- **Dark** — modo noche
- **Game** — UI inspirada en Sims que combina con la capa WebGL

<video src="/projects/perri-sync/dashboard.mp4" autoplay loop muted playsinline></video>

El tema game no es un adorno sobre una planilla — es el mismo modelo de datos, las mismas
llamadas a la API, otra piel que hace que las tareas compartidas se sientan menos a regaño.

## Juego

Las tareas asignadas se sincronizan desde la API. En lugar de solo marcar un checkbox, las
completás dentro de una escena **WebGL** tipo life-sim — llevá al personaje al lavabo, la
ropa, la heladera.

<video src="/projects/perri-sync/game.mp4" autoplay loop muted playsinline></video>

Las tareas del dashboard aparecen en el juego. Terminalas de forma interactiva o volvé a la
vista checklist. Mismo hogar, dos formas de participar.

## API

El backend es **.NET 10** con arquitectura en capas: controllers → services → repositories →
models. **FluentValidation** en los DTOs, JWT de **Auth0** en cada ruta, y header
`X-Household-Id` para que un usuario pueda pertenecer a varios hogares sin mezclar datos.

Superficie representativa:

| Dominio | Endpoints | Feature |
| --- | --- | --- |
| Expenses | `GET /expenses/monthly`, `GET /expenses/summary` | Grilla de gastos compartidos |
| Calendar | CRUD `/calendar/events`, OAuth Google | Calendario del hogar |
| Chores | `GET /chores/assignments`, `PUT /chores/assignments` | Tareas diarias → juego |
| Habits | `GET /habits/today`, `PUT /habits/completions` | Seguimiento de hábitos |
| Settings | `GET /settings`, `POST /settings/members` | Hogares multi-miembro |
| Chat | `GET/POST /chat/messages` | Notas in-app |
| Meals | `GET/POST /meals/menus` | Planificación de comidas |
| Animals | CRUD `/animals/animals` | Cuidado de mascotas |
| Avatar | `GET/PUT /avatar` | Perfil / personaje del juego |

Un request autenticado típico:

```http
GET /api/v1/expenses/monthly?year=2026
Authorization: Bearer {jwt}
X-Household-Id: {household-guid}
```

Los planes de suscripción limitan algunas features — hogares free tienen chat y gastos; premium
desbloquea chores y más miembros. Swagger disponible en desarrollo en `/swagger`.

## Repositorios

- [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) — app Next.js
- [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) — landing
- [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) — API REST .NET
- [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) — build Unity WebGL

Repos privados — los links funcionan para colaboradores; el portfolio muestra el producto, no el árbol de código.
