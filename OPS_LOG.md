# OPS LOG
## 2026-10-16
- Shipped: /q/<base64url idea> stateless share URLs + Share button; SEO meta/OG/Twitter/JSON-LD (WebApplication + FAQPage); /sitemap.xml, /robots.txt, /llms.txt; FAQ section.
- Local verification: curl on routes (200, bad id 404); headless Chrome dump-dom of /q/<id> shows rendered quest + Share button. Button clicks (copy/share) not interactively tested.

## 2026-10-17 (daily run, ~8:10 AM CT)
- Health: local server on :4173 was NOT running (process gone; box likely restarted). Restarted it; /, /health, /robots.txt, /sitemap.xml, /llms.txt, /q/<id> all 200; bad /q id and unknown paths 404; bad JSON to /api/generate gives 400.
- Public preview (https://twenty-chefs-tie.loca.lt) was down (503). Restarted localtunnel with the same subdomain; client reconnects but loca.lt still returns 502/503. Unresolved: free localtunnel is unreliable; a real host (Render/Fly/Vercel) is needed.
- Output test: 18 varied ideas (bots, games, agents, extension, mobile, trackers, RAG, portfolio) plus junk inputs.
- Bugs fixed in generator.js:
  - Grammar: "shipped as a ai agent" now "an AI agent"; type labels keep AI/API casing.
  - Names: acronyms/brands kept (AI, RAG, iPhone, 2D, GitHub...); pitch no longer turns "iPhone" into "IPhone".
  - "RAG chatbot" got social loot (Friend lists) because "chat" matched "chatbot"; flavor matching now word-based and chatbot/rag count as AI.
  - "iPhone app..." was tagged Mobile + Web App just from the word "app"; generic web no longer tags along unless the idea says web/site/etc.
  - "app that helps me pick a game to play" was planned as a Phaser game; apps that pick/track/recommend games now plan as a web app (real games like "a game where..." or genre words still plan as games).
  - Input of only punctuation ("!!!!!!") was accepted; now rejected with the friendly error.
- SEO: shared /q/ pages now get a unique meta/OG/Twitter description naming the idea (was a duplicate site-wide description).
- LLM discoverability: llms.txt now lists 5 example quest links and a 4-question FAQ (idea types, supported AI tools, saving/sharing).

## 2026-10-18 (daily run, ~8:05 AM CT)
- Health: local :4173 up (200). Render (https://queststarter.onrender.com) up; first request after idle took ~25s (free-tier cold start), then ~0.2s. /, /health, /robots.txt, /sitemap.xml, /llms.txt all 200; bad /q id and unknown paths 404; bad JSON to /api/generate gives 400.
- Output test: 18 new varied ideas (cozy sim, LLM-NPC RPG, Telegram/Slack/Twitch bots, GPU price site, iOS logger, Chrome blocker, card game, agent booking, budgeting, 3D/VR games, uptime monitor, flashcards) plus regressions from earlier runs and junk input.
- Fixed in generator.js:
  - Cozy/farming/sim/city-builder games got combat must-haves; they now get a core loop, progression, save/load and a first-5-minutes goal, with a pacing boss fight (backlog 5).
  - "an rpg where the npcs are llm agents" planned as an AI Agent named "RPG"; game ideas with AI features now plan as a Game with an AI component, named "NPCs LLM Agents RPG" (backlog 7).
  - Pitch now capitalizes known acronyms/brands (Unity, iOS, AI, NPCs, Discord, GPU...) without touching the user's own casing (backlog 6).
  - "a VR escape room" planned as a Next.js web app; escape rooms and sims are games now, and VR games get Unity.
  - Bots get the right SDK per platform (grammY for Telegram, Bolt for Slack, tmi.js/Twurple for Twitch, discord.js for Discord) instead of one generic line.
  - A Discord uptime monitor got gaming loot (Steam, leaderboards) just from "discord"; removed discord from the gaming flavor words.
  - Names: "Gpu Prices Across Comparer" is "GPU Prices Comparer"; "Chrome Extension" (blocks Twitter) is "Twitter Blocker"; "Agent" (books reservations) is "Restaurant Reservations Booker"; lone generic names like "Game"/"VR" now pull in words after the break ("Fight Bosses Game", "Meditation VR").
- SEO: sitemap.xml now lists the 5 example quest pages and llms.txt with lastmod (was homepage only).
- LLM discoverability: added a "Does it work for Unity or Godot games?" FAQ to the page, FAQPage JSON-LD (validated) and llms.txt.
- Committed 7e44762 and pushed; Render deployed within ~1 min (sitemap shows 7 URLs, live API returns the new RPG plan).

### Backlog
8. /q/ quest pages render client-side only, so crawlers and LLMs without JS see just the shell; consider server-rendering the quest summary (name, MVP, stack) into the HTML.
9. Card/turn-based games still get "player character that moves" must-haves; add a turn-based variant.
10. Render free tier cold-starts (~25s); a first-time visitor from X may bounce. Consider a paid instance or keep-alive ping when traffic starts.
