---
title: AI Agents Office Map
description: An isometric WebGL office where AI agents chat, walk zones, and talk to each other — backed by a local LiteLLM proxy over free Ollama models.
lang: en
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
coverAlt: Architecture of the AI Agents Office Map — WebGL scene, Zustand stores, LiteLLM proxy, and Ollama models
diagram: ../../../assets/projects/ai-agents-office-map/litellm-workflow.png
diagramAlt: LiteLLM.Local request flow — client to LiteLLM API to Ollama, with PostgreSQL for usage logs
featured: true
order: 1
startedOn: 2025-10-01
---

Most AI demos are a chat box. This one is an office. **AI Agents Office Map** is an
isometric WebGL diorama where agents appear as avatars, walk between zones, open
role-specific chats, and hold ambient peer conversations — powered by a local
OpenAI-compatible gateway instead of a paid cloud key.

## The ecosystem

| Piece | Repo | Role |
| --- | --- | --- |
| **Office Map** | [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) | React Three Fiber scene, HUD, chat, peer orchestration |
| **LiteLLM Local** | [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) | Docker proxy + PostgreSQL routing to Ollama on the host |

Mock mode runs with no backend. Live mode points at LiteLLM.Local on port `4000` so Cursor,
scripts, and this app share the same free local models.

## Demo

<video src="/projects/ai-agents-office-map/demo.mp4" autoplay loop muted playsinline controls preload="metadata"></video>

Pan the map, chat with an agent, send scene commands like `ve a tomar cafe`, watch peer
banners and speech bubbles, open the interaction log, and see zone lights react as avatars
move.

## Office Map

Built with **React 19**, **TypeScript**, **Vite**, **React Three Fiber**, **Drei**,
**Zustand**, and **nginx** for the Docker image.

- **Interactive 3D office** — isometric camera, zones, furniture, avatars, ambient detail
- **Per-agent chat** — persisted threads, markdown + streaming, Stop while generating, model switcher
- **Peer conversations** — proximity pairing, alternating LLM turns, banner + bubbles in-scene
- **Zone occupancy lighting** — area lights brighten when avatars are present
- **Interaction log** — live HUD panel and downloadable `.txt` export
- **Scene commands** — chat can move agents (`ve a tomar cafe`, `relajate`, `vuelve al escritorio`, `ve al hub`)
- **Bilingual UI** — English and Spanish roles, prompts, and chrome
- **Configurable roster** — names, roles, models, zones, prompts, and avatar designs in `public/agents.json`

Default agents map to LiteLLM.Local model ids: Max (Backend / `llama3-local`), Lena (UI/UX /
`gemma2-2b-local`), Paula (PO / `qwen2.5-1.5b-local`), Quinn (QA / `llama3.2-1b-local`).

Vite and nginx proxy `/api/litellm` so the browser never hits the proxy origin directly —
no CORS fight in local or Docker.

## LiteLLM Local

[LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) is the backend half:
Docker Compose runs **LiteLLM** + **PostgreSQL**, talking to **Ollama** on the host
(`host.docker.internal:11434`). Clients speak the OpenAI protocol; models stay on your machine.

| API model | Ollama backend |
| --- | --- |
| `llama3-local` | `phi3:mini` |
| `llama3.2-1b-local` | `llama3.2:1b` |
| `qwen2.5-1.5b-local` | `qwen2.5:1.5b` |
| `gemma2-2b-local` | `gemma2:2b` |

```bash
docker compose up -d
# → http://localhost:4000/v1/chat/completions
```

Usage logs and spend tracking land in PostgreSQL. A PowerShell `chat-try.ps1` script and
curl examples ship in the repo for smoke tests.

## Repositories

- [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) — WebGL office + agent UI
- [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) — local OpenAI-compatible proxy over Ollama

Public repos — clone the office map for the scene, LiteLLM.Local when you want live models
without cloud API bills.
