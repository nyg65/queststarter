# QuestStarter — One-Page Spec

**Tagline:** Turn any idea into a quest. Level 1 to shipped.

## Problem
Vibe coders and AI-curious builders stall on "what do I build, and where do I start?" Ideas are big and fuzzy; AI coding tools need scoped, well-structured prompts.

## Audience
People into AI, AI agents, video games, and vibe coding (Cursor, Claude Code, Windsurf, Copilot users; beginners to intermediate).

## Core Feature
User types a project idea. QuestStarter returns a **Quest Card**:
1. **Scoped MVP** — one-line pitch, must-have (Level 1) features, explicitly out-of-scope list, success criteria.
2. **Recommended tech stack** — with reasons, tuned to the idea type (bot, game, web app, agent, extension, mobile, data/API).
3. **Step-by-step build plan** — leveled quests with XP, each with a done-check.
4. **Copy-paste prompts** for Cursor / Claude Code etc. — kickoff rules file, per-level prompts, debug and polish prompts.

Extras: copy buttons, download as Markdown, XP progress checklist saved in localStorage, example-idea chips.

## Branding
Quests, levels, XP, boss fights (the hardest feature), loot (nice-to-haves). Dark arcade UI, neon accents.

## Architecture
- Static single-page front end (`public/`), small zero-dependency Node server (`server.js`).
- `POST /api/generate {idea}` -> `generate(idea)` in `generator.js`. Template/keyword-based today; the function is the single swap point for an LLM call (same JSON schema).

## Roadmap
- v0.1 (done): template generator, keyword-varied output, copy/download, XP tracker.
- v0.2: LLM-backed generator (with template fallback), skill-level and time-budget inputs, shareable quest URLs.
- v0.3: accounts, saved quests, export to GitHub issues / Cursor rules repo.
- v0.4: agent mode — auto-scaffolds the repo and opens a PR; community quest gallery and leaderboards.

## Monetization (later)
Free at launch to build audience. Later: Pro tier (unlimited LLM quests, saved projects, GitHub export), team plans, premium prompt packs / templates, sponsored "loot drops" from dev-tool vendors.

## Metrics
Quests generated, copy-prompt clicks, return visitors, share rate.
