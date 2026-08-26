---
title: ECS Fargate vs EC2
description: Guía de decisión para tipos de lanzamiento en ECS y patrones de tarea: quién provee el compute y si la carga es batch, event-driven o always-on.
lang: es
translationKey: ecs-fargate-vs-ec2
slug: ecs-fargate-vs-ec2
stack:
  - AWS
  - ECS
  - Fargate
  - EC2
  - ECR
repoUrl: https://github.com/agustinafassina/Aws.Solutions.Architecture/tree/main/ecs-fargate-vs-ec2
cover: ../../../assets/projects/indexer.png
coverAlt: Un cajón de fichero de madera abierto con tarjetas índice brillantes organizándose en una cuadrícula sobre él
diagram: ../../../assets/projects/ecs-fargate-diagram.jpg
diagramAlt: ECS Fargate vs EC2: mismas imágenes Docker desde ECR, distintas capas de compute y patrones de tarea
featured: false
order: 14
startedOn: 2024-08-10
---

Parte de [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture).

En las reviews suelen mezclarse dos preguntas en una. Las separo a propósito:

1. **Capacidad:** quién provee el compute, **Fargate** (serverless) o **EC2** (vos gestionás hosts)
2. **Patrón de carga:** cómo corre la tarea (one-off, scale-to-zero por eventos, o always-on)

Ambos tipos de lanzamiento usan la **misma imagen Docker desde ECR**. La diferencia no es el
formato del contenedor. Es quién parchea los hosts y cómo pagás la capacidad ociosa.

## Patrones de tarea

| Patrón | Cómo corre | Uso típico |
| --- | --- | --- |
| **One-off / batch** | `RunTask` o EventBridge Scheduler, luego se apaga | Migraciones, reportes nocturnos, cron |
| **Event-driven (scale-to-zero)** | Service con `min = 0`, escalado por SQS o EventBridge | Workers de cola, jobs async |
| **Always-on** | Service con `desiredCount ≥ 1` detrás de un ALB | APIs, web apps, consumidores persistentes |

Cualquier patrón funciona en **cualquiera** de los dos launch types. Un servicio daemon
(una tarea por host) existe **solo en EC2**.

## Fargate vs EC2: elección rápida

| Inclinarse a **Fargate** cuando… | Inclinarse a **EC2** cuando… |
| --- | --- |
| Sin parcheo de hosts ni sizing de cluster | GPUs, familias de instancia especiales, acceso al kernel |
| Carga variable, baja o impredecible | Alta densidad estable (bin-packing de muchas tareas por instancia) |
| Equipo chico, camino más rápido a producción | Ahorro agresivo con **Spot** en flota estable |

## Qué hay en el repo

- Diagrama lado a lado: ECR arriba, Fargate a la izquierda, EC2 a la derecha, patrones abajo
- Tabla de decisión completa (billing, densidad, Spot, modos de red, overhead operativo)
- Sección “evitar” para desajustes comunes, como pagar 24/7 por un job que debería ser scheduled

## Por qué existe

“¿Usamos Fargate?” es la pregunta equivocada al principio. Preguntá si es batch,
event-driven o always-on, y quién debería administrar los hosts. Llegás más rápido a la
respuesta. Esta carpeta es esa cheat sheet, con enlaces a los diagramas de infraestructura
más completos en otras partes del repo.
