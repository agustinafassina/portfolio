---
title: Deploy Services
description: A decision guide for three AWS deployment models (always-on containers, scheduled Fargate tasks, and static S3 sites) so teams pick compute by workload, not habit.
lang: en
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
coverAlt: A conveyor belt of labelled crates passing through three arched gates toward a green checkmark lamp
diagram: ../../../assets/projects/deploy-services-diagram.jpg
diagramAlt: Three AWS deployment models: always-on ECS containers, Fargate tasks triggered by EventBridge, and static S3 websites
featured: false
order: 11
startedOn: 2024-06-01
---

Part of [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture),
a collection of reference architectures and short guides. This folder is the front door:
three deployment models mapped to what you are actually shipping.

I wrote it because “let’s put it on ECS” shows up in reviews before anyone asks the useful
question. Does this need to stay up all day? Is it a job that should start, finish, and
die? Or is it just files?

## The three models

| Model | When to use it | What runs |
| --- | --- | --- |
| **1. Containers (ECS)** | APIs and backends that must stay **always on** behind an ALB | Docker image in ECR, ECS Service with `desiredCount ≥ 1` |
| **2. Fargate + EventBridge** | Jobs that **start on a schedule or event**, run, and **stop** | `RunTask` on Fargate (no 24/7 service, no ALB) |
| **3. Static website (S3)** | HTML, CSS, JS with **no server** | S3 bucket (optional CloudFront), infra via CloudFormation |

Model 1 is user-facing traffic through an ALB. Model 2 is cron, migrations, nightly reports:
anything that should not pay for idle compute. Model 3 is sites like this portfolio. Build
once, serve files on request.

## What is in the repo

- A comparison diagram and decision flowchart (`diagram.jpg`)
- Links into deeper folders: a fuller ECS stack with security controls, EventBridge
  scheduling, and S3 static hosting with CloudFormation
- A criteria table for workload shape, billing drivers, and typical cost patterns

## Why it exists

This is documentation, not a deploy pipeline. The point is a shared vocabulary before anyone
opens the console. “We need ECS” becomes “we need Model 1 on Fargate” or “this is Model 2,
stop paying for a service that sleeps all day.”
