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
coverAlt: CloudTrail y Config alimentan reglas de EventBridge y filtros de métricas CloudWatch. Las alarmas publican a SNS con suscripciones por email.
featured: true
order: 1
startedOn: 2025-08-10
outcome: Mail cuando alguien crea una access key, abre un security group a internet, toca CloudTrail o entra como root.
problem: Los cambios riesgosos de la cuenta aparecían en auditorías semanales, no en el inbox. GuardDuty y Security Hub ayudan cuando algo ya se ve mal.
decision: Un root de Terraform para SNS, EventBridge, filtros de métricas, alarmas y reglas de Config. El módulo solo alerta. No crea CloudTrail ni el recorder de Config.
result: Señales de seguridad a nivel cuenta llegan por email sin armar cada regla a mano en la consola.
metrics:
  - label: Cambio de MTTD
    value: "días → minutos"
  - label: Keys / SG / root
    value: push al inbox
---

## Contexto

Me cansé de enterarme de cambios riesgosos en la cuenta en una auditoría semanal, y no en
el mail.

GuardDuty y Security Hub ayudan cuando algo ya se ve mal. Yo necesitaba algo más simple: un
aviso cuando alguien crea una access key, abre un security group a internet, toca CloudTrail
o entra como root. Sin armar cada regla a mano en la consola.

La misma idea en [Medium](https://medium.com/@agustinafassina_92108).

## Restricciones

- CloudTrail y el recorder de Config ya existen. El módulo no rehace el baseline de la
  cuenta.
- Un solo inbox en la primera versión. Suscripciones SNS por email, no un stack de paging
  completo.
- El ruido tiene que ser tunable por ambiente (`dev` / `stage` / `prod`) con flags
  `enable_*`.
- La detección de security groups abiertos tiene que funcionar aunque EventBridge se trabe
  con CIDR anidados en `ipPermissions`.

## Decisión de arquitectura

[Aws.Alarms.Module.Terraform](https://github.com/agustinafassina/Aws.Alarms.Module.Terraform)
es un root de Terraform. La imagen de arquitectura de arriba es la forma: CloudTrail y Config
alimentan reglas de EventBridge y metric filters sobre CloudWatch Logs; las alarmas publican a SNS.

Pasás el nombre del log group y el ARN del rol de Config por variables. El módulo alerta. No
recrea Trail ni el recorder a propósito.

¿Por qué no solo Security Hub? Hub es pull y pesado de producto. Yo quería mail push para
un set chico de eventos a nivel cuenta que me importan el día uno. ¿Por qué no Lambda en
cada regla? Metric filters y EventBridge cubren la mayor parte con menos runtime que
cuidar.

Tres caminos, un inbox:

| Camino | Qué atrapa |
| --- | --- |
| **EventBridge** | Login de consola fallido, login sin MFA, actividad de root, cambios IAM, stop/delete de CloudTrail, intentos de apagar GuardDuty o Security Hub, cambios de SG/NACL, políticas S3 o Block Public Access, Config `NON_COMPLIANT` |
| **Metric filters + alarmas** | Ráfagas de API con access key, create/update de keys, picos de launch EC2, ráfagas S3, cambios RDS, volumen de `AccessDenied`, ingress a `0.0.0.0/0` |
| **Reglas Config** | Rotación de access keys, credenciales sin uso, MFA de root, S3 público, cifrado EBS/RDS, CloudTrail habilitado, password policy |

Los security groups abiertos fueron el caso raro. Los CIDR anidados en `ipPermissions` de
CloudTrail no matchean bien en patterns de EventBridge, así que esa señal va por metric
filter. El ruido más amplio de APIs de SG/NACL sigue por EventBridge.

¿Querés alarmas de CPU, disco libre o conexiones en recursos puntuales? Pasás IDs de
instancia, buckets o identificadores de RDS. Esas familias quedan apagadas hasta que llenás
las listas.

## Seguridad / blast radius

Estas alarmas achican la ventana entre un cambio malo y que alguien se entere. No frenan el
cambio.

Si las suscripciones SNS nunca se confirman, el topic existe y el inbox no se entera. Es un
failure mode operativo, no de Terraform. Me pasó una vez. Alcanzó.

`enable_*` importa en cuentas reales: consola sin MFA hace ruido con federación o
break-glass, y no tiene sentido paginar dos veces por algo que Security Hub ya cubre.

## Ops

```bash
terraform init
terraform plan  -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars
```

Hay tfvars de `dev`, `stage` y `prod` con umbrales distintos y familias distintas
prendidas. Después del primer apply, confirmá cada suscripción de email en SNS.

Convive con el [AWS Security Dashboard](/es/projects/aws-dashboard): push acá, pull allá.
Uno responde “avisame cuando pasa”. El otro, “¿qué se ve mal ahora?”.

## Qué haría distinto

- Meter un checklist post-apply en el README que fuerce la confirmación SNS a memoria
  muscular.
- Documentar el orden de magnitud de costo de metric filters más evaluaciones de Config
  para que nadie trate “alarmas de cuenta” como gratis.
- Meter un link corto de runbook en el body del mail SNS para las familias más ruidosas
  (create de access key, SG abierto) para que el mail no sea un callejón sin salida.
