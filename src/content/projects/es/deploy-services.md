---
title: Deploy Services
description: Guía de decisión con tres modelos de despliegue en AWS (contenedores siempre activos, tareas Fargate programadas y sitios estáticos en S3) para elegir compute según la carga, no por costumbre.
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
diagramAlt: "Tres modelos de despliegue en AWS: contenedores ECS siempre activos, tareas Fargate con EventBridge y sitios estáticos en S3"
featured: false
draft: true
order: 11
startedOn: 2024-06-01
---

Parte de [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture),
una colección de arquitecturas de referencia y guías cortas. Esta carpeta es la puerta de
entrada: tres modelos de despliegue alineados con lo que realmente estás publicando.

La armé porque en las reviews aparece “pongámoslo en ECS” antes de la pregunta útil. ¿Tiene
que estar prendido todo el día? ¿Es un job que arranca, termina y se apaga? ¿O son solo
archivos?

## Los tres modelos

| Modelo | Cuándo usarlo | Qué corre |
| --- | --- | --- |
| **1. Contenedores (ECS)** | APIs y backends que deben estar **siempre activos** detrás de un ALB | Imagen Docker en ECR, ECS Service con `desiredCount ≥ 1` |
| **2. Fargate + EventBridge** | Trabajos que **arrancan por evento o schedule**, corren y **se apagan** | `RunTask` en Fargate (sin servicio 24/7 ni ALB) |
| **3. Sitio estático (S3)** | HTML, CSS, JS **sin servidor** | Bucket S3 (CloudFront opcional), infra con CloudFormation |

El modelo 1 es tráfico de usuarios por ALB. El 2 es cron, migraciones, reportes nocturnos:
todo lo que no debería pagar compute ocioso. El 3 es sitios como este portfolio. Build una
vez, servir archivos bajo demanda.

## Qué hay en el repo

- Diagrama comparativo y flowchart de decisión (`diagram.jpg`)
- Links a carpetas más profundas: un stack ECS más completo con controles de seguridad,
  scheduling con EventBridge y hosting estático S3 con CloudFormation
- Tabla de criterios: forma de la carga, drivers de costo y patrones típicos

## Por qué existe

Es documentación, no un pipeline de deploy. La idea es un vocabulario compartido antes de
abrir la consola. “Necesitamos ECS” pasa a ser “necesitamos el Modelo 1 en Fargate” o “esto
es el Modelo 2, dejemos de pagar un servicio que duerme todo el día.”
