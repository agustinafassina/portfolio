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
coverAlt: CloudTrail and Config feed EventBridge rules and CloudWatch metric filters. Alarms publish to SNS with email subscriptions.
featured: true
order: 1
startedOn: 2025-08-10
outcome: Email when someone creates an access key, opens a security group to the world, touches CloudTrail, or signs in as root.
problem: Risky account changes showed up in weekly audits, not in the inbox. GuardDuty and Security Hub help after something already looks wrong.
decision: One Terraform root for SNS, EventBridge, metric filters, alarms, and Config rules. The module alerts only. It does not create CloudTrail or the Config recorder.
result: Account-level security signals land in email without wiring every rule by hand in the console.
---

## Context

I got tired of catching risky account changes in a weekly audit instead of in my inbox.

GuardDuty and Security Hub help once something already looks wrong. I needed something
simpler: mail when someone creates an access key, opens a security group to the world,
touches CloudTrail, or signs in as root. Without wiring every rule by hand in the console.

Same idea on [Medium](https://medium.com/@agustinafassina_92108).

## Constraints

- CloudTrail and the Config recorder already exist. The module does not rebuild the account
  baseline.
- One mailbox for the first version. SNS email subscriptions, not a full paging stack.
- Noise has to be tunable per environment (`dev` / `stage` / `prod`) with `enable_*` flags.
- Open security group detection has to work even when EventBridge patterns choke on nested
  `ipPermissions` CIDRs.

## Architecture decision

[Aws.Alarms.Module.Terraform](https://github.com/agustinafassina/Aws.Alarms.Module.Terraform)
is one Terraform root. The architecture image above is the shape: CloudTrail and Config feed
EventBridge rules and CloudWatch Logs metric filters; alarms publish to SNS.

You pass the log group name and the Config role ARN as variables. The module alerts. It
does not recreate Trail or the recorder on purpose.

Why not only Security Hub? Hub is pull and product-heavy. I wanted push mail for a small
set of account-level events I care about on day one. Why not Lambda for every rule? Metric
filters and EventBridge cover most of it with less runtime to babysit.

Three paths, one mailbox:

| Path | What it catches |
| --- | --- |
| **EventBridge** | Failed console login, login without MFA, root activity, IAM changes, CloudTrail stop/delete, GuardDuty or Security Hub disable attempts, SG/NACL changes, S3 policy or Block Public Access changes, Config `NON_COMPLIANT` |
| **Metric filters + alarms** | Access key API bursts, access key create/update, EC2 launch spikes, S3 API bursts, RDS changes, `AccessDenied` volume, ingress to `0.0.0.0/0` |
| **Config managed rules** | Access key rotation, unused credentials, root MFA, public S3, EBS/RDS encryption, CloudTrail enabled, password policy |

Open security groups were the awkward case. Nested `ipPermissions` CIDRs in CloudTrail do
not match reliably in EventBridge patterns, so that signal goes through a metric filter.
Broader SG/NACL API noise still rides EventBridge.

Want CPU, free storage, or connection alarms on specific resources? Pass instance IDs,
bucket names, or RDS identifiers. Those families stay off until the lists are filled.

## Security / blast radius

These alarms shrink the window between a bad change and someone noticing. They do not stop
the change.

If SNS subscriptions are never confirmed, the topic exists and the inbox stays quiet. That
is an operational failure mode, not a Terraform one. I forgot it once. Once was enough.

`enable_*` matters in real accounts: console-without-MFA is noisy under federation or
break-glass, and you do not need a second page for something Security Hub already covers.

## Ops

```bash
terraform init
terraform plan  -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars
```

There are `dev`, `stage`, and `prod` tfvars with different thresholds and which families
are on. After the first apply, confirm every SNS email subscription.

This pairs with the [AWS Security Dashboard](/en/projects/aws-dashboard): push here, pull
there. One answers “tell me when it happens.” The other answers “what looks wrong right
now?”

## What I would do differently

- Add a post-apply checklist in the README that forces SNS confirmation into muscle memory.
- Document order-of-magnitude cost for metric filters plus Config evaluations so nobody
  treats “account alarms” as free.
- Wire a short runbook link into the SNS message body for the noisiest families (access
  key create, open SG) so the mail is not a dead end.
