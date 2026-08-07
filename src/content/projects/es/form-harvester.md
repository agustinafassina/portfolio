---
title: Form Harvester
description: Un CLI que extrae formularios PDF recurrentes a JSON estructurado para que nadie tenga que retipearlos a las 2 de la mañana.
lang: es
translationKey: form-harvester
slug: form-harvester
stack:
  - Python
  - Typer
  - Pydantic
  - Tesseract
repoUrl: https://github.com/example/form-harvester
demoUrl: https://example.com/form-harvester
cover: ../../../assets/projects/automation.png
coverAlt: Un monitor CRT ejecutando un script de automatización junto a un brazo robótico sellando una pila de formularios
featured: false
order: 10
startedOn: 2024-02-10
---

Todos los meses el equipo de operaciones recibía los mismos catorce PDF de proveedores y
tipeaba los mismos cuarenta campos en la misma planilla. Les llevaba un día entero de
trabajo, y aproximadamente uno de cada veinte números salía mal.

Form Harvester lee un directorio de PDF, compara cada uno contra una plantilla declarada
y emite JSON validado. Todo aquello de lo que no está seguro queda marcado en vez de
adivinado, porque un número equivocado en silencio sale mucho más caro que uno faltante
que hace ruido.

## Cómo funciona

La herramienta tiene tres etapas. Clasifica cada PDF contra las plantillas conocidas
mirando anclas de texto en lugar de coordenadas de layout, lo que sobrevive a las
pequeñas variaciones de formato que los proveedores introducen sin avisar. Después extrae
los campos con una mezcla de extracción directa de texto y OCR, recurriendo al OCR solo
donde el PDF no tiene capa de texto. Por último valida todo con un modelo de Pydantic.

## Qué haría distinto

Las definiciones de plantilla empezaron como YAML y crecieron hasta convertirse en algo
que pide a gritos ser un lenguaje de esquemas de verdad. Si lo reconstruyera, las
plantillas serían objetos de Python desde el primer día. Los formatos de configuración
que empiezan a tener condicionales son una señal de alarma que ahora reconozco más rápido.
