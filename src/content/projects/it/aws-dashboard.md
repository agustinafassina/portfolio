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
order: 0
startedOn: 2025-03-01
outcome: Un solo posto protetto da Auth0 per vedere rischi IAM, esposizione aperta, finding Inspector e concentrazione dei costi, senza saltare tra console.
problem: La console AWS risponde a “apri questa risorsa”. Fallisce su “quanto siamo esposti adesso?” su S3, EC2, RDS, IAM, Lambda, Inspector e Cost Explorer.
decision: Ho separato una UI Next.js da un'API di scansione .NET così il browser non tiene mai credenziali AWS. L'API cammina l'account con l'SDK dietro Auth0.
result: Chi fa review vede misconfigurazioni e credenziali vecchie in una dashboard, non un muro di toggle CIS che nessuno guarda.
---

## Contesto

La console AWS va bene quando sai già quale risorsa aprire. Risponde male a “quanto siamo
esposti adesso?” su S3, EC2, RDS, IAM, Lambda, Inspector e Cost Explorer in un posto solo.

Volevo una vista di postura che aprirei davvero in review: misconfigurazioni, credenziali
vecchie e concentrazione dei costi con check che contano, non un muro di toggle CIS che
nessuno guarda.

## Vincoli

- Nessuna AWS key nel browser. Mai.
- Preferire la catena credenziali di default dell'SDK (env, config condiviso o ruolo IAM)
  rispetto a uno secret store custom per locale e container.
- Poter rilasciare UI e scanner con cadenze diverse.
- Restare bilingue (EN/ES) senza un framework i18n pesante su ogni vista.

## Decisione di architettura

Ho diviso il prodotto in due repo pubblici. Il diagramma sopra è il trust path: Auth0 sul
bordo, Next.js per la UI, .NET per le scansioni.

| Pezzo | Repo | Ruolo |
| --- | --- | --- |
| **App** | [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) | UI protetta da Auth0: dashboard, costi, IAM, vulnerabilità, controlli security, audit |
| **API** | [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) | Backend REST: scansioni AWS SDK, architettura a strati, Swagger |

Perché non una sola app Next.js che parla con AWS solo dal server? Volevo un confine API
chiaro per altri client dopo, e uno stack .NET come quello che già uso sui backend. Perché
non solo Security Hub? Hub va bene quando è già cablato. Questa dashboard è la superficie
“aprila e guarda” per account dove mi servono ancora check custom e costo per tag nella
stessa sessione.

**Frontend:** Next.js 15 (App Router), TypeScript, Tailwind, Auth0, TanStack Query,
Recharts. Catch-all `home/[[...section]]` con viste keep-alive, temi chiaro/scuro e
`/guide` bilingue.

**API:** .NET 10 in quattro progetti (`Aws.Api`, `Aws.Services`, `Aws.Repository`,
`Aws.Models`). Gli endpoint regionali accettano `?region=`. IAM e Cost Explorer restano
globali. Le credenziali seguono la
[catena predefinita dell'AWS SDK](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/creds-locate.html).

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

```http
GET /api/v1/security/summary?region=us-east-1&days=30
GET /api/v1/iam/access-keys
GET /api/v1/ec2/open-ports?region=us-east-1
GET /api/v1/cost/by-project?startDate=2026-01-01&endDate=2026-01-31
```

## Sicurezza / blast radius

Auth0 chiude la UI. Il browser non tiene mai credenziali AWS. L'API cammina la catena sul
server e restituisce solo finding strutturati.

Il middleware cachea il JWT Auth0 in un cookie così le route protette non chiamano
`getSession` a ogni navigazione. Le soglie (CIDR pubblici, età massima access key,
retention minima backup RDS, paginazione Inspector, origini CORS) stanno in
`appsettings.json`, non nel bundle client.

Blast radius se il ruolo API è sovrapprivilegiato: ogni dominio di scansione diventa
leggibile. Least privilege su quel ruolo fa parte del deploy, non è un afterthought.

## Ops

Docker e Azure Pipelines sono pronti per deploy container su ECR/ACR. Punta l'API alle
credenziali, configura Auth0 sull'app, e hai postura on demand invece di un audit
trimestrale su spreadsheet.

Sta insieme agli [Allarmi AWS a livello account](/it/projects/aws-alarms-module-terraform):
la dashboard è pull (“cosa non va adesso?”), il modulo Terraform è push (“avvisami quando
succede”).

## Cosa farei diversamente

- Cache più aggressiva sulle finestre Cost Explorer costose; quelle query diventano care se
  rinfreschi senza pensare.
- Aggiungere un template IAM read-only nel repo così i permessi richiesti sono chiari dal
  giorno uno.
- Deep link verso la console AWS sui check più rumorosi, così la dashboard non è un vicolo
  cieco quando serve sistemare qualcosa.
