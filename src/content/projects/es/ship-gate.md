---
title: Ship Gate
description: Un guardián de despliegues que bloquea las releases que fallan cualquiera de cuatro chequeos, y explica exactamente cuál en lenguaje claro.
lang: es
translationKey: ship-gate
slug: ship-gate
stack:
  - Go
  - GitHub Actions
  - Terraform
  - PostgreSQL
repoUrl: https://github.com/example/ship-gate
cover: ../../../assets/projects/pipeline.png
coverAlt: Una cinta transportadora de cajas etiquetadas pasando por tres arcos hacia una lámpara verde de visto bueno
featured: false
order: 11
startedOn: 2023-08-21
---

Teníamos un pipeline de despliegue que técnicamente estaba en verde y en la práctica no
era confiable. Los chequeos existían, pero estaban repartidos en tres sistemas y
cualquiera se podía saltear con un mensaje de commit que nadie revisaba.

Ship Gate colapsa esos chequeos en un único estado obligatorio. Una release pasa solo si
las migraciones son reversibles, no aparecen secretos en el diff, el error budget del
servicio está por encima del umbral y el despliegue anterior lleva treinta minutos estable.

## La parte que importó

La ingeniería interesante no fueron los chequeos, fueron los mensajes de error. La primera
versión devolvía el nombre del chequeo y un código de salida, y la gente respondía
volviéndolo a correr hasta que pasara. Reescribir la salida para que dijera qué migración
era irreversible, y qué agregarle para volverla reversible, redujo los pedidos de
excepción casi a cero.

Un control que la gente esquiva es peor que no tener control, porque produce el papeleo
de la seguridad sin la seguridad.
