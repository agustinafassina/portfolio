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
featured: true
order: 2
startedOn: 2024-04-15
---

Part of [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture).
This pattern places **Amazon RDS in private subnets** with no public endpoint, while
developers connect through a **bastion EC2** using SSH and local port forwarding (`ssh -L`).

The application runs on **EC2 with Docker** in the same VPC and talks to RDS over the
private network. Human access never goes laptop → RDS directly.

## What the architecture covers

| Component | Role |
| --- | --- |
| **Application EC2 + Docker** | Runs containers (API, workers) as the natural RDS consumer |
| **Amazon RDS** | Private subnets, `Publicly accessible = No` |
| **Bastion EC2** | Jump host for SSH only; `-L` forwards a local port to the RDS endpoint |

Flow: **Dev → SSH to bastion → tunnel → RDS**. Tools like psql, mysql or DBeaver target
`127.0.0.1` on the mapped port; the tunnel terminates inside the VPC.

## Design notes

- **Security groups:** RDS accepts traffic from the application SG and bastion SG on the
  engine port. Bastion inbound is TCP 22 from known IPs or VPN ranges only.
- **Subnets:** RDS and app EC2 live in private subnets. NAT is only needed if they require
  outbound internet—not for RDS connectivity itself.
- **Alternatives documented:** Session Manager port forwarding without exposing port 22,
  or Client VPN to sit inside the VPC without a bastion hop.

## Why it exists

Opening RDS to `0.0.0.0/0` is still common in small teams because “it is easier.” This
guide shows the standard alternative: shrink attack surface, concentrate human access on
one audited SSH entry point, and keep application traffic on private routing.
