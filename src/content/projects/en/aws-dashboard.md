---
title: AWS Security Dashboard
description: A Next.js dashboard and .NET API that scan your AWS account for security gaps, IAM risks, Inspector findings, cost concentration, and tagging audits.
lang: en
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
coverAlt: Pixel-art desk with a monitor showing an automated document workflow — AWS security scanning and reporting
diagram: ../../../assets/projects/aws-dashboard/workflow.png
diagramAlt: Users authenticate via Auth0, the Next.js app routes to Vulnerabilities, IAM, and Costs modules, each calling the AWS REST API
featured: true
order: 5
startedOn: 2025-03-01
---

AWS consoles are great for fixing one resource at a time. They are less great for answering
“how exposed are we right now?” across S3, EC2, RDS, IAM, Lambda, Inspector, and Cost
Explorer in a single view. **AWS Security Dashboard** is a two-repo product — a **Next.js 15**
frontend and a **.NET 10** scanning API — that surfaces misconfigurations, stale credentials,
and cost concentration against well-known best practices.

## The ecosystem

| Piece | Repo | Role |
| --- | --- | --- |
| **App** | [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) | Auth0-protected UI — dashboard, costs, IAM, vulnerabilities, security checks, audits |
| **API** | [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) | REST backend — AWS SDK scans, layered architecture, Swagger |

Users log in through Auth0. The app calls the API with region-scoped queries; the API walks
the AWS credential chain and returns structured findings the UI can chart, filter, and export.

## Frontend

Built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, **NextUI**,
**Auth0**, **TanStack Query**, and **Recharts**.

- **Single catch-all route** — `home/[[...section]]` with keep-alive views for instant section switches
- **Collapsible sidebar** — persisted width, prefetch on mount
- **Light / dark themes** — manual toggle via `next-themes`
- **i18n** — English and Spanish via dictionary files; locale in cookie + `localStorage`
- **Costs module** — overview by project tag, advanced analyze view with concentration metrics, biggest movers, and comparison mode
- **Security modules** — open RDS/EC2 ports, public S3 buckets, missing encryption, public Lambda, expiring ACM certs, unused security groups, unattached EBS
- **IAM modules** — access key hygiene, users without MFA, risky/overprivileged policies, admin grants, cross-account roles
- **Inspector** — vulnerabilities grouped by ECR repository or EC2 instance
- **Audits** — resources missing the project tag, resources grouped by project tag
- **Site guide** — bilingual `/guide` page linked from the avatar menu

Middleware caches the Auth0 JWT in a cookie so protected routes skip redundant `getSession`
calls on every navigation.

## API

The backend is **.NET 10** with four projects: **Aws.Api** (controllers, middleware, Swagger),
**Aws.Services** (orchestration), **Aws.Repository** (AWS SDK integration), and **Aws.Models**
(DTOs and configuration).

Regional endpoints take `?region=` (e.g. `us-east-1`). IAM and Cost Explorer are global.
Credentials follow the [AWS SDK default chain](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/creds-locate.html) — env vars, `~/.aws/credentials`, or IAM role.

| Domain | What it checks |
| --- | --- |
| **Summary** | Regional scorecard aggregating counters from all scans |
| **S3** | Public buckets, encryption status |
| **EC2** | Open ports, unused security groups, unattached volumes, IMDSv1 |
| **RDS** | Open ports, unencrypted instances, backup retention |
| **IAM** | Access keys, MFA, risky policies, admin grants, cross-account roles, root account |
| **Lambda** | Publicly invocable functions |
| **ELB** | Internet-facing load balancers, unencrypted HTTP listeners |
| **ECR** | Public repository policies, scan-on-push disabled |
| **ACM** | Expiring and expired certificates |
| **Inspector** | Vulnerabilities for EC2, Lambda, and ECR |
| **Audits** | Untagged resources and resources by project tag |
| **Cost** | Costs grouped by project tag via Cost Explorer |

Representative endpoints:

```http
GET /api/v1/security/summary?region=us-east-1&days=30
GET /api/v1/iam/access-keys
GET /api/v1/ec2/open-ports?region=us-east-1
GET /api/v1/cost/by-project?startDate=2026-01-01&endDate=2026-01-31
```

Configurable thresholds live in `appsettings.json` — public CIDR lists, access key rotation
max age, minimum RDS backup retention, Inspector page size caps, and CORS origins for the
frontend. Docker and Azure Pipelines configs ship for container deployment to ECR/ACR.

## Repositories

- [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) — Next.js dashboard
- [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) — .NET REST API

Public repos — clone, point the API at your AWS credentials, configure Auth0 on the app, and
you have a security posture view that updates on demand instead of a quarterly spreadsheet audit.
