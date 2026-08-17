---
title: Librarian's Challenge
description: A relaxing Phaser 3 browser game where you sort books on the shelf — 100 levels, LGBTQ+ catalogue tags, and a live demo you can play right now.
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
coverAlt: Cozy library shelves with colourful books being sorted — Librarian's Challenge game atmosphere
featured: true
order: 2
startedOn: 2025-11-01
---

A messy shelf, a calm library, and one job: put the books back in order. **Librarian's
Challenge** is a small 2D browser game built with **Phaser 3** — no framework, no bundler —
made to unwind while you drag titles into place under changing sort rules.

Play it live: [game-library.agustinafassina.com](https://game-library.agustinafassina.com/)

## What you do

Drag and drop books into slots. Each level teaches a new rule — title, author, genre, year,
or a combined rule — and the shelf grows from a handful of books to dozens across multiple
pages. Optional timed or move-limited challenges add a little pressure without breaking the
relaxing loop: fail the bonus, still finish the level.

- **100 levels** — book count scales from 4 to 67 ([LEVELS.md](https://github.com/agustinafassina/Library.LibrarianChallenge.Game/blob/main/LEVELS.md))
- **Mouse and touch** — edge-drag to carry a book across shelf pages
- **Progress in `localStorage`** — unlocked levels, best scores, guest stats
- **EN / ES UI** — language switch in Settings
- **Books catalogue** — browse and filter by tag from the main menu

## Catalogue with LGBTQ+ tags

Gameplay can use a local offline catalogue (`data/books.json`, ~70 titles) or, when enabled,
pull real books from a companion **.NET API** via Google-by-tag search. Configured tags
include LGBTIQ+, queer, lesbian, gay, bisexual, trans, non-binary, intersex, feminism, and
activism — so the shelves reflect stories that matter, not only generic filler titles.

Production defaults keep `useApiBooks: false` so the public demo stays playable without
shipping an API key. If the API is down or CORS blocks the request, the game falls back to
the local JSON and levels still work.

## How it is built

| Piece | Choice |
| --- | --- |
| Engine | Phaser 3.80.1, vendored (no CDN at runtime) |
| Modules | Native ES modules — scenes, rules, storage, i18n |
| Render | WebGL canvas (`Phaser.AUTO`, Canvas2D fallback), `Scale.FIT` |
| Data | `fetch` for levels/books; optional API + Formspree feedback |
| Deploy | Docker + nginx, reverse-proxied on a Hetzner VPS behind HTTPS |

Rules live in `js/utils/rules.js`: each level’s `rule` string maps to sort keys,
`getExpectedOrder()` builds the correct shelf, and `evaluateOrder()` scores every slot.
A Playwright smoke test opens `?test=1` and autosolves every level to prove solvability and
progress saving.

## Repositories

- [Library.LibrarianChallenge.Game](https://github.com/agustinafassina/Library.LibrarianChallenge.Game) — static Phaser client
- Optional API: `Library.LibrarianChallenge.Game.Api` — live tagged books for local/dev

Demo: [https://game-library.agustinafassina.com/](https://game-library.agustinafassina.com/)
