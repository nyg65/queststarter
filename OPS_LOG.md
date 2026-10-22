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

## 2026-10-20 (daily run, ~8:00 AM CT)
- Health: local :4173 up (restarted on new code). Render (https://queststarter.onrender.com) was very slow to wake: two health checks timed out after 90s and 120s while Render's "waking up" page showed; the box's other HTTPS was fine. After the deploy it answers in ~0.15s. /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png, /q/<id> 200; bad /q id and unknown paths 404; bad JSON and junk ideas give 400.
- Output test: 20 new varied ideas (Claude Code spend tracker, asteroid browser game, Notion MCP server, git diff VS Code extension, workout log, text adventure, Minecraft plugin, Fabric mod, Roblox obby, raid reminder bot, Gmail triage agent, Steam Deck comparer, OBS splits overlay, pixel art generator, Twitch trivia, finance dashboard, Shorts hider, water tracker, Next.js scaffolder CLI, Godot racing) plus a 56-idea regression set diffed against yesterday's generator (only intended changes).
- Fixed in generator.js:
  - New CLI Tool type (Node.js + TypeScript, commander + @clack/prompts, tsup, npx via npm). "a CLI that scaffolds a new Next.js project" and "a command line tool that renames my screenshots" were Next.js web apps.
  - New Minecraft Plugin type: Paper (Java) plan with plugin.yml, config.yml and a local test server; Fabric/Forge mod ideas get a Fabric + Loom plan labeled Minecraft Mod (FEEDBACK backlog 16; was a Next.js web app).
  - Text adventures and interactive fiction get an Ink + inkjs plan instead of Phaser (backlog 11).
  - Roblox obbies/action games get their own MVP (checkpoints and respawn, server-checked progress, DataStore saves, leaderstats) and boss (FEEDBACK backlog 14).
  - "an MCP server that lets my coding agent read my Notion roadmap" planned as AI Agent + MCP; when the MCP server is the subject it's MCP-only and no longer adds an LLM API (backlog 15).
  - Tools about games were planned as games: "a website that compares Steam Deck game performance" (Phaser + Next.js) and "a pixel art generator for game sprites" (Phaser) are web apps now (compare, performance, generator, sprites, assets, overlay, wiki, guide, launcher).
  - "a workout log for my phone" was a Web App named "Phone Logger"; "for/on my phone" counts as mobile and noun uses like "workout log" or "meal plan" stay in the name (backlog 20).
  - Names: "How Much Spend Tracker" is "Claude Code Spend Tracker" (backlog 13); "Browser Game" is "Dodge Asteroids Game" (backlog 14); "MCP Server" is "Notion MCP Server"/"Spotify MCP Server" (backlog 12); "Chrome Extension" is "YouTube Shorts Hider"; "AI Agent" is "Gmail Triager"; "Npx Tool" is "Package JSON Checker"; "Website Built" is "Next.js Website".
  - Pitch casing: Next.js, OBS, CSV, JSON; no longer turns "package.json" into "package.JSON".
- SEO: added a 1200x630 share image (public/og.png) with og:image, size and alt tags, a large Twitter/X card (was a text-only summary card), and the image on the WebApplication JSON-LD. Links shared on X and Discord now show a preview card.
- LLM discoverability: new FAQ "Can it plan a CLI tool or a Minecraft plugin?" on the page, FAQPage JSON-LD (7 Qs, valid JSON) and llms.txt; llms.txt idea list now names CLI tools, Minecraft plugins/mods and personal trackers.
- Committed e4ca0de and pushed; Render deployed (live API names "Next.js Scaffolder", /og.png 200, llms.txt has the new FAQ). This push also shipped the 4 commits from yesterday's X watch runs that were waiting (game launch step and retention prompt, trackers as web/mobile apps, FEEDBACK) and the newsletter commit.
- The repo is public, so that push briefly published newsletter/ (issue 1 draft and the monetization/sponsor review). Untracked newsletter/ and added it to .gitignore (40311d6); the files stay local but remain in git history. FEEDBACK.md (with the X reply drafts) and OPS_LOG.md were already public from earlier pushes.

### Backlog
21. Racing and flight games still get "player character + one enemy" must-haves; add a driving/vehicle variant (handling, track/lap, timer, ghost or AI opponent).
22. "a minecraft server plugin that adds quests" is named "Minecraft Server"; should be "Minecraft Quests Plugin".
23. "a speedrun splits overlay for OBS" plans a Next.js + Supabase app with a landing page; OBS browser-source overlays need a static page, no auth or DB.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making the repo private) if John doesn't want drafts and ops notes visible.

## 2026-10-21 (daily run, ~8:00 AM CT)
- Health: local :4173 up (restarted on new code). Render (https://queststarter.onrender.com) up; /health 200 with ~13s cold start. /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png, /q/<id> 200; bad /q id and unknown paths 404; bad JSON and junk ideas give 400; a script-tag idea is escaped on /q/ pages.
- Output test: 35 varied ideas (racing/kart/boat/flight games, Minecraft plugins and a Fabric mod, OBS/Twitch/Spotify/YouTube Live/Kick overlays, Notion MCP server, git diff VS Code extension, habit and workout trackers, text adventure, Roblox obby, Gmail triage agent, CLI scaffolder, cozy sim, card game, RAG chatbot, invoicing SaaS) plus false-positive checks, diffed against the previous generator (only intended changes).
- Fixed in generator.js:
  - New Stream Overlay type: OBS/stream overlays were a Next.js + Supabase web app or, for Twitch, a chat bot. Now a static Vite + TypeScript page for an OBS Browser Source (transparent 1920x1080, URL-param settings, localStorage, GitHub Pages/Netlify), plus tmi.js for Twitch chat or the Spotify currently-playing API when mentioned (backlog 23). Only fires when the idea says overlay/browser source and has stream context, so "an OBS plugin" or "a dark overlay on YouTube" are unaffected.
  - Racing, kart, drifting and flight games get a vehicle MVP (handling, track with checkpoints, best-time timer, ghost or AI opponent) and a handling/checkpoint boss instead of "player character + one enemy" (backlog 21). "race against a rising flood" in a platformer stays a platformer.
  - Minecraft names come from what the plugin adds: "Minecraft Server" is "Minecraft Quests Plugin" (backlog 22), "Minecraft Daily Rewards Plugin", "Minecraft Dragons Mod", "Paper Economy Plugin", "Fabric Ores Mod".
  - Fabric/Forge mods had the Paper server-performance boss; now a mod version-compatibility boss.
- SEO: 5 more example quests (Notion MCP server, OBS splits overlay, drift racing game, Minecraft quests plugin, Next.js scaffolder CLI) are listed in sitemap.xml (12 URLs, was 7) and llms.txt, so crawlers find more server-rendered /q/ pages. Homepage chips unchanged.
- LLM discoverability: new FAQ "Can it plan a stream overlay or a racing game?" on the page, FAQPage JSON-LD (8 Qs, valid JSON) and llms.txt; "What kinds of ideas work?" now names OBS and stream overlays.
- Committed 92d764b and pushed (also shipped 17d35fd from yesterday's 5 PM X watch run); Render deployed (live llms.txt has the new FAQ, sitemap has 12 URLs, live API names "Minecraft Quests Plugin"). newsletter/ stays ignored.

### Backlog
10. Render free tier cold-starts (~13s+); consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private) if John doesn't want drafts and ops notes visible.
25. "a rag chatbot over my obsidian notes" gets the agent-loop MVP (tools, max steps); RAG chat needs an ingest/embed/retrieve/cite plan instead.
26. Weak names: "a saas for freelancers to send invoices" is "Invoices Sender"; "a stream overlay that shows current song from spotify" is "Current Song Viewer"; "a chrome extension that adds a dark overlay to youtube" is "Chrome Extension"; "an obs plugin that auto switches scenes" is "OBS Plugin" and plans as a Next.js web app (OBS plugins are C++/obs-websocket scripts).
27. "a personal finance dashboard from my bank CSV" plans a fetch/diff/alert data tool; a CSV import dashboard needs upload, parse, categorize, charts.

## 2026-10-22 (daily run, ~8:15 AM CT)
- Health: local :4173 was down (no process); restarted on new code. Render (https://queststarter.onrender.com) /health 200 with ~12s cold start. Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png, /q/<id> 200; bad /q id and unknown paths 404; bad JSON and junk ideas give 400.
- Output test: 34 varied ideas (RAG/docs chat, PDF chat, help-center support bot, Discord wiki bot, textbook tutor, codebase Q&A, agents that act, roleplay chatbot, invoicing SaaS, CSV finance dashboard, OBS plugin, overlays, deckbuilder, habit tracker, MCP server, crypto alerts bot, Godot 3D platformer, CLI renamer, Minecraft plugin, semantic search, voice assistant, Claude Code spend tracker), diffed against the previous generator (only intended changes).
- Fixed in generator.js:
  - New RAG Chatbot type (backlog 25): chat/Q&A over your own notes, docs, PDFs, wiki, help center or codebase used to get the tool-calling agent loop (two tools, max steps). Now: embeddings + local vector store (pgvector/sqlite-vec/Chroma), loader + splitter, a 10-20 question eval set; MVP is ingest, retrieve, answer only from retrieved chunks with citations, and say "not found" instead of guessing; boss is retrieval quality. Only fires when an agent/AI idea is about the user's documents AND has a chat/question/search signal, so "an ai agent that files bugs from my notes app" stays an agent. A Discord bot that answers from a wiki becomes Bot + RAG Chatbot and gets the vector store in its stack.
  - Names: "RAG Chatbot" is "Obsidian Notes Chat", "AI Assistant" is "Company Docs Chat", "Support Chatbot Trained" is "Help Center Articles Chat", "Pdfs Chat" is "PDFs Chat", "Ask Questions" is "Codebase Chat"; "MCP Server" for an Obsidian vault is "Obsidian MCP Server".
- SEO: "A RAG chatbot over my Obsidian notes" example quest added to sitemap.xml (13 URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a RAG chatbot over my own notes or docs?" on the page, FAQPage JSON-LD (9 Qs, valid JSON) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12s+); consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private) if John doesn't want drafts and ops notes visible.
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin" (also plans as a Next.js web app; OBS plugins are C++ or obs-websocket scripts), "Them Organizer" ("an assistant that reads my files and organizes them"), "AI Agent" ("an ai agent that files bugs from my notes app"), "Discord Bot" for the wiki Q&A bot.
27. "a personal finance dashboard from my bank CSV" plans a fetch/diff/alert data tool; a CSV import dashboard needs upload, parse, categorize, charts.
28. "a chatbot that roleplays as a pirate" gets the agent loop with tools; a persona chatbot needs a system prompt, chat history and a streaming chat UI, no tools.
29. "a semantic search engine for my bookmarks" is a plain Next.js web app; it should get embeddings + vector search like the RAG plan, without the chat step.
