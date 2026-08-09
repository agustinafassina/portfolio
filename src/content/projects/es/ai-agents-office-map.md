---
title: AI Agents Office Map
description: Una oficina isométrica en WebGL donde agentes de IA chatean, caminan entre zonas y hablan entre ellos — respaldada por un proxy LiteLLM local sobre modelos Ollama gratuitos.
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
coverAlt: Arquitectura de AI Agents Office Map — escena WebGL, stores Zustand, proxy LiteLLM y modelos Ollama
diagram: ../../../assets/projects/ai-agents-office-map/litellm-workflow.png
diagramAlt: Flujo de LiteLLM.Local — cliente a API LiteLLM a Ollama, con PostgreSQL para logs de uso
featured: true
order: 1
startedOn: 2025-10-01
---

La mayoría de las demos de IA son un chat. Esta es una oficina. **AI Agents Office Map** es
un diorama isométrico en WebGL donde los agentes aparecen como avatares, caminan entre zonas,
abren chats por rol y mantienen conversaciones peer — alimentados por un gateway local
compatible con OpenAI en lugar de una API cloud de pago.

## El ecosistema

| Pieza | Repo | Rol |
| --- | --- | --- |
| **Office Map** | [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) | Escena React Three Fiber, HUD, chat, orquestación peer |
| **LiteLLM Local** | [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) | Proxy Docker + PostgreSQL hacia Ollama en el host |

El modo mock corre sin backend. El modo live apunta a LiteLLM.Local en el puerto `4000` para
que Cursor, scripts y esta app compartan los mismos modelos locales gratuitos.

## Demo

<video src="/projects/ai-agents-office-map/demo.mp4" autoplay loop muted playsinline controls preload="metadata"></video>

Paneá el mapa, chateá con un agente, enviá comandos como `ve a tomar cafe`, mirá banners peer
y globos de diálogo, abrí el log de interacción y veé cómo las luces de zona reaccionan cuando
los avatares se mueven.

## Office Map

Construido con **React 19**, **TypeScript**, **Vite**, **React Three Fiber**, **Drei**,
**Zustand** y **nginx** para la imagen Docker.

- **Oficina 3D interactiva** — cámara isométrica, zonas, muebles, avatares, detalle ambiental
- **Chat por agente** — hilos persistidos, markdown + streaming, Stop al generar, cambio de modelo
- **Conversaciones peer** — pairing por proximidad, turnos LLM alternados, banner + bubbles en escena
- **Luces por ocupación** — las luces de área se intensifican cuando hay avatares
- **Log de interacción** — panel en el HUD y export `.txt` descargable
- **Comandos de escena** — el chat mueve agentes (`ve a tomar cafe`, `relajate`, `vuelve al escritorio`, `ve al hub`)
- **UI bilingüe** — roles, prompts y chrome en inglés y español
- **Roster configurable** — nombres, roles, modelos, zonas, prompts y avatares en `public/agents.json`

Los agentes por defecto mapean a ids de LiteLLM.Local: Max (Backend / `llama3-local`), Lena
(UI/UX / `gemma2-2b-local`), Paula (PO / `qwen2.5-1.5b-local`), Quinn (QA / `llama3.2-1b-local`).

Vite y nginx proxean `/api/litellm` para que el browser no pegue al origen del proxy
directamente — sin pelear con CORS en local ni en Docker.

## LiteLLM Local

[LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) es la mitad backend:
Docker Compose corre **LiteLLM** + **PostgreSQL**, hablando con **Ollama** en el host
(`host.docker.internal:11434`). Los clientes hablan el protocolo OpenAI; los modelos quedan
en tu máquina.

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

Los logs de uso y spend tracking van a PostgreSQL. El repo incluye `chat-try.ps1` y ejemplos
curl para smoke tests.

## Repositorios

- [AI.Agents.Office.Map.WebGL](https://github.com/agustinafassina/AI.Agents.Office.Map.WebGL) — oficina WebGL + UI de agentes
- [LiteLLM.Local](https://github.com/agustinafassina/LiteLLM.Local) — proxy local compatible con OpenAI sobre Ollama

Repos públicos — cloná el office map para la escena; LiteLLM.Local cuando quieras modelos live
sin facturas de API cloud.
