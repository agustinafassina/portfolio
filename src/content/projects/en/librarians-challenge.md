---
title: Librarian's Challenge
description: A relaxing Phaser 3 browser game where you sort books on the shelf. 100 levels, LGBTQ+ catalogue tags, and a live demo you can play right now.
lang: en
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
coverAlt: Cozy library shelves with colourful books being sorted for Librarian's Challenge
featured: false
order: 12
startedOn: 2025-11-01
---

A messy shelf, a quiet library, one job: put the books back in order.

**Librarian's Challenge** is a small 2D browser game on **Phaser 3**. No framework, no
bundler. I made it to unwind: drag titles into place while the sort rule keeps changing.

Play it live: [game-library.agustinafassina.com](https://game-library.agustinafassina.com/)

## What you do

Drag books into slots. Each level teaches a rule (title, author, genre, year, or a mix) and
the shelf grows from a handful of books to dozens across pages. Optional timed or
move-limited challenges add a little pressure. Fail the bonus and you can still finish the
level. That was intentional: pressure without breaking the calm loop.

- **100 levels**, from 4 to 67 books ([LEVELS.md](https://github.com/agustinafassina/Library.LibrarianChallenge.Game/blob/main/LEVELS.md))
- **Mouse and touch**, including edge-drag to carry a book across shelf pages
- **Progress in `localStorage`**: unlocked levels, best scores, guest stats
- **EN / ES UI** from Settings
- **Books catalogue** to browse and filter by tag from the main menu

## Catalogue with LGBTQ+ tags

Gameplay can use a local offline catalogue (`data/books.json`, about 70 titles) or, when
enabled, pull real books from a companion **.NET API** via Google-by-tag search. Configured
tags include LGBTIQ+, queer, lesbian, gay, bisexual, trans, non-binary, intersex, feminism,
and activism. I wanted the shelves to hold stories that matter, not only filler titles.

Production keeps `useApiBooks: false` so the public demo works without shipping an API key.
If the API is down or CORS blocks the call, the game falls back to the local JSON and levels
still run.

## How it is built

| Piece | Choice |
| --- | --- |
| Engine | Phaser 3.80.1, vendored (no CDN at runtime) |
| Modules | Native ES modules: scenes, rules, storage, i18n |
| Render | WebGL canvas (`Phaser.AUTO`, Canvas2D fallback), `Scale.FIT` |
| Data | `fetch` for levels/books; optional API + Formspree feedback |
| Deploy | Docker + nginx, reverse-proxied on a Hetzner VPS behind HTTPS |

Rules live in `js/utils/rules.js`. Each level’s `rule` string maps to sort keys,
`getExpectedOrder()` builds the correct shelf, and `evaluateOrder()` scores every slot. A
Playwright smoke test opens `?test=1` and autosolves every level so solvability and progress
saving stay honest.

## Repositories

- [Library.LibrarianChallenge.Game](https://github.com/agustinafassina/Library.LibrarianChallenge.Game) (static Phaser client)
- Optional API: `Library.LibrarianChallenge.Game.Api` (live tagged books for local/dev)

Demo: [https://game-library.agustinafassina.com/](https://game-library.agustinafassina.com/)
