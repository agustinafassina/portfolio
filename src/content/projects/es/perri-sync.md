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
diagram: ../../../assets/projects/perri-sync/workflow.png
diagramAlt: Flujo del producto desde Landing y Auth0, elección de hogar en el Dashboard, API .NET y juego WebGL, compartiendo JWT y X-Household-Id
featured: true
order: 2
startedOn: 2024-09-01
outcome: Un producto del hogar para gastos, calendario, hábitos y tareas, con API .NET y hogares multi-tenant con Auth0.
problem: Las parejas corren la casa entre planillas y chats hasta que algo se pierde entre apps.
decision: Cuatro repos (dashboard, landing, API, juego WebGL) con JWT y scope por hogar, en vez de un monolito o contraseñas compartidas.
result: La operatoria compartida de la casa vive en un solo producto, con una capa de juego para que las tareas se abran porque querés, no solo porque toca.
metrics:
  - label: Blast radius del tenant
    value: 1 hogar
  - label: Gate de auth
    value: JWT + membership
---

## Contexto

Gastos en una planilla. Tareas en otro chat. El calendario en otro lado. Así terminan
corriendo la casa un montón de parejas, hasta que algo se pierde entre apps.

Armé Perri.Sync para que eso viva en un solo lugar: gastos, calendario, hábitos, tareas,
comidas, un chat chico y cuidado de mascotas. La capa de juego hace que “¿quién lava los
platos?” sea algo que abrís porque querés, no solo porque toca.

## Restricciones

- Los repos quedan privados. Esta página tiene que mostrar el producto sin el árbol de
  código.
- Una persona puede estar en más de un hogar sin mezclar datos.
- Free vs premium se tiene que poder exigir en la API, no solo en una página de precios.
- La capa WebGL usa las mismas asignaciones que la UI checklist. Dos pieles, un modelo.

## Decisión de arquitectura

Cuatro repos, un producto. El diagrama de arriba es el camino del usuario: landing → Auth0 →
dashboard (elegir hogar) → API, y el juego WebGL reusa el mismo JWT y `X-Household-Id`.
¿Por qué no un monolito? El build del juego, el sitio de marketing y la API salen en
relojes distintos. ¿Por qué no una contraseña compartida para la casa? Auth0 por usuario
más membership del hogar es el trust model.

| Pieza | Repo | Rol |
| --- | --- | --- |
| **Dashboard** | [Perri.Sync.Dashboard.New](https://github.com/agustinafassina/Perri.Sync.Dashboard.New) | App principal, todas las funciones |
| **Landing** | [Perri.Sync.Landingpage](https://github.com/agustinafassina/Perri.Sync.Landingpage) | Marketing y registro |
| **API** | [Perri.Sync.Api](https://github.com/agustinafassina/Perri.Sync.Api) | Backend REST (Auth0 JWT, EF Core) |
| **Game** | [Perri.Sync.Game.WebGL](https://github.com/agustinafassina/Perri.Sync.Game.WebGL) | Capa interactiva de tareas |

**Landing** es la cara pública: qué hace, los planes y cómo entrás.

<video src="/projects/perri-sync/landingpage.mp4" autoplay loop muted playsinline></video>

**Dashboard** es Next.js 15, React 18, TypeScript, Tailwind, Auth0, TanStack Query,
Recharts. Tres temas con `next-themes`: Light, Dark y Game (UI tipo Sims alineada a la capa
WebGL). Mismo modelo de datos, mismas llamadas a la API, otra piel.

<video src="/projects/perri-sync/dashboard.mp4" autoplay loop muted playsinline></video>

**Game** sincroniza asignaciones desde la API. Completás tareas dentro de una escena WebGL
life-sim o volvés a la checklist. Mismo hogar, dos formas de entrar.

<video src="/projects/perri-sync/game.mp4" autoplay loop muted playsinline></video>

**API** es .NET 10 en capas controllers → services → repositories → models, con
FluentValidation en los DTOs. Una muestra de la superficie (hay más dominios: calendar,
habits, chat, meals, pets):

| Dominio | Endpoints | Feature |
| --- | --- | --- |
| Expenses | `GET /expenses/monthly`, `GET /expenses/summary` | Grilla de gastos compartidos |
| Chores | `GET /chores/assignments`, `PUT /chores/assignments` | Tareas diarias → juego |
| Settings | `GET /settings`, `POST /settings/members` | Hogares multi-miembro |
| Avatar | `GET/PUT /avatar` | Perfil / personaje del juego |

```http
GET /api/v1/expenses/monthly?year=2026
Authorization: Bearer {jwt}
X-Household-Id: {household-guid}
```

## Seguridad / blast radius

JWT de Auth0 en cada ruta. `X-Household-Id` scopea el request. La membership se chequea en
el server para que un hogar no lea otro cambiando el header (IDOR clásico si te salteás ese
check). El diagrama de workflow de arriba es el camino del producto. El dashboard guarda el
hogar activo en `localStorage` y lo manda en cada call; cambiar de casa cambia el header,
no los claims del JWT. El tenant no va embebido en el token a propósito: la membership es
un join en DB entre Auth0 `sub` y household id. Fail closed en la capa de servicio:

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

Los hogares free tienen chat y gastos. Premium desbloquea chores y más miembros. Ese gate
vive en la API. Swagger queda en desarrollo en `/swagger` solamente.

Blast radius de un JWT filtrado: un usuario en los hogares a los que pertenece, no todo el
producto, mientras la autorización por hogar se mantenga honesta.

## Ops

Los colaboradores abren los links de repos privados; esta página muestra los walkthroughs
de arriba. Swagger para trabajo local de API. Temas y Auth0 forman parte del deploy de la
app, no de un producto de consola aparte.
