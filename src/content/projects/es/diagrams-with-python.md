---
title: Diagrams with Python
description: Diagramas de infraestructura AWS reproducibles como código Python — versionados, regenerables y alineados con lo que definís en Terraform.
lang: es
translationKey: diagrams-with-python
slug: diagrams-with-python
stack:
  - Python
  - Diagrams
  - Graphviz
  - AWS
repoUrl: https://github.com/agustinafassina/Diagrams.With.Python
cover: ../../../assets/projects/diagrams-with-python-cover.png
coverAlt: Diagrama de infraestructura AWS y Azure DevOps generado desde Python — VPC, ECS, RDS, pipelines CI/CD y layout multi-región
diagram: ../../../assets/projects/diagrams-with-python/ci-cd.png
diagramAlt: Diagrama de pipeline CI/CD — Bitbucket a Azure DevOps a AWS con ramas QA y producción separadas
featured: true
order: 4
startedOn: 2025-06-01
---

Los diagramas de arquitectura dibujados a mano quedan obsoletos la semana después de
exportarlos. Terraform sigue alineado con producción; el PNG en la wiki, no.
[Diagrams with Python](https://github.com/agustinafassina/Diagrams.With.Python) es una
colección de diagramas de infraestructura definidos como código con
[mingrammer/diagrams](https://diagrams.mingrammer.com/) — ejecutás un script, obtenés un
PNG, commiteás ambos. Cambiás la topología, volvés a correr, la documentación se actualiza
con ella.

## Qué hay en el repo

Cada carpeta es un script autocontenido con una ruta de salida predecible. Los scripts
resuelven config y salidas desde su propio directorio, así que podés ejecutarlos desde
cualquier lugar:

| Carpeta | Script | Qué modela |
| --- | --- | --- |
| `samples/` | `project-2.py` … `project-5.py` | Topologías AWS pequeñas — VPC, ALB, ECS, RDS |
| `samples/` | `json-read.py` | Mismo layout, driven por `config.json` en lugar de nodos hardcodeados |
| `ci-cd/` | `ci-cd-bitbucket-azure-aws.py` | Bitbucket → Azure DevOps → AWS (QA en `develop`, prod en `master`) |
| `multi-region-dr/` | `route53-failover.py` | Failover Route 53 entre dos regiones AWS |
| `diagram-terra/` | `diagram-terra.py` | Estate completo AWS + Azure DevOps |
| `ecs-fargate/` | `fargate.py` | Topología de servicio ECS Fargate |
| `ec2-backup-with-s3/` | `backup.py` | Flujo de backup EC2 → S3 |
| `with-docker/` | `with-dockers.py` | Layout de despliegue con Docker |
| `big-diagram/` | `with-gateway.py` | Topología extendida con gateway y `config.json` local |

Los PNG generados van a `examples/` (galería compartida) o junto a la carpeta del script.

## Diagramas driven por JSON

Hardcodear labels en Python sirve para bocetos puntuales. Para diagramas que querés ajustar
sin tocar código, `samples/json-read.py` lee `config.json` — nombre de región, labels de
componentes, roles IAM, security groups — y arma el mismo layout Cluster/VPC
programáticamente:

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

Cambiás el JSON, volvés a correr, diagrama nuevo. Útil cuando el mismo script sirve
múltiples entornos o cuando alguien que no es dev necesita actualizar labels.

## Cómo ejecutar

Requisitos: Python 3.x, [Graphviz](https://graphviz.org/download/) en el PATH, y
`pip install -r requirements.txt` (fija `diagrams==0.25.1`).

```bash
python samples/project-4.py
# → examples/project-4.png

python ci-cd/ci-cd-bitbucket-azure-aws.py
# → examples/ci-cd-bitbucket-azure-aws.png
```

Diagrams también puede emitir un archivo fuente Graphviz junto al PNG — se puede borrar y
regenerar en la próxima ejecución.

## Por qué existe

Este repo es el complemento visual del trabajo de infraestructura como código — especialmente
las guías de
[Aws.Solutions.Architecture](https://github.com/agustinafassina/Aws.Solutions.Architecture).
En lugar de mantener exports de Lucidchart en los que nadie confía, guardás los diagramas en
control de versiones junto al Terraform que describen. Los reviewers ven la misma topología en
el diff del PR; quien entra al equipo regenera PNGs frescos en lugar de hacer zoom en una
slide borrosa del trimestre pasado.
