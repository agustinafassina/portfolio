---
title: Perri.Sync
description: App compartida del hogar para gastos, calendario, hábitos y tareas, con una capa de juego WebGL y una API .NET detrás.
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
coverAlt: Juego WebGL de Perri.Sync, Household World isométrico con tareas, hábitos y métricas compartidas
featured: true
order: 0
startedOn: 2024-09-01
---

Gastos en una planilla. Tareas en otro chat. El calendario en otro lado. Así terminan
corriendo la casa un montón de parejas, hasta que algo se pierde entre apps.

Armé Perri.Sync para que eso viva en un solo lugar: gastos, calendario, hábitos, tareas,
comidas, un chat chico y cuidado de mascotas. Son cuatro repos. Un dashboard en Next.js,
una landing, una API .NET y un juego WebGL que hace que “¿quién lava los platos?” sea algo
que abrís porque querés, no solo porque toca.

## Las piezas

| Pieza | Repo | Rol |
| --- | --- | --- |
| **Dashboard** | [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) | App principal, todas las funciones |
| **Landing** | [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) | Marketing y registro |
| **API** | [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) | Backend REST (Auth0 JWT, EF Core) |
| **Game** | [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) | Capa interactiva de tareas |

## Landing

La cara pública: qué hace, los planes y cómo entrás.

<video src="/projects/perri-sync/landingpage.mp4" autoplay loop muted playsinline></video>

## Dashboard

**Next.js 15** (App Router), **React 18**, **TypeScript**, **Tailwind CSS**, **Auth0**,
**TanStack Query** y **Recharts**. Tres temas con `next-themes`:

- **Light** para el día a día
- **Dark** para de noche
- **Game** con una UI tipo Sims que pegue con la capa WebGL

<video src="/projects/perri-sync/dashboard.mp4" autoplay loop muted playsinline></video>

El tema game no es un sticker sobre una planilla. Mismo modelo de datos, mismas llamadas a
la API, otra piel. Las tareas compartidas se sienten menos a regaño y más a espacio en
común.

## Juego

Las asignaciones llegan desde la API. En lugar de solo tildar un checkbox, las completás
dentro de una escena **WebGL** tipo life-sim: llevá al personaje al lavabo, a la ropa, a la
heladera.

<video src="/projects/perri-sync/game.mp4" autoplay loop muted playsinline></video>

Lo que asignás en el dashboard aparece en el juego. Lo terminás jugando o volvés a la vista
checklist. Mismo hogar, dos formas de entrar.

## API

**.NET 10**, en capas de siempre: controllers → services → repositories → models.
**FluentValidation** en los DTOs, JWT de **Auth0** en cada ruta, y el header
`X-Household-Id` para que un usuario pueda estar en más de un hogar sin mezclar datos.

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

Los hogares free tienen chat y gastos. Premium desbloquea chores y más miembros. Swagger
queda en desarrollo en `/swagger`.

## Repositorios

- [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) (app Next.js)
- [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) (landing)
- [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) (API REST .NET)
- [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) (build Unity WebGL)

Los repos son privados. Los colaboradores abren los links; esta página muestra el producto,
no el árbol de código.
