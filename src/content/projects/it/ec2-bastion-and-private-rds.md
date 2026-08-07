---
title: EC2 Bastion e RDS privato
description: Architettura di riferimento per tenere RDS fuori da internet pubblica mentre gli sviluppatori accedono tramite bastion SSH e port forwarding locale.
lang: it
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
coverAlt: Un monitor CRT che esegue uno script di automazione accanto a un braccio robotico che timbra una pila di moduli
diagram: ../../../assets/projects/ec2-bastion-diagram.jpg
diagramAlt: Lo sviluppatore si connette a RDS privato tramite un bastion EC2 con port forwarding SSH
featured: true
order: 2
startedOn: 2024-04-15
---

Parte di [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture).
Questo pattern colloca **Amazon RDS in subnet private** senza endpoint pubblico, mentre gli
sviluppatori si connettono tramite un **bastion EC2** con SSH e port forwarding locale
(`ssh -L`).

L applicazione gira su **EC2 con Docker** nella stessa VPC e parla con RDS sulla rete
privata. L accesso umano non va mai laptop → RDS direttamente.

## Cosa copre l architettura

| Componente | Ruolo |
| --- | --- |
| **EC2 applicazione + Docker** | Esegue container (API, worker) come consumatore naturale di RDS |
| **Amazon RDS** | Subnet private, `Publicly accessible = No` |
| **Bastion EC2** | Jump host solo SSH; `-L` inoltra una porta locale all endpoint RDS |

Flusso: **Dev → SSH al bastion → tunnel → RDS**. Strumenti come psql, mysql o DBeaver
puntano a `127.0.0.1` sulla porta mappata; il tunnel termina dentro la VPC.

## Note di design

- **Security group:** RDS accetta traffico dal SG applicazione e dal bastion sulla porta
  del motore. Il bastion accetta solo TCP 22 da IP noti o range VPN.
- **Subnet:** RDS e app EC2 stanno in subnet private. NAT serve solo se serve uscita
  internet—non per la connettività a RDS.
- **Alternative documentate:** port forwarding con Session Manager senza esporre la 22,
  o Client VPN per stare nella VPC senza bastion.

## Perché esiste

Aprire RDS a `0.0.0.0/0` resta comune nei team piccoli perché “è più facile.” Questa guida
mostra l alternativa standard: ridurre la superficie d attacco, concentrare l accesso
umano su un unico punto SSH auditato e tenere il traffico applicativo su routing privato.
