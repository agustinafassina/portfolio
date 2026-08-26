---
title: ECS Fargate vs EC2
description: "A decision guide for ECS launch types and task patterns: who provides the compute, and whether the workload is batch, event-driven, or always-on."
lang: en
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
coverAlt: An open wooden card catalogue drawer with glowing index cards arranging themselves into a grid above it
diagram: ../../../assets/projects/ecs-fargate-diagram.jpg
diagramAlt: "ECS Fargate vs EC2 launch types: same Docker images from ECR, different compute layers and task patterns"
featured: false
order: 14
startedOn: 2024-08-10
---

Part of [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture).

Reviews keep mixing two questions into one. I split them on purpose:

1. **Capacity:** who provides compute, **Fargate** (serverless) or **EC2** (you manage hosts)
2. **Workload pattern:** how the task runs (one-off, event-driven scale-to-zero, or always-on)

Both launch types pull the **same Docker image from ECR**. The split is not the container
format. It is who patches the hosts and how you pay for idle capacity.

## Task patterns

| Pattern | How it runs | Typical use |
| --- | --- | --- |
| **One-off / batch** | `RunTask` or EventBridge Scheduler, then stops | Migrations, nightly reports, cron |
| **Event-driven (scale-to-zero)** | Service with `min = 0`, scaled by SQS or EventBridge | Queue workers, async jobs |
| **Always-on** | Service with `desiredCount ≥ 1` behind an ALB | APIs, web apps, long-lived consumers |

Any pattern works on **either** launch type. A daemon service (one task per host) exists
**only on EC2**.

## Fargate vs EC2: quick pick

| Lean toward **Fargate** when… | Lean toward **EC2** when… |
| --- | --- |
| No host patching or cluster sizing | GPUs, special instance families, kernel access |
| Bursty, low, or unpredictable load | Steady high density (bin-pack many tasks per instance) |
| Small team, fastest path to production | Aggressive **Spot** savings on a steady fleet |

## What is in the repo

- Side-by-side diagram: ECR at the top, Fargate left, EC2 right, task patterns below
- Full decision table (billing, density, Spot, networking modes, ops overhead)
- An “avoid” section for common mismatches, like paying 24/7 for a job that should be scheduled

## Why it exists

“Should we use Fargate?” is the wrong first question. Ask whether this is batch,
event-driven, or always-on, and who should own the hosts. That gets you to an answer faster.
This folder is that cheat sheet, with links to the fuller infrastructure diagrams elsewhere
in the repo.
