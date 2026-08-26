---
title: Allarmi AWS a livello account (Terraform)
description: Alert di sicurezza AWS a livello account con Terraform. EventBridge, metric filter CloudWatch, regole Config e email via SNS per IAM, security group, CloudTrail e altro.
lang: it
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
coverAlt: Architettura degli allarmi AWS a livello account con EventBridge, metric filter, regole Config e SNS
diagram: ../../../assets/projects/aws-alarms-terraform/architecture.png
diagramAlt: CloudTrail e Config alimentano regole EventBridge e metric filter CloudWatch. Gli allarmi pubblicano su SNS con sottoscrizioni email.
featured: true
order: 1
startedOn: 2025-08-10
---

Mi sono stancata di scoprire cambi rischiosi sull'account in un audit settimanale invece
che nella posta.

GuardDuty e Security Hub aiutano quando qualcosa già sembra sbagliato. A me serviva qualcosa
di più semplice: una mail quando qualcuno crea un access key, apre un security group a
internet, tocca CloudTrail o entra come root. Senza montare ogni regola a mano nella
console.

[Aws.Alarms.Module.Terraform](https://github.com/agustinafassina/Aws.Alarms.Module.Terraform)
è lo stack che ho messo su per quello. Un modulo Terraform root crea un topic SNS con
sottoscrizioni email, regole EventBridge, metric filter su CloudWatch Logs, allarmi
CloudWatch e regole gestite di AWS Config.

Non crea CloudTrail né il recorder di Config. Quelli devono già esserci. Passi il nome del
log group e l'ARN del ruolo Config come variabili. Ho tenuto quel confine apposta: il
modulo avvisa. Non rifà il baseline dell'account.

La stessa idea su [Medium](https://medium.com/@agustinafassina_92108).

## Cosa scatta

Tre percorsi, una casella di posta:

| Percorso | Cosa intercetta |
| --- | --- |
| **EventBridge** | Login console fallito, login senza MFA, attività root, cambi IAM, stop/delete di CloudTrail, tentativi di disattivare GuardDuty o Security Hub, cambi SG/NACL, policy S3 o Block Public Access, Config `NON_COMPLIANT` |
| **Metric filter + allarmi** | Burst di API con access key, create/update di key, spike di launch EC2, burst S3, cambi RDS, volume di `AccessDenied`, ingress verso `0.0.0.0/0` |
| **Regole Config** | Rotazione access key, credenziali inutilizzate, MFA root, S3 pubblico, cifratura EBS/RDS, CloudTrail abilitato, password policy |

Gli security group aperti sono stati il caso scomodo. I CIDR annidati in `ipPermissions` di
CloudTrail non matchano bene nei pattern EventBridge, quindi quel segnale passa da un
metric filter. Il rumore più ampio delle API SG/NACL resta su EventBridge.

Vuoi allarmi di CPU, storage libero o connessioni su risorse specifiche? Passi ID di
istanza, nomi di bucket o identifier RDS. Quelle famiglie restano spente finché non riempi
le liste.

## Come si applica

```bash
terraform init
terraform plan  -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars
```

Ci sono tfvars `dev`, `stage` e `prod` con soglie diverse e famiglie diverse accese. Dopo
il primo apply, conferma ogni sottoscrizione email su SNS. Finché non lo fai, il topic
esiste e l'inbox resta muto. Mi è successo una volta. È bastato.

Ogni famiglia ha un flag `enable_*`. Negli account veri conta: console senza MFA fa rumore
con federazione o break-glass, e non ha senso paginare due volte per qualcosa che Security
Hub copre già.

## Come sta insieme al Security Dashboard

L'[AWS Security Dashboard](/it/projects/aws-dashboard) è pull: lo apri quando vuoi uno
snapshot di postura. Questo modulo è push: l'account è cambiato, arriva la mail.

Li uso entrambi. Uno risponde “cosa non va adesso?”. L'altro, “avvisami quando succede”.
