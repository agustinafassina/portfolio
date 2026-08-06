---
title: Form Harvester
description: Una CLI che estrae moduli PDF ricorrenti in JSON strutturato, così nessuno deve ribatterli alle 2 di notte.
lang: it
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
coverAlt: Un monitor CRT che esegue uno script di automazione accanto a un braccio robotico che timbra una pila di moduli
featured: true
order: 1
startedOn: 2024-02-10
---

Ogni mese il team operativo riceveva gli stessi quattordici PDF dei fornitori e batteva
gli stessi quaranta campi nello stesso foglio di calcolo. Ci voleva un intera giornata
lavorativa, e circa un numero su venti usciva sbagliato.

Form Harvester legge una cartella di PDF, confronta ognuno con un modello dichiarato ed
emette JSON validato. Tutto ciò di cui non è sicuro viene segnalato invece che indovinato,
perché un numero sbagliato in silenzio costa molto più caro di uno mancante che fa rumore.

## Come funziona

Lo strumento ha tre fasi. Classifica ogni PDF rispetto ai modelli noti guardando ancore
testuali invece delle coordinate di layout, il che sopravvive alle piccole derive di
formattazione che i fornitori introducono senza preavviso. Poi estrae i campi con un mix
di estrazione diretta del testo e OCR, ricorrendo all OCR solo dove il PDF non ha uno
strato di testo. Infine valida tutto tramite un modello Pydantic.

## Cosa farei diversamente

Le definizioni dei modelli sono nate come YAML e sono cresciute fino a diventare qualcosa
che chiede disperatamente di essere un vero linguaggio di schemi. Se lo ricostruissi, i
modelli sarebbero oggetti Python dal primo giorno. I formati di configurazione che
iniziano ad avere condizionali sono un campanello d allarme che ora riconosco più in fretta.
