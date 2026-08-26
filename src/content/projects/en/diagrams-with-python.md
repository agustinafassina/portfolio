---
title: Diagrams with Python
description: Reproducible AWS infrastructure diagrams as Python code. Versioned, regeneratable, and aligned with what you define in Terraform.
lang: en
translationKey: diagrams-with-python
slug: diagrams-with-python
stack:
  - Python
  - Diagrams
  - Graphviz
  - AWS
repoUrl: https://github.com/agustinafassina/Diagrams.With.Python
cover: ../../../assets/projects/diagrams-with-python-cover.png
coverAlt: AWS and Azure DevOps infrastructure diagram generated from Python with VPC, ECS, RDS, CI/CD pipelines, and multi-region layout
diagram: ../../../assets/projects/diagrams-with-python/ci-cd.png
diagramAlt: CI/CD pipeline diagram from Bitbucket to Azure DevOps to AWS with separate QA and production branches
featured: false
order: 15
startedOn: 2025-06-01
---

Hand-drawn architecture slides go stale the week after you export them. Terraform stays in
sync with production. The PNG in the wiki does not.

[Diagrams with Python](https://github.com/agustinafassina/Diagrams.With.Python) is how I keep
those pictures honest: infrastructure diagrams as code with
[mingrammer/diagrams](https://diagrams.mingrammer.com/). Run a script, get a PNG, commit both.
Change the topology, re-run, the docs move with it.

## What is in the repo

Each folder is a self-contained script with a predictable output path. Scripts resolve config
and output from their own directory, so you can run them from anywhere:

| Folder | Script | What it models |
| --- | --- | --- |
| `samples/` | `project-2.py` … `project-5.py` | Small AWS topologies (VPC, ALB, ECS, RDS) |
| `samples/` | `json-read.py` | Same layout, driven by `config.json` instead of hard-coded nodes |
| `ci-cd/` | `ci-cd-bitbucket-azure-aws.py` | Bitbucket → Azure DevOps → AWS (QA on `develop`, prod on `master`) |
| `multi-region-dr/` | `route53-failover.py` | Route 53 failover across two AWS regions |
| `diagram-terra/` | `diagram-terra.py` | Full AWS + Azure DevOps estate |
| `ecs-fargate/` | `fargate.py` | ECS Fargate service topology |
| `ec2-backup-with-s3/` | `backup.py` | EC2 → S3 backup flow |
| `with-docker/` | `with-dockers.py` | Docker-based deployment layout |
| `big-diagram/` | `with-gateway.py` | Extended gateway topology with local `config.json` |

Generated PNGs land in `examples/` (shared gallery) or next to the script folder.

## JSON-driven diagrams

Hard-coding node labels in Python is fine for a one-off sketch. When I want to tweak labels
without editing Python, `samples/json-read.py` reads `config.json` (region name, component
labels, IAM roles, security groups) and builds the same Cluster/VPC layout:

```python
with Diagram(file_name, show=False):
    with Cluster(f"Region: {region_name}"):
        vpc = Cluster("VPC")
        with vpc:
            route53 = Route53(components['route53'])
            load_balancer = ELB(components['load_balancer'])
            ecs_service = ECS(components['ecs_service'])
            # ...
```

Swap the JSON, re-run, new diagram. Handy when the same script serves more than one
environment, or when someone who is not deep in Python needs to update a label.

## How to run

You need Python 3.x, [Graphviz](https://graphviz.org/download/) on your PATH, and
`pip install -r requirements.txt` (pins `diagrams==0.25.1`).

```bash
python samples/project-4.py
# → examples/project-4.png

python ci-cd/ci-cd-bitbucket-azure-aws.py
# → examples/ci-cd-bitbucket-azure-aws.png
```

Diagrams may also emit a Graphviz source file next to the PNG. Safe to delete; the next run
regenerates it.

## Why it exists

This repo is the visual companion to infrastructure-as-code work, especially the
[Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture)
guides. Instead of Lucidchart exports nobody trusts, the diagrams sit in git next to the
Terraform they describe. Reviewers see the same topology in the PR. New teammates regenerate
fresh PNGs instead of zooming into a blurry slide from last quarter.
