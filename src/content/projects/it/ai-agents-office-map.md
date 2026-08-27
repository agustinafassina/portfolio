---
title: AI Agents Office Map
description: Un ufficio isometrico in WebGL dove agenti AI chattono, si spostano tra zone e parlano tra loro, con un proxy LiteLLM locale su modelli Ollama gratuiti.
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
coverAlt: Architettura di AI Agents Office Map con scena WebGL, store Zustand, proxy LiteLLM e modelli Ollama
diagram: ../../../assets/projects/ai-agents-office-map/litellm-workflow.png
diagramAlt: Flusso LiteLLM.Local dal client all'API LiteLLM fino a Ollama, con PostgreSQL per i log di utilizzo
featured: false
draft: true
order: 10
startedOn: 2025-10-01
---

La maggior parte delle demo AI è una chat in una tab. Io volevo qualcosa da guardare: un
piano ufficio, gente che si muove, conversazioni che succedono sul posto.

**AI Agents Office Map** è una scena isometrica in WebGL. Gli agenti sono avatar. Camminano
tra le zone, aprono chat per ruolo e fanno chiacchiere peer quando si avvicinano. I modelli
girano in locale tramite un gateway compatibile OpenAI. Per il setup di default non serve
una chiave cloud a pagamento.

## I pezzi

| Pezzo | Repo | Ruolo |
| --- | --- | --- |
| **Office Map** | [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) | Scena React Three Fiber, HUD, chat, orchestrazione peer |
| **LiteLLM Local** | [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) | Proxy Docker + PostgreSQL verso Ollama sull'host |

La modalità mock non serve backend. La modalità live punta a LiteLLM.Local sulla porta
`4000`, così Cursor, script e questa app condividono gli stessi modelli locali gratis.

## Demo

<video src="/projects/ai-agents-office-map/demo.mp4" autoplay loop muted playsinline controls preload="metadata"></video>

Fai pan sulla mappa, chatta con un agente, manda un comando come `ve a tomar cafe`, guarda
banner peer e fumetti, apri il log di interazione e vedi le luci di zona reagire quando gli
avatar si muovono.

## Office Map

**React 19**, **TypeScript**, **Vite**, **React Three Fiber**, **Drei**, **Zustand**, più
**nginx** nell'immagine Docker.

Cosa c'è in scena:

- Camera isometrica, zone, arredi, avatar
- Chat per agente con thread persistiti, streaming markdown, Stop in generazione, switch modello
- Conversazioni peer per prossimità (turni LLM alternati, banner + bubble in scena)
- Luci di area che si intensificano quando c'è qualcuno nella zona
- Log di interazione nell'HUD, esportabile in `.txt`
- Comandi chat che muovono gli agenti (`ve a tomar cafe`, `relajate`, `vuelve al escritorio`, `ve al hub`)
- UI e prompt in inglese e spagnolo
- Roster in `public/agents.json` (nomi, ruoli, modelli, zone, prompt, avatar)

Gli agenti di default mappano agli id LiteLLM.Local: Max (Backend / `llama3-local`), Lena
(UI/UX / `gemma2-2b-local`), Paula (PO / `qwen2.5-1.5b-local`), Quinn (QA /
`llama3.2-1b-local`).

Vite e nginx fanno proxy di `/api/litellm`. Il browser non parla all'origine del proxy in
diretta, così eviti la lotta con il CORS in locale e in Docker.

## LiteLLM Local

[LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) è l'altra metà.
Compose esegue **LiteLLM** + **PostgreSQL** e parla con **Ollama** sull'host
(`host.docker.internal:11434`). I client parlano protocollo OpenAI. I modelli restano sulla
tua macchina.

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

Utilizzo e spend finiscono in PostgreSQL. Il repo include `chat-try.ps1` ed esempi curl per
uno smoke test veloce.

## Repository

- [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) (ufficio WebGL + UI agenti)
- [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) (proxy locale compatibile OpenAI su Ollama)

Entrambi pubblici. Clona l'office map per la scena. Aggiungi LiteLLM.Local quando vuoi
modelli live senza conto cloud.
