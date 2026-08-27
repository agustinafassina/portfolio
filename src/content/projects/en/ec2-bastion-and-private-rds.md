---
title: EC2 Bastion & Private RDS
description: A reference architecture for keeping RDS off the public internet while developers reach it through an SSH bastion and local port forwarding.
lang: en
translationKey: ec2-bastion-and-private-rds
slug: ec2-bastion-and-private-rds
stack:
  - AWS
  - EC2
  - RDS
  - Docker
  - VPC
repoUrl: https://github.com/agustinafassina/Aws.Solutions.Architecture/tree/main/ec2-bastion-and-private-rds
cover: ../../../assets/projects/automation.png
coverAlt: A CRT monitor running an automation script next to a robot arm stamping a stack of forms
diagram: ../../../assets/projects/ec2-bastion-diagram.jpg
diagramAlt: Developer connects to private RDS through an EC2 bastion host via SSH port forwarding
featured: false
draft: true
order: 13
startedOn: 2024-04-15
---

Part of [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture).

I keep seeing the same shortcut in small teams: open RDS to the world “just for a bit” so
someone can run a query from their laptop. This folder is the pattern I use instead.

**Amazon RDS** sits in private subnets with no public endpoint. Developers reach it through
a **bastion EC2** with SSH and local port forwarding (`ssh -L`). The app runs on **EC2 with
Docker** in the same VPC and talks to RDS on the private network. Human access never goes
laptop → RDS directly.

## What the architecture covers

| Component | Role |
| --- | --- |
| **Application EC2 + Docker** | Runs containers (API, workers) as the natural RDS consumer |
| **Amazon RDS** | Private subnets, `Publicly accessible = No` |
| **Bastion EC2** | Jump host for SSH only; `-L` forwards a local port to the RDS endpoint |

Flow: **Dev → SSH to bastion → tunnel → RDS**. Tools like psql, mysql, or DBeaver target
`127.0.0.1` on the mapped port. The tunnel ends inside the VPC.

## Design notes

- **Security groups:** RDS accepts traffic from the application SG and the bastion SG on
  the engine port. Bastion inbound is TCP 22 from known IPs or VPN ranges only.
- **Subnets:** RDS and app EC2 live in private subnets. NAT is only needed if they need
  outbound internet. You do not need NAT just to talk to RDS.
- **Alternatives in the guide:** Session Manager port forwarding without exposing port 22,
  or Client VPN so you sit inside the VPC without a bastion hop.

## Why it exists

`0.0.0.0/0` on a database port is still common because it feels faster. This guide is the
standard alternative: smaller attack surface, one audited SSH entry for humans, application
traffic on private routing.
