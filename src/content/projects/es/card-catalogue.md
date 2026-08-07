---
title: Card Catalogue
description: Un módulo diminuto de búsqueda full-text que indexa una carpeta de markdown y responde consultas en menos de un milisegundo, sin servidor.
lang: es
translationKey: card-catalogue
slug: card-catalogue
stack:
  - TypeScript
  - Node.js
  - SQLite
repoUrl: https://github.com/example/card-catalogue
demoUrl: https://example.com/card-catalogue
cover: ../../../assets/projects/indexer.png
coverAlt: Un cajón de fichero de madera abierto con fichas iluminadas acomodándose en una grilla por encima
order: 12
startedOn: 2023-03-05
---

Quería búsqueda en un sitio de documentación de unas novecientas páginas, y cada opción
que encontré necesitaba un servicio alojado o mandaba un índice de tres megabytes al
navegador.

Card Catalogue construye un índice invertido en tiempo de build y lo guarda en SQLite. Las
consultas corren contra una prepared statement, lo que significa que el costo de búsqueda
casi no se mueve entre cien y cien mil documentos.

## Las restricciones que le dieron forma

Sin llamadas de red, sin proceso en segundo plano, sin índice en el bundle del cliente.
Esas tres reglas eliminaron la mayor parte del espacio de diseño y volvieron fáciles las
decisiones restantes, que suele ser lo que hacen las buenas restricciones.

El stemming es deliberadamente ingenuo. Maneja plurales en inglés y poco más. Agregar un
stemmer de verdad casi triplicaba el peso de dependencias y mejoraba los resultados sobre
mi corpus en una medida que no pude medir, así que quedó afuera.
