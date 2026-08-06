---
title: Card Catalogue
description: Un modulo minuscolo di ricerca full-text che indicizza una cartella di markdown e risponde alle query in meno di un millisecondo, senza server.
lang: it
translationKey: card-catalogue
slug: card-catalogue
stack:
  - TypeScript
  - Node.js
  - SQLite
repoUrl: https://github.com/example/card-catalogue
demoUrl: https://example.com/card-catalogue
cover: ../../../assets/projects/indexer.png
coverAlt: Un cassetto di schedario in legno aperto con schede luminose che si dispongono in una griglia sopra di esso
order: 3
startedOn: 2023-03-05
---

Volevo la ricerca su un sito di documentazione di circa novecento pagine, e ogni opzione
che trovavo richiedeva un servizio ospitato oppure spediva un indice da tre megabyte al
browser.

Card Catalogue costruisce un indice invertito in fase di build e lo salva in SQLite. Le
query girano contro una prepared statement, il che significa che il costo di lookup si
muove appena tra cento e centomila documenti.

## I vincoli che gli hanno dato forma

Nessuna chiamata di rete, nessun processo in background, nessun indice nel bundle del
client. Quelle tre regole hanno eliminato gran parte dello spazio di progettazione e reso
facili le decisioni rimanenti, che è di solito ciò che fanno i buoni vincoli.

Lo stemming è deliberatamente ingenuo. Gestisce i plurali inglesi e poco altro. Aggiungere
uno stemmer vero triplicava quasi il peso delle dipendenze e migliorava i risultati sul mio
corpus di una quantità che non riuscivo a misurare, quindi è rimasto fuori.
