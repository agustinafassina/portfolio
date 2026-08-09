---
title: AI Agents Office Map
description: Un ufficio isometrico in WebGL dove agenti AI chattono, si spostano tra zone e parlano tra loro — supportato da un proxy LiteLLM locale su modelli Ollama gratuiti.
lang: it
translationKey: ai-agents-office-map
slug: ai-agents-office-map
stack:
  - React
  - TypeScript
  - Three.js
  - Vite
  - LiteLLM
  - Ollama
  - Docker
repoUrl: https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL
cover: ../../../assets/projects/ai-agents-office-map-cover.png
coverAlt: Architettura di AI Agents Office Map — scena WebGL, store Zustand, proxy LiteLLM e modelli Ollama
diagram: ../../../assets/projects/ai-agents-office-map/litellm-workflow.png
diagramAlt: Flusso LiteLLM.Local — client verso API LiteLLM verso Ollama, con PostgreSQL per i log di utilizzo
featured: true
order: 1
startedOn: 2025-10-01
---

La maggior parte delle demo AI è una chat box. Questa è un ufficio. **AI Agents Office Map**
è un diorama isometrico in WebGL dove gli agenti appaiono come avatar, camminano tra le zone,
aprono chat per ruolo e tengono conversazioni peer — alimentati da un gateway locale
compatibile OpenAI invece di una chiave cloud a pagamento.

## L'ecosistema

| Pezzo | Repo | Ruolo |
| --- | --- | --- |
| **Office Map** | [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) | Scena React Three Fiber, HUD, chat, orchestrazione peer |
| **LiteLLM Local** | [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) | Proxy Docker + PostgreSQL verso Ollama sull'host |

La modalità mock gira senza backend. La modalità live punta a LiteLLM.Local sulla porta
`4000` così Cursor, script e questa app condividono gli stessi modelli locali gratuiti.

## Demo

<video src="/projects/ai-agents-office-map/demo.mp4" autoplay loop muted playsinline controls preload="metadata"></video>

Pan sulla mappa, chatta con un agente, invia comandi come `ve a tomar cafe`, guarda banner
peer e fumetti, apri il log di interazione e vedi le luci di zona reagire quando gli avatar
si muovono.

## Office Map

Costruito con **React 19**, **TypeScript**, **Vite**, **React Three Fiber**, **Drei**,
**Zustand** e **nginx** per l'immagine Docker.

- **Ufficio 3D interattivo** — camera isometrica, zone, arredi, avatar, dettaglio ambientale
- **Chat per agente** — thread persistiti, markdown + streaming, Stop in generazione, switch modello
- **Conversazioni peer** — pairing per prossimità, turni LLM alternati, banner + bubble in scena
- **Luci per occupazione** — le luci di area si intensificano quando ci sono avatar
- **Log di interazione** — pannello HUD e export `.txt` scaricabile
- **Comandi di scena** — la chat muove gli agenti (`ve a tomar cafe`, `relajate`, `vuelve al escritorio`, `ve al hub`)
- **UI bilingue** — ruoli, prompt e chrome in inglese e spagnolo
- **Roster configurabile** — nomi, ruoli, modelli, zone, prompt e avatar in `public/agents.json`

Gli agenti di default mappano agli id LiteLLM.Local: Max (Backend / `llama3-local`), Lena
(UI/UX / `gemma2-2b-local`), Paula (PO / `qwen2.5-1.5b-local`), Quinn (QA / `llama3.2-1b-local`).

Vite e nginx fanno proxy di `/api/litellm` così il browser non colpisce l'origine del proxy
direttamente — niente CORS in locale o in Docker.

## LiteLLM Local

[LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) è la metà backend:
Docker Compose esegue **LiteLLM** + **PostgreSQL**, parlando con **Ollama** sull'host
(`host.docker.internal:11434`). I client parlano il protocollo OpenAI; i modelli restano
sulla tua macchina.

| Modello API | Backend Ollama |
| --- | --- |
| `llama3-local` | `phi3:mini` |
| `llama3.2-1b-local` | `llama3.2:1b` |
| `qwen2.5-1.5b-local` | `qwen2.5:1.5b` |
| `gemma2-2b-local` | `gemma2:2b` |

```bash
docker compose up -d
# → http://localhost:4000/v1/chat/completions
```

Log di utilizzo e spend tracking finiscono in PostgreSQL. Il repo include `chat-try.ps1` ed
esempi curl per smoke test.

## Repository

- [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) — ufficio WebGL + UI agenti
- [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) — proxy locale compatibile OpenAI su Ollama

Repo pubblici — clona l'office map per la scena; LiteLLM.Local quando vuoi modelli live senza
fatture API cloud.
