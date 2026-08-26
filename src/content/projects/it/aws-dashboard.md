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
coverAlt: Scrivania pixel-art con un monitor che mostra un flusso automatizzato di documenti per scansione e report di sicurezza AWS
diagram: ../../../assets/projects/aws-dashboard/workflow.png
diagramAlt: Gli utenti si autenticano via Auth0, l'app Next.js instrada verso i moduli Vulnerabilities, IAM e Costs, ciascuno chiama la REST API AWS
featured: true
order: 5
startedOn: 2025-03-01
---

La console AWS va bene quando sai già quale risorsa aprire. Risponde male a “quanto siamo
esposti adesso?” su S3, EC2, RDS, IAM, Lambda, Inspector e Cost Explorer in un posto solo.

Ho costruito **AWS Security Dashboard** in due repo: una UI **Next.js 15** e un'API di
scansione **.NET 10**. Espone misconfigurazioni, credenziali vecchie e concentrazione dei
costi con check che mi interessano in review, non un muro di toggle CIS che nessuno guarda.

## I pezzi

| Pezzo | Repo | Ruolo |
| --- | --- | --- |
| **App** | [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) | UI protetta da Auth0: dashboard, costi, IAM, vulnerabilità, controlli security, audit |
| **API** | [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) | Backend REST: scansioni AWS SDK, architettura a strati, Swagger |

Entri con Auth0. L'app chiama l'API con query per regione. L'API percorre la catena di
credenziali AWS e restituisce finding strutturati che l'UI può graficare, filtrare ed
esportare.

## Frontend

**Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, **NextUI**, **Auth0**,
**TanStack Query** e **Recharts**.

- Route catch-all: `home/[[...section]]` con viste keep-alive per cambiare sezione in fretta
- Sidebar collassabile con larghezza persistita e prefetch al mount
- Temi chiaro / scuro con `next-themes`
- Inglese e spagnolo via dizionari; locale in cookie + `localStorage`
- Costi: overview per tag di progetto, vista analyze con concentrazione, biggest movers, confronto
- Security: porte aperte RDS/EC2, S3 pubblico, crittografia mancante, Lambda pubblica, ACM in scadenza, SG inutilizzati, EBS non collegati
- IAM: igiene access key, utenti senza MFA, policy rischiose o sovrapprivilegiate, grant admin, ruoli cross-account
- Inspector raggruppato per repository ECR o istanza EC2
- Audit su tag mancanti e risorse per tag di progetto
- Pagina `/guide` bilingue dal menu avatar

Il middleware cachea il JWT Auth0 in un cookie così le route protette non chiamano
`getSession` a ogni navigazione.

## API

**.NET 10** in quattro progetti: **Aws.Api** (controller, middleware, Swagger),
**Aws.Services** (orchestrazione), **Aws.Repository** (AWS SDK) e **Aws.Models** (DTO e
config).

Gli endpoint regionali accettano `?region=` (ad esempio `us-east-1`). IAM e Cost Explorer
sono globali. Le credenziali seguono la
[catena predefinita dell'AWS SDK](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/creds-locate.html):
variabili d'ambiente, `~/.aws/credentials` o un ruolo IAM.

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

Le soglie stanno in `appsettings.json`: liste CIDR pubbliche, età massima rotazione access
key, retention minima backup RDS, limiti di paginazione Inspector e origini CORS per il
frontend. Include Docker e Azure Pipelines per deploy container su ECR/ACR.

## Repository

- [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) (dashboard Next.js)
- [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) (API REST .NET)

Entrambi pubblici. Clona, punta l'API alle tue credenziali AWS, configura Auth0 sull'app, e
hai una vista di postura on demand invece di un audit trimestrale su spreadsheet.
