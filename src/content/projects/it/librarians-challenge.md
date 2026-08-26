---
title: Librarian's Challenge
description: Un gioco browser rilassante in Phaser 3 in cui ordini i libri sullo scaffale. 100 livelli, catalogo con tag LGBTQ+ e demo live.
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
coverAlt: Scaffali di biblioteca con libri colorati in fase di ordinamento nel gioco Librarian's Challenge
featured: false
order: 12
startedOn: 2025-11-01
---

Uno scaffale in disordine, una biblioteca tranquilla, un solo compito: rimettere i libri in
ordine.

**Librarian's Challenge** è un piccolo gioco 2D nel browser su **Phaser 3**. Niente
framework, niente bundler. L'ho fatto per staccare: trascini i titoli al posto giusto mentre
la regola di ordinamento continua a cambiare.

Giocalo live: [game-library.agustinafassina.com](https://game-library.agustinafassina.com/)

## Cosa fai

Trascini i libri negli slot. Ogni livello introduce una regola (titolo, autore, genere,
anno, o un mix) e lo scaffale cresce da pochi libri a decine su più pagine. Le challenge
opzionali con tempo o mosse limitate aggiungono un po' di pressione. Fallisci il bonus e
puoi comunque finire il livello. Voluto: pressione senza rompere il loop calmo.

- **100 livelli**, da 4 a 67 libri ([LEVELS.md](https://github.com/agustinafassina/Library.LibrarianChallenge.Game/blob/main/LEVELS.md))
- **Mouse e touch**, incluso trascinare al bordo per cambiare pagina con il libro in mano
- **Progresso in `localStorage`**: livelli sbloccati, best score, stats guest
- **UI EN / ES** da Settings
- **Catalogo Books** per cercare e filtrare per tag dal menu

## Catalogo con tag LGBTQ+

Il gameplay può usare un catalogo offline locale (`data/books.json`, circa 70 titoli)
oppure, se abilitato, scaricare libri reali da una **API .NET** companion via ricerca Google
per tag. I tag includono LGBTIQ+, queer, lesbian, gay, bisexual, trans, non-binary,
intersex, feminism e activism. Volevo scaffali con storie che contano, non solo filler.

In produzione `useApiBooks` resta `false` così la demo pubblica si gioca senza spedire una
API key. Se l'API cade o CORS blocca, torna al JSON locale e i livelli continuano.

## Come è costruito

| Pezzo | Scelta |
| --- | --- |
| Engine | Phaser 3.80.1, vendored (niente CDN a runtime) |
| Moduli | ES modules nativi: scene, rules, storage, i18n |
| Render | Canvas WebGL (`Phaser.AUTO`, fallback Canvas2D), `Scale.FIT` |
| Dati | `fetch` per levels/books; API opzionale + feedback Formspree |
| Deploy | Docker + nginx, reverse proxy su VPS Hetzner con HTTPS |

Le rules vivono in `js/utils/rules.js`. Lo string `rule` di ogni livello mappa su sort keys,
`getExpectedOrder()` costruisce l'ordine corretto e `evaluateOrder()` valuta ogni slot. Uno
smoke test Playwright apre `?test=1` e autosolve tutti i livelli così solvability e
salvataggio del progresso restano onesti.

## Repository

- [Library.LibrarianChallenge.Game](https://github.com/agustinafassina/Library.LibrarianChallenge.Game) (client Phaser statico)
- API opzionale: `Library.LibrarianChallenge.Game.Api` (libri taggati live per local/dev)

Demo: [https://game-library.agustinafassina.com/](https://game-library.agustinafassina.com/)
