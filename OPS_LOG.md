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
- Committed 26e55e2 and pushed (also shipped 2b29a82 and a5f71f8 from yesterday's X watch runs); Render deployed (live sitemap has 13 URLs, llms.txt has the RAG FAQ, live API names "Obsidian Notes Chat"). newsletter/ stays ignored.

## 2026-10-23 (daily run, ~8:05 AM CT)
- Health: local :4173 up (restarted on new code). Render (https://queststarter.onrender.com) /health 200 with ~12s cold start. Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png, /q/<id> 200; bad /q id and unknown paths 404; bad JSON gives 400; JSON-LD parses.
- Output test: 28 varied ideas (pirate and anime-character chatbots, companion app, Discord DM bot, semantic bookmark search, CSV finance dashboard, invoicing SaaS, OBS plugin, overlays, tower defense, Valorant crosshair site, crypto Telegram bot, reading streak app, regex VS Code extension, LinkedIn post writer, chess, Twitch giveaways, pomodoro timer, AI dungeon master, speedrun leaderboard, Shopify support bot) plus a 72-idea regression set from the logs, diffed against the previous generator (3 changed, all intended).
- Fixed in generator.js:
  - Bug: type keywords matched inside other words, so "a leaderboard site for my speedrun community" matched "unity" and got a Phaser game plan (Game + Web App). Keywords now have to start a word ("community" is not "unity", "dispatch" is not "patch", "ideal" is not "deal"). No other regression ideas changed.
  - New AI Chatbot (persona) type (backlog 28): roleplay/character/companion chatbots got the tool-calling agent loop. Now: Next.js + Vercel AI SDK streaming chat, a versioned system prompt with the character's voice, rules and example exchanges, chat history trimmed to a token budget, reset and per-user message limit; boss is staying in character. Ideas that act on things (files, sends, emails, books, posts) stay agents; RAG still wins for chat over your own docs.
  - Names: "Roleplays Chatbot" is "Pirate Chatbot"; "AI Companion" (talks like my favorite anime character) is "Anime Character Chatbot".
- SEO: "A chatbot that roleplays as a pirate" example quest added to sitemap.xml (14 URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a roleplay or character chatbot?" on the page, FAQPage JSON-LD (10 Qs, valid JSON) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12s); consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin" (still plans as a Next.js web app), "AI Agent" ("files bugs from my notes app"), "Discord Bot" (roleplays as a dungeon master), "Valorant Crosshair Code" (drops "sharing site"), "Gaming Community" (discord bot).
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
30. "a tower defense game with zombies" gets "Player character that moves"; tower defense needs paths, waves, tower placement and an upgrade economy.
31. "a customer support chatbot for my shopify store" gets the agent loop; it should be RAG over store FAQ/policies (plus an order-lookup tool).
- Committed 60ab579 and pushed; Render deployed (live llms.txt has the roleplay FAQ, sitemap has 14 URLs, live API plans the speedrun community leaderboard as a Web App). newsletter/ stays ignored.

## 2026-10-24 (daily run, ~8:05 AM CT)
- Health: local :4173 up (restarted on new code). Render (https://queststarter.onrender.com) /health 200 with ~12s cold start. Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png, /q/<id> 200; bad /q id and unknown paths 404; bad JSON gives 400; JSON-LD parses.
- Output test: 28 varied ideas (tower defense variants incl. Roblox, Godot, card and Discord ones, platformer, deckbuilder, drift racing, cozy farming/fishing sims, obby, chess, Twitch overlay, pirate chatbot, RAG notes chat, Shopify support bot, habit tracker, Minecraft plugin, speedrun leaderboard, deals bot, CLI, MCP server, invoicing SaaS, zombie shooter) plus the 46 ideas quoted in OPS_LOG/FEEDBACK, diffed against the previous generator (only tower defense ideas changed).
- Fixed in generator.js:
  - New tower defense plan (backlog 30): tower defense games got "Player character that moves + one enemy". Now: enemy path from spawn to base, tower placement with range/damage/fire rate, ramping waves with lives, kill money for buying and upgrading towers; boss is wave balance, the economy and fast pathing/targeting with 100+ enemies. Roblox tower defense also gets server-run waves saved with DataStoreService. Wins over the turn-based/card rules ("a tower defense card game"); "a racing game with tower defense elements" stays a racing plan.
  - Names: "Tower Defense Game" (with zombies) is "Zombie Tower Defense"; "where robots attack" is "Robot Tower Defense".
  - Bug: "a cozy fishing sim" was not seen as a game at all and got a Next.js web app plan with an auth/data-model boss. Added fishing sim, cozy sim, space sim, driving sim and "tower defence" as game keywords; driving sims get the vehicle plan, not the cozy loop.
- SEO: "A tower defense game with zombies" example quest added to sitemap.xml (15 URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a tower defense game?" on the page, FAQPage JSON-LD (11 Qs, valid JSON) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12s); consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin" (still plans as a Next.js web app), "AI Agent" ("files bugs from my notes app"), "Valorant Crosshair Code", "Gaming Community", "Cozy Sim" ("a cozy sim about running a cafe").
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
31. "a customer support chatbot for my shopify store" gets the agent loop; it should be RAG over store FAQ/policies (plus an order-lookup tool).
32. "a space sim" gets the generic player-and-enemy game plan; a ship flight/trade loop would fit better.
- Committed 5577055 and pushed (also shipped 2fabdc3 and 58b4b83 from yesterday's X watch runs); Render deployed (live llms.txt has the tower defense FAQ, sitemap has 15 URLs, live API plans "a cozy fishing sim" as a Game). newsletter/ stays ignored.

## 2026-10-25 (daily run, ~8:10 AM CT)
- Health: local :4173 up (restarted on new code). Render (https://queststarter.onrender.com) /health 200 with ~12s cold start. Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; bad /q id and unknown paths 404; bad JSON gives 400; JSON-LD parses.
- Output test: 28 varied ideas (Shopify/Etsy/SaaS/restaurant/Discord support bots, pirate chatbot, RAG notes chat, semantic bookmark search, CSV finance dashboard, tower defense, space and cafe sims, OBS plugin, Twitch overlay, habit tracker, MCP server, CLI, Roblox obby, speedrun leaderboard, crypto Telegram bot, Chrome extension, invoicing SaaS, AI dungeon master, VR rhythm game, AI meal planner, Pokemon card tracker, duo finder) plus the 45 ideas quoted in OPS_LOG/FEEDBACK, diffed against the previous generator (only the support-bot ideas changed).
- Fixed in generator.js:
  - New support chatbot plan (backlog 31): "a customer support chatbot for my shopify store" got the tool-calling agent loop. Support/FAQ chatbots for a store, SaaS, website, company or server now get the RAG plan (answer only from your FAQ and policies, cite, say "not found"), plus a must-have to hand off to a human, and store bots get one read-only order-status lookup (Shopify Admin API / WooCommerce REST API), never refunds or edits. A support bot on Discord/Telegram becomes Bot + RAG Chatbot. Ideas that act (refunds, creates tickets) stay agents.
  - Names: "Customer Support Chatbot" is "Shopify Store Support Chat"; "Support Bot" (etsy shop) is "Etsy Shop Support Bot"; "Customer Service Chatbot" is "SaaS Support Chat"; "AI Chatbot" (restaurant website) is "Restaurant Support Chat"; "Discord Bot" (answers faq for my server) is "Discord Server Support Bot". WooCommerce is cased correctly.
- SEO: "A customer support chatbot for my Shopify store" example quest added to sitemap.xml (16 URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a customer support chatbot for my store?" on the page, FAQPage JSON-LD (12 Qs, valid JSON) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12s); consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin" (still plans as a Next.js web app), "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" ("lets claude read my linear tickets"), "Slack Bot" ("answers hr questions for our company"), "Tickets Creator" (AI help desk).
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
33. "a meal planner that uses ai to suggest recipes" plans as an AI Agent loop; it is a web app with one LLM call.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration"); a retrieval-quality boss would fit better.
- Committed eaa7659 and pushed; Render deployed (live llms.txt has the support chatbot FAQ, sitemap has 16 URLs, live API names "Shopify Store Support Chat" as a RAG Chatbot). newsletter/ stays ignored.

## 2026-10-26 (daily run, ~8:15 AM CT)
- Health: local :4173 up (restarted on new code). Render (https://queststarter.onrender.com) /health 200 with ~22s cold start. Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png, /q/<id> 200; bad /q id and unknown paths 404; bad JSON gives 400; JSON-LD parses.
- Output test: 24 varied ideas (AI meal planner, workout plan generator, cover letter writer, email summarizer, flashcard maker, D&D namer, photo tagger, resume reviewer, sprite generator, AI email assistant, smart home voice assistant, VS Code explainer, Twitch trivia bot, deckbuilder, Minecraft dragons mod, Discord music bot, habit tracker, Fortnite stats, multiplayer trivia, budget app, band site, space and cafe sims, semantic bookmark search) plus the ideas quoted in OPS_LOG/FEEDBACK (78 total), diffed against the previous generator (9 changed, all intended).
- Fixed in generator.js:
  - New AI Web App type (backlog 33): apps that use AI to generate, write, summarize, review, suggest, name or tag something got the tool-calling agent loop (two tools, run log, max steps). Now: Next.js + Vercel AI SDK, one form, one server-side LLM call with a versioned prompt and Zod-checked structured output, copy/regenerate, and a rate limit plus token cap; boss is output quality on 10 real inputs. Ideas that act (send, file, post, email, inbox, control, automate) or say agent/assistant/chatbot/bot stay as before. A web app primary drops its duplicate "Web App" type; as a secondary (VS Code extension, sprite generator web app) the agent component is dropped and the stack gets the single LLM wrapper instead.
  - Names: "an ai workout plan generator" was "Generator Planner"; now "AI Workout Plan" ("plan" before generator/maker/tracker/planner is a noun). "a meal plan generator" is "Meal Plan Generator".
- SEO: "A meal planner that uses AI to suggest recipes" example quest added to sitemap.xml (17 URLs) and llms.txt.
- LLM discoverability: new FAQ "Does every AI idea get an agent plan?" on the page, FAQPage JSON-LD (13 Qs, valid JSON) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-22s); consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI" ("an ai that names my D&D characters"), "AI Tool" ("uses ai to tag my photos"), "Them Sender" ("ai email assistant that drafts replies and sends them"), "Discord Bot" (plays music), "AI Workout Plan" (should end in Generator).
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration").
35. "an app that uses gpt to summarize my emails" stays an agent (email access); a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
- Committed 70cfbb5 and pushed; Render deployed (live llms.txt has the AI app FAQ, sitemap has 17 URLs, live API plans the AI meal planner as an AI Web App). newsletter\/ stays ignored.

## 2026-10-26 (weekly newsletter + monetization run, ~10:20 AM CT)
- Drafted newsletter issue 2 and this week's monetization/sponsor review (local only in newsletter/, which is gitignored). Nothing sent.
- Live check: the 4 issue-2 /q/ links (zombie tower defense, Shopify support chat, AI meal planner, Obsidian notes chat) return 200 on https://queststarter.onrender.com.
### Backlog (found while picking newsletter examples)
37. "a meal planner that uses ai to suggest recipes" is named "Recipes Suggester"; should be "AI Meal Planner".
38. AI Web App stacks list the LLM twice ("OpenAI / Anthropic / xAI API (behind one wrapper)" and "An LLM API behind a single wrapper function"); drop the duplicate.

## 2026-10-27 (daily run, ~8:20 AM CT)
- Health: local :4173 up (restarted on new code). Render (https://queststarter.onrender.com) /health 200 with ~13s cold start. Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; unknown paths 404; bad JSON to /api/generate gives 400; JSON-LD parses; all sitemap /q/ links 200.
- Output test: 15 new varied ideas (AI study planner, AI journal, AI pixel art palettes, AI Discord bot, habit tracker, speedrun timer, Mars farming game, AI photo tagger, Claude recipe site, spoiler blocker, cat deckbuilder, AI commit message CLI, Minecraft trains mod, AI workout tracker) plus ideas quoted in OPS_LOG/FEEDBACK (80 total), diffed against the previous generator (12 changed, all intended).
- Fixed:
  - Bug in server.js: a /q/ id that decodes to garbage (e.g. /q/zzz) rendered a 200 page titled with replacement characters, so junk URLs could get indexed. Ids that decode to invalid UTF-8, control characters or nothing now 404 (the 404 check in earlier logs only covered ids with non-base64url characters).
  - Names (backlog 37): "X that uses AI/GPT/Claude to ..." now names the thing, not the feature: "Recipes Suggester" is "AI Meal Planner", "Palettes Suggester" is "AI Pixel Art Editor", "Week Planner" is "AI Workout Tracker", "Recipes Writer" is "AI Recipe Site", "Study Planner" is "AI Study Planner".
  - Stack (backlog 38): AI Web App plans no longer list the LLM twice (dropped "An LLM API behind a single wrapper function" when the plan already has the wrapped model API).
- SEO: "A study planner that uses GPT to make flashcards" example quest added to sitemap.xml and llms.txt.
- LLM discoverability: new FAQ "Can it plan a study or flashcard app that uses AI?" on the page, FAQPage JSON-LD (14 Qs, valid JSON) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-22s); consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI", "Tag Photos AI", "Them Sender", "Discord Bot" (plays music), "AI Workout Plan", "Week Summarizer" ("a journal app that uses ai to summarize my week").
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration").
35. "an app that uses gpt to summarize my emails" stays an agent; a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
39. "a workout tracker that uses ai to plan my week" and "a recipe site that uses claude to write recipes" plan as plain Web Apps, not AI Web Apps.
- Committed a813187 and pushed; Render deployed (live /q/zzz is 404, live llms.txt has the flashcard FAQ, live API names the AI meal planner "AI Meal Planner"). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.

## 2026-10-28 (daily run, ~8:00-8:25 AM CT)
- Health: local :4173 up (restarted on new code; an Oct 27 server process was still holding the port and was killed). **Render (https://queststarter.onrender.com) did not respond for ~8 minutes** (8:00-8:09 AM CT: TLS connected but no HTTP response on /health, /, /robots.txt across four tries of 60-150s). Render status page said all systems operational; a fresh clone of main booted and served 200s locally, so the code was fine. It answered again at ~8:12 (85s first response) and then normally (/ 0.27s, /health 0.06s, /q/zzz 404). Likely a stuck free-tier spin-up; watch for repeats (backlog 10).
- Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON 400; JSON-LD parses (FAQPage 15 Qs); all 17 sitemap /q/ links 200.
- Output test: 14 new varied ideas (AI workout tracker, Claude recipe site, AI week journal, plant reminder, cat roguelike, AI tweet writer, YouTube Shorts blocker, Valorant ranks Discord bot, podcast-to-blog AI tool, college budget app, Godot frog platformer, AI todo prioritizer, AI anime rater, receipt scanner iOS) plus 11 more AI-flavored web ideas, and the 80 ideas quoted in OPS_LOG/FEEDBACK diffed against the previous generator (2 changed, both intended).
- Fixed (backlog 39) in generator.js: a web app whose core is one AI call now plans as an AI Web App (Vercel AI SDK, one LLM call, Zod output) instead of a plain web app or a tool-calling agent:
  - "a workout tracker that uses ai to plan my week" was a plain Web App with an extra LLM line; now AI Web App.
  - "a recipe site that uses claude to write recipes" had no LLM in the stack at all; ideas naming Claude/GPT/ChatGPT/OpenAI/Gemini/Grok/LLM now count as AI.
  - "a todo app that uses ai to prioritize my tasks" and "a website that rates anime with ai" were agent loops; prioritize/rate/rank/sort/categorize/classify now count as one-shot AI verbs.
  - "a tool that turns my podcast into blog posts with ai" was an agent loop because "posts" read as posting; "blog posts"/"social media posts" no longer count as an action.
- SEO: "A workout tracker that uses AI to plan my week" example quest added to sitemap.xml (19 URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a normal app with one AI feature, like a workout tracker or todo list?" on the page, FAQPage JSON-LD (15 Qs) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-85s) and a ~8-minute no-response stretch on 10-28; consider a paid instance or keep-alive ping when traffic starts. Deploys took ~13 min today.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI", "Tag Photos AI", "Them Sender", "Discord Bot" (plays music), "AI Workout Plan", "Week Summarizer", "AI Todo" (todo prioritizer), "AI Mobile" ("a mobile app that uses ai to identify plants").
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration").
35. "an app that uses gpt to summarize my emails" stays an agent; a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
40. "a landing page for my ai startup" and "a portfolio website with an ai chatbot" get an AI Agent component; a landing page about AI needs none, and a site chatbot is RAG/persona.
41. "a blog with ai generated summaries of each post" is an AI Agent (singular "post" reads as posting); should be a web app with one LLM call.
42. "a mobile app that uses ai to identify plants" pairs Mobile App with an AI Agent loop; it is one vision-model call.
- Committed e56277b and pushed; Render deployed (live llms.txt has the one-AI-feature FAQ, sitemap has 19 URLs, live API plans the Claude recipe site as an AI Web App). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.

## 2026-10-29 (daily run, ~8:10-8:40 AM CT)
- Health: Render (https://queststarter.onrender.com) /health 200 after a ~12s cold start (no repeat of yesterday's 8-minute stall). Local :4173 up (restarted on new code). Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON 400; FAQPage JSON-LD parses (16 Qs); all 18 sitemap /q/ links 200.
- Output test: 12 new varied ideas (Pokemon team builder, Telegram water reminder, Godot metroidvania, GitHub issue triage agent, YouTube comment hider, AI resume roaster, Unity farming game, Postgres MCP server, solar dashboard, TikTok caption generator, voice memos to notes, D&D character sheet) plus 105 ideas from OPS_LOG/FEEDBACK and backlog, diffed against the previous generator (12 changed, all intended).
- Fixed in generator.js:
  - Backlog 42: "a mobile app that uses ai to identify plants" was Mobile App + AI Agent loop, named "AI Mobile". A phone app, extension, bot, CLI, game, plugin or overlay with one AI feature now keeps its own type and drops the agent; identify/recognize/detect/scan/transcribe/extract count as one-shot AI verbs; photo/image ideas get a "vision-capable model API called from one server function" stack line. Now "AI Plant Identifier" (Mobile App).
  - Bug: "a cli that uses ai to write commit messages" planned as AI Web App (Next.js + Vercel) + CLI Tool; now a plain CLI Tool with the LLM line, named "AI Commit Message Writer".
  - Backlog 41: "a blog with ai generated summaries of each post" is now an AI Web App ("each/every/the/my post" no longer reads as posting).
  - "rate/rank/sort" (not just "rates/ranks/sorts") count as one-shot AI verbs: "a website that uses ai to rate my outfits" is an AI Web App, not an agent.
  - Names: "X that uses AI to VERB Y" with no real thing before "that" is named after the feature: "AI Plant Identifier", "AI Dog Breed Identifier", "AI Resume Roaster" (was "AI Website"), "AI Code Grader", "AI Email Summarizer", "AI Week Summarizer" (backlog 26 partial).
- SEO: "A mobile app that uses AI to identify plants" example quest added to sitemap.xml and llms.txt.
- LLM discoverability: new FAQ "Can it plan a mobile app that uses AI to identify things from a photo?" on the page, FAQPage JSON-LD (16 Qs) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-85s), one ~8-minute stall on 10-28; consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets; also "an mcp server for my postgres database"), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI", "D D Character" ("a d&d character sheet app"), "Tag Photos AI", "Them Sender", "Discord Bot" (plays music), "AI Workout Plan", "AI Todo", "Farming Game Stardew" ("a stardew-like farming game in unity"), "Essays Grader" (fine-ish), "Voice Memos Converter".
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration"); also "a telegram bot that reminds me to drink water" gets that boss.
35. "an app that uses gpt to summarize my emails" stays an agent; a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
40. "a landing page for my ai startup" and "a portfolio website with an ai chatbot" get an AI Agent component.
43. "a tiktok caption generator" (no "ai" word) plans as a plain Web App; generators of captions/names likely want an LLM.
44. Mobile vision apps keep the generic mobile must-haves ("offline-first local state"); a "take photo, call model, show result" must-have would fit better.
- Committed ac4e399 and pushed; Render deployed (live llms.txt has the plant identifier example and FAQ, live API names it "AI Plant Identifier"). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.

## 2026-10-30 (daily run, ~8:03-8:30 AM CT)
- Health: Render (https://queststarter.onrender.com) /health 200 after a ~13s cold start. Local :4173 up (restarted on new code). Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON 400; FAQPage JSON-LD parses (17 Qs); all 19 sitemap /q/ links 200.
- Output test: 22 new varied ideas (TikTok caption generator, Twitch emote overlay, Minecraft dragons mod, habit tracker with streaks, Japanese flashcards, AI dungeon master for Discord, fantasy name generator, password generator, QR code generator, cover letter writer, Instagram bio generator, YouTube title generator, meme generator, random number generator, D&D NPC name generator, bedtime story generator, tweet writer, business name generator, color palette generator, file name generator, story generator game) plus 88 ideas from OPS_LOG/FEEDBACK, diffed against the previous generator (10 changed, all intended).
- Fixed (backlog 43) in generator.js: a generator, writer or maker of short text (captions, bios, names, titles, slogans, tweets, stories, poems, cover letters, etc.) now plans as an AI Web App (one LLM call, Zod output, rate limit) even when the idea never says "ai". "a tiktok caption generator", "a youtube title generator", "a business name generator" and "a cover letter writer" were plain Web Apps with no model in the stack. Password, QR code, palette, meme, random number and file name generators stay plain Web Apps.
- SEO: "A TikTok caption generator" example quest added to sitemap.xml (20 URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a caption, name or bio generator that does not mention AI?" on the page, FAQPage JSON-LD (17 Qs) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-85s), one ~8-minute stall on 10-28; consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets; postgres), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI", "D D Character", "D D NPC" ("a d&d npc name generator"), "Tag Photos AI", "Them Sender", "Discord Bot" (plays music), "AI Workout Plan", "AI Todo", "Farming Game Stardew", "Voice Memos Converter", "Learning Japanese Flashcard" ("a flashcard app for learning japanese"), "Emotes Viewer" (twitch emote overlay, fine-ish).
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration"); also the Telegram water reminder bot and "an ai dungeon master for discord".
35. "an app that uses gpt to summarize my emails" stays an agent; a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
40. "a landing page for my ai startup" and "a portfolio website with an ai chatbot" get an AI Agent component.
44. Mobile vision apps keep the generic mobile must-haves ("offline-first local state").
45. Stream overlays get game loot ("Steam / game API integration", "Leaderboards", "Achievement badges") from the Twitch/game keywords; overlay loot should be overlay-specific.
- Committed 73f88a9 and pushed; Render deployed in about a minute (live llms.txt has the TikTok caption generator example and FAQ, live API plans it as an AI Web App, /q/zzz 404). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.
- 2026-10-30 5 PM X feedback watch: no QuestStarter mentions, site healthy, added backlog 55 and drafts 56-57.

## 2026-10-31 (daily run, ~8:08-8:30 AM CT)
- Health: Render (https://queststarter.onrender.com) /health 200 (warm, 0.05s). Local :4173 up (restarted on new code). Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON 400; FAQPage JSON-LD parses (18 Qs); all 20 sitemap /q/ links 200.
- Output test: new varied ideas (receipt scanner, pomodoro timer with lofi, Roblox obby, VS Code regex explainer, Slack weather bot, calorie counter from a food photo, bird song identifier, Pokemon card value from a photo, phone step counter, calculator, speedrun timer, Twitch drop-odds bot, Minecraft server status page, sales-data agent, Godot zombie shooter, AI word counter, selfie rater, movie recommender, city ranker, macro calculator) plus 99 ideas from OPS_LOG/FEEDBACK, diffed against the previous generator (5 changed, all intended).
- Fixed in generator.js:
  - Bug: "a mobile app that uses ai to count calories from a photo of my food" planned as Mobile App + AI Agent; count/estimate/analyze/calculate now count as one-shot AI verbs, so it is a plain Mobile App with the vision model line. "a website that uses ai to count words in an essay" is now an AI Web App, not Agent + Web App.
  - Bug: name read "AI Calory Counter"; calories/selfies/movies/cookies/zombies etc. now singularize to "-ie" ("AI Calorie Counter", "AI Selfie Rater", "AI Movie Recommender").
  - Names: rank/estimate/calculate get feature names ("AI City Ranker" was "AI Website", "AI Macro Calculator").
  - Backlog 44 done: a phone app with one photo-based AI feature (no secondary type) swaps the generic "offline-first local state" must-have for "take or pick a photo (expo-image-picker), send it to your server function, show the answer as a result card" plus "handle denied camera permission and a blurry/unrelated photo with a friendly retry".
- SEO: "A mobile app that uses AI to count calories from a photo of my food" example quest added to sitemap.xml (21 URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan an AI calorie counter that works from a photo of my food?" on the page, FAQPage JSON-LD (18 Qs) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-85s), one ~8-minute stall on 10-28; consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets; postgres), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI", "D D Character", "D D NPC", "Tag Photos AI", "Them Sender", "Discord Bot" (plays music), "AI Workout Plan", "AI Todo", "Farming Game Stardew", "Voice Memos Converter", "Learning Japanese Flashcard", "Emotes Viewer", "AI Value Pokemon Card Estimator" ("estimate the value of my pokemon cards from a photo").
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration"); also the Telegram water reminder bot and "an ai dungeon master for discord".
35. "an app that uses gpt to summarize my emails" stays an agent; a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
40. "a landing page for my ai startup" and "a portfolio website with an ai chatbot" get an AI Agent component.
45. Stream overlays get game loot from the Twitch/game keywords; overlay loot should be overlay-specific.
46. "an iphone app that identifies birds from their songs" (no "ai" word) is a plain offline-first mobile app; audio identification needs a model or an audio-ID API line.
- Committed d541938 and pushed; Render deployed in under a minute (live llms.txt has the calorie counter example and FAQ, live API plans it as a Mobile App named "AI Calorie Counter" with the photo must-have, /q/zzz 404). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.
- 2026-10-31 9 AM CT X feedback watch: no QuestStarter mentions or real feedback; site healthy; added backlog 56 and drafts 58-59.

## 2026-11-01 (daily run, ~8:10-8:25 AM CT)
- Health: Render (https://queststarter.onrender.com) /health 200 after a ~12s cold start. Local :4173 up (restarted on new code). Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON 400; FAQPage JSON-LD parses (19 Qs); all 21 sitemap /q/ links 200.
- Output test: 22 new varied ideas (bird calls recognizer, what-song-is-playing phone app, guitar tuner, Discord lofi music bot, Twitch latest-subscriber overlay, Valorant crosshair code generator, dentist-booking agent, vibe coding leaderboard, Telegram crypto price alerts, asteroid dodge browser game, VS Code git diff explainer, AI mushroom identifier, Whisper voice note transcriber, YouTube Shorts blocker, Steam wishlist price drop tracker, markdown to PDF site, AI NPC for a Unity game, Slack thread summarizer, AI screenshot renamer CLI, AI podcast clip finder, dog bark detector) plus 114 ideas from OPS_LOG/FEEDBACK and short-keyword probes (click counter, climbing gym tracker, clinic website, TikTok clip downloader, botany quiz), diffed against the previous generator (12 changed in the probe set, 2 in the regression set, all intended).
- Fixed in generator.js:
  - Bug: short type keywords matched the start of longer words, so "clip", "click", "climbing" and "clinic" counted as "cli" and "botany"/"bottleneck" as "bot". "a podcast clip finder that uses ai" was AI Agent + CLI Tool, "a website for my clinic" was CLI Tool + Web App, "a click counter" was a CLI Tool, "a botany quiz for students" was a Bot. Short keywords (cli, npx, bot, rpg, mcp, ios, api, llm, gpt, rag) now must end the word (plural or version number ok: bots, gpt4); "web", "app" and "ai " keep the old prefix match.
  - Backlog 46 done: a phone app that identifies or recognizes something by its sound (bird songs or calls, the song that is playing, a dog barking) swaps the generic "offline-first local state" must-have for "record a 5-15 second clip with the microphone (expo-audio), send it to your server function, show the top match with a confidence score" plus "handle denied microphone permission and a noisy or silent clip", adds an audio-ID stack line (BirdNET for birds, AudD/ACRCloud for songs, YAMNet for other sounds) and an identification-quality boss. Names: "Birds Identifier" -> "Bird Song Identifier", "Bird Calls Identifier" -> "Bird Call Identifier", "What Song Phone" -> "Song Identifier". Spam/phone call ideas are excluded; photo identifiers keep the vision plan.
- SEO: "An iPhone app that identifies birds from their songs" example quest added to sitemap.xml (22 URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan an app that identifies birds or songs by their sound?" on the page, FAQPage JSON-LD (19 Qs) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-85s), one ~8-minute stall on 10-28; consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets; postgres), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI", "D D Character", "D D NPC", "Tag Photos AI", "Them Sender", "Discord Bot" (plays music; plays lofi music in voice chat), "AI Workout Plan", "AI Todo", "Farming Game Stardew", "Voice Memos Converter", "Learning Japanese Flashcard", "Emotes Viewer", "AI Value Pokemon Card Estimator", "Detects Dog Barking Mobile", "Valorant Crosshair Code" (drops "Generator"), "Transcribes Voice Notes".
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration"); also the Telegram water reminder bot and "an ai dungeon master for discord".
35. "an app that uses gpt to summarize my emails" stays an agent; a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" (and "plays lofi music in voice chat") gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
40. "a landing page for my ai startup" and "a portfolio website with an ai chatbot" get an AI Agent component.
45. Stream overlays get game loot from the Twitch/game keywords; overlay loot should be overlay-specific.
47. "a guitar tuner app for my phone" is a plain offline-first mobile app; it needs a microphone + pitch detection must-have.
48. "a podcast clip finder that uses ai" and "a cli that renames my screenshots with ai" plan as AI Agents; find/rename are one-shot AI features (AI Web App / CLI + one LLM call).
49. "an app that transcribes my voice notes with whisper" is a plain Web App with no speech-to-text (Whisper API) line.
50. "a twitch clips compilation maker" plans as a Bot from the Twitch keyword; it is a video tool (Twitch API clips + ffmpeg).
- Committed be6759b and pushed; Render deployed in about 30s (live llms.txt has the bird song example and FAQ, live API plans it as a Mobile App named "Bird Song Identifier" with the BirdNET line, "a website for my clinic" is now a plain Web App, /q/zzz 404). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.
- 2026-11-01 9 AM CT X feedback watch: 0 QuestStarter mentions, site healthy, backlog 58 added, drafts 63-65 queued.
- 2026-11-01 5 PM CT X feedback watch: 0 QuestStarter mentions, site healthy, no new backlog (asks map to 56 and 58), drafts 66-68 queued.

## 2026-11-02 (daily run, ~8:03-8:20 AM CT)
- Health: Render (https://queststarter.onrender.com) /health 200 after a ~12s cold start. Local :4173 up (restarted on new code). Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON 400; FAQPage JSON-LD parses (20 Qs); all 22 sitemap /q/ links 200.
- Output test: 20 new varied ideas (restaurant-booking agent, Ollama local chatbot, drummer metronome, Discord League of Legends ranked tracker, Chrome AI coupon finder, unused npm deps CLI, Android street-sign translator, Twitch chat poll overlay, Godot frog platformer, Spotify MCP server, Claude YouTube summarizer, Telegram Wordle hints bot, meteor dodge browser game, GitHub issue triage agent, Firefox YouTube comment hider, pomodoro CLI, Stream Deck Twitch viewer count, Whisper voice memo summarizer, ukulele tuner, Game Boy style RPG) plus backlog 47-50 ideas, 108 quoted ideas from OPS_LOG/FEEDBACK, 111 older test ideas and 18 transcription/tuner/whisper probes (whisper chat, ghost whisper game, car tuner game, transcripts RAG, pitch deck generator), diffed against the previous generator (2 changed in the regression set, 0 in the older set, 4 in the new set, 10 in the probe set, all intended).
- Fixed in generator.js:
  - Backlog 49 done: an idea that transcribes audio (transcribe, transcription, speech-to-text, dictation, "with/uses Whisper", "Whisper API") gets a speech-to-text stack line (OpenAI Whisper / gpt-4o-transcribe, or Deepgram; "called from one server function" for web/mobile apps, env-var key for bots and CLIs). For a web, AI web or mobile app the generic core flow becomes "record a voice note (MediaRecorder / expo-audio) or upload an audio file, send it to your server function, show the transcript (plus a short summary if asked) with a copy button" plus "handle a denied microphone, a silent clip and a file over the size limit", with a transcription quality and cost boss. A bare "whisper" (chat app, horror game) does not trigger it.
  - Backlog 47 done: an instrument tuner ("guitar/bass/violin/chromatic tuner", "tunes my ukulele", pitch detection) on web or mobile gets a live mic + pitch detection plan: Web Audio API (getUserMedia + AnalyserNode) + pitchy on the web, react-native-audio-api + pitchy on phones, with "Expo Go" swapped for an Expo development build (the native audio module is not in Expo Go). Must-haves are the nearest note and cents sharp/flat updating live, plus denied mic / noisy room; the boss is pitch accuracy, low strings and needle smoothing. "a car tuner game" is unchanged.
  - Names: transcribe/transcribes are naming verbs ("Transcribes Voice Notes" -> "Voice Notes Transcriber", "Transcribe Lectures AI" -> "AI Lecture Transcriber", "Discord Bot" -> "Voice Chat Transcriber"); a verb whose object is only another verb ("to transcribe and summarize") falls back to the normal name ("Voice Memo"); tuners name after the instrument ("Tunes Ukulele" -> "Ukulele Tuner").
- SEO: "An app that transcribes my voice notes with Whisper" example quest added to sitemap.xml (23 URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a voice note transcriber or a guitar tuner app?" on the page, FAQPage JSON-LD (20 Qs) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-85s), one ~8-minute stall on 10-28; consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets; postgres), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI", "D D Character", "D D NPC", "Tag Photos AI", "Them Sender", "Discord Bot" (plays music; plays lofi music in voice chat), "AI Workout Plan", "AI Todo", "Farming Game Stardew", "Voice Memos Converter", "Learning Japanese Flashcard", "Emotes Viewer", "AI Value Pokemon Card Estimator", "Detects Dog Barking Mobile", "Valorant Crosshair Code" (drops "Generator"), "Text Speech" ("a speech to text app for my iphone"), "Writers Dictation", "Drummers Metronome", "Laptop Runner" (Ollama chatbot), "League Legends Ranked Tracker".
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration"); also the Telegram water reminder bot and "an ai dungeon master for discord".
35. "an app that uses gpt to summarize my emails" stays an agent; a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" (and "plays lofi music in voice chat") gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
40. "a landing page for my ai startup" and "a portfolio website with an ai chatbot" get an AI Agent component.
45. Stream overlays get game loot from the Twitch/game keywords; overlay loot should be overlay-specific.
48. "a podcast clip finder that uses ai", "a cli that renames my screenshots with ai" and "a chrome extension that finds coupon codes with ai" plan as AI Agents; find/rename are one-shot AI features (AI Web App / CLI / extension + one LLM call).
50. "a twitch clips compilation maker" plans as a Bot from the Twitch keyword; it is a video tool (Twitch API clips + ffmpeg).
59. "a meeting transcriber with whisper api" plans as a Data / API Tool (fetch, diff, alert); it is an upload-and-transcribe web app.
60. "a local llm chatbot that runs on my laptop with ollama" plans as an AI Agent with a cloud API stack; it needs an Ollama (local model) chat plan.
61. "a stream deck plugin that shows my twitch viewer count" plans as a Twitch Bot; it is an Elgato Stream Deck SDK plugin.
62. "a metronome app for drummers" is a generic web app; it needs a Web Audio scheduling (sample-accurate click) must-have.
63. "an android app that translates street signs from the camera" (no "ai" word) is a plain offline-first mobile app with no vision/OCR + translation line.
- Committed 2c2141f and pushed; Render deployed in about 30s (live llms.txt has the Whisper voice notes example and FAQ, live page has the FAQ, live API plans "a guitar tuner app for my phone" as a Mobile App "Guitar Tuner" with the react-native-audio-api + pitchy line and "an app that transcribes my voice notes with whisper" as "Voice Notes Transcriber" with the speech-to-text line, /q/zzz 404). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.
2026-11-02 09:13 X feedback watch: 0 mentions, site 200, drafts 69-70 added.

## 2026-11-02 (weekly newsletter + monetization run, ~10:10 AM CT)
- Drafted newsletter issue 3 and this week's monetization/sponsor review (local only in newsletter/, gitignored). Nothing sent.
- Live check: the 4 issue-3 /q/ links (AI calorie counter, bird song identifier, Whisper voice notes, guitar tuner) return 200 on https://queststarter.onrender.com; https://buttondown.com/queststarter is live.
### Backlog (found while picking newsletter examples)
64. "a mobile app that uses ai to count calories from a photo of my food" gets chatbot loot ("Model picker", "Conversation memory") and the generic "Auth, permissions, and store submission" boss; a photo-AI app wants a result-accuracy boss (portion size, mixed dishes) and photo-app loot.
65. The /stats usage counter is in-memory and resets on every deploy (daily), so it never holds more than about a day of data; persist daily totals.

## 2026-11-03 (daily run, ~8:12-8:40 AM CT)
- Health: Render (https://queststarter.onrender.com) /health 200 after a ~12s cold start; live page has the GoatCounter script (63f441e deployed). Local :4173 up (restarted on new code). Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON 400; FAQPage JSON-LD parses (20 Qs); all 22 sitemap /q/ links 200; GoatCounter script still in public/index.html.
- Output test: 22 new varied ideas (Discord voice clip bot, dentist-booking agent, game spoiler hider extension, LLM-written roguelike deckbuilder, Claude git commit message CLI, Supabase MCP server for Cursor, Steam library tier list, Godot grappling-hook metroidvania, Telegram free Epic games bot, AI dungeon master for Discord, VS Code regex explainer, Elden Ring death count overlay, AI pixel art sprites site, AI outfit rater, Deepgram podcast transcriber, iPhone lecture transcription, asteroid dodge browser game, PR review agent, OpenAI API spend tracker, receipt-scanning bill splitter, AI personal trainer chatbot, Steam Deck speedrun timer) plus 22 transcriber/translator/photo-app probes (transcription API, Whisper usage monitor, menu and text-from-photo translators, voice translator, page-translating extension, mushroom/Pokemon card/dog breed photo apps), 123 quoted ideas from OPS_LOG/FEEDBACK and 127 older test ideas, diffed against the previous generator (1 changed in the new set, 12 in the probe set, 6 in the quoted set, 4 in the older set, all intended: photo-AI mobile apps, transcribers that said "api", camera translators).
- Fixed in generator.js:
  - Backlog 59 done: "a meeting transcriber with whisper api" planned as a Data / API Tool (fetch, diff, alert) because of the word "api". A transcription idea (shared STT pattern) with no real data-tool words (tracker, dashboard, scraper, monitor, alerts, digest, news, deals, patch, stats) drops the Data / API Tool type, so it becomes a Web App (or Mobile App when it names a phone) with the record/upload -> transcript plan and transcription boss. "a discord bot that transcribes voice chat with whisper api" is now just a Bot (was Bot + Data / API Tool); "a whisper api usage monitor" and transcription cost dashboards stay data tools.
  - Backlog 64 done: a mobile photo-AI app (vision model line, no second type) gets a result-accuracy boss instead of "Auth, permissions, and store submission": food/calorie/meal ideas get "Estimate accuracy on real meal photos: portion sizes, mixed dishes and hidden oil or sauce, so show an editable estimate with a range", others get "Result accuracy on real photos: bad light, odd angles and look-alikes, plus a confidence threshold". Chatbot loot ("Model picker", "Conversation memory", "Eval set to test quality") is swapped for "History of past scans on the device" and "Eval set of 20 real photos" (Cost / token meter stays).
  - Backlog 63 done: a phone app that translates text from the camera, a photo, signs, menus or labels (with or without "ai") gets a vision-model line that reads and translates in one server call (ML Kit text recognition + translation as the offline option), must-haves "Point the camera at the text (expo-camera) or pick a photo ... show the original text next to its translation" and "Handle a denied camera, blurry or angled text, and a photo with no text", a reading/translating boss (glare, angles, stylized fonts, mixed languages) and photo-app loot. Names: "Street Signs Translator" -> "Street Sign Translator", "AI Menus Translator" -> "AI Menu Translator" ("News" stays).
- SEO: "An Android app that translates street signs from the camera" example quest added to sitemap.xml (now 23 quest URLs, all 200 locally) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a camera translator or a photo app like a calorie counter?" on the page, FAQPage JSON-LD (21 Qs) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-85s), one ~8-minute stall on 10-28; consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets; postgres), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI", "D D Character", "D D NPC", "Tag Photos AI", "Them Sender", "Discord Bot" (plays music; plays lofi music in voice chat), "AI Workout Plan", "AI Todo", "Farming Game Stardew", "Voice Memos Converter", "Learning Japanese Flashcard", "Emotes Viewer", "AI Value Pokemon Card Estimator", "Detects Dog Barking Mobile", "Valorant Crosshair Code" (drops "Generator"), "Text Speech" ("a speech to text app for my iphone"), "Writers Dictation", "Drummers Metronome", "Laptop Runner" (Ollama chatbot), "League Legends Ranked Tracker", "Steam Library Converter" ("turns my steam library into a tier list"), "Current Elden Ring Viewer" (Twitch overlay death count), "Lecture Transcription" (should be "Lecture Transcriber"), "MCP Server" (lets cursor query my supabase database).
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration"); also the Telegram water reminder bot and "an ai dungeon master for discord".
35. "an app that uses gpt to summarize my emails" stays an agent; a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" (and "plays lofi music in voice chat") gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
40. "a landing page for my ai startup" and "a portfolio website with an ai chatbot" get an AI Agent component.
45. Stream overlays get game loot from the Twitch/game keywords; overlay loot should be overlay-specific.
48. "a podcast clip finder that uses ai", "a cli that renames my screenshots with ai" and "a chrome extension that finds coupon codes with ai" plan as AI Agents; find/rename are one-shot AI features (AI Web App / CLI / extension + one LLM call).
50. "a twitch clips compilation maker" plans as a Bot from the Twitch keyword; it is a video tool (Twitch API clips + ffmpeg).
60. "a local llm chatbot that runs on my laptop with ollama" plans as an AI Agent with a cloud API stack; it needs an Ollama (local model) chat plan.
61. "a stream deck plugin that shows my twitch viewer count" plans as a Twitch Bot; it is an Elgato Stream Deck SDK plugin.
62. "a metronome app for drummers" is a generic web app; it needs a Web Audio scheduling (sample-accurate click) must-have.
65. The /stats usage counter is in-memory and resets on every deploy (daily), so it never holds more than about a day of data; persist daily totals.
66. "a discord bot that clips the last 30 seconds of voice chat" is named "Discord Bot" and gets the generic slash-command plan; it needs voice receive (@discordjs/voice) + a rolling audio buffer + ffmpeg (related to 36).
67. "a mobile app that scans receipts and splits the bill with friends" (no "ai" word) is a plain offline-first mobile app with the store-submission boss; it needs a camera + receipt OCR line (vision model or ML Kit) and a split-the-bill flow.
68. "a speedrun timer for my steam deck" plans a Next.js + Supabase web app with the auth/data-model boss; a timer is local-first (localStorage, global hotkeys, drift-free timing with performance.now), with no auth.
- Committed f5eec93 and pushed; Render deployed in about 15-30s (live llms.txt has the street sign translator example and FAQ, live page has the FAQ and the GoatCounter script, live API plans "a meeting transcriber with whisper api" as a Web App "Meeting Transcriber", "an android app that translates street signs from the camera" as a Mobile App "Street Sign Translator" with the read-and-translate boss, and the AI Calorie Counter with the meal-photo estimate boss; /q/zzz 404). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.

## 2026-11-04 (daily run, ~8:05-8:25 AM CT)
- Health: Render (https://queststarter.onrender.com) /health 200 after a ~12s cold start. Local :4173 up (restarted on new code). Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON 400; FAQPage JSON-LD parses (22 Qs); all 25 sitemap /q/ links 200; GoatCounter script still in public/index.html.
- Output test: new varied ideas (pomodoro Chrome extension, meal-prep agent, cat roguelike, Valorant rank Discord bot, git diff summarizer CLI, beat maker, Android habit tracker, iPhone metronome, Celeste split timer, stopwatch) plus all 318 ideas quoted in OPS_LOG/FEEDBACK diffed against the previous generator: only the 2 intended ideas changed (drummer metronome, Steam Deck speedrun timer).
- Fixed in generator.js:
  - Backlog 62 done: metronome / click track ideas (web or mobile) get a Web Audio API lookahead-scheduler line (react-native-audio-api in an Expo dev build on mobile), must-haves "Play a click at the chosen BPM (40-240) scheduled on the audio clock ... never with setInterval" and "Tap tempo, an accented first beat, and a time signature picker", no Supabase, and a timing-accuracy boss (background tab / locked screen drift). "Drummers Metronome" is now "Drum Metronome" (backlog 26 name).
  - Backlog 68 done: speedrun / split / LiveSplit timers are local-first: Supabase swapped for localStorage, must-haves for start/split/reset hotkeys plus big touch buttons (Steam Deck touchscreen when named), performance.now() timing with personal-best deltas, saved PBs; boss is drift over a 1-hour run and global hotkeys needing Tauri/Electron; loot drops Leaderboards and adds LiveSplit .lss import/export and sum of best. "Livesplit Split Timer" is named "Split Timer". Plain stopwatches are unchanged.
- SEO: "A metronome app for drummers" and "A speedrun timer for my Steam Deck" example quests added to sitemap.xml (now 25 quest URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a metronome or a speedrun timer, where timing has to be exact?" on the page, FAQPage JSON-LD (22 Qs) and llms.txt.

### Backlog (new)
69. "a habit tracker for my android phone" plans as Mobile App + Data / API Tool from the word "tracker"; a personal habit tracker is a plain local-first mobile app (PERSONAL words should drop the data-tool type).
70. "a beat maker web app" gets the generic auth/data-model boss; it needs a Web Audio step sequencer plan (sample playback, lookahead scheduling like the metronome).
- Committed 4fa442c and pushed; Render deployed within about 30s (live llms.txt has the metronome and Steam Deck speedrun examples and timing FAQ, live API plans "a speedrun timer for my steam deck" with localStorage and the timing boss; /q/zzz 404). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.

## 2026-11-05 (daily run, ~8:08-8:20 AM CT)
- Health: Render (https://queststarter.onrender.com) /health 200 after a ~12s cold start. Local :4173 up (restarted on new code). Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON to /api/generate 400; FAQPage JSON-LD parses (23 Qs); all 26 sitemap /q/ links 200; GoatCounter script still in public/index.html.
- Output test: 12 varied new ideas (Twitch chat poll overlay, gym class booking agent, cat wizard roguelike, Shorts blocker extension, downloads-cleanup CLI, Valorant rank bot, Godot platformer, Postgres MCP server, todo app, pomodoro web app, Reddit sentiment dashboard, regex explainer VS Code extension) all produce full 6-level plans; 136 ideas quoted in OPS_LOG/FEEDBACK plus 16 tracker/habit/beat-maker probes diffed against the previous generator: only intended changes (habit/workout/sleep trackers on a phone, habit tracker apps, a habit tracker Discord bot losing the data/API component).
- Fixed in generator.js:
  - Backlog 69 done: a personal tracker (PERSONAL words: habit, workout, sleep, mood...) whose primary type is mobile/web/bot no longer gets a secondary Data / API Tool component from the word "tracker", unless it names real data words (api, dashboard, stats, analytics, Fitbit, Strava, Garmin, Goodreads, sync, import, prices...). "a fitbit sleep data dashboard" and "a reading tracker that shows my goodreads stats" unchanged.
  - New habit tracker plan: habit/streak trackers (web or mobile, no AI, no social words like friends/leaderboard/share) get one-tap check-off + current streak, a local daily reminder (expo-notifications) on mobile or a 30-day grid on web, Supabase swapped for expo-sqlite (mobile) or localStorage (web), a streak-logic boss (store check-ins as local dates; late nights, missed days, DST, time zones), and loot (home screen widget or installable PWA, CSV export).
- SEO: "A habit tracker for my Android phone" example quest added to sitemap.xml (now 26 quest URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a simple habit tracker without accounts or a database?" on the page, FAQPage JSON-LD (23 Qs) and llms.txt.

### Backlog (new)
71. "a pomodoro timer web app" (and "a todo app") get the generic "Auth and data model" boss and Supabase; simple timers/todo lists are local-first (localStorage), like the speedrun timer and habit tracker. "a workout tracker for my iphone" and "a sleep tracker app for my phone" still get the generic offline-first mobile plan with the store-submission boss.
72. Weak name: "Cleans Up Downloads CLI" ("a cli that cleans up my downloads folder") should be "Downloads Cleaner CLI"; "Learning Japanese Day Streak" for "a streak app for learning japanese every day".
- Committed 411e708 and pushed; Render deployed within about 60s (live llms.txt has the habit tracker example and FAQ, live API plans "a habit tracker for my android phone" with the streak-logic boss; /q/zzz 404). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.

## 2026-11-06 (daily run, ~8:15-8:35 AM CT)
- Health: Render (https://queststarter.onrender.com) /health 200 after a ~12s cold start. Local :4173 up (restarted on new code). Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON to /api/generate 400; FAQPage JSON-LD parses (24 Qs); all 27 sitemap /q/ links 200; GoatCounter script still in public/index.html.
- Output test: 20 varied new ideas (Twitch chat poll overlay, restaurant booking agent, Godot cat wizard roguelike, Shorts blocker extension, Valorant rank Discord bot, Postgres MCP server, Reddit sentiment dashboard, regex VS Code extension, Android habit tracker, pomodoro Chrome extension, meal-prep agent, Steam Deck speedrun timer, iPhone drummer metronome, beat maker, local-first todo, pomodoro with lofi, sleep log, workout log, downloads-cleanup CLI, Japanese learning streak) all produce full 6-level plans; 351 ideas quoted in OPS_LOG/FEEDBACK plus probes diffed against the previous generator: 13 changed, all intended (pomodoro/todo/focus timers, workout/sleep trackers and logs, downloads cleaner name, Japanese learning streak name).
- Fixed in generator.js:
  - Backlog 71 done: "a pomodoro timer web app" (and focus/tomato timers) are local-first — Supabase dropped for localStorage, must-haves for start/pause/reset with editable focus/break lengths plus an end notification, boss is a background-tab-safe countdown from an end timestamp (not setInterval ticks). "a todo app" / "a simple todo list" get add/complete/filter must-haves, localStorage persistence, and a local-data boss (was Auth and data model + Supabase). "a workout tracker for my iphone" and "a sleep tracker app for my phone" (and workout/sleep logs) get on-device expo-sqlite plans with logging must-haves instead of the generic store-submission boss.
  - Backlog 72 done: "a cli that cleans up my downloads folder" is named "Downloads Cleaner CLI" (was "Cleans Up Downloads CLI"); clean/delete/remove verbs plus skipping the "up" particle; "a streak app for learning japanese every day" is "Japanese Learning Streak" (was "Learning Japanese Day Streak").
- SEO: "A pomodoro timer web app" example quest added to sitemap.xml (now 27 quest URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a pomodoro timer or a todo list without accounts?" on the page, FAQPage JSON-LD (24 Qs) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-85s), one ~8-minute stall on 10-28; consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets; postgres), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI", "D D Character", "D D NPC", "Tag Photos AI", "Them Sender", "Discord Bot" (plays music; plays lofi music in voice chat), "AI Workout Plan", "AI Todo", "Farming Game Stardew", "Voice Memos Converter", "Learning Japanese Flashcard", "Emotes Viewer", "AI Value Pokemon Card Estimator", "Detects Dog Barking Mobile", "Valorant Crosshair Code" (drops "Generator"), "Text Speech" ("a speech to text app for my iphone"), "Writers Dictation", "Laptop Runner" (Ollama chatbot), "League Legends Ranked Tracker", "Steam Library Converter" ("turns my steam library into a tier list"), "Current Elden Ring Viewer" (Twitch overlay death count), "Lecture Transcription" (should be "Lecture Transcriber"), "MCP Server" (lets cursor query my supabase database), "Old Screenshots Deleter" ("a cli that deletes old screenshots"; fine-ish), "Local First Todo" (keeps the adjective).
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration"); also the Telegram water reminder bot and "an ai dungeon master for discord".
35. "an app that uses gpt to summarize my emails" stays an agent; a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" (and "plays lofi music in voice chat") gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
40. "a landing page for my ai startup" and "a portfolio website with an ai chatbot" get an AI Agent component.
45. Stream overlays get game loot from the Twitch/game keywords; overlay loot should be overlay-specific.
48. "a podcast clip finder that uses ai", "a cli that renames my screenshots with ai" and "a chrome extension that finds coupon codes with ai" plan as AI Agents; find/rename are one-shot AI features (AI Web App / CLI / extension + one LLM call).
50. "a twitch clips compilation maker" plans as a Bot from the Twitch keyword; it is a video tool (Twitch API clips + ffmpeg).
60. "a local llm chatbot that runs on my laptop with ollama" plans as an AI Agent with a cloud API stack; it needs an Ollama (local model) chat plan.
61. "a stream deck plugin that shows my twitch viewer count" plans as a Twitch Bot; it is an Elgato Stream Deck SDK plugin.
65. The /stats usage counter is in-memory and resets on every deploy (daily), so it never holds more than about a day of data; persist daily totals.
66. "a discord bot that clips the last 30 seconds of voice chat" is named "Discord Bot" and gets the generic slash-command plan; it needs voice receive (@discordjs/voice) + a rolling audio buffer + ffmpeg (related to 36).
67. "a mobile app that scans receipts and splits the bill with friends" (no "ai" word) is a plain offline-first mobile app with the store-submission boss; it needs a camera + receipt OCR line (vision model or ML Kit) and a split-the-bill flow.
70. "a beat maker web app" gets the generic auth/data-model boss; it needs a Web Audio step sequencer plan (sample playback, lookahead scheduling like the metronome).

### Backlog (new)
73. "a pomodoro chrome extension" stays a generic browser extension (popup + content script) with no timer must-haves; a pomodoro extension wants a service-worker countdown and badge timer, not only the web local-first plan.
- Committed 23b70f4 and pushed; Render deployed within about 30s (live llms.txt has the pomodoro example and FAQ, live API plans "a pomodoro timer web app" with the background-tab countdown boss and no Supabase, "a todo app" as Todo List with localStorage, "a cli that cleans up my downloads folder" as Downloads Cleaner CLI; /q/zzz 404). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.

## 2026-11-07 (daily run, ~8:05-8:25 AM CT)
- Health: Render (https://queststarter.onrender.com) /health 200 after a ~12s cold start. Local :4173 was down; restarted on new code. Locally /, /health, /robots.txt, /sitemap.xml, /llms.txt, /og.png 200; /q/zzz and unknown paths 404; bad JSON to /api/generate 400; FAQPage JSON-LD parses (25 Qs); all 28 sitemap /q/ links 200; GoatCounter script still in public/index.html.
- Output test: 22 varied ideas (beat maker, drum machine, step sequencer, pomodoro Chrome extension, focus timer Chrome extension, pomodoro web timer, todo, Discord standup bot, Godot cat wizard roguelike, Postgres MCP server, Reddit sentiment dashboard, YouTube Shorts blocker, Android habit tracker, sleep tracker phone app, AI screenshot renamer CLI, Twitch chat poll overlay, restaurant booking agent, iPhone drummer metronome, local-first todo, Japanese learning streak, Steam Deck speedrun timer, AI calorie counter) all produce full 6-level plans. Probes confirm beat maker / drum machine / step sequencer and pomodoro/focus Chrome extensions now get the intended plans; unrelated ideas (Shorts blocker, metronome, todo, habit) unchanged.
- Fixed in generator.js:
  - Backlog 70 done: "a beat maker web app" (and "a drum machine in the browser" / "a step sequencer web app") get a Web Audio step sequencer plan — 16-step grid, ≥4 drum pads, samples scheduled on the audio clock with lookahead (not setInterval), pattern/BPM/samples in localStorage, Supabase dropped, boss is tight timing under load. Names: Beat Maker / Drum Machine / Step Sequencer.
  - Backlog 73 done: "a pomodoro chrome extension" (and focus/tomato timer extensions) get Manifest V3 popup start/pause/reset, a service worker countdown from an end timestamp (chrome.alarms + Date.now()), badge text while running, end notification, settings in chrome.storage.local, no content script required for the MVP, and a boss about accurate timing across MV3 service worker sleeps (was generic popup + content-script extension). Name: Pomodoro Timer / Focus Timer.
- SEO: "A beat maker web app" example quest added to sitemap.xml (now 28 quest URLs) and llms.txt.
- LLM discoverability: new FAQ "Can it plan a beat maker or a pomodoro Chrome extension?" on the page, FAQPage JSON-LD (25 Qs) and llms.txt.

### Backlog
10. Render free tier cold-starts (~12-85s), one ~8-minute stall on 10-28; consider a paid instance or keep-alive ping when traffic starts.
24. Consider moving FEEDBACK.md/OPS_LOG.md out of the public repo (or making it private).
26. Weak names: "Invoices Sender", "Current Song Viewer", "Chrome Extension" (dark overlay on YouTube), "OBS Plugin", "AI Agent" ("files bugs from my notes app"), "Cozy Sim" (cafe), "MCP Server" (linear tickets; postgres), "Slack Bot" (hr questions), "Tickets Creator", "Names D D AI", "D D Character", "D D NPC", "Tag Photos AI", "Them Sender", "Discord Bot" (plays music; plays lofi music in voice chat), "AI Workout Plan", "AI Todo", "Farming Game Stardew", "Voice Memos Converter", "Learning Japanese Flashcard", "Emotes Viewer", "AI Value Pokemon Card Estimator", "Detects Dog Barking Mobile", "Valorant Crosshair Code" (drops "Generator"), "Text Speech" ("a speech to text app for my iphone"), "Writers Dictation", "Laptop Runner" (Ollama chatbot), "League Legends Ranked Tracker", "Steam Library Converter" ("turns my steam library into a tier list"), "Current Elden Ring Viewer" (Twitch overlay death count), "Lecture Transcription" (should be "Lecture Transcriber"), "MCP Server" (lets cursor query my supabase database), "Old Screenshots Deleter" ("a cli that deletes old screenshots"; fine-ish), "Local First Todo" (keeps the adjective), "Streak App Learning Streak" ("a japanese learning streak app" — subject parse misses "japanese").
27. "a personal finance dashboard from my bank CSV" still plans a fetch/diff/alert data tool.
29. "a semantic search engine for my bookmarks" is still a plain Next.js web app.
32. "a space sim" gets the generic player-and-enemy game plan.
34. Bot + RAG support bots keep the bot boss ("data ingestion / API integration"); also the Telegram water reminder bot and "an ai dungeon master for discord".
35. "an app that uses gpt to summarize my emails" stays an agent; a Gmail-read + one LLM call plan may fit better.
36. "a discord bot that plays music" (and "plays lofi music in voice chat") gets the "data ingestion / rate limits" boss; voice/audio streaming is the real boss.
40. "a landing page for my ai startup" and "a portfolio website with an ai chatbot" get an AI Agent component.
45. Stream overlays get game loot from the Twitch/game keywords; overlay loot should be overlay-specific.
48. "a podcast clip finder that uses ai", "a cli that renames my screenshots with ai" and "a chrome extension that finds coupon codes with ai" plan as AI Agents; find/rename are one-shot AI features (AI Web App / CLI / extension + one LLM call).
50. "a twitch clips compilation maker" plans as a Bot from the Twitch keyword; it is a video tool (Twitch API clips + ffmpeg).
60. "a local llm chatbot that runs on my laptop with ollama" plans as an AI Agent with a cloud API stack; it needs an Ollama (local model) chat plan.
61. "a stream deck plugin that shows my twitch viewer count" plans as a Twitch Bot; it is an Elgato Stream Deck SDK plugin.
65. The /stats usage counter is in-memory and resets on every deploy (daily), so it never holds more than about a day of data; persist daily totals.
66. "a discord bot that clips the last 30 seconds of voice chat" is named "Discord Bot" and gets the generic slash-command plan; it needs voice receive (@discordjs/voice) + a rolling audio buffer + ffmpeg (related to 36).
67. "a mobile app that scans receipts and splits the bill with friends" (no "ai" word) is a plain offline-first mobile app with the store-submission boss; it needs a camera + receipt OCR line (vision model or ML Kit) and a split-the-bill flow.
- Committed fe63084 and pushed; Render deployed within about 30s (live llms.txt has the beat maker example and FAQ, live API plans "a beat maker web app" with the Web Audio step-sequencer boss and no Supabase, "a pomodoro chrome extension" as Pomodoro Timer with service-worker/badge countdown; /q/zzz 404). FEEDBACK.md (uncommitted X watch edits) left for its own run; newsletter/ stays ignored.
