---
title: AI Agents Office Map
description: Una oficina isométrica en WebGL donde agentes de IA chatean, caminan entre zonas y hablan entre ellos, con un proxy LiteLLM local sobre modelos Ollama gratuitos.
lang: es
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
coverAlt: Arquitectura de AI Agents Office Map con escena WebGL, stores Zustand, proxy LiteLLM y modelos Ollama
diagram: ../../../assets/projects/ai-agents-office-map/litellm-workflow.png
diagramAlt: Flujo de LiteLLM.Local del cliente a la API LiteLLM y a Ollama, con PostgreSQL para logs de uso
featured: false
draft: true
order: 10
startedOn: 2025-10-01
---

La mayoría de las demos de IA son un chat en una pestaña. Yo quería algo que se pueda mirar:
un piso de oficina, gente moviéndose, conversaciones pasando en el lugar.

**AI Agents Office Map** es una escena isométrica en WebGL. Los agentes son avatares. Caminan
entre zonas, abren chats por rol y arman charlas peer cuando se acercan. Los modelos corren
en local por un gateway compatible con OpenAI. Para el setup default no hace falta una key
cloud de pago.

## Las piezas

| Pieza | Repo | Rol |
| --- | --- | --- |
| **Office Map** | [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) | Escena React Three Fiber, HUD, chat, orquestación peer |
| **LiteLLM Local** | [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) | Proxy Docker + PostgreSQL hacia Ollama en el host |

El modo mock no necesita backend. El modo live apunta a LiteLLM.Local en el puerto `4000`,
así Cursor, scripts y esta app comparten los mismos modelos locales gratis.

## Demo

<video src="/projects/ai-agents-office-map/demo.mp4" autoplay loop muted playsinline controls preload="metadata"></video>

Paneá el mapa, chateá con un agente, mandá un comando como `ve a tomar cafe`, mirá banners
peer y globos, abrí el log de interacción y fijate cómo reaccionan las luces de zona cuando
se mueven los avatares.

## Office Map

**React 19**, **TypeScript**, **Vite**, **React Three Fiber**, **Drei**, **Zustand**, y
**nginx** en la imagen Docker.

Qué hay en la escena:

- Cámara isométrica, zonas, muebles, avatares
- Chat por agente con hilos persistidos, streaming en markdown, Stop al generar, cambio de modelo
- Conversaciones peer por proximidad (turnos LLM alternados, banner + bubbles en escena)
- Luces de área que se intensifican cuando hay alguien en la zona
- Log de interacción en el HUD, exportable a `.txt`
- Comandos de chat que mueven agentes (`ve a tomar cafe`, `relajate`, `vuelve al escritorio`, `ve al hub`)
- UI y prompts en inglés y español
- Roster en `public/agents.json` (nombres, roles, modelos, zonas, prompts, avatares)

Los agentes por defecto mapean a ids de LiteLLM.Local: Max (Backend / `llama3-local`), Lena
(UI/UX / `gemma2-2b-local`), Paula (PO / `qwen2.5-1.5b-local`), Quinn (QA /
`llama3.2-1b-local`).

Vite y nginx proxean `/api/litellm`. El browser no pega al origen del proxy directo, así
evitás pelear con CORS en local y en Docker.

## LiteLLM Local

[LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) es la otra mitad.
Compose corre **LiteLLM** + **PostgreSQL** y habla con **Ollama** en el host
(`host.docker.internal:11434`). Los clientes hablan protocolo OpenAI. Los modelos quedan en
tu máquina.

| Modelo API | Backend Ollama |
| --- | --- |
| `llama3-local` | `phi3:mini` |
| `llama3.2-1b-local` | `llama3.2:1b` |
| `qwen2.5-1.5b-local` | `qwen2.5:1.5b` |
| `gemma2-2b-local` | `gemma2:2b` |

```bash
docker compose up -d
# → http://localhost:4000/v1/chat/completions
```

Uso y spend van a PostgreSQL. El repo trae `chat-try.ps1` y ejemplos curl para un smoke test
rápido.

## Repositorios

- [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) (oficina WebGL + UI de agentes)
- [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) (proxy local compatible con OpenAI sobre Ollama)

Los dos son públicos. Cloná el office map para la escena. Sumá LiteLLM.Local cuando quieras
modelos live sin factura cloud.
