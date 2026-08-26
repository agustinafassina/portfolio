---
title: Diagrams with Python
description: Diagrammi di infrastruttura AWS riproducibili come codice Python. Versionati, rigenerabili e allineati a quanto definisci in Terraform.
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
coverAlt: Diagramma di infrastruttura AWS e Azure DevOps generato da Python con VPC, ECS, RDS, pipeline CI/CD e layout multi-regione
diagram: ../../../assets/projects/diagrams-with-python/ci-cd.png
diagramAlt: Diagramma pipeline CI/CD da Bitbucket ad Azure DevOps ad AWS con branch QA e produzione separati
featured: false
order: 15
startedOn: 2025-06-01
---

I diagrammi disegnati a mano invecchiano la settimana dopo l'export. Terraform resta
allineato alla produzione. Il PNG nella wiki no.

[Diagrams with Python](https://github.com/agustinafassina/Diagrams.With.Python) è come tengo
quelle immagini oneste: diagrammi di infrastruttura come codice con
[mingrammer/diagrams](https://diagrams.mingrammer.com/). Esegui uno script, ottieni un PNG,
committa entrambi. Cambi la topologia, rilanci, la documentazione si muove con essa.

## Cosa c'è nel repo

Ogni cartella è uno script autonomo con un percorso di output prevedibile. Gli script
risolvono config e output dalla propria directory, quindi puoi eseguirli da qualsiasi
posizione:

| Cartella | Script | Cosa modella |
| --- | --- | --- |
| `samples/` | `project-2.py` … `project-5.py` | Piccole topologie AWS (VPC, ALB, ECS, RDS) |
| `samples/` | `json-read.py` | Stesso layout, guidato da `config.json` invece di nodi hardcoded |
| `ci-cd/` | `ci-cd-bitbucket-azure-aws.py` | Bitbucket → Azure DevOps → AWS (QA su `develop`, prod su `master`) |
| `multi-region-dr/` | `route53-failover.py` | Failover Route 53 tra due regioni AWS |
| `diagram-terra/` | `diagram-terra.py` | Intero estate AWS + Azure DevOps |
| `ecs-fargate/` | `fargate.py` | Topologia servizio ECS Fargate |
| `ec2-backup-with-s3/` | `backup.py` | Flusso backup EC2 → S3 |
| `with-docker/` | `with-dockers.py` | Layout deploy con Docker |
| `big-diagram/` | `with-gateway.py` | Topologia estesa con gateway e `config.json` locale |

I PNG generati finiscono in `examples/` (galleria condivisa) o accanto alla cartella dello
script.

## Diagrammi guidati da JSON

Hardcodare le etichette in Python va bene per uno schizzo. Quando voglio ritoccare i testi
senza toccare Python, `samples/json-read.py` legge `config.json` (nome regione, etichette
componenti, ruoli IAM, security group) e costruisce lo stesso layout Cluster/VPC:

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

Cambi il JSON, rilanci, nuovo diagramma. Utile quando lo stesso script serve più ambienti,
o quando chi non vive in Python deve aggiornare un'etichetta.

## Come eseguire

Servono Python 3.x, [Graphviz](https://graphviz.org/download/) nel PATH, e
`pip install -r requirements.txt` (fissa `diagrams==0.25.1`).

```bash
python samples/project-4.py
# → examples/project-4.png

python ci-cd/ci-cd-bitbucket-azure-aws.py
# → examples/ci-cd-bitbucket-azure-aws.png
```

Diagrams può anche emettere un file sorgente Graphviz accanto al PNG. Si può eliminare; la
prossima esecuzione lo rigenera.

## Perché esiste

Questo repo è il complemento visivo del lavoro infrastructure-as-code, in particolare le
guide di
[Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture).
Invece di export Lucidchart di cui nessuno si fida, i diagrammi stanno in git accanto al
Terraform che descrivono. Chi fa review vede la stessa topologia nella PR. Chi entra nel
team rigenera PNG freschi invece di zoomare su una slide sfocata del trimestre scorso.
