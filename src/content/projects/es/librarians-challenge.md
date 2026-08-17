---
title: Librarian's Challenge
description: Un juego de navegador relajante en Phaser 3 donde ordenás libros en la estantería — 100 niveles, catálogo con tags LGBTQ+ y demo en vivo.
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
coverAlt: Estanterías de biblioteca con libros de colores siendo ordenados — atmósfera del juego Librarian's Challenge
featured: true
order: 2
startedOn: 2025-11-01
---

Una estantería desordenada, una biblioteca tranquila y un solo trabajo: volver a poner los
libros en orden. **Librarian's Challenge** es un juego 2D de navegador hecho con
**Phaser 3** — sin framework ni bundler — pensado para desconectar mientras arrastrás
títulos según reglas de ordenamiento que van cambiando.

Jugalo en vivo: [game-library.agustinafassina.com](https://game-library.agustinafassina.com/)

## Qué hacés

Arrastrás y soltás libros en los slots. Cada nivel enseña una regla nueva — título, autor,
género, año, o una regla combinada — y la estantería crece desde unos pocos libros hasta
decenas en varias páginas. Los challenges opcionales con límite de tiempo o movimientos
suman un poco de presión sin romper el loop relajado: fallás el bonus, igual podés
terminar el nivel.

- **100 niveles** — de 4 a 67 libros ([LEVELS.md](https://github.com/agustinafassina/Library.LibrarianChallenge.Game/blob/main/LEVELS.md))
- **Mouse y touch** — arrastrá al borde para pasar de página con el libro en mano
- **Progreso en `localStorage`** — niveles desbloqueados, mejores scores, stats de guest
- **UI EN / ES** — cambio de idioma en Settings
- **Catálogo Books** — buscar y filtrar por tag desde el menú

## Catálogo con tags LGBTQ+

El juego puede usar un catálogo offline local (`data/books.json`, ~70 títulos) o, si está
habilitado, traer libros reales desde una **API .NET** companion vía búsqueda Google por
tag. Los tags configurados incluyen LGBTIQ+, queer, lesbian, gay, bisexual, trans,
non-binary, intersex, feminism y activism — para que las estanterías reflejen historias
que importan, no solo fillers genéricos.

En producción `useApiBooks` queda en `false` para que la demo pública se pueda jugar sin
shippear una API key. Si la API cae o CORS bloquea, el juego vuelve al JSON local y los
niveles siguen funcionando.

## Cómo está armado

| Pieza | Elección |
| --- | --- |
| Engine | Phaser 3.80.1, vendored (sin CDN en runtime) |
| Módulos | ES modules nativos — escenas, rules, storage, i18n |
| Render | Canvas WebGL (`Phaser.AUTO`, fallback Canvas2D), `Scale.FIT` |
| Datos | `fetch` para levels/books; API opcional + feedback Formspree |
| Deploy | Docker + nginx, reverse proxy en VPS Hetzner con HTTPS |

Las rules viven en `js/utils/rules.js`: el string `rule` de cada nivel mapea a sort keys,
`getExpectedOrder()` arma el orden correcto y `evaluateOrder()` marca cada slot. Un smoke
test con Playwright abre `?test=1` y autosolvea todos los niveles para probar
solvability y progreso.

## Repositorios

- [Library.LibrarianChallenge.Game](https://github.com/agustinafassina/Library.LibrarianChallenge.Game) — cliente Phaser estático
- API opcional: `Library.LibrarianChallenge.Game.Api` — libros taggeados en vivo para local/dev

Demo: [https://game-library.agustinafassina.com/](https://game-library.agustinafassina.com/)
