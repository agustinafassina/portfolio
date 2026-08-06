---
title: Ship Gate
description: Un guardiano dei deploy che blocca le release che falliscono uno qualsiasi di quattro controlli, e spiega esattamente quale in linguaggio chiaro.
lang: it
translationKey: ship-gate
slug: ship-gate
stack:
  - Go
  - GitHub Actions
  - Terraform
  - PostgreSQL
repoUrl: https://github.com/example/ship-gate
cover: ../../../assets/projects/pipeline.png
coverAlt: Un nastro trasportatore di casse etichettate che passa attraverso tre archi verso una lampada verde di conferma
featured: true
order: 2
startedOn: 2023-08-21
---

Avevamo una pipeline di deploy tecnicamente verde e praticamente inaffidabile. I controlli
esistevano, ma erano sparsi su tre sistemi e ognuno poteva essere saltato con un messaggio
di commit che nessuno revisionava.

Ship Gate riduce quei controlli a un unico stato obbligatorio. Una release passa solo se
le migrazioni sono reversibili, nel diff non compaiono segreti, l error budget del
servizio è sopra soglia e il deploy precedente è stabile da trenta minuti.

## La parte che ha contato

L ingegneria interessante non sono stati i controlli, sono stati i messaggi di errore. La
prima versione restituiva il nome del controllo e un codice di uscita, e le persone
rispondevano rilanciandolo finché non passava. Riscrivere l output perché dicesse quale
migrazione fosse irreversibile, e cosa aggiungere per renderla reversibile, ha ridotto le
richieste di deroga quasi a zero.

Un controllo che le persone aggirano è peggio di nessun controllo, perché produce le
scartoffie della sicurezza senza la sicurezza.
