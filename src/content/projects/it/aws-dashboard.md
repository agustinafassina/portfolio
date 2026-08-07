---
title: AWS Security Dashboard
description: Dashboard Next.js e API .NET che scansionano il tuo account AWS per gap di sicurezza, rischi IAM, finding Inspector, concentrazione dei costi e audit di tagging.
lang: it
translationKey: aws-dashboard
slug: aws-dashboard
stack:
  - .NET 10
  - Next.js
  - React
  - TypeScript
  - Auth0
  - AWS SDK
  - Tailwind CSS
repoUrl: https://github.com/agustinafassina/Aws.Dashboard.App
cover: ../../../assets/projects/aws-dashboard-cover.png
coverAlt: Scrivania pixel-art con un monitor che mostra un flusso automatizzato di documenti — scansione e report di sicurezza AWS
diagram: ../../../assets/projects/aws-dashboard/workflow.png
diagramAlt: Gli utenti si autenticano via Auth0, l'app Next.js instrada verso i moduli Vulnerabilities, IAM e Costs, ciascuno chiama la REST API AWS
featured: true
order: 5
startedOn: 2025-03-01
---

Le console AWS sono ottime per sistemare una risorsa alla volta. Meno utili per rispondere a
“quanto siamo esposti adesso?” su S3, EC2, RDS, IAM, Lambda, Inspector e Cost Explorer in
un'unica vista. **AWS Security Dashboard** è un prodotto a due repo — un frontend
**Next.js 15** e un'API di scansione **.NET 10** — che espone misconfigurazioni, credenziali
obsolete e concentrazione dei costi rispetto a best practice consolidate.

## L'ecosistema

| Pezzo | Repo | Ruolo |
| --- | --- | --- |
| **App** | [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) | UI protetta da Auth0 — dashboard, costi, IAM, vulnerabilità, controlli security, audit |
| **API** | [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) | Backend REST — scansioni AWS SDK, architettura a strati, Swagger |

Gli utenti accedono tramite Auth0. L'app chiama l'API con query per regione; l'API percorre la
catena di credenziali AWS e restituisce finding strutturati che l'UI può graficare, filtrare
ed esportare.

## Frontend

Costruito con **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, **NextUI**,
**Auth0**, **TanStack Query** e **Recharts**.

- **Route catch-all unica** — `home/[[...section]]` con viste keep-alive per cambi di sezione istantanei
- **Sidebar collassabile** — larghezza persistita, prefetch al mount
- **Temi chiaro / scuro** — toggle manuale con `next-themes`
- **i18n** — inglese e spagnolo con dizionari; locale in cookie + `localStorage`
- **Modulo costi** — overview per tag di progetto, vista analyze con metriche di concentrazione, biggest movers e modalità confronto
- **Moduli Security** — porte aperte RDS/EC2, bucket S3 pubblici, crittografia mancante, Lambda pubblica, ACM in scadenza, security group inutilizzati, EBS non collegati
- **Moduli IAM** — igiene access key, utenti senza MFA, policy rischiose/sovrapprivilegiate, grant admin, ruoli cross-account
- **Inspector** — vulnerabilità raggruppate per repository ECR o istanza EC2
- **Audit** — risorse senza tag di progetto, risorse raggruppate per tag di progetto
- **Guida del sito** — pagina `/guide` bilingue collegata dal menu avatar

Il middleware cachea il JWT Auth0 in un cookie così le route protette evitano chiamate
ridondanti a `getSession` a ogni navigazione.

## API

Il backend è **.NET 10** con quattro progetti: **Aws.Api** (controller, middleware, Swagger),
**Aws.Services** (orchestrazione), **Aws.Repository** (integrazione AWS SDK) e **Aws.Models**
(DTO e configurazione).

Gli endpoint regionali accettano `?region=` (es. `us-east-1`). IAM e Cost Explorer sono
globali. Le credenziali seguono la
[catena predefinita dell'AWS SDK](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/creds-locate.html) — variabili d'ambiente, `~/.aws/credentials` o ruolo IAM.

| Dominio | Cosa controlla |
| --- | --- |
| **Summary** | Scorecard regionale che aggrega i contatori di tutte le scansioni |
| **S3** | Bucket pubblici, stato crittografia |
| **EC2** | Porte aperte, security group inutilizzati, volumi non collegati, IMDSv1 |
| **RDS** | Porte aperte, istanze non crittografate, retention backup |
| **IAM** | Access key, MFA, policy rischiose, grant admin, ruoli cross-account, account root |
| **Lambda** | Funzioni invocabili pubblicamente |
| **ELB** | Load balancer internet-facing, listener HTTP non crittografati |
| **ECR** | Policy repository pubbliche, scan-on-push disabilitato |
| **ACM** | Certificati scaduti o in scadenza |
| **Inspector** | Vulnerabilità su EC2, Lambda ed ECR |
| **Audits** | Risorse senza tag e risorse per tag di progetto |
| **Cost** | Costi raggruppati per tag di progetto via Cost Explorer |

Endpoint rappresentativi:

```http
GET /api/v1/security/summary?region=us-east-1&days=30
GET /api/v1/iam/access-keys
GET /api/v1/ec2/open-ports?region=us-east-1
GET /api/v1/cost/by-project?startDate=2026-01-01&endDate=2026-01-31
```

Le soglie configurabili sono in `appsettings.json` — liste CIDR pubbliche, età massima rotazione
access key, retention minima backup RDS, limiti paginazione Inspector e origini CORS per il
frontend. Include config Docker e Azure Pipelines per deploy container su ECR/ACR.

## Repository

- [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) — dashboard Next.js
- [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) — API REST .NET

Repo pubblici — clona, punta l'API alle tue credenziali AWS, configura Auth0 sull'app, e hai
una vista della postura di sicurezza che si aggiorna on demand invece di un audit trimestrale
su spreadsheet.
