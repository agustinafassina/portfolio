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
coverAlt: CloudTrail e Config alimentano regole EventBridge e metric filter CloudWatch. Gli allarmi pubblicano su SNS con sottoscrizioni email.
featured: true
order: 1
startedOn: 2025-08-10
outcome: Email quando qualcuno crea una access key, apre un security group a internet, tocca CloudTrail o entra come root.
problem: I cambi rischiosi sull'account finivano in audit settimanali, non in inbox. GuardDuty e Security Hub aiutano quando qualcosa già sembra sbagliato.
decision: Un root Terraform per SNS, EventBridge, metric filter, allarmi e regole Config. Il modulo solo avvisa. Non crea CloudTrail né il recorder di Config.
result: Segnali di sicurezza a livello account arrivano via email senza montare ogni regola a mano in console.
---

## Contesto

Mi sono stancata di scoprire cambi rischiosi sull'account in un audit settimanale invece
che nella posta.

GuardDuty e Security Hub aiutano quando qualcosa già sembra sbagliato. A me serviva qualcosa
di più semplice: una mail quando qualcuno crea un access key, apre un security group a
internet, tocca CloudTrail o entra come root. Senza montare ogni regola a mano nella
console.

La stessa idea su [Medium](https://medium.com/@agustinafassina_92108).

## Vincoli

- CloudTrail e il recorder di Config esistono già. Il modulo non rifà il baseline
  dell'account.
- Una sola casella di posta nella prima versione. Sottoscrizioni SNS email, non uno stack
  di paging completo.
- Il rumore deve essere tunable per ambiente (`dev` / `stage` / `prod`) con flag
  `enable_*`.
- Il rilevamento degli security group aperti deve funzionare anche quando EventBridge
  inciampa sui CIDR annidati in `ipPermissions`.

## Decisione di architettura

[Aws.Alarms.Module.Terraform](https://github.com/agustinafassina/Aws.Alarms.Module.Terraform)
è un root Terraform. L'immagine di architettura sopra è la forma: CloudTrail e Config
alimentano regole EventBridge e metric filter su CloudWatch Logs; gli allarmi pubblicano su SNS.

Passi il nome del log group e l'ARN del ruolo Config come variabili. Il modulo avvisa. Non
ricrea Trail né il recorder apposta.

Perché non solo Security Hub? Hub è pull e pesante di prodotto. Volevo mail push per un set
piccolo di eventi a livello account che mi interessano dal giorno uno. Perché non Lambda per
ogni regola? Metric filter ed EventBridge coprono gran parte con meno runtime da badare.

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

## Sicurezza / blast radius

Questi allarmi riducono la finestra tra un cambio cattivo e il momento in cui qualcuno se ne
accorge. Non fermano il cambio.

Se le sottoscrizioni SNS non vengono mai confermate, il topic esiste e l'inbox resta muto.
È un failure mode operativo, non di Terraform. Mi è successo una volta. È bastato.

`enable_*` conta negli account veri: console senza MFA fa rumore con federazione o
break-glass, e non ha senso paginare due volte per qualcosa che Security Hub copre già.

## Ops

```bash
terraform init
terraform plan  -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars
```

Ci sono tfvars `dev`, `stage` e `prod` con soglie diverse e famiglie diverse accese. Dopo
il primo apply, conferma ogni sottoscrizione email su SNS.

Sta insieme all'[AWS Security Dashboard](/it/projects/aws-dashboard): push qui, pull lì. Uno
risponde “avvisami quando succede”. L'altro, “cosa non va adesso?”.

## Cosa farei diversamente

- Aggiungere una checklist post-apply nel README che costringa la conferma SNS a memoria
  muscolare.
- Documentare l'ordine di grandezza di costo di metric filter più valutazioni Config così
  nessuno tratta gli “allarmi di account” come gratis.
- Mettere un link breve di runbook nel body della mail SNS per le famiglie più rumorose
  (create access key, SG aperto) così la mail non è un vicolo cieco.
