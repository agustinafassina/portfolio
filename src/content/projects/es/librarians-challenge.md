---
title: Librarian's Challenge
description: Un juego de navegador relajante en Phaser 3 donde ordenás libros en la estantería. 100 niveles, catálogo con tags LGBTQ+ y demo en vivo.
lang: es
translationKey: librarians-challenge
slug: librarians-challenge
stack:
  - Phaser 3
  - JavaScript
  - HTML5
  - WebGL
  - Docker
repoUrl: https://github.com/agustinafassina/Library.LibrarianChallenge.Game
demoUrl: https://game-library.agustinafassina.com/
cover: ../../../assets/projects/librarians-challenge-cover.png
coverAlt: Estanterías de biblioteca con libros de colores siendo ordenados en Librarian's Challenge
featured: true
order: 2
startedOn: 2025-11-01
---

Una estantería desordenada, una biblioteca tranquila, un solo trabajo: volver a poner los
libros en orden.

**Librarian's Challenge** es un juego 2D de navegador en **Phaser 3**. Sin framework, sin
bundler. Lo armé para desconectar: arrastrás títulos a su lugar mientras la regla de orden
va cambiando.

Jugalo en vivo: [game-library.agustinafassina.com](https://game-library.agustinafassina.com/)

## Qué hacés

Arrastrás libros a los slots. Cada nivel enseña una regla (título, autor, género, año, o una
mezcla) y la estantería crece de unos pocos libros a decenas en varias páginas. Los
challenges opcionales con tiempo o movimientos limitados suman un poco de presión. Fallás
el bonus y igual podés terminar el nivel. Eso fue a propósito: presión sin romper el loop
calmo.

- **100 niveles**, de 4 a 67 libros ([LEVELS.md](https://github.com/agustinafassina/Library.LibrarianChallenge.Game/blob/main/LEVELS.md))
- **Mouse y touch**, incluido arrastrar al borde para pasar de página con el libro en mano
- **Progreso en `localStorage`**: niveles desbloqueados, mejores scores, stats de guest
- **UI EN / ES** desde Settings
- **Catálogo Books** para buscar y filtrar por tag desde el menú

## Catálogo con tags LGBTQ+

El juego puede usar un catálogo offline local (`data/books.json`, unos 70 títulos) o, si
está habilitado, traer libros reales desde una **API .NET** companion vía búsqueda Google
por tag. Los tags incluyen LGBTIQ+, queer, lesbian, gay, bisexual, trans, non-binary,
intersex, feminism y activism. Quería que las estanterías tengan historias que importan, no
solo fillers.

En producción `useApiBooks` queda en `false` para que la demo pública se juegue sin
shippear una API key. Si la API cae o CORS bloquea, vuelve al JSON local y los niveles
siguen andando.

## Cómo está armado

| Pieza | Elección |
| --- | --- |
| Engine | Phaser 3.80.1, vendored (sin CDN en runtime) |
| Módulos | ES modules nativos: escenas, rules, storage, i18n |
| Render | Canvas WebGL (`Phaser.AUTO`, fallback Canvas2D), `Scale.FIT` |
| Datos | `fetch` para levels/books; API opcional + feedback Formspree |
| Deploy | Docker + nginx, reverse proxy en VPS Hetzner con HTTPS |

Las rules viven en `js/utils/rules.js`. El string `rule` de cada nivel mapea a sort keys,
`getExpectedOrder()` arma el orden correcto y `evaluateOrder()` marca cada slot. Un smoke
test con Playwright abre `?test=1` y autosolvea todos los niveles para que solvability y
progreso no mientan.

## Repositorios

- [Library.LibrarianChallenge.Game](https://github.com/agustinafassina/Library.LibrarianChallenge.Game) (cliente Phaser estático)
- API opcional: `Library.LibrarianChallenge.Game.Api` (libros taggeados en vivo para local/dev)

Demo: [https://game-library.agustinafassina.com/](https://game-library.agustinafassina.com/)
