---
title: Ship Gate
description: A deployment gatekeeper that blocks releases failing any of four checks, and explains exactly which one in plain language.
lang: en
translationKey: ship-gate
slug: ship-gate
stack:
  - Go
  - GitHub Actions
  - Terraform
  - PostgreSQL
repoUrl: https://github.com/example/ship-gate
cover: ../../../assets/projects/pipeline.png
coverAlt: A conveyor belt of labelled crates passing through three arched gates toward a green checkmark lamp
featured: true
order: 2
startedOn: 2023-08-21
---

We had a deploy pipeline that was technically green and practically untrustworthy. Checks
existed, but they were spread across three systems and any of them could be skipped with
a commit message nobody reviewed.

Ship Gate collapses those checks into one required status. A release passes only if
migrations are reversible, no secrets appear in the diff, error budget for the service is
above threshold, and the previous deploy has been stable for thirty minutes.

## The part that mattered

The interesting engineering was not the checks, it was the failure messages. The first
version returned a check name and an exit code, and people responded by re-running it
until it passed. Rewriting the output to say which migration was irreversible, and what
to add to make it reversible, cut override requests to almost nothing.

A gate that people route around is worse than no gate, because it produces the paperwork
of safety without the safety.
