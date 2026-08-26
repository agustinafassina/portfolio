---
title: AI Agents Office Map
description: An isometric WebGL office where AI agents chat, walk between zones, and talk to each other, backed by a local LiteLLM proxy over free Ollama models.
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
coverAlt: Architecture of the AI Agents Office Map with WebGL scene, Zustand stores, LiteLLM proxy, and Ollama models
diagram: ../../../assets/projects/ai-agents-office-map/litellm-workflow.png
diagramAlt: LiteLLM.Local request flow from client to LiteLLM API to Ollama, with PostgreSQL for usage logs
featured: true
order: 1
startedOn: 2025-10-01
---

Most AI demos are a chat box in a browser tab. I wanted something you can look at: an office
floor, people moving, conversations happening in place.

**AI Agents Office Map** is an isometric WebGL scene. Agents are avatars. They walk between
zones, open role-specific chats, and run ambient peer talks when they get close. The models
run locally through an OpenAI-compatible gateway. No paid cloud key required for the default
setup.

## The pieces

| Piece | Repo | Role |
| --- | --- | --- |
| **Office Map** | [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) | React Three Fiber scene, HUD, chat, peer orchestration |
| **LiteLLM Local** | [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) | Docker proxy + PostgreSQL routing to Ollama on the host |

Mock mode needs no backend. Live mode points at LiteLLM.Local on port `4000`, so Cursor,
scripts, and this app can share the same free local models.

## Demo

<video src="/projects/ai-agents-office-map/demo.mp4" autoplay loop muted playsinline controls preload="metadata"></video>

Pan the map, chat with an agent, send a scene command like `ve a tomar cafe`, watch peer
banners and speech bubbles, open the interaction log, and see zone lights react when avatars
move.

## Office Map

**React 19**, **TypeScript**, **Vite**, **React Three Fiber**, **Drei**, **Zustand**, plus
**nginx** in the Docker image.

What you get in the scene:

- Isometric camera, zones, furniture, avatars
- Per-agent chat with persisted threads, markdown streaming, Stop while generating, model switcher
- Peer conversations by proximity (alternating LLM turns, banner + bubbles in-scene)
- Area lights that brighten when someone is in the zone
- Interaction log in the HUD, exportable as `.txt`
- Chat commands that move agents (`ve a tomar cafe`, `relajate`, `vuelve al escritorio`, `ve al hub`)
- UI and prompts in English and Spanish
- Roster in `public/agents.json` (names, roles, models, zones, prompts, avatar designs)

Default agents map to LiteLLM.Local ids: Max (Backend / `llama3-local`), Lena (UI/UX /
`gemma2-2b-local`), Paula (PO / `qwen2.5-1.5b-local`), Quinn (QA / `llama3.2-1b-local`).

Vite and nginx proxy `/api/litellm`. The browser never talks to the proxy origin directly, so
you skip the CORS fight in local and in Docker.

## LiteLLM Local

[LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) is the other half.
Compose runs **LiteLLM** + **PostgreSQL** and talks to **Ollama** on the host
(`host.docker.internal:11434`). Clients speak OpenAI protocol. Models stay on your machine.

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

Usage and spend land in PostgreSQL. The repo ships `chat-try.ps1` and curl examples for a
quick smoke test.

## Repositories

- [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) (WebGL office + agent UI)
- [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) (local OpenAI-compatible proxy over Ollama)

Both are public. Clone the office map for the scene. Add LiteLLM.Local when you want live
models without a cloud bill.
