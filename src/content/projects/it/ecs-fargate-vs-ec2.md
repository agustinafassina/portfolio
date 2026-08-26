---
title: ECS Fargate vs EC2
description: "Guida decisionale sui launch type ECS e i pattern di task: chi fornisce il compute e se il carico è batch, event-driven o always-on."
lang: it
translationKey: ecs-fargate-vs-ec2
slug: ecs-fargate-vs-ec2
stack:
  - AWS
  - ECS
  - Fargate
  - EC2
  - ECR
repoUrl: https://github.com/agustinafassina/Aws.Solutions.Architecture/tree/main/ecs-fargate-vs-ec2
cover: ../../../assets/projects/indexer.png
coverAlt: Un cassetto di schedario di legno aperto con schede indice luminose che si dispongono in una griglia sopra di esso
diagram: ../../../assets/projects/ecs-fargate-diagram.jpg
diagramAlt: "ECS Fargate vs EC2: stesse immagini Docker da ECR, diversi layer di compute e pattern di task"
featured: false
order: 14
startedOn: 2024-08-10
---

Parte di [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture).

Nelle review spesso si mischiano due domande in una. Le tengo separate apposta:

1. **Capacità:** chi fornisce il compute, **Fargate** (serverless) o **EC2** (gestisci gli host)
2. **Pattern di carico:** come gira il task (one-off, scale-to-zero su eventi, o always-on)

Entrambi i launch type usano la **stessa immagine Docker da ECR**. La differenza non è il
formato del container. È chi patcha gli host e come paghi la capacità ferma.

## Pattern di task

| Pattern | Come gira | Uso tipico |
| --- | --- | --- |
| **One-off / batch** | `RunTask` o EventBridge Scheduler, poi si spegne | Migrazioni, report notturni, cron |
| **Event-driven (scale-to-zero)** | Service con `min = 0`, scalato da SQS o EventBridge | Worker di coda, job async |
| **Always-on** | Service con `desiredCount ≥ 1` dietro un ALB | API, web app, consumer persistenti |

Qualsiasi pattern funziona su **entrambi** i launch type. Un servizio daemon (un task per
host) esiste **solo su EC2**.

## Fargate vs EC2: scelta rapida

| Propendi per **Fargate** quando… | Propendi per **EC2** quando… |
| --- | --- |
| Nessun patching host né sizing del cluster | GPU, famiglie di istanza speciali, accesso al kernel |
| Carico variabile, basso o imprevedibile | Alta densità stabile (bin-packing di molti task per istanza) |
| Team piccolo, percorso più rapido in produzione | Risparmio aggressivo con **Spot** su flotta stabile |

## Cosa c'è nel repo

- Diagramma affiancato: ECR in alto, Fargate a sinistra, EC2 a destra, pattern sotto
- Tabella decisionale completa (billing, densità, Spot, modalità di rete, overhead operativo)
- Sezione “evitare” per mismatch comuni, tipo pagare 24/7 per un job che dovrebbe essere scheduled

## Perché esiste

“Usiamo Fargate?” è la domanda sbagliata all'inizio. Chiedi se è batch, event-driven o
always-on, e chi dovrebbe gestire gli host. Arrivi prima alla risposta. Questa cartella è
quella cheat sheet, con link ai diagrammi di infrastruttura più completi altrove nel repo.
