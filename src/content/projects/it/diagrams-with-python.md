---
title: Diagrams with Python
description: Diagrammi di infrastruttura AWS riproducibili come codice Python — versionati, rigenerabili e allineati a quanto definisci in Terraform.
lang: it
translationKey: diagrams-with-python
slug: diagrams-with-python
stack:
  - Python
  - Diagrams
  - Graphviz
  - AWS
repoUrl: https://github.com/agustinafassina/Diagrams.With.Python
cover: ../../../assets/projects/diagrams-with-python-cover.png
coverAlt: Diagramma di infrastruttura AWS e Azure DevOps generato da Python — VPC, ECS, RDS, pipeline CI/CD e layout multi-regione
diagram: ../../../assets/projects/diagrams-with-python/ci-cd.png
diagramAlt: Diagramma pipeline CI/CD — Bitbucket verso Azure DevOps verso AWS con branch QA e produzione separati
featured: true
order: 4
startedOn: 2025-06-01
---

I diagrammi di architettura disegnati a mano invecchiano la settimana dopo l'export.
Terraform resta allineato alla produzione; il PNG nella wiki no.
[Diagrams with Python](https://github.com/agustinafassina/Diagrams.With.Python) è una
raccolta di diagrammi di infrastruttura definiti come codice con
[mingrammer/diagrams](https://diagrams.mingrammer.com/) — esegui uno script, ottieni un PNG,
committa entrambi. Cambi la topologia, rilanci, la documentazione si aggiorna con essa.

## Cosa c'è nel repo

Ogni cartella è uno script autonomo con un percorso di output prevedibile. Gli script
risolvono config e output dalla propria directory, quindi puoi eseguirli da qualsiasi
posizione:

| Cartella | Script | Cosa modella |
| --- | --- | --- |
| `samples/` | `project-2.py` … `project-5.py` | Piccole topologie AWS — VPC, ALB, ECS, RDS |
| `samples/` | `json-read.py` | Stesso layout, guidato da `config.json` invece di nodi hardcoded |
| `ci-cd/` | `ci-cd-bitbucket-azure-aws.py` | Bitbucket → Azure DevOps → AWS (QA su `develop`, prod su `master`) |
| `multi-region-dr/` | `route53-failover.py` | Failover Route 53 tra due regioni AWS |
| `diagram-terra/` | `diagram-terra.py` | Intero estate AWS + Azure DevOps |
| `ecs-fargate/` | `fargate.py` | Topologia servizio ECS Fargate |
| `ec2-backup-with-s3/` | `backup.py` | Flusso backup EC2 → S3 |
| `with-docker/` | `with-dockers.py` | Layout deploy con Docker |
| `big-diagram/` | `with-gateway.py` | Topologia estesa con gateway e `config.json` locale |

I PNG generati finiscono in `examples/` (galleria condivisa) o accanto alla cartella dello script.

## Diagrammi guidati da JSON

Hardcodare le etichette in Python va bene per schizzi una tantum. Per diagrammi che vuoi
modificare senza toccare il codice, `samples/json-read.py` legge `config.json` — nome
regione, etichette componenti, ruoli IAM, security group — e costruisce lo stesso layout
Cluster/VPC in modo programmatico:

```python
with Diagram(file_name, show=False):
    with Cluster(f"Region: {region_name}"):
        vpc = Cluster("VPC")
        with vpc:
            route53 = Route53(components['route53'])
            load_balancer = ELB(components['load_balancer'])
            ecs_service = ECS(components['ecs_service'])
            # ...
```

Cambi il JSON, rilanci, nuovo diagramma. Utile quando lo stesso script serve più ambienti
o quando chi non è sviluppatore deve aggiornare le etichette.

## Come eseguire

Prerequisiti: Python 3.x, [Graphviz](https://graphviz.org/download/) nel PATH, e
`pip install -r requirements.txt` (fissa `diagrams==0.25.1`).

```bash
python samples/project-4.py
# → examples/project-4.png

python ci-cd/ci-cd-bitbucket-azure-aws.py
# → examples/ci-cd-bitbucket-azure-aws.png
```

Diagrams può anche emettere un file sorgente Graphviz accanto al PNG — si può eliminare e
rigenerare alla prossima esecuzione.

## Perché esiste

Questo repo è il complemento visivo del lavoro infrastructure-as-code — in particolare le
guide di
[Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture).
Invece di mantenere export Lucidchart di cui nessuno si fida, tieni i diagrammi nel controllo
versione accanto al Terraform che descrivono. I reviewer vedono la stessa topologia nel diff
della PR; chi entra nel team rigenera PNG freschi invece di zoomare su una slide sfocata del
trimestre scorso.
