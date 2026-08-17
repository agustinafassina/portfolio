---
title: Librarian's Challenge
description: Un gioco browser rilassante in Phaser 3 in cui ordini i libri sullo scaffale — 100 livelli, catalogo con tag LGBTQ+ e demo live.
lang: it
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
coverAlt: Scaffali di biblioteca con libri colorati in fase di ordinamento — atmosfera del gioco Librarian's Challenge
featured: true
order: 2
startedOn: 2025-11-01
---

Uno scaffale in disordine, una biblioteca tranquilla e un solo compito: rimettere i libri
in ordine. **Librarian's Challenge** è un piccolo gioco 2D nel browser fatto con
**Phaser 3** — senza framework né bundler — pensato per rilassarsi mentre trascini i
titoli secondo regole di ordinamento che cambiano a ogni livello.

Giocalo live: [game-library.agustinafassina.com](https://game-library.agustinafassina.com/)

## Cosa fai

Trascini e rilasci i libri negli slot. Ogni livello introduce una nuova regola — titolo,
autore, genere, anno, o una regola combinata — e lo scaffale cresce da pochi libri a
decine su più pagine. Le challenge opzionali con limite di tempo o mosse aggiungono un
po' di pressione senza rompere il loop rilassato: fallisci il bonus, puoi comunque
finire il livello.

- **100 livelli** — da 4 a 67 libri ([LEVELS.md](https://github.com/agustinafassina/Library.LibrarianChallenge.Game/blob/main/LEVELS.md))
- **Mouse e touch** — trascina al bordo per cambiare pagina con il libro in mano
- **Progresso in `localStorage`** — livelli sbloccati, best score, stats guest
- **UI EN / ES** — cambio lingua in Settings
- **Catalogo Books** — cerca e filtra per tag dal menu

## Catalogo con tag LGBTQ+

Il gameplay può usare un catalogo offline locale (`data/books.json`, ~70 titoli) oppure,
se abilitato, scaricare libri reali da una **API .NET** companion via ricerca Google per
tag. I tag configurati includono LGBTIQ+, queer, lesbian, gay, bisexual, trans,
non-binary, intersex, feminism e activism — così gli scaffali riflettono storie che
contano, non solo filler generici.

In produzione `useApiBooks` resta `false` così la demo pubblica si gioca senza spedire
una API key. Se l'API cade o CORS blocca, il gioco torna al JSON locale e i livelli
continuano a funzionare.

## Come è costruito

| Pezzo | Scelta |
| --- | --- |
| Engine | Phaser 3.80.1, vendored (niente CDN a runtime) |
| Moduli | ES modules nativi — scene, rules, storage, i18n |
| Render | Canvas WebGL (`Phaser.AUTO`, fallback Canvas2D), `Scale.FIT` |
| Dati | `fetch` per levels/books; API opzionale + feedback Formspree |
| Deploy | Docker + nginx, reverse proxy su VPS Hetzner con HTTPS |

Le rules vivono in `js/utils/rules.js`: lo string `rule` di ogni livello mappa su sort
keys, `getExpectedOrder()` costruisce l'ordine corretto e `evaluateOrder()` valuta ogni
slot. Uno smoke test Playwright apre `?test=1` e autosolve tutti i livelli per
verificare solvability e salvataggio del progresso.

## Repository

- [Library.LibrarianChallenge.Game](https://github.com/agustinafassina/Library.LibrarianChallenge.Game) — client Phaser statico
- API opzionale: `Library.LibrarianChallenge.Game.Api` — libri taggati live per local/dev

Demo: [https://game-library.agustinafassina.com/](https://game-library.agustinafassina.com/)
