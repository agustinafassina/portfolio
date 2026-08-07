---
title: Deploy Services
description: Guía de decisión con tres modelos de despliegue en AWS—contenedores siempre activos, tareas Fargate programadas y sitios estáticos en S3—para elegir compute según la carga, no por costumbre.
lang: es
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
coverAlt: Una cinta transportadora de cajas etiquetadas pasando por tres arcos de control hacia una lámpara verde de verificación
diagram: ../../../assets/projects/deploy-services-diagram.jpg
diagramAlt: Tres modelos de despliegue en AWS — contenedores ECS siempre activos, tareas Fargate con EventBridge y sitios estáticos en S3
featured: true
order: 1
startedOn: 2024-06-01
---

Parte de [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture)—una
colección de arquitecturas de referencia y guías breves. Esta carpeta es el punto de
entrada: tres modelos de despliegue alineados con lo que realmente estás publicando.

Muchos equipos arrancan con “levantemos ECS” sin preguntarse si la carga debe estar siempre
encendida, correr una vez por cron o ser solo archivos estáticos. Esta guía hace explícita
esa elección.

## Los tres modelos

| Modelo | Cuándo usarlo | Qué corre |
| --- | --- | --- |
| **1 — Contenedores (ECS)** | APIs y backends que deben estar **siempre activos** detrás de un ALB | Imagen Docker en ECR, ECS Service con `desiredCount ≥ 1` |
| **2 — Fargate + EventBridge** | Trabajos que **arrancan por evento o schedule**, corren y **se apagan** | `RunTask` en Fargate—sin servicio 24/7 ni ALB |
| **3 — Sitio estático (S3)** | HTML, CSS, JS **sin servidor** | Bucket S3 (+ CloudFront opcional), infra con CloudFormation |

El modelo 1 es para tráfico de usuarios vía ALB. El 2 es para cron, migraciones, reportes
nocturnos—todo lo que no debería pagar compute ocioso. El 3 es para sitios como este
portfolio: build una vez, servir archivos bajo demanda.

## Qué hay en el repo

- Diagrama comparativo y flowchart de decisión (`diagram.jpg`)
- Enlaces a carpetas más profundas: stack ECS completo con controles de seguridad,
  scheduling con EventBridge y hosting estático S3 con CloudFormation
- Tabla de criterios: forma de la carga, drivers de costo y patrones típicos

## Por qué existe

El repo es documentación, no código de despliegue. El objetivo es dar un vocabulario
compartido a quien revisa arquitectura o hace onboarding antes de abrir la consola de
AWS—para que “necesitamos ECS” se convierta en “necesitamos el Modelo 1 con Fargate” o
“en realidad esto es el Modelo 2.”
