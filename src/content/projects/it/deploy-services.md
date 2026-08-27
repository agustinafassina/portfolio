---
title: Deploy Services
description: Guida decisionale su tre modelli di deploy AWS (container sempre attivi, task Fargate schedulati e siti statici su S3) per scegliere il compute in base al carico, non per abitudine.
lang: it
translationKey: deploy-services
slug: deploy-services
stack:
  - AWS
  - ECS
  - Fargate
  - ECR
  - S3
  - CloudFormation
repoUrl: https://github.com/agustinafassina/Aws.Solutions.Architecture/tree/main/deploy-services
cover: ../../../assets/projects/pipeline.png
coverAlt: Un nastro trasportatore di casse etichettate che passa attraverso tre archi di controllo verso una spia verde di verifica
diagram: ../../../assets/projects/deploy-services-diagram.jpg
diagramAlt: "Tre modelli di deploy AWS: container ECS sempre attivi, task Fargate con EventBridge e siti statici su S3"
featured: false
draft: true
order: 11
startedOn: 2024-06-01
---

Parte di [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture),
una raccolta di architetture di riferimento e guide brevi. Questa cartella è la porta
d'ingresso: tre modelli di deploy allineati a ciò che stai davvero pubblicando.

L'ho scritta perché in review arriva “mettiamolo su ECS” prima della domanda utile. Deve
restare acceso tutto il giorno? È un job che parte, finisce e si spegne? O sono solo file?

## I tre modelli

| Modello | Quando usarlo | Cosa gira |
| --- | --- | --- |
| **1. Container (ECS)** | API e backend che devono restare **sempre attivi** dietro un ALB | Immagine Docker su ECR, ECS Service con `desiredCount ≥ 1` |
| **2. Fargate + EventBridge** | Job che **partono su evento o schedule**, girano e **si spengono** | `RunTask` su Fargate (niente servizio 24/7, niente ALB) |
| **3. Sito statico (S3)** | HTML, CSS, JS **senza server** | Bucket S3 (CloudFront opzionale), infra con CloudFormation |

Il modello 1 è traffico utente via ALB. Il 2 è cron, migrazioni, report notturni: tutto ciò
che non dovrebbe pagare compute fermo. Il 3 è siti come questo portfolio. Build una volta,
servire file on demand.

## Cosa c'è nel repo

- Diagramma comparativo e flowchart decisionale (`diagram.jpg`)
- Link a cartelle più profonde: uno stack ECS più completo con controlli di sicurezza,
  scheduling con EventBridge e hosting statico S3 con CloudFormation
- Tabella dei criteri: forma del carico, driver di costo e pattern tipici

## Perché esiste

È documentazione, non una pipeline di deploy. L'obiettivo è un vocabolario condiviso prima
di aprire la console. “Ci serve ECS” diventa “ci serve il Modello 1 su Fargate” oppure
“questo è il Modello 2, smettiamo di pagare un servizio che dorme tutto il giorno.”
