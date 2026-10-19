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

## 2026-10-19 (daily run, ~8:15 AM CT)
- Health: local :4173 up (restarted on latest code). Render (https://queststarter.onrender.com) up; cold start ~13s. /, /health, /robots.txt, /sitemap.xml, /llms.txt, /q/<id> 200; bad /q id and unknown paths 404; bad JSON and junk ideas give 400. Headless Chrome render of a /q/ page OK (full card, Share, prompts). Script-tag idea is escaped on /q/ pages.
- Output test: 22 new varied ideas (card/deckbuilder/chess/trivia/strategy/text adventure games, MCP server, VS Code extension, CLI tool, X bot, D&D Discord bot, newsletter agent, habit tracker, speedrun timer, invoicing SaaS) plus a 27-idea regression set diffed against yesterday's generator (only intended changes).
- Fixed in generator.js:
  - Turn-based, card, board, chess, trivia, strategy and text adventure games got "player character that moves" + collision boss; they now get a turn-based MVP (game state, one full turn, win/lose, turn feedback) and a rules/balance boss (backlog 9). Tic tac toe, chess, deckbuilder, board/strategy games now count as games.
  - "turn-based" was read as the verb "turn", naming quests "Card Game Converter"; now "Turn-Based Card Game".
  - "a site where gamers rate controllers" planned a Phaser game; "gamer/gaming" no longer counts as building a game, and rating/timer/stats apps about games plan as web apps.
  - New MCP Server type (TypeScript MCP SDK, stdio, Zod tool schemas, MCP Inspector, client config) instead of a Next.js web app.
  - VS Code extensions got the Chrome MV3 stack; now a VS Code Extension API plan (yo code, esbuild, Marketplace + Open VSX), labeled "VS Code extension".
  - X/Twitter bots get twitter-api-v2, and the platform bot SDK is applied even when the bot is the secondary type (was discord.js for a Twitter bot).
  - "procedurally generated dungeons" added an LLM API to the stack; procedural generation no longer counts as AI.
  - Names: "Cli Tool" is "Screenshots Renamer"; "Play Platformer" is "Cat Platformer"; SaaS/MCP/CLI/Claude/VS Code casing; pitch drops a leading "Build me"; "an MCP server" article.
- SEO: /q/ quest pages now server-render the quest summary (name, pitch, must-haves, boss, stack, build plan) into the HTML, so crawlers and LLMs without JS see real content (backlog 8 done). Client still re-renders the full card.
- LLM discoverability: "What kinds of ideas work?" in llms.txt now lists MCP servers, VS Code extensions and Twitch/X bots; new FAQ "Can it plan an MCP server or a VS Code extension?" on the page, FAQPage JSON-LD (6 Qs, valid JSON) and llms.txt.
- Committed 8837290 and pushed; Render deployed in ~30s (live /q/ page shows the server-rendered MCP quest, llms.txt has the new FAQ, live API names "Turn-Based Card Game").

### Backlog
10. Render free tier cold-starts (~13-25s); consider a paid instance or keep-alive ping when traffic starts.
11. Text adventure games still get Phaser; a plain web/text stack (or Ink) would fit better.
12. Generic names remain for some ideas ("MCP Server", "Strategy Game"); consider pulling the service name ("Notion MCP Server").

## 2026-10-19 (weekly newsletter + monetization run, ~10:25 AM CT)
- Drafted newsletter issue 1 (newsletter/2026-10-19-issue-01.md) and monetization/sponsor review (newsletter/2026-10-19-monetization-sponsors.md). Nothing sent.
- Live check: https://queststarter.onrender.com/health 200 (~13s cold start); 4 newsletter /q/ links return 200.
- Local main is 2 commits ahead of origin (5a508dc game launch/retention step, 48be749 FEEDBACK); not pushed, awaiting John's OK.
### Backlog (found while picking newsletter examples)
13. "a tool that tracks how much I spend on Claude Code each day" is named "How Much Spend Tracker" (should be "Claude Code Spend Tracker").
14. "a browser game where you dodge asteroids..." is named "Browser Game"; "browser" should be skipped like other generic words.
15. "an MCP server that lets my coding agent read my Notion roadmap" plans as AI Agent + MCP Server (agent-loop must-haves); "coding agent" as the client shouldn't make it an agent.
16. Pitch keeps lowercase "vs code"; "explains my git diff" gets no LLM in the stack.
17. "a habit tracker app" still plans as a Data / API Tool (FEEDBACK backlog 19).
