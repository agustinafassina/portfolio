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
coverAlt: Escritorio pixel-art con un monitor mostrando un flujo automatizado de documentos para escaneo y reporte de seguridad AWS
diagram: ../../../assets/projects/aws-dashboard/workflow.png
diagramAlt: Los usuarios se autentican vía Auth0, la app Next.js enruta a módulos de Vulnerabilities, IAM y Costs, cada uno llamando a la API REST de AWS
featured: true
order: 0
startedOn: 2025-03-01
---

La consola de AWS sirve cuando ya sabés qué recurso abrir. Responde mal a “¿qué tan
expuestos estamos ahora?” en S3, EC2, RDS, IAM, Lambda, Inspector y Cost Explorer en un solo
lugar.

Armé **AWS Security Dashboard** en dos repos: una UI **Next.js 15** y una API de escaneo
**.NET 10**. Expone misconfiguraciones, credenciales viejas y concentración de costos con
checks que me importan en una review, no un muro de toggles CIS que nadie mira.

## Las piezas

| Pieza | Repo | Rol |
| --- | --- | --- |
| **App** | [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) | UI con Auth0: dashboard, costos, IAM, vulnerabilidades, controles de security, auditorías |
| **API** | [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) | Backend REST: escaneos con AWS SDK, arquitectura en capas, Swagger |

Entrá con Auth0. La app llama a la API con queries por región. La API recorre la cadena de
credenciales AWS y devuelve hallazgos estructurados que la UI puede graficar, filtrar y
exportar.

## Frontend

**Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, **NextUI**, **Auth0**,
**TanStack Query** y **Recharts**.

- Ruta catch-all: `home/[[...section]]` con vistas keep-alive para cambiar de sección rápido
- Sidebar colapsable con ancho persistido y prefetch al montar
- Temas claro / oscuro con `next-themes`
- Inglés y español por diccionarios; locale en cookie + `localStorage`
- Costos: overview por tag de proyecto, vista analyze con concentración, biggest movers, comparación
- Security: puertos abiertos RDS/EC2, S3 público, cifrado faltante, Lambda pública, ACM por vencer, SG sin uso, EBS sin adjuntar
- IAM: higiene de access keys, users sin MFA, políticas riesgosas o sobreprivilegiadas, grants de admin, roles cross-account
- Inspector agrupado por repositorio ECR o instancia EC2
- Auditorías de tags faltantes y recursos por tag de proyecto
- Página `/guide` bilingüe desde el menú del avatar

El middleware cachea el JWT de Auth0 en una cookie para que las rutas protegidas no llamen
`getSession` en cada navegación.

## API

**.NET 10** en cuatro proyectos: **Aws.Api** (controllers, middleware, Swagger),
**Aws.Services** (orquestación), **Aws.Repository** (AWS SDK) y **Aws.Models** (DTOs y
config).

Los endpoints regionales reciben `?region=` (por ejemplo `us-east-1`). IAM y Cost Explorer
son globales. Las credenciales siguen la
[cadena por defecto del AWS SDK](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/creds-locate.html):
variables de entorno, `~/.aws/credentials` o un rol IAM.

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

Los umbrales viven en `appsettings.json`: listas de CIDR públicos, edad máxima de rotación
de access keys, retención mínima de backup RDS, límites de paginación de Inspector y
orígenes CORS para el frontend. Incluye Docker y Azure Pipelines para deploy en contenedor
a ECR/ACR.

## Repositorios

- [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) (dashboard Next.js)
- [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) (API REST .NET)

Los dos son públicos. Cloná, apuntá la API a tus credenciales AWS, configurá Auth0 en la
app, y tenés una vista de postura on demand en lugar de una auditoría trimestral en
spreadsheet.
