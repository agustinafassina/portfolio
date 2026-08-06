---
title: Form Harvester
description: A CLI that scrapes recurring PDF forms into structured JSON so nobody has to retype them at 2am.
lang: en
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
coverAlt: A CRT monitor running an automation script next to a robot arm stamping a stack of forms
featured: true
order: 1
startedOn: 2024-02-10
---

Every month the ops team received the same fourteen supplier PDFs and typed the same
forty fields into the same spreadsheet. It took a full working day, and roughly one in
twenty numbers came out wrong.

Form Harvester reads a directory of PDFs, matches each one against a declared template,
and emits validated JSON. Anything it is not confident about is flagged rather than
guessed, because a silent wrong number is far more expensive than a loud missing one.

## How it works

The tool has three stages. It classifies each PDF against known templates by looking at
text anchors rather than layout coordinates, which survives the small formatting drift
suppliers introduce without warning. It then extracts fields with a mix of direct text
extraction and OCR, falling back to OCR only where the PDF has no text layer. Finally it
validates everything through a Pydantic model.

## What I would do differently

The template definitions started as YAML and grew into something that badly wants to be
a real schema language. If I rebuilt it, templates would be Python objects from day one.
Configuration formats that grow conditionals are a warning sign I now recognise faster.
