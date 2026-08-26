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
outcome: Un solo lugar con Auth0 para ver riesgos IAM, exposición abierta, hallazgos de Inspector y concentración de costos, sin saltar de consola en consola.
problem: La consola de AWS responde “abrí este recurso”. Falla en “¿qué tan expuestos estamos ahora?” en S3, EC2, RDS, IAM, Lambda, Inspector y Cost Explorer.
decision: Separé una UI Next.js de una API de escaneo .NET para que el browser nunca tenga credenciales AWS. La API camina la cuenta con el SDK detrás de Auth0.
result: Quien revisa ve misconfigs y credenciales viejas en un dashboard, no un muro de toggles CIS que nadie mira.
---

## Contexto

La consola de AWS sirve cuando ya sabés qué recurso abrir. Responde mal a “¿qué tan
expuestos estamos ahora?” en S3, EC2, RDS, IAM, Lambda, Inspector y Cost Explorer en un solo
lugar.

Quería una vista de postura que sí abriría en una review: misconfigs, credenciales viejas y
concentración de costos con checks que importan, no un muro de toggles CIS que nadie mira.

## Restricciones

- Nada de keys AWS en el browser. Nunca.
- Preferir la cadena de credenciales por defecto del SDK (env, config compartido o rol IAM)
  antes que un secret store custom para local y contenedores.
- Poder soltar UI y scanner en cadencias distintas.
- Mantener EN/ES sin meter un framework de i18n pesado en cada vista.

## Decisión de arquitectura

Separé el producto en dos repos públicos. El diagrama de arriba es el trust path: Auth0 en
el borde, Next.js para la UI, .NET para los escaneos.

| Pieza | Repo | Rol |
| --- | --- | --- |
| **App** | [Aws.Dashboard.App](https://github.com/agustinafassina/Aws.Dashboard.App) | UI con Auth0: dashboard, costos, IAM, vulnerabilidades, controles de security, auditorías |
| **API** | [Aws.Dashboard.Api](https://github.com/agustinafassina/Aws.Dashboard.Api) | Backend REST: escaneos con AWS SDK, arquitectura en capas, Swagger |

¿Por qué no una sola app Next.js que hable con AWS solo desde el server? Quería un borde de
API claro para otros clientes después, y un stack .NET como el que ya uso en backends. ¿Por
qué no solo Security Hub? Hub sirve cuando ya está cableado. Este dashboard es la superficie
“abrilo y mirá” para cuentas donde todavía necesito checks custom y costo por tag en la
misma sesión.

**Frontend:** Next.js 15 (App Router), TypeScript, Tailwind, Auth0, TanStack Query,
Recharts. Catch-all `home/[[...section]]` con vistas keep-alive, temas claro/oscuro y
`/guide` bilingüe.

**API:** .NET 10 en cuatro proyectos (`Aws.Api`, `Aws.Services`, `Aws.Repository`,
`Aws.Models`). Los endpoints regionales reciben `?region=`. IAM y Cost Explorer son
globales. Las credenciales siguen la
[cadena por defecto del AWS SDK](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/creds-locate.html).

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

```http
GET /api/v1/security/summary?region=us-east-1&days=30
GET /api/v1/iam/access-keys
GET /api/v1/ec2/open-ports?region=us-east-1
GET /api/v1/cost/by-project?startDate=2026-01-01&endDate=2026-01-31
```

## Seguridad / blast radius

Auth0 cierra la UI. El browser nunca tiene credenciales AWS. La API camina la cadena en el
server y solo devuelve hallazgos estructurados.

El middleware cachea el JWT de Auth0 en una cookie para que las rutas protegidas no llamen
`getSession` en cada navegación. Los umbrales (CIDR públicos, edad máxima de access keys,
retención mínima de backup RDS, paginación de Inspector, orígenes CORS) viven en
`appsettings.json`, no en el bundle del cliente.

Blast radius si el rol de la API está sobreprivilegiado: cada dominio de escaneo queda
legible. Least privilege en ese rol es parte del deploy, no un afterthought.

## Ops

Docker y Azure Pipelines salen listos para deploy en contenedor a ECR/ACR. Apuntá la API a
credenciales, configurá Auth0 en la app, y tenés postura on demand en lugar de una auditoría
trimestral en spreadsheet.

Convive con [Alarmas AWS a nivel cuenta](/es/projects/aws-alarms-module-terraform): el
dashboard es pull (“¿qué se ve mal ahora?”), el módulo Terraform es push (“avisame cuando
pasa”).

## Qué haría distinto

- Cachear más agresivo las ventanas caras de Cost Explorer; esas queries se ponen caras si
  refrescás sin pensar.
- Meter un template de IAM read-only en el repo para que los permisos requeridos sean
  obvios el día uno.
- Sumar deep links a la consola AWS en los checks más ruidosos, para que el dashboard no
  sea un callejón sin salida cuando hay que arreglar algo.
