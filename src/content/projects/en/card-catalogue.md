---
title: Card Catalogue
description: A tiny full-text search module that indexes a folder of markdown and answers queries in under a millisecond, with no server.
lang: en
translationKey: card-catalogue
slug: card-catalogue
stack:
  - TypeScript
  - Node.js
  - SQLite
repoUrl: https://github.com/example/card-catalogue
demoUrl: https://example.com/card-catalogue
cover: ../../../assets/projects/indexer.png
coverAlt: An open wooden card catalogue drawer with glowing index cards arranging themselves into a grid above it
order: 3
startedOn: 2023-03-05
---

I wanted search on a documentation site with about nine hundred pages, and every option I
found either needed a hosted service or shipped a three megabyte index to the browser.

Card Catalogue builds an inverted index at build time and stores it in SQLite. Queries run
against a prepared statement, which means the lookup cost barely moves between one hundred
and one hundred thousand documents.

## Constraints that shaped it

No network calls, no background process, no index in the client bundle. Those three rules
removed most of the design space and made the remaining decisions easy, which is usually
what good constraints do.

Stemming is deliberately naive. It handles English plurals and little else. Adding a real
stemmer roughly tripled the dependency weight and improved results on my corpus by an
amount I could not measure, so it stayed out.
