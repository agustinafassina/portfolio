---
title: EC2 Bastion y RDS privado
description: Arquitectura de referencia para mantener RDS fuera de internet pública mientras los desarrolladores acceden por un bastion SSH y port forwarding local.
lang: es
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
coverAlt: Un monitor CRT ejecutando un script de automatización junto a un brazo robótico sellando una pila de formularios
diagram: ../../../assets/projects/ec2-bastion-diagram.jpg
diagramAlt: Desarrollador se conecta a RDS privado a través de un bastion EC2 con port forwarding SSH
featured: true
order: 2
startedOn: 2024-04-15
---

Parte de [Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture).
Este patrón coloca **Amazon RDS en subnets privadas** sin endpoint público, mientras los
desarrolladores se conectan a través de un **bastion EC2** con SSH y port forwarding local
(`ssh -L`).

La aplicación corre en **EC2 con Docker** en la misma VPC y habla con RDS por la red
privada. El acceso humano nunca va laptop → RDS directo.

## Qué cubre la arquitectura

| Componente | Rol |
| --- | --- |
| **EC2 aplicación + Docker** | Corre contenedores (API, workers) como consumidor natural de RDS |
| **Amazon RDS** | Subnets privadas, `Publicly accessible = No` |
| **Bastion EC2** | Jump host solo SSH; `-L` reenvía un puerto local al endpoint de RDS |

Flujo: **Dev → SSH al bastion → túnel → RDS**. Herramientas como psql, mysql o DBeaver
apuntan a `127.0.0.1` en el puerto mapeado; el túnel termina dentro de la VPC.

## Notas de diseño

- **Security groups:** RDS acepta tráfico del SG de la aplicación y del bastion en el
  puerto del motor. El bastion solo recibe TCP 22 desde IPs conocidas o rangos de VPN.
- **Subnets:** RDS y la app EC2 viven en subnets privadas. NAT solo hace falta si
  necesitan salida a internet—no para conectividad a RDS.
- **Alternativas documentadas:** port forwarding con Session Manager sin exponer el 22,
  o Client VPN para estar dentro de la VPC sin bastion.

## Por qué existe

Abrir RDS a `0.0.0.0/0` sigue siendo común en equipos chicos porque “es más fácil.” Esta
guía muestra la alternativa estándar: reducir superficie de ataque, concentrar el acceso
humano en un único punto SSH auditado y mantener el tráfico de aplicación en routing
privado.
