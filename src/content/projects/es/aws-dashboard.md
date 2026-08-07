---
title: AWS Security Dashboard
description: Dashboard Next.js y API .NET que escanean tu cuenta AWS en busca de brechas de seguridad, riesgos IAM, hallazgos de Inspector, concentración de costos y auditorías de tagging.
lang: es
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
coverAlt: Escritorio pixel-art con un monitor mostrando un flujo automatizado de documentos — escaneo y reporte de seguridad AWS
diagram: ../../../assets/projects/aws-dashboard/workflow.png
diagramAlt: Los usuarios se autentican vía Auth0, la app Next.js enruta a módulos de Vulnerabilities, IAM y Costs, cada uno llamando a la API REST de AWS
featured: true
order: 5
startedOn: 2025-03-01
---

Las consolas de AWS sirven para arreglar un recurso a la vez. Son menos útiles para responder
“¿qué tan expuestos estamos ahora?” en S3, EC2, RDS, IAM, Lambda, Inspector y Cost Explorer
en una sola vista. **AWS Security Dashboard** es un producto de dos repos — un frontend
**Next.js 15** y una API de escaneo **.NET 10** — que expone misconfiguraciones, credenciales
obsoletas y concentración de costos contra buenas prácticas conocidas.

## El ecosistema

| Pieza | Repo | Rol |
| --- | --- | --- |
| **App** | [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) | UI protegida con Auth0 — dashboard, costos, IAM, vulnerabilidades, controles de security, auditorías |
| **API** | [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) | Backend REST — escaneos con AWS SDK, arquitectura en capas, Swagger |

Los usuarios inician sesión con Auth0. La app llama a la API con consultas por región; la API
recorre la cadena de credenciales AWS y devuelve hallazgos estructurados que la UI puede
graficar, filtrar y exportar.

## Frontend

Construido con **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, **NextUI**,
**Auth0**, **TanStack Query** y **Recharts**.

- **Ruta catch-all única** — `home/[[...section]]` con vistas keep-alive para cambios instantáneos de sección
- **Sidebar colapsable** — ancho persistido, prefetch al montar
- **Temas claro / oscuro** — toggle manual con `next-themes`
- **i18n** — inglés y español con diccionarios; locale en cookie + `localStorage`
- **Módulo de costos** — overview por tag de proyecto, vista analyze con métricas de concentración, biggest movers y modo comparación
- **Módulos de Security** — puertos abiertos RDS/EC2, buckets S3 públicos, cifrado faltante, Lambda pública, ACM por vencer, security groups sin uso, EBS sin adjuntar
- **Módulos IAM** — higiene de access keys, users sin MFA, políticas riesgosas/sobreprivilegiadas, grants de admin, roles cross-account
- **Inspector** — vulnerabilidades agrupadas por repositorio ECR o instancia EC2
- **Auditorías** — recursos sin tag de proyecto, recursos agrupados por tag de proyecto
- **Guía del sitio** — página `/guide` bilingüe enlazada desde el menú del avatar

El middleware cachea el JWT de Auth0 en una cookie para que las rutas protegidas eviten
llamadas redundantes a `getSession` en cada navegación.

## API

El backend es **.NET 10** con cuatro proyectos: **Aws.Api** (controllers, middleware, Swagger),
**Aws.Services** (orquestación), **Aws.Repository** (integración AWS SDK) y **Aws.Models**
(DTOs y configuración).

Los endpoints regionales reciben `?region=` (ej. `us-east-1`). IAM y Cost Explorer son
globales. Las credenciales siguen la
[cadena por defecto del AWS SDK](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/creds-locate.html) — variables de entorno, `~/.aws/credentials` o rol IAM.

| Dominio | Qué revisa |
| --- | --- |
| **Summary** | Scorecard regional que agrega contadores de todos los escaneos |
| **S3** | Buckets públicos, estado de cifrado |
| **EC2** | Puertos abiertos, security groups sin uso, volúmenes sin adjuntar, IMDSv1 |
| **RDS** | Puertos abiertos, instancias sin cifrar, retención de backups |
| **IAM** | Access keys, MFA, políticas riesgosas, grants de admin, roles cross-account, cuenta root |
| **Lambda** | Funciones invocables públicamente |
| **ELB** | Load balancers internet-facing, listeners HTTP sin cifrar |
| **ECR** | Políticas de repositorio público, scan-on-push deshabilitado |
| **ACM** | Certificados vencidos o por vencer |
| **Inspector** | Vulnerabilidades en EC2, Lambda y ECR |
| **Audits** | Recursos sin tag y recursos por tag de proyecto |
| **Cost** | Costos agrupados por tag de proyecto vía Cost Explorer |

Endpoints representativos:

```http
GET /api/v1/security/summary?region=us-east-1&days=30
GET /api/v1/iam/access-keys
GET /api/v1/ec2/open-ports?region=us-east-1
GET /api/v1/cost/by-project?startDate=2026-01-01&endDate=2026-01-31
```

Los umbrales configurables viven en `appsettings.json` — listas de CIDR públicos, edad máxima
de rotación de access keys, retención mínima de backup RDS, límites de paginación de Inspector
y orígenes CORS para el frontend. Incluye configs de Docker y Azure Pipelines para deploy en
contenedor a ECR/ACR.

## Repositorios

- [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) — dashboard Next.js
- [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) — API REST .NET

Repos públicos — cloná, apuntá la API a tus credenciales AWS, configurá Auth0 en la app, y
tenés una vista de postura de seguridad que se actualiza on demand en lugar de una auditoría
trimestral en spreadsheet.
