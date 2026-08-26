---
title: AWS Account Alarms (Terraform)
description: Account-level AWS security alerts with Terraform. EventBridge, CloudWatch metric filters, Config rules, and SNS email for IAM, security groups, CloudTrail, and more.
lang: en
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
coverAlt: Architecture of account-level AWS alarms with EventBridge, metric filters, Config rules, and SNS
diagram: ../../../assets/projects/aws-alarms-terraform/architecture.png
diagramAlt: CloudTrail and Config feed EventBridge rules and CloudWatch metric filters. Alarms publish to SNS with email subscriptions.
featured: true
order: 6
startedOn: 2025-08-10
---

I got tired of finding risky account changes in a weekly audit instead of in my inbox.

GuardDuty and Security Hub are useful once something already looks wrong. What I needed
was simpler: an email when someone creates an access key, opens a security group to the
world, touches CloudTrail, or logs in as root. Without clicking through the console to wire
each rule by hand.

[Aws.Alarms.Module.Terraform](https://github.com/agustinafassina/Aws.Alarms.Module.Terraform)
is the stack I built for that. One Terraform root module deploys an SNS topic (with email
subscriptions), EventBridge rules, CloudWatch Logs metric filters, CloudWatch alarms, and
AWS Config managed rules.

It does **not** create CloudTrail or the Config recorder. Those have to exist already. You
pass the log group name and the Config role ARN as variables. I kept that boundary on
purpose so the module stays focused on alerting, not on reinventing the account baseline.

I wrote about the same idea on [Medium](https://medium.com/@agustinafassina_92108).

## What fires

Three paths, one mailbox:

| Path | What it catches |
| --- | --- |
| **EventBridge** | Failed console login, login without MFA, root activity, IAM changes, CloudTrail stop/delete, GuardDuty or Security Hub disable attempts, SG/NACL changes, S3 policy or Block Public Access changes, Config `NON_COMPLIANT` |
| **Metric filters + alarms** | Access key API bursts, access key create/update, EC2 launch spikes, S3 API bursts, RDS changes, `AccessDenied` volume, ingress to `0.0.0.0/0` |
| **Config managed rules** | Access key rotation, unused credentials, root MFA, public S3, EBS/RDS encryption, CloudTrail enabled, password policy |

Open security groups were the awkward one. Nested `ipPermissions` CIDRs in CloudTrail do
not match reliably in EventBridge patterns, so that signal goes through a metric filter
instead. Broader SG/NACL API noise still rides EventBridge.

If you want resource-level noise on top (CPU, free storage, connections), you can pass
instance IDs, bucket names, or RDS identifiers. Those families stay off until you fill the
lists.

## Applying it

```bash
terraform init
terraform plan  -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars
```

There are `dev`, `stage`, and `prod` tfvars with different thresholds and which alarm
families are on. After the first apply, confirm every SNS email subscription. Until you do,
the topic exists and the inbox stays quiet. I have forgotten that step once. Once was enough.

Each family has an `enable_*` flag. That matters in real accounts: console-without-MFA is
noisy under federation or break-glass flows, and you do not want a second page for something
Security Hub already covers.

## How it pairs with the Security Dashboard

The [AWS Security Dashboard](/en/projects/aws-dashboard) is pull: open it when you want a
posture snapshot. This module is push: the account changed, you get the mail.

I use both. One answers “what looks wrong right now?” The other answers “tell me the moment
it happens.”
