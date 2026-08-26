---
title: Alarmas AWS a nivel cuenta (Terraform)
description: Alertas de seguridad AWS a nivel cuenta con Terraform. EventBridge, filtros de métricas CloudWatch, reglas de Config y email por SNS para IAM, security groups, CloudTrail y más.
lang: es
translationKey: aws-alarms-module-terraform
slug: aws-alarms-module-terraform
stack:
  - Terraform
  - AWS
  - EventBridge
  - CloudWatch
  - SNS
  - AWS Config
repoUrl: https://github.com/agustinafassina/Aws.Alarms.Module.Terraform
cover: ../../../assets/projects/aws-alarms-terraform/architecture.png
coverAlt: Arquitectura de alarmas AWS a nivel cuenta con EventBridge, filtros de métricas, reglas de Config y SNS
diagram: ../../../assets/projects/aws-alarms-terraform/architecture.png
diagramAlt: CloudTrail y Config alimentan reglas de EventBridge y filtros de métricas CloudWatch. Las alarmas publican a SNS con suscripciones por email.
featured: true
order: 6
startedOn: 2025-08-10
---

Me cansé de enterarme de cambios riesgosos en la cuenta en una auditoría semanal, y no en
el mail.

GuardDuty y Security Hub sirven cuando algo ya se ve mal. Yo necesitaba otra cosa: un
aviso cuando alguien crea una access key, abre un security group a internet, toca
CloudTrail o entra como root. Sin armar cada regla a mano en la consola.

[Aws.Alarms.Module.Terraform](https://github.com/agustinafassina/Aws.Alarms.Module.Terraform)
es el stack que armé para eso. Un módulo raíz de Terraform levanta un topic SNS (con
suscripciones por email), reglas de EventBridge, metric filters sobre CloudWatch Logs,
alarmas de CloudWatch y reglas administradas de AWS Config.

No crea CloudTrail ni el recorder de Config. Eso tiene que existir de antes. Pasás el
nombre del log group y el ARN del rol de Config por variables. Dejé ese límite a propósito:
el módulo alerta, no rehace el baseline de la cuenta.

Lo conté también en [Medium](https://medium.com/@agustinafassina_92108).

## Qué dispara

Tres caminos, un inbox:

| Camino | Qué atrapa |
| --- | --- |
| **EventBridge** | Login de consola fallido, login sin MFA, actividad de root, cambios IAM, stop/delete de CloudTrail, intentos de apagar GuardDuty o Security Hub, cambios de SG/NACL, políticas S3 o Block Public Access, Config `NON_COMPLIANT` |
| **Metric filters + alarmas** | Ráfagas de API con access key, create/update de keys, picos de launch EC2, ráfagas S3, cambios RDS, volumen de `AccessDenied`, ingress a `0.0.0.0/0` |
| **Reglas Config** | Rotación de access keys, credenciales sin uso, MFA de root, S3 público, cifrado EBS/RDS, CloudTrail habilitado, password policy |

Los security groups abiertos fueron el caso raro. Los CIDR anidados en `ipPermissions` de
CloudTrail no matchean bien en patterns de EventBridge, así que esa señal va por metric
filter. El ruido más amplio de APIs de SG/NACL sigue por EventBridge.

Si querés alarmas por recurso (CPU, disco libre, conexiones), pasás IDs de instancia,
buckets o identificadores de RDS. Esas familias quedan apagadas hasta que llenás las listas.

## Cómo se aplica

```bash
terraform init
terraform plan  -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars
```

Hay tfvars de `dev`, `stage` y `prod` con umbrales distintos y familias distintas
prendidas. Después del primer apply, confirmá cada suscripción de email en SNS. Hasta que
lo hagas, el topic existe y el inbox no se entera. Me pasó una vez. Alcanzó.

Cada familia tiene un flag `enable_*`. En cuentas reales importa: consola sin MFA hace
ruido con federación o break-glass, y no tiene sentido paginar dos veces por algo que
Security Hub ya cubre.

## Cómo convive con el Security Dashboard

El [AWS Security Dashboard](/es/projects/aws-dashboard) es pull: lo abrís cuando querés un
snapshot de postura. Este módulo es push: la cuenta cambió, te llega el mail.

Uso los dos. Uno responde “¿qué se ve mal ahora?”. El otro, “avisame en el momento”.
