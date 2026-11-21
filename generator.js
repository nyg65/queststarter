'use strict';
// Template-based generator. Swap `generate` for an LLM call later; keep the returned shape.

const TYPES = {
  bot: {
    label: 'Bot', kw: ['bot', 'discord', 'telegram', 'slack', 'twitch'],
    stack: [['Node.js + discord.js (or Telegram/Slack SDK)', 'Best docs and examples for chat bots; easy for AI tools to write.'], ['SQLite (better-sqlite3)', 'Zero-setup storage for user data and stats.'], ['Railway / Fly.io', 'Cheap always-on hosting; bots need a long-running process.'], ['dotenv', 'Keep tokens out of the repo.']],
    must: ['Connect the bot and respond to one slash command', 'Store per-user data in SQLite', 'One useful command that delivers the core value', 'Help command listing everything'],
    boss: 'Reliable data ingestion / API integration without hitting rate limits',
  },
  game: {
    label: 'Game', kw: ['game', 'platformer', 'rpg', 'roguelike', 'shooter', 'puzzle', 'arcade', 'tower defense', 'tower defence', 'card game', 'multiplayer', 'unity', 'godot', 'flight sim', 'racing sim', 'city builder', 'colony sim', 'life sim', 'tycoon', 'escape room', 'vr game', 'sim game', 'farming sim', 'fishing sim', 'cozy sim', 'space sim', 'driving sim', 'simulator', 'roblox', 'obby', 'unreal', 'deckbuilder', 'board game', 'chess', 'tic tac toe', 'strategy game', 'turn-based', 'turn based', 'text adventure', 'trivia game', 'word game', 'visual novel', 'dating sim'],
    stack: [['Phaser 3 + Vite', 'Fast 2D browser game framework; huge example base AI knows well.'], ['TypeScript', 'Catches bugs in game-state logic early.'], ['Itch.io / Netlify', 'Free, instant sharing of playable builds.'], ['Kenney.nl assets', 'Free CC0 art/sound so you can ship without an artist.']],
    must: ['Player character that moves and has a goal', 'One enemy or obstacle type', 'Win / lose condition and restart', 'Score or progress display'],
    boss: 'Game feel: collision, difficulty curve, and juice (sound, particles, screen shake)',
  },
  agent: {
    label: 'AI Agent', kw: ['agent', 'agentic', 'autonomous', 'assistant', 'copilot', 'llm', 'gpt', 'chatbot', 'rag', 'ai '],
    stack: [['TypeScript or Python', 'Both have first-class LLM SDKs.'], ['OpenAI / Anthropic / xAI API (behind one wrapper)', 'Keep the model swappable.'], ['Tool-calling with JSON schemas', 'Agents = LLM + tools + a loop; start with 2 tools.'], ['SQLite or Postgres for memory/logs', 'Log every step so you can debug runs.'], ['Zod / Pydantic', 'Validate model output before acting on it.']],
    must: ['A single-goal agent loop (plan, act, observe, stop)', 'Two real tools the agent can call', 'Step-by-step run log visible to the user', 'Hard limits: max steps, max cost, human confirmation for risky actions'],
    boss: 'Making the agent reliable: bad tool calls, loops, and hallucinated results',
  },
  mcp: {
    label: 'MCP Server', kw: ['mcp', 'model context protocol'],
    stack: [['TypeScript + @modelcontextprotocol/sdk', 'Official MCP SDK; Claude Code and Cursor can scaffold a server with it in one prompt.'], ['stdio transport first (HTTP later)', 'Runs locally from Claude Desktop, Claude Code or Cursor with no hosting.'], ['Zod schemas for every tool input', 'Clear, validated inputs are what make the model call your tools correctly.'], ['MCP Inspector', 'Test each tool by hand before wiring it into an AI client.']],
    must: ['One tool with a clear name, description and input schema', 'Connect it to Claude Code, Claude Desktop or Cursor and call it from chat', 'Read secrets (API tokens) from env vars, never from tool input', 'README with the copy-paste client config snippet'],
    boss: 'Tool design: descriptions and schemas the model actually calls correctly, plus safe auth to the service',
  },
  mcmod: {
    label: 'Minecraft Plugin', kw: ['minecraft plugin', 'minecraft server plugin', 'minecraft mod', 'paper plugin', 'spigot', 'bukkit', 'fabric mod', 'forge mod', 'datapack', 'minecraft server mod'],
    stack: [['Paper API (Java 21) + Gradle', 'The standard for server plugins; works on Paper and Purpur servers and AI tools know the Bukkit API well. Use Fabric instead for a client-side mod.'], ['A local Paper test server', 'Drop the built jar in plugins/ and restart; the fastest way to try every change.'], ['config.yml + a YAML or SQLite data file', 'Server owners expect settings in config.yml; player progress needs to survive restarts.'], ['Modrinth / Hangar', 'Free places server owners already search for plugins.']],
    must: ['One command registered in plugin.yml with permission checks', 'One event listener that drives the core mechanic', 'Settings in config.yml with sensible defaults', 'Player data saved so it survives a server restart'],
    boss: 'Version compatibility and server performance: no blocking work on the main thread, and test on the Minecraft version you target',
  },
  cli: {
    label: 'CLI Tool', kw: ['cli', 'command line', 'command-line', 'terminal tool', 'terminal app', 'npx', 'python script', 'bash script', 'shell script', 'zsh script', 'powershell script', 'node script', 'tui', 'terminal ui'],
    stack: [['Node.js + TypeScript', 'Runs anywhere npm does; AI tools write solid Node CLIs.'], ['commander + @clack/prompts', 'Argument parsing and friendly interactive prompts without reinventing either.'], ['tsup', 'Bundles to one file with a shebang so it runs with npx.'], ['npm (publish as an npx command)', 'Anyone can try it with one command, no install step.']],
    must: ['One command that does the core job, with --help', 'Clear errors and non-zero exit codes when something fails', 'Read options from flags first, then a config file or env vars', 'Runnable with npx from a fresh folder'],
    boss: 'Working the same on macOS, Windows and Linux (paths, shells, line endings) with error messages people can act on',
  },
  overlay: {
    label: 'Stream Overlay', kw: ['overlay', 'browser source', 'obs '],
    stack: [['Vite + TypeScript (a static page)', 'An OBS Browser Source is just a web page: no server, login or database needed.'], ['Transparent CSS on a fixed 1920x1080 canvas', 'Lines up exactly with the OBS scene so you can position it once and forget it.'], ['URL query params for settings', 'Each streamer configures it by editing the link, with no account.'], ['GitHub Pages / Netlify', 'Free static hosting; paste the URL into an OBS Browser Source.']],
    must: ['A page with a transparent background that looks right as an OBS Browser Source at 1920x1080', 'The core display updates live without a page refresh', 'Settings (colors, position, channel) read from URL params', 'State kept in localStorage so it survives OBS reloading the source'],
    boss: 'Running all stream long: reconnecting when the data source drops, and staying light so OBS does not drop frames',
  },
  extension: {
    label: 'Browser Extension', kw: ['extension', 'chrome', 'browser plugin', 'userscript', 'firefox add'],
    stack: [['Chrome Extension MV3 + Vite (CRXJS)', 'Modern manifest with hot reload.'], ['TypeScript', 'Safer message passing between scripts.'], ['chrome.storage', 'Built-in persistence.']],
    must: ['Manifest + popup that opens', 'Content script that does one thing on one site', 'Settings saved in chrome.storage'],
    boss: 'Handling sites that change their DOM, and MV3 service worker lifecycle',
  },
  mobile: {
    label: 'Mobile App', kw: ['mobile', 'ios', 'android', 'iphone', 'phone app', 'for my phone', 'on my phone'],
    stack: [['Expo (React Native) + TypeScript', 'One codebase, test instantly on your phone.'], ['Expo Router', 'File-based navigation.'], ['Supabase', 'Auth + database without writing a backend.']],
    must: ['Two screens with navigation', 'Core action that works offline-first with local state', 'Run on a real device via Expo Go'],
    boss: 'Auth, permissions, and store submission',
  },
  data: {
    label: 'Data / API Tool', kw: ['tracker', 'dashboard', 'scraper', 'api', 'analytics', 'stats', 'monitor', 'alerts', 'digest', 'news', 'deal', 'patch'],
    stack: [['Node.js or Python (FastAPI)', 'Quick to build fetchers and endpoints.'], ['SQLite / Postgres', 'Store snapshots to diff over time.'], ['Cron (GitHub Actions or Railway cron)', 'Scheduled runs without a server.'], ['Resend / Discord webhook', 'Deliver alerts where users already are.']],
    must: ['Fetch data from one reliable source', 'Store and diff against the last snapshot', 'Deliver one alert or digest', 'Simple page or command to view current state'],
    boss: 'Source reliability: rate limits, changing formats, and de-duplicating alerts',
  },
  rag: {
    label: 'RAG Chatbot', kw: [],
    stack: [['TypeScript or Python', 'Both have mature LLM and embedding SDKs.'], ['OpenAI / Anthropic / xAI API (behind one wrapper)', 'Keep the chat model swappable.'], ['An embeddings model + a local vector store (pgvector, sqlite-vec or Chroma)', 'Turns your documents into searchable chunks; no hosted vector database needed to start.'], ['A loader + text splitter for your source (Markdown, PDF or HTML)', 'Clean chunks that keep their title and link are most of the answer quality.'], ['A small eval set (10-20 real questions with the expected source)', 'Shows whether a change to chunking or the prompt made answers better or worse.']],
    must: ['Ingest: load your documents, split them into chunks and store embeddings with each chunk\'s source and title', 'Retrieve: for a question, fetch the few best-matching chunks', 'Answer only from the retrieved chunks, citing the source of each claim', 'Say it could not find the answer in your documents instead of guessing'],
    boss: 'Retrieval quality: chunking, finding the right passages, and refusing to answer when the documents do not say',
  },
  persona: {
    label: 'AI Chatbot', kw: [],
    stack: [['Next.js + TypeScript + the Vercel AI SDK', 'Streams replies token by token into a chat UI with a few lines of code.'], ['OpenAI / Anthropic / xAI API (behind one wrapper)', 'Keep the chat model swappable.'], ['A versioned system prompt file (persona, voice, rules, 3-5 example exchanges)', 'The character lives in the prompt, so keep it in git and test changes against saved chats.'], ['localStorage or SQLite for chat history', 'The bot needs the conversation so far to stay in character; trim or summarize old turns to control cost.']],
    must: ['A system prompt that defines the character: voice, backstory, what it knows and what it will not do', 'A chat UI that streams replies', 'Conversation history sent with each message (trimmed to a token budget)', 'A reset button and a per-user message limit'],
    boss: 'Staying in character over long chats without drifting, repeating itself or being talked out of its rules',
  },
  aiapp: {
    label: 'AI Web App', kw: [],
    stack: [['Next.js + TypeScript + the Vercel AI SDK', 'One API route calls the model and streams or returns the result; no agent framework needed.'], ['OpenAI / Anthropic / xAI API (behind one wrapper)', 'Keep the model swappable.'], ['A versioned prompt file + Zod schema for the output (generateObject)', 'Structured output the UI can render, checked before it is shown.'], ['Vercel', 'Free deploy on every push; keep the API key in an env var on the server, never in the browser.']],
    must: ['One input form for what the user gives you (text, a few options, or an upload)', 'One server-side LLM call with a versioned prompt that returns structured output, validated with Zod', 'A result view with copy and regenerate buttons', 'A per-user rate limit and a max-tokens cap so a stranger cannot run up your bill'],
    boss: 'Output quality: a prompt that gives consistent, useful results on 10 real inputs, plus structured output that never breaks the UI',
  },
  web: {
    label: 'Web App', kw: ['web', 'website', 'app', 'site', 'saas', 'platform', 'landing', 'portfolio', 'tool'],
    stack: [['Next.js (App Router) + TypeScript', 'Most-documented stack for AI coding tools.'], ['Tailwind CSS + shadcn/ui', 'Good-looking UI with minimal design work.'], ['Supabase (Postgres + Auth)', 'Backend in an afternoon.'], ['Vercel', 'Free deploy on every push.']],
    must: ['Landing view explaining the value in one sentence', 'The one core flow, end to end', 'Persist data (Supabase or localStorage first)', 'Deploy to a public URL'],
    boss: 'Auth and data model — get the schema right before adding features',
  },
};

// Engine override for games: Phaser by default; Unity, Godot or Three.js when the idea asks for them (3D in a browser gets Three.js, other 3D gets Godot).
const GAME_ENGINES = {
  unity: [['Unity 6 (C#)', 'Industry-standard engine; AI tools write solid C# for it.'], ['Unity MCP server for Claude Code / Cursor', 'Lets your AI tool create scenes, objects, and scripts inside the editor instead of you copy-pasting.'], ['Git + Git LFS', 'Unity projects have big binary assets; LFS keeps the repo usable.'], ['Itch.io (WebGL or desktop build)', 'Free, instant sharing of playable builds.']],
  three: [['Three.js + Vite', '3D that runs in any browser from a link; AI tools know Three.js well enough to build whole games in one chat.'], ['TypeScript', 'Catches bugs in game-state and physics logic early.'], ['Itch.io / Netlify', 'Free, instant sharing of playable builds; no download for players.'], ['Free glTF models (Kenney, Poly Pizza)', 'CC0 3D assets so you can ship without a modeler.']],
  roblox: [['Roblox Studio (Luau)', 'Free engine with players on every device already; Luau is small and AI tools write it well.'], ['Roblox Studio MCP server for Claude Code / Cursor', 'Lets your AI tool read your place, write scripts and start playtests inside Studio.'], ['Rojo + Git', 'Syncs scripts from your editor into Studio, so AI edits live in normal files you can diff and undo.'], ['Publish to Roblox (start private, then public)', 'Free hosting and discovery; no store or download step for players.']],
  unreal: [['Unreal Engine 5 (Blueprints + C++)', 'High-end 3D and lighting out of the box; start in Blueprints and add C++ only where needed.'], ['An Unreal MCP plugin for Claude Code / Cursor', 'Lets your AI tool spawn actors, edit levels and wire Blueprints inside the editor.'], ['Git + Git LFS', 'Unreal assets are big binaries; LFS keeps the repo usable.'], ['Itch.io (desktop build)', 'Free, instant sharing of playable builds; Steam playtest later.']],
  ink: [['Ink (inkle) + the Inky editor', 'A scripting language made for branching stories; AI tools write it well and you can play-test every branch in Inky.'], ['inkjs + Vite', 'Runs your Ink story in a web page you style yourself.'], ['TypeScript', 'For any state beyond the story itself, like inventory or stats.'], ['Itch.io', 'Free hosting with a big interactive fiction audience.']],
  pico8: [['PICO-8 fantasy console (Lua, 128x128, 16 colors)', 'A tiny all-in-one game machine (about $15 from Lexaloffle; TIC-80 is a free alternative) whose hard limits keep the scope small; AI tools write its Lua API (_init, _update, _draw, btn, spr, map) well.'], ['The built-in sprite, map, sound and music editors', 'Art, levels and chiptune audio live inside the same cart, so there is no asset pipeline to set up.'], ['VS Code + a PICO-8 Lua extension + Git', '.p8 carts are plain text, so your AI tool can edit the code tab directly and every change is a readable diff.'], ['Lexaloffle BBS + itch.io (HTML export)', 'Post the .p8.png cart on the PICO-8 BBS (where players and Splore find it) and upload the export -f index.html web build to itch.io.']],
  godot: [['Godot 4 (GDScript)', 'Free, open-source, lightweight; GDScript is simple for AI tools to write.'], ['Godot MCP server for Claude Code / Cursor', 'Lets your AI tool run the project and edit scenes and scripts directly.'], ['Git', 'Godot scenes are text files, so diffs and AI edits stay readable.'], ['Itch.io (HTML5 or desktop export)', 'Free, instant sharing of playable builds.']],
};
// Cozy, sandbox and sim games don't need combat; give them a core-loop + progression MVP instead.
// Client-side Minecraft mods (Fabric/Forge) instead of server plugins (Paper)
const MCMOD_FABRIC = [['Fabric API (Java 21) + Fabric Loom (Gradle)', 'The lightweight, fast-updating mod loader; AI tools know its registries and mixins. Use NeoForge if your modpack needs it.'], ['Loom runClient dev setup', 'Launches a test Minecraft client with your mod in one command.'], ['A JSON config + data generators', 'Players expect a config file; datagen writes recipes and models so you do not hand-edit JSON.'], ['Modrinth / CurseForge', 'Where players already search for mods.']];
const MCMOD_FABRIC_MUST = ['One new thing registered (an item, block, or command) that works in a test world', 'The core mechanic driven by one event or mixin', 'A config file with sensible defaults', 'Runs in a clean Fabric install with only Fabric API alongside'];
const COZY = /\b(cozy|cosy|farming|farm|sim|simulator|sandbox|life sim|idle|incremental|tycoon|management|builder|city builder|crafting|walking sim|relaxing)\b/;
// Gentle themes (cooking, serving, collecting, delivering, gardening) are cozy loops too, unless the idea names combat or another game genre.
const GENTLE = /\b(clean|cleans|cleaning|wash|washes|washing|scrub|scrubs|scrubbing|cook|cooks|cooking|bake|bakes|baking|serve|serves|serving|restaurant|cafe|bakery|ramen|tea shop|coffee shop|garden|gardening|collect|collects|collecting|gather|gathers|gathering|deliver|delivers|delivering|delivery|mail|decorate|decorates|decorating|fishing|paint|paints|painting|graffiti|draw|draws|drawing|sculpt|sculpts|sculpting)\b/;
const NOT_GENTLE = /\b(shoot|shoots|shooter|fight|fights|fighting|enemy|enemies|zombie|zombies|kill|kills|boss|bosses|battle|combat|gun|guns|sword|swords|war|survive|survival|dungeon|roguelike|roguelite|platformer|tower defen[cs]e|racing|race|puzzle|match-3|card game|deckbuilder|chess|trivia|word game|escape room|multiplayer|turn-based|turn based|strategy|rpg|obby|horror)\b/;
function cozyLoop(lower) {
  if (/\blighthouses?\b/.test(lower)) return 'A core loop the player repeats (keep the lamp lit and fuelled, spot ships in the fog or storm, guide them past the rocks, earn supplies for upgrades)';
  if (/\b(clean|cleans|cleaning|wash|washes|washing|scrub|scrubs|scrubbing)\b/.test(lower)) return 'A core loop the player repeats (a dirty pile or room arrives, scrub it clean with satisfying sound and sparkle, earn coins or stars, unlock new tools and places)';
  if (/\b(cook|cooks|cooking|bake|bakes|baking|serve|serves|serving|restaurant|cafe|bakery|ramen|tea shop|coffee shop)\b/.test(lower)) return 'A core loop the player repeats (take an order, cook or prepare it, serve it, earn tips)';
  if (/\b(deliver|delivers|delivering|delivery|mail)\b/.test(lower)) return 'A core loop the player repeats (pick up, travel, deliver, get paid or thanked)';
  if (/\b(collect|collects|collecting|gather|gathers|gathering)\b/.test(lower)) return 'A core loop the player repeats (explore, collect, bring it back, unlock a new area)';
  if (/\b(paint|paints|painting|graffiti|draw|draws|drawing|sculpt|sculpts|sculpting)\b/.test(lower)) return 'A core loop the player repeats (pick a spot, create the piece, step back to see it, unlock new colors or tools)';
  if (/\b(fishing)\b/.test(lower)) return 'A core loop the player repeats (cast, wait, reel in, sell or log the catch)';
  if (MGMT_GAME.test(lower)) return 'A core loop the player repeats (visitors or jobs arrive, you handle them, earn money or reputation, spend it on upgrades)';
  return null;
}
const COZY_MUST = ['A core loop the player repeats (e.g. plant, wait, harvest, sell)', 'One progression system (unlocks, upgrades, or money)', 'Save and load so progress survives a restart', 'A clear on-screen goal for the first 5 minutes'];
const ROBLOX_MUST = ['Spawn point, checkpoints and respawn when a player falls or dies', 'Progress checked on the server, never trusted from the client', 'Progress saved with DataStoreService so it survives rejoining', 'A leaderstats display (stage, coins or wins)'];
const ROBLOX_BOSS = 'Server/client split and DataStore reliability: exploit-proof progress that saves without data loss';
const COZY_BOSS = 'Pacing and progression: making the loop satisfying for 10+ minutes without combat';
function gameEngine(lower) {
  if (/\bpico[- ]?8\b/.test(lower)) return 'pico8';
  if (/\broblox\b|\bobby\b/.test(lower)) return 'roblox';
  if (/\bunreal\b|\bue5\b/.test(lower)) return 'unreal';
  if (/\bunity\b/.test(lower)) return 'unity';
  if (/\bgodot\b/.test(lower)) return 'godot';
  if (/\bthree\.?js\b/.test(lower)) return 'three';
  if (/\b(vr|virtual reality|quest 3)\b/.test(lower)) return 'unity';
  if (/\b(text adventure|text-based adventure|interactive fiction|choose your own adventure|text game)\b/.test(lower)) return 'ink';
  if (/\b(3d|three dimensional)\b/.test(lower) && /\b(browser|web|webgl|online)\b/.test(lower)) return 'three';
  if (/\b3d\b|\bthree dimensional\b/.test(lower)) return 'godot';
  return null;
}

const FLAVOR = [
  { kw: ['game', 'gaming', 'gamer', 'steam', 'xbox', 'playstation', 'esports', 'twitch', 'minecraft', 'speedrun'], loot: ['Steam / game API integration', 'Leaderboards', 'Discord share button', 'Achievement badges'] },
  { kw: ['ai', 'llm', 'gpt', 'agent', 'prompt', 'chatbot', 'rag'], loot: ['Model picker', 'Conversation memory', 'Cost / token meter', 'Eval set to test quality'] },
  { kw: ['social', 'community', 'friends', 'chat', 'multiplayer'], loot: ['Friend lists', 'Realtime updates (WebSockets)', 'Moderation tools'] },
  { kw: ['money', 'budget', 'finance', 'crypto', 'trading', 'bet'], loot: ['CSV export', 'Charts', 'Disclaimer page (not financial advice)'] },
];

const VSCODE = /\b(vs ?code|vscode|visual studio code|cursor extension)\b/;
const VSCODE_STACK = [['VS Code Extension API + TypeScript (yo code)', 'Official scaffold; the same extension also runs in Cursor and Windsurf.'], ['esbuild', 'Fast bundling that the official template supports.'], ['VS Code Marketplace + Open VSX', 'Publish to both so Cursor and other VS Code forks can install it.']];
const VSCODE_MUST = ['One command in the Command Palette that runs the core action', 'Show the result in the editor (hover, panel, or inline decoration)', 'Settings via contributes.configuration', 'Test it in the Extension Development Host (F5)'];
const VSCODE_BOSS = 'Extension host lifecycle and keeping the editor fast (activation events, async work)';
// Raycast (macOS launcher) extensions are React + TypeScript commands built on @raycast/api, not Chrome MV3
const RAYCAST = /\braycast\b/;
const RAYCAST_STACK = [['Raycast API (@raycast/api) + React + TypeScript (npm create raycast-extension)', 'The official template; each command is a React component (List, Detail or Form) and `npm run dev` hot-reloads it inside Raycast.'], ['@raycast/utils (useFetch, usePromise, useCachedPromise, OAuth helpers)', 'Loading states, caching and OAuth in a few lines, so results show instantly the second time.'], ['Extension preferences (password type for API tokens)', 'Raycast stores secrets in the macOS keychain; never hardcode a token.'], ['Raycast Store (npm run publish)', 'Opens a pull request to raycast/extensions; reviewers check it before anyone can install it.']];
const RAYCAST_MUST = ['One command in package.json that opens a List view from the Raycast root search', 'Load the data with useCachedPromise or useFetch, with a loading state, an empty view and a clear error toast', 'An ActionPanel on each item (open in browser, copy, and the one action that matters)', 'API token read from a password preference, never hardcoded'];
const RAYCAST_BOSS = 'Feeling instant inside Raycast: cached results, API rate limits and auth (OAuth PKCE via @raycast/utils or a token preference), plus passing the Raycast Store review';
// Figma plugins run in Figma's sandbox (Plugin API + manifest.json + a UI iframe), not a web app or Chrome extension
const FIGMA = /\b(figma|figjam) plugins?\b|\bplugins? for (figma|figjam)\b/;
const FIGMA_STACK = [['Figma Plugin API + TypeScript (@figma/plugin-typings, from the Figma desktop "New plugin" template or create-figma-plugin)', 'The official typings and template; the main code runs in Figma\'s sandbox with access to the open file.'], ['manifest.json (editorType, documentAccess: "dynamic-page", networkAccess)', 'Declares where it runs (Figma, FigJam, Dev Mode) and which domains it may call; Figma blocks requests to anything not listed.'], ['A UI iframe (figma.showUI with plain HTML or Preact) + postMessage', 'The UI has no access to the document and the main code has no DOM, so the two talk through figma.ui.postMessage and onmessage.'], ['Figma Community (publish from the desktop app)', 'Where designers find plugins; Figma reviews each submission before it is listed.']];
const FIGMA_MUST = ['Runs from Plugins > Development in the Figma desktop app on the current selection, with a clear message when nothing is selected', 'The core action in the main code with the Plugin API (read or change nodes, styles or variables), using the async APIs that dynamic-page access requires', 'A small UI (figma.showUI) that sends options to the main code and shows the result, with copy to clipboard', 'Settings remembered with figma.clientStorage'];
const FIGMA_BOSS = 'The two-world model and big files: main code vs UI iframe messaging, async node and style APIs, staying fast on files with thousands of layers, and network calls limited to the domains in manifest.json, plus passing Figma Community review';
// Turn-based, card, board, puzzle and text games have no moving character or collision
const TURN = /\b(turn[- ]based|card game|deckbuilder|deck builder|board game|chess|checkers|tic tac toe|strategy game|tactics|trivia|quiz game|word game|wordle|text adventure|interactive fiction|visual novel|sudoku)\b/;
const TURN_MUST = ['Game state model (board, hand, or story position) that the UI reads from', 'One full turn: player acts, game resolves, opponent or game responds', 'Win / lose condition and restart', 'Clear feedback on what just happened each turn'];
const TURN_BOSS = 'Rules and balance: making every turn resolve correctly and choices feel meaningful';
const VEHICLE = /\b(racing|racer|kart|karts|drift\w*|driving|flight sim\w*|flying game|plane game|planes)\b/;
const VEHICLE_MUST = ['A vehicle with tuned handling (acceleration, braking, steering or drifting)', 'One track or course with checkpoints and a finish (lap line, gate or landing)', 'A run timer with the best time saved', 'A ghost of your best run or one AI opponent to race against'];
const VEHICLE_BOSS = 'Handling and camera feel at speed, plus checkpoints that stop players cutting the course';
const TOWER = /\b(tower[- ]defen[cs]e|td game|defend (the|your|a) (base|castle|lane))\b/;
const TOWER_MUST = ['A path (or grid) that enemies walk from spawn to your base', 'Placing towers on allowed tiles, each with range, damage and fire rate', 'Waves that ramp up, with lives lost when an enemy reaches the base', 'Money from kills to buy and upgrade towers between waves'];
const TOWER_BOSS = 'Wave balance and the economy: difficulty that ramps fairly, towers that each have a use, and pathing/targeting that stays fast with 100+ enemies';
const FABRIC_BOSS = 'Version compatibility: Minecraft updates break mods, so pin one version, keep mixins small and test in a clean instance';
const PERSONAL = /\b(habits?|workouts?|gym|exercises?|mood|water intake|sleep|reading|journal|study|streaks?|meditation|fitness|calories?|weight|chores?|goals?)\b/;
const RAG_DOCS = '(notes|docs|documents|pdfs?|files|wiki|knowledge ?base|articles|help ?center|handbook|manuals?|vault|transcripts|papers|textbooks?|codebase|readme|documentation)';
const RAG = new RegExp('\\b(rag|retrieval[- ]augmented|retrieval)\\b|\\b(over|about|from|on|for|with|across|using|of|in)\\s+(my|our|your|the|their|a|all)?\\s*([a-z0-9]+\\s+){0,3}' + RAG_DOCS + '\\b|\\b(chat with|talk to|ask|question)\\s+(my|our|your|a|any)?\\s*([a-z0-9]+\\s+){0,2}' + RAG_DOCS + '\\b');
const SUPPORT = /\b(customer (support|service|questions)|support|help ?desk|faqs?)\b|\banswers? (customer |common |simple )?questions (for|about|on) (my|our)\b/;
// identifying or recognizing something by its sound (bird songs, songs playing, a dog barking)
const AUDIO_ID = /\b(identif\w*|recogni[sz]\w*|detects?|detecting|tells? me what|names? the)\b.*\b(songs?|birdsongs?|sounds?|calls?|audio|recordings?|hum|humming|whistl\w*|chirps?|barks?|barking|music|playing)\b|\bshazam for\b/;
const BIZ = /\b(store|shop|business|saas|website|site|app|product|restaurant|server|company|startup|customers?|etsy|shopify|woocommerce|clinic|salon|gym|course)\b/;
const STORE = /\b(store|shop|etsy|shopify|woocommerce|ecommerce|e-commerce|orders?)\b/;
const PERSONA = /\b(role ?plays?|roleplaying|persona|companion|pretends? to be|in character|(talks?|speaks?|acts?|chats?) (like|as) (a|an|my|the)\b)/;
// transcribing speech ("transcribes my voice notes", "a meeting transcriber with whisper api"); a bare "whisper" (chat app, horror game) does not count
const STT = /\b(transcrib\w*|transcriptions?|speech[- ]to[- ]text|dictation)\b|\b(with|using|uses?|via|and) (openai'?s? )?whisper\b|\bwhisper (api|model)\b/;
// chat with a model running on your machine (Ollama, LM Studio); a usage monitor stays a data tool
const LOCAL_LLM = /\b(ollama|lm studio|lmstudio|lm-studio|localai|local-ai|llama\.?cpp|gpt4all)\b|\blocal (llms?|models?)\b/;
const TABLETOP = /\b(ttrpgs?|d&d|dnd|dungeons (and|&) dragons|tabletop|pathfinder|initiative|character sheets?|dungeon master|game master)\b/;
// a Go or Rust HTTP backend ("a go web server", "a rust web api", "a rest api in golang", "an axum server")
const GO_RUST_WEB = /\b(go|golang|rust)\s+(web\s+)?(servers?|apis?|backends?|http servers?|rest apis?|web services?|microservices?|web apps?)\b|\b(web servers?|apis?|backends?|http servers?|rest apis?|web services?|microservices?) (in|with|using|written in) (go|golang|rust)\b|\b(axum|actix|actix-web|go-chi|gin-gonic)\b/;
function goRustWeb(t) { return GO_RUST_WEB.test(t) && !/\b(discord|telegram|slack|twitch|bot|minecraft|game|games|cli|tui|command line|terminal|mcp|extension|plugin|plugins|mods?|players?|wipes?|oxide|umod|raid\w*)\b/.test(t); }
// a game played in chat by a bot ("a twitch bot that runs a trivia game")
const CHAT_GAME = /\b(trivia|quiz\w*|hangman|word games?|guessing games?|guess the \w+|wordle|riddles?|would you rather|bingo|rock paper scissors)\b/;
// a plugin for Rust the game (Oxide/uMod, Carbon); "a rust web server" / "a rust cli" stay Rust the language
const RUST_GAME_PLUGIN = /\brust (game )?servers? (plugins?|mods?)\b|\b(plugins?|mods?) for (my |our |a |the )?rust (game )?servers?\b|\b(oxide|umod)\b(?! (cleaner|remover|layer|film))|\brust (game )?(plugins?|mods?)\b.*\b(players?|wipes?|raid\w*|bases?|loot|clans?|kits?|teleport\w*)\b/;
// "a game where you run a lighthouse" / "... manage a zoo": a management game about a place, not "Lighthouse Runner"
const MGMT_GAME = /\b(?:where|in which) (?:you|players?|the player) (?:run|runs|manage|manages|operate|operates|keep|keeps|tend|tends|own|owns|look after|looks after) (?:a|an|the|your|their|my|our)? ?(?:little |small |tiny |cozy |cosy |haunted |floating |busy |remote |lonely |seaside )?(lighthouse|cafe|coffee shop|tea shop|shop|store|restaurant|bakery|farm|zoo|aquarium|hotel|inn|tavern|bar|pub|museum|hospital|theme park|amusement park|airport|space station|train station|station|bookshop|bookstore|library|colony|town|village|school|ranch|food truck|pizzeria|arcade|motel|spa|pet shop|flower shop|florist|lemonade stand|island|factory|brewery|vineyard|campsite|laundromat|diner|ramen shop|noodle shop|potion shop|garden|greenhouse|pizza shop|pizza place|sushi bar|sushi restaurant|burger joint|ice cream shop|candy shop|toy shop|toy store|game store|bike shop|pet store|grocery store|supermarket|gas station|car wash|bookstore cafe|cat cafe)s?\b/;
const STOP = new Set('a an the to for of and or that i my me with on in it is be build make create want app project idea simple'.split(' '));

function detectTypes(text) {
  const t = ' ' + text.toLowerCase() + ' ';
  const scored = [];
  for (const [key, def] of Object.entries(TYPES)) {
    let s = 0;
    const tt = key === 'game' ? t.replace(/\bgam(er|ers|ing)\b/g, ' ') : t;
    // match keywords at the start of a word so "community" is not "unity" and "dispatch" is not "patch";
    // short keywords must also end the word (plural/version ok) so "clip", "clinic" and "click" are not "cli" and "bottle" is not "bot" ("web"/"app" stay prefixes: webapp, apps)
    for (const k of def.kw) if (k.length <= 3 ? (k === 'web' || k === 'app' || /[^a-z0-9]/.test(k) ? tt.includes(' ' + k) : new RegExp('[^a-z0-9]' + k + '(s|\\d+)?(?![a-z0-9])').test(tt)) : new RegExp('(^|[^a-z0-9])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(tt)) s += k.length > 3 ? 2 : 1;
    if (s) scored.push([key, s]);
  }
  // "a lighthouse keeper sim" / "a cozy bookshop sim where ...": "<noun> sim" names a game, but not sim racing, a SIM card, an eSIM or a stock market simulator web app
  if (!scored.find(x => x[0] === 'game') && /\b(?!(?:a|an|the|my|our|your|for|of|esim)\b)[a-z]+ (sim|simulator)s?\b(?! (card|cards|racing|racer|rig|rigs|league|wheel|swap|data|only|tray))/.test(t) && !/\b(stock|trading|market|investing|investment|portfolio|budget|retirement|loan|mortgage|monte carlo|physics|circuit|network|esim)\b/.test(t)) scored.push(['game', 2]);
  scored.sort((a, b) => b[1] - a[1]);
  const keys = scored.map(x => x[0]);
  // "a twitch bot that runs a trivia game": a chat game played in Twitch/Discord chat is a bot, not a Phaser game
  if (keys.includes('bot') && keys.includes('game') && CHAT_GAME.test(t) && /\b(twitch|discord|telegram|slack|whatsapp|chat) bots?\b/.test(t) && !/\b(unity|godot|phaser|roblox|unreal|three\.?js|pico-?8)\b/.test(t)) keys.splice(keys.indexOf('game'), 1);
  // generic "app/web/tool" shouldn't beat specific types
  if (keys.length > 1 && keys[0] === 'web') keys.push(keys.shift());
  // "app"/"tool" alone is just a noun, not a web-app signal when a specific type was found
  if (keys.length > 1 && keys[0] !== 'web' && !/\b(web|website|site|saas|platform|landing|portfolio)\b/.test(t)) { const i = keys.indexOf('web'); if (i > 0) keys.splice(i, 1); }
  // an app that picks/tracks/recommends games is a web/data tool about games, not a game to build
  const gameGenre = /\b(game|sim|simulator|visual novel) (where|about|in which|set)\b|\bvisual novel\b|\b(platformer|rpg|roguelike|shooter|puzzle|arcade|tower defense|card game|deckbuilder|multiplayer|level|player|enemy|enemies|npc|npcs|dungeon|escape room)\b/.test(t);
  // a game with AI features ("an rpg where the npcs are llm agents") is a game first, with an AI component
  if (keys[0] === 'agent' && keys.includes('game') && gameGenre) { keys.splice(keys.indexOf('game'), 1); keys.unshift('game'); }
  if (keys[0] === 'game' && !gameGenre && /\b(pick|picks|recommend\w*|suggest\w*|choose|finder|track\w*|backlog|library|wishlist|review\w*|deals?|rat(e|es|ing|ings)|timer|stats|compar\w*|performance|benchmarks?|generator|sprites?|assets?|overlay|splits|wiki|guides?|launcher|lists?|tier ?lists?|collections?|catalog(ue)?s?|favou?rites?|vot(e|es|ing)|polls?)\b/.test(t) || (keys[0] === 'game' && !gameGenre && /\b(leaderboards?|standings|elo|rankings?|tournaments?|brackets?|schedul\w*)\b/.test(t) && /\b(website|site|web ?app|app|page|tracker|dashboard|for (my|our)|schedulers?|planners?|leaderboards? (for|of))\b/.test(t) && !/\bgames? (with|where|about|in which|that has)\b/.test(t))) { keys.shift(); if (!keys.includes('web') && !keys.includes('data')) keys.unshift('web'); }
  // a bot/tool that is merely about games ("tracks my friends' game wins") shouldn't also get a game engine
  if (keys[0] !== 'game' && keys.includes('game') && !gameGenre && !/\b(unity|godot|three\.?js)\b/.test(t)) keys.splice(keys.indexOf('game'), 1);
  // "an MCP server that lets my coding agent read X": the agent is the client, so plan only the MCP server
  if (keys.includes('mcp') && /^\s*(an? |my |the )?(\w+ ){0,2}mcp server\b/.test(t)) { const i = keys.indexOf('agent'); if (i >= 0) keys.splice(i, 1); keys.splice(keys.indexOf('mcp'), 1); keys.unshift('mcp'); }
  // an OBS / stream overlay is a static page loaded as a Browser Source, not a full web app or a bot
  if (keys.includes('overlay') && /\b(overlay|browser source)\b/.test(t) && /\b(obs|stream|streaming|streamer|streams|twitch|kick|streamlabs|browser source|youtube live|livestream\w*|speedrun\w*|splits)\b/.test(t)) { keys.length = 0; keys.push('overlay'); }
  else if (keys.includes('overlay')) keys.splice(keys.indexOf('overlay'), 1);
  // a personal tracker ("a habit tracker app", "a workout log") is an app the user fills in, not a data fetcher
  // and "a habit tracker for my android phone" is a mobile app, so the word "tracker" shouldn't add a data / API tool component either
  if (keys.length > 1 && keys[0] !== 'data' && keys.includes('data') && PERSONAL.test(t) && !/\b(scrap\w*|alerts?|api|monitor\w*|prices?|deals?|patch\w*|news|digest|feed|spend\w*|costs?|dashboards?|stats|analytics|fitbit|strava|garmin|goodreads|sync\w*|imports?)\b/.test(t)) keys.splice(keys.indexOf('data'), 1);
  if (keys[0] === 'data' && PERSONAL.test(t) && !/\b(scrap\w*|alerts?|api|monitor\w*|prices?|deals?|patch\w*|news|digest|feed|spend\w*|costs?)\b/.test(t)) { keys.shift(); const m = /\b(mobile|ios|android|iphone|phone)\b/.test(t) ? 'mobile' : 'web'; if (!keys.includes(m)) keys.unshift(m); else { keys.splice(keys.indexOf(m), 1); keys.unshift(m); } }
  // "a ttrpg initiative tracker" / "a d&d character sheet tracker": a table-side tool the group fills in, not a data fetcher with cron and email alerts
  if (keys[0] === 'data' && TABLETOP.test(t) && !/\b(scrap\w*|alerts?|api|monitor\w*|prices?|deals?|news|digest|feed|stock)\b/.test(t)) { keys.shift(); const w = keys.indexOf('web'); if (w >= 0) keys.splice(w, 1); keys.unshift('web'); }
  // "a meeting transcriber with whisper api": "api" names the speech-to-text service, not a data fetcher; a transcriber is a record/upload app
  if (keys.includes('data') && STT.test(t) && !/\b(trackers?|dashboards?|scrap\w*|analytics|stats|monitor\w*|alerts?|digests?|news|deals?|patch\w*)\b/.test(t)) { keys.splice(keys.indexOf('data'), 1); if (!keys.length) keys.push(/\b(mobile|ios|android|iphone|phone)\b/.test(t) ? 'mobile' : 'web'); }
  // chat or Q&A over the user's own documents is retrieval (ingest, retrieve, cite), not a tool-calling agent loop
  if (keys.includes('agent') && RAG.test(t) && /\b(rag|retrieval|chat\w*|ask\w*|answer\w*|questions?|q&a|search\w*|tutor|quiz\w*|talk to|trained on|knowledge)\b/.test(t)) keys[keys.indexOf('agent')] = 'rag';
  // a support / FAQ chatbot for a store or product answers from that business's FAQ and policies: retrieval, not an agent loop
  if (SUPPORT.test(t) && BIZ.test(t) && /\b(chat\w*|bots?|assistant|agent|answers?)\b/.test(t) && !/\b(files?|sends?|books?|posts?|schedules?|refunds?|deploys?|creates? (issues|tickets|bugs))\b/.test(t)) {
    if (keys.includes('agent')) keys[keys.indexOf('agent')] = 'rag';
    else if (keys[0] === 'bot' && !keys.includes('rag')) keys.splice(1, 1, 'rag');
  }
  // a character or roleplay chatbot just talks: a persona prompt, chat history and a streaming UI, no tools or agent loop
  if (keys[0] === 'agent' && PERSONA.test(t) && !/\b(files?|sends?|books?|posts?|reads? my|emails?|schedules?|orders?|buys?|deploys?|creates? (issues|tickets|bugs))\b/.test(t)) keys[0] = 'persona';
  // "a local llm chatbot that runs on my laptop with ollama": chat with a local model, not a cloud tool-calling agent
  if (LOCAL_LLM.test(t) && /\b(chat\w*|assistant|conversation|talks?)\b/.test(t) && !/\b(monitor\w*|dashboards?|usage|trackers?|costs?|spend\w*|alerts?)\b/.test(t)) {
    if (keys.includes('agent')) keys[keys.indexOf('agent')] = 'persona';
    else if (keys[0] === 'web' && !keys.includes('persona')) keys[0] = 'persona';
    else if (!keys.includes('persona') && !keys.includes('rag')) keys.unshift('persona');
  }
  // "a landing page for my ai startup" is a marketing site, not an agent; a portfolio with a chatbot is a site plus a chat widget
  if (keys.includes('agent') && /\b(landing pages?|portfolios?)\b/.test(t) && !/\b(chatbots?|agents?|assistants?|copilots?)\b/.test(t)) {
    keys.splice(keys.indexOf('agent'), 1);
    if (!keys.includes('web')) keys.unshift('web');
    else { keys.splice(keys.indexOf('web'), 1); keys.unshift('web'); }
  } else if (keys.includes('agent') && /\b(landing pages?|portfolios?)\b/.test(t) && /\bchatbots?\b/.test(t) && !/\b(files?|sends?|books?|posts?|reads? my|emails?|schedules?|orders?|buys?|deploys?|creates? (issues|tickets|bugs))\b/.test(t)) {
    keys[keys.indexOf('agent')] = 'persona';
  }
  // "a meal planner that uses ai to suggest recipes" is one LLM call behind a form, not a tool-calling agent loop
  // "a workout tracker that uses ai to plan my week" / "a recipe site that uses claude to write recipes": a web app whose core is that one AI call is an AI Web App too
  const ai1 = keys.indexOf('agent');
  // "a tiktok caption generator" / "a fantasy name generator": a generator or writer of short text is one LLM call even without the word "ai"
  const TEXTGEN = /\b(captions?|bios?|slogans?|taglines?|tweets?|hashtags?|(?<!file |domain )names?|titles?|headlines?|poems?|lyrics|jokes?|excuses?|cover letters?|descriptions?|pick ?up lines?|stor(y|ies)|prompts?|ideas?|puns?|essays?|quotes?|rhymes?|raps?|limericks?|haikus?) (generator|writer|maker)s?\b/;
  if (!keys.length && TEXTGEN.test(t)) keys.push('web');
  // "an app that writes my d&d session recaps" / "an app that summarizes my podcast episodes": writing or summarizing text is one LLM call even without the word "ai"
  const TEXTVERB = /\b(app|tool|site|website|web app|webapp|page|thing)s? (that|which|to) (writes?|drafts?|summari[sz]es?|rewrites?)\b/;
  const aiUse = ai1 >= 0 || (keys[0] === 'web' && (/\b(ai|gpt|chatgpt|claude|llm|openai|gemini|grok)\b/.test(t) || TEXTGEN.test(t) || TEXTVERB.test(t)));
  if (aiUse && !/\b(agents?|agentic|autonomous\w*|assistants?|copilots?|chatbots?|chat|bots?|rag|files?|sends?|books?|(?<!blog |social media |each |every |per |the |a |my |your |our )posts?|reads? my|emails?|inbox|schedules?|orders?|buys?|deploys?|browses?|controls?|automat\w*|monitors?|smart home|creates? (issues|tickets|bugs)|opens? (prs?|pull requests))\b/.test(t) && /\b(suggest\w*|generat\w*|writ(e|es|er|ers|ing)|summar\w*|review\w*|maker|makes|names?|tags?|explain\w*|rewrit\w*|translat\w*|plans?|planner|captions?|descriptions?|turns?|converts?|grades?|scores?|critiques?|roasts?|feedback|ideas|prioriti[sz]\w*|rate|rates|rating|rank|ranks|sort|sorts|categori[sz]\w*|classif\w*|identif\w*|recogni[sz]\w*|detects?|transcrib\w*|extracts?|scans?|counts?|estimat\w*|analy[sz]\w*|calculat\w*|finds?|finder|finding|renam\w*)\b/.test(t)) {
    // a phone app, extension, bot, CLI or game with one AI feature stays that kind of project; the AI call is a feature, not an agent
    if (ai1 >= 0 && keys.some(k => /^(mobile|extension|bot|cli|game|mcmod|overlay)$/.test(k))) keys.splice(ai1, 1);
    else if (ai1 === 0 || keys[0] === 'web') { if (ai1 > 0) keys.splice(ai1, 1); keys[0] = 'aiapp'; const w = keys.indexOf('web'); if (w > 0) keys.splice(w, 1); } else keys.splice(ai1, 1);
  }
  // "a chess game against an ai that trash talks": a turn-based game whose opponent talks; the LLM is a feature, not a tool-calling agent loop
  if (keys[0] === 'game' && keys.includes('agent') && /\bagainst (an? |the )?(ai|computer|bot|llm|cpu)\b(?! (bosses|enem(y|ies)|monsters?|robots?|zombies?|aliens?|minions?|soldiers?|arm(y|ies)|swarms?|hordes?|drones?|waves?))|\b(trash[- ]?talk\w*|banter\w*|taunt\w*|smack[- ]talk\w*)\b/.test(t)) keys.splice(keys.indexOf('agent'), 1);
  // "a fighting game against ai bosses" / "a shooter against ai enemies": enemy AI is game logic (state machines), not an LLM agent
  if (keys[0] === 'game' && keys.includes('agent') && /\b(ai|computer|cpu) (bosses|boss|enem(y|ies)|opponents?|drivers?|racers?|monsters?|bots?|soldiers?|units?|zombies?|guards?)\b/.test(t) && !/\b(llm|llms|gpt|chatgpt|claude|language models?|agents?|talk\w*|chat\w*|convers\w*|dialog\w*|banter\w*|trash[- ]?talk\w*)\b/.test(t)) keys.splice(keys.indexOf('agent'), 1);
  // "a site that's a directory of ai tools": a listing site about AI, not an agent or an LLM app
  if (/\b(directory|directories|list|catalog|catalogue|collection|database|gallery|showcase|marketplace|aggregator) (of|for) (the |all |top |best |free |new |cool |useful )*(ai|llm|gpt|chatgpt|mcp)\b/.test(t) && !/\b(chatbots?|agents? that|assistants? that|uses? (ai|gpt|claude|an llm)|summar\w*|generat\w*)\b/.test(t)) { for (const k of ['agent', 'aiapp', 'persona', 'rag', 'mcp']) { const i = keys.indexOf(k); if (i >= 0) keys.splice(i, 1); } if (!keys.includes('web')) keys.unshift('web'); }
  // "a website where people vote on the best ai tools": a voting/ranking site about AI, not an agent or an LLM app
  if (/\b(vot(e|es|ing)|upvot\w*|polls?|rank(s|ing)?) (on|for) (the |which |what )?(best |top |favou?rite |coolest |most useful |new )*(ai|llm|llms|gpt|chatgpt|mcp)\b/.test(t) && !/\b(uses? (ai|gpt|claude|an llm)|summar\w*|generat\w*|chatbots?|agents? that)\b/.test(t)) { for (const k of ['agent', 'aiapp', 'persona', 'rag', 'mcp']) { const i = keys.indexOf(k); if (i >= 0) keys.splice(i, 1); } if (!keys.includes('web')) keys.unshift('web'); }
  // "a go web server that shortens urls" / "a rust web api for my todo app": a Go or Rust HTTP backend, not a Next.js app or a cron data fetcher
  if (goRustWeb(t)) { keys.length = 0; keys.push('web'); }
  // "a rust server plugin" / "an oxide plugin that adds kits": a C# plugin for Rust the game (Oxide/uMod or Carbon), planned on its own stack
  if (RUST_GAME_PLUGIN.test(t)) { keys.length = 0; keys.push('web'); }
  // "a raycast extension for my notion tasks" is a Raycast (macOS launcher) extension, not a browser extension or a web app
  if (/\braycast (extensions?|plugins?|commands?|scripts?)\b|\bextensions? for raycast\b|\bfor raycast\b/.test(t)) { for (const k of ['extension', 'web', 'mobile', 'cli', 'data']) { const i = keys.indexOf(k); if (i >= 0) keys.splice(i, 1); } keys.unshift('extension'); }
  // "a figma plugin that exports colors as tailwind config" is a Figma plugin, not a web app or a browser extension
  if (FIGMA.test(t)) { for (const k of ['extension', 'web', 'mobile', 'cli', 'data', 'aiapp', 'agent']) { const i = keys.indexOf(k); if (i >= 0) keys.splice(i, 1); } keys.unshift('extension'); }
  // "a mobile app that shows which twitch streamers are live": an app about Twitch, not a Twitch chat bot
  if (keys[0] === 'bot' && /\btwitch\b/.test(t) && !/\b(bots?|chatbot|discord|slack|telegram|chat|commands?|overlay)\b/.test(t) && /\b(streamers?|channels?|streams?)\b/.test(t) && /\b(live|online)\b/.test(t) && /\b(apps?|website|site|page|dashboard|ios|iphone|android)\b/.test(t)) { const m = keys.includes('mobile') || /\b(mobile|ios|iphone|android)\b/.test(t) ? 'mobile' : 'web'; keys.length = 0; keys.push(m); }
  // "a discord bot that posts when my favorite streamer goes live": a chat bot fed by Twitch, one type
  if (keys[0] === 'bot' && streamLiveBot(t)) { keys.length = 0; keys.push('bot'); }
  // "a steam bot that tracks game prices": a price-alert bot, not a web app + bot
  if (keys.includes('bot') && /\bbots?\b/.test(t) && steamPrice(t)) { keys.length = 0; keys.push('bot'); }
  return keys.length ? keys.slice(0, 2) : ['web'];
}

const ACRO = { html: 'HTML', gif: 'GIF', gifs: 'GIFs', dnd: 'D&D', ttrpg: 'TTRPG', ttrpgs: 'TTRPGs', tui: 'TUI', ai: 'AI', rag: 'RAG', mcp: 'MCP', cli: 'CLI', pdfs: 'PDFs', obsidian: 'Obsidian', saas: 'SaaS', claude: 'Claude', cursor: 'Cursor', vscode: 'VS Code', turnbased: 'Turn-Based', api: 'API', llm: 'LLM', gpt: 'GPT', ios: 'iOS', iphone: 'iPhone', mvp: 'MVP', rpg: 'RPG', ui: 'UI', '2d': '2D', '3d': '3D', npc: 'NPC', mmo: 'MMO', fps: 'FPS', pc: 'PC', vr: 'VR', ar: 'AR', youtube: 'YouTube', github: 'GitHub', tiktok: 'TikTok', gpu: 'GPU', cpu: 'CPU', pdf: 'PDF', seo: 'SEO', sql: 'SQL', npcs: 'NPCs', unity: 'Unity', godot: 'Godot', unreal: 'Unreal', ue5: 'UE5', obby: 'Obby', threejs: 'Three.js', webgl: 'WebGL', discord: 'Discord', telegram: 'Telegram', slack: 'Slack', twitter: 'Twitter', reddit: 'Reddit', steam: 'Steam', chrome: 'Chrome', android: 'Android', notion: 'Notion', spotify: 'Spotify', twitch: 'Twitch', minecraft: 'Minecraft', roblox: 'Roblox', xbox: 'Xbox', playstation: 'PlayStation', openai: 'OpenAI', chatgpt: 'ChatGPT', nextjs: 'Next.js', obs: 'OBS', csv: 'CSV', json: 'JSON', npx: 'npx', woocommerce: 'WooCommerce', ollama: 'Ollama', todoist: 'Todoist', raycast: 'Raycast', figma: 'Figma', figjam: 'FigJam', tailwind: 'Tailwind', pico8: 'PICO-8', jira: 'Jira', heic: 'HEIC', jpg: 'JPG', png: 'PNG', url: 'URL', urls: 'URLs', pr: 'PR', prs: 'PRs', rust: 'Rust', golang: 'Go', linkedin: 'LinkedIn', whatsapp: 'WhatsApp', gitlab: 'GitLab', elo: 'Elo', sqlite: 'SQLite', dns: 'DNS', ssl: 'SSL', tls: 'TLS', http: 'HTTP', https: 'HTTPS', javascript: 'JavaScript', typescript: 'TypeScript' };
// app names that are also common words ("linear", "stripe"): only treated as brands when naming an MCP server, so "a linear progression game" keeps its lowercase word
const MCP_BRANDS = { linear: 'Linear', gitlab: 'GitLab', asana: 'Asana', trello: 'Trello', stripe: 'Stripe', shopify: 'Shopify', gmail: 'Gmail', postgres: 'Postgres', postgresql: 'PostgreSQL', supabase: 'Supabase', airtable: 'Airtable', sentry: 'Sentry', vercel: 'Vercel', cloudflare: 'Cloudflare', zotero: 'Zotero', hubspot: 'HubSpot', salesforce: 'Salesforce', confluence: 'Confluence', clickup: 'ClickUp', plex: 'Plex', jellyfin: 'Jellyfin', kubernetes: 'Kubernetes', docker: 'Docker', mongodb: 'MongoDB', redis: 'Redis', anki: 'Anki', readwise: 'Readwise', strava: 'Strava', zendesk: 'Zendesk', intercom: 'Intercom', calendly: 'Calendly', dropbox: 'Dropbox', bluesky: 'Bluesky', mastodon: 'Mastodon', grafana: 'Grafana', datadog: 'Datadog', posthog: 'PostHog', mailchimp: 'Mailchimp', quickbooks: 'QuickBooks', ynab: 'YNAB', basecamp: 'Basecamp', miro: 'Miro', excalidraw: 'Excalidraw', logseq: 'Logseq', raindrop: 'Raindrop', instapaper: 'Instapaper' };
// "a discord bot that posts when my favorite streamer goes live" / "... alerts my server when i go live on twitch": live alerts from the Twitch API
function streamLiveBot(t) { return /\b(discord|slack|telegram|guilded)\b/.test(t) && /\b(go|goes|going|went|is|are|gets?) live\b|\blive (alerts?|notifications?|pings?|announcements?)\b|\bstream (alerts?|notifications?)\b/.test(t) && /\b(streamers?|twitch|streams?|streaming|i go|i'm)\b/.test(t) && !(/\b(youtube|kick)\b/.test(t) && !/\btwitch\b/.test(t)) && !/\b(overlay|obs)\b/.test(t); }
// "a steam bot that tracks game prices" / "a website that tracks steam game prices": Steam store prices (and IsThereAnyDeal), not a generic scraper
function steamPrice(t) { return /\bsteam\b/.test(t) && /\b(prices?|sales?|deals?|discounts?|on sale)\b/.test(t) && /\b(track\w*|alerts?|notif\w*|watch\w*|tells?|pings?|posts?|checks?|monitors?|drops?|wishlist|price tracker)\b/.test(t) && !/\b(skins?|items?|market|cs2|csgo|tf2|trading|inventory|stocks?|crypto)\b/.test(t); }
function titleCase(s) { return s.split(' ').map(w => ACRO[w] || (/'s$/.test(w) && ACRO[w.slice(0, -2)] ? ACRO[w.slice(0, -2)] + "'s" : w.replace(/(^|[^a-z0-9'])([a-z0-9])/g, (m, a, c) => a + c.toUpperCase()))).join(' '); }
function hasWord(text, k) { return new RegExp('(^|[^a-z0-9])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])').test(text); }
function lbl(l) { return l.toLowerCase().replace(/\bai\b/g, 'AI').replace(/\bapi\b/g, 'API').replace(/\bmcp\b/g, 'MCP').replace(/\bvs code\b/g, 'VS Code').replace(/\bminecraft\b/g, 'Minecraft').replace(/\bcli\b/g, 'CLI').replace(/\brag\b/g, 'RAG').replace(/\bfigma\b/g, 'Figma').replace(/\bgo\b/g, 'Go').replace(/\brust\b/g, 'Rust'); }
function article(w) { if (/^RAG\b/.test(w)) return 'a'; if (/^[A-Z]{2,}/.test(w)) return /^[AEFHILMNORSX]/.test(w) ? 'an' : 'a'; return /^[aeiou]/i.test(w) ? 'an' : 'a'; }

const FILLER = new Set('helps help lets let allows allow can will you your which who where when using use uses via from into just some every all also really like new built made so tells shows gives are was were has have get gets play plays playing style'.split(' '));
const KIND = new Set('cli bot tool extension plugin agent website site webapp saas platform thing chrome browser discord telegram slack mobile ios android iphone web'.split(' '));
const VERB = { track: 'Tracker', tracks: 'Tracker', summarize: 'Summarizer', summarizes: 'Summarizer', review: 'Reviewer', reviews: 'Reviewer', pick: 'Picker', picks: 'Picker', find: 'Finder', finds: 'Finder', recommend: 'Recommender', recommends: 'Recommender', suggest: 'Suggester', suggests: 'Suggester', plan: 'Planner', plans: 'Planner', generate: 'Generator', generates: 'Generator', monitor: 'Monitor', monitors: 'Monitor', alert: 'Alerts', alerts: 'Alerts', organize: 'Organizer', organizes: 'Organizer', schedule: 'Scheduler', schedules: 'Scheduler', compare: 'Comparer', compares: 'Comparer', translate: 'Translator', translates: 'Translator', scrape: 'Scraper', scrapes: 'Scraper', log: 'Logger', logs: 'Logger', remind: 'Reminder', reminds: 'Reminder', count: 'Counter', counts: 'Counter', rate: 'Rater', rates: 'Rater', write: 'Writer', writes: 'Writer', build: 'Builder', builds: 'Builder', create: 'Creator', creates: 'Creator', explain: 'Explainer', explains: 'Explainer', analyze: 'Analyzer', analyzes: 'Analyzer', post: 'Poster', posts: 'Poster', send: 'Sender', sends: 'Sender', watch: 'Watcher', watches: 'Watcher', run: 'Runner', runs: 'Runner', show: 'Viewer', shows: 'Viewer', turn: 'Converter', turns: 'Converter', block: 'Blocker', blocks: 'Blocker', book: 'Booker', books: 'Booker', teach: 'Tutor', teaches: 'Tutor', convert: 'Converter', converts: 'Converter', rename: 'Renamer', renames: 'Renamer', hide: 'Hider', hides: 'Hider', triage: 'Triager', triages: 'Triager', scaffold: 'Scaffolder', scaffolds: 'Scaffolder', check: 'Checker', checks: 'Checker', identify: 'Identifier', identifies: 'Identifier', recognize: 'Identifier', recognizes: 'Identifier', scan: 'Scanner', scans: 'Scanner', roast: 'Roaster', roasts: 'Roaster', grade: 'Grader', grades: 'Grader', rank: 'Ranker', ranks: 'Ranker', estimate: 'Estimator', estimates: 'Estimator', calculate: 'Calculator', calculates: 'Calculator', transcribe: 'Transcriber', transcribes: 'Transcriber', clean: 'Cleaner', cleans: 'Cleaner', cleanup: 'Cleaner', delete: 'Deleter', deletes: 'Deleter', remove: 'Remover', removes: 'Remover', backs: 'Backup', mutes: 'Muter', downloads: 'Downloader', exports: 'Exporter', resizes: 'Resizer', pings: 'Pinger', rotates: 'Rotator', collects: 'Collector', splits: 'Splitter', rolls: 'Roller', tails: 'Tailer', shorten: 'Shortener', shortens: 'Shortener', lists: 'List', bump: 'Bumper', bumps: 'Bumper', sort: 'Sorter', sorts: 'Sorter' };
const BREAK = /^(to|for|with|on|in|at|by|and|or|when|so|from|using|via|while|before|after|based|over|where|as|that|which|who|if|like|into|about|across|between|during|without|per|than|against)$/;

// "a discord bot that tracks my friends game wins" -> "Friends Game Wins Tracker" (falls back to the first 3 meaningful words)
function projectName(idea) {
  // "a meal planner that uses ai to suggest recipes" -> "AI Meal Planner": the thing comes before "that uses ai", the verb after it is a feature
  const um = idea.toLowerCase().match(/^(?:an?|my)\s+([a-z0-9 -]+?)\s+(?:that|which)\s+uses?\s+(?:ai|gpt|an llm|llms?|claude|chatgpt|openai)\s+to\b/);
  if (um) { const hw = um[1].split(/\s+/).filter(w => !STOP.has(w) && !FILLER.has(w)); if (hw.length >= 2 && hw.length <= 3 && !/^(app|tool|thing|website|site|webapp|cli|bot|extension|plugin)$/.test(hw[0])) return 'AI ' + titleCase(hw.join(' ')); }
  // "a mobile app that uses ai to identify plants" -> "AI Plant Identifier": no thing named before "that uses ai", so name it after the AI feature
  const aiFeat = !!um;
  const all = idea.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/^\s*(?:an?\s+)?(?:website|site|web app|webapp|page|app)\s+that(?:'s|\s+is)\s+(?:an?\s+)?(?=[a-z])/, '').replace(/\bd&d\b/g, 'dnd').replace(/\b(?:rust|golang|go)\s+(?=(?:cli|tui|command|terminal|script|program|binary|tool)\b)/g, '').replace(/\b(it|that|there|what|here|he|she|let|who)'s\b/g, '$1').replace(/\b(\w+)'(re|ll|ve|d|m)\b/g, '$1').replace(/\b(my|our|your|their|his|her)\s+(clan|guild|team|company|server|squad|crew|group|class|org|community|channel|discord|work|office|club|league)'s\b/g, '$1').replace(/\b([a-z0-9]+)'s\b/g, '$1\u0001s').replace(/\bpico[- ]8\b/g, 'pico8').replace(/\bthree\.js\b/g, 'threejs').replace(/\bnext\.?js\b/g, 'nextjs').replace(/\bunreal engine( \d)?\b/g, 'unreal').replace(/\bturn[- ]based\b/g, 'turnbased').replace(/\bvs ?code\b|\bvisual studio code\b/g, 'vscode').replace(/[^a-z0-9\s\u0001]/g, ' ').replace(/\u0001(?!s\b)/g, ' ').split(/\s+/).filter(Boolean).map(w => w.replace(/\u0001/g, "'"));
  // "an ai that names my d&d characters" -> "D&D Character Name Generator"
  const nm = all.join(' ').match(/^(?:an?|my)? ?(?:[a-z0-9]+ )?(?:ai|bot|tool|app|website|site|generator|thing|gpt|llm)(?: \w+)?? (?:that|which|to) names? (?:my|our|your|the|new)? ?((?:[a-z0-9']+ ){0,2}?[a-z0-9']+?)(?: (?:for|in|from|based|with|by|using)\b.*)?$/);
  if (nm) { const w = nm[1].split(' ').filter(x => !STOP.has(x) && !FILLER.has(x)); if (w.length && w.length <= 3) { const l = w.length - 1; if (!/(ss|us|is)$/.test(w[l])) w[l] = w[l].replace(/ies$/, 'y').replace(/([^s])s$/, '$1'); return titleCase(w.join(' ')) + ' Name Generator'; } }
  // "a directory of ai tools" / "a list of free game assets" -> "AI Tools Directory"
  const coll = all.join(' ').match(/^(?:an?|my|the)? ?(directory|list|catalog|catalogue|collection|database|gallery|showcase|archive|map|wiki|library|aggregator) (?:of|for) (?:the |all |top |best |cool |useful )*((?:[a-z0-9']+ ){0,2}[a-z0-9']+?)(?: (?:that|which|with|for|in|from|where|by|so|to)\b.*)?$/);
  if (coll) { const w = coll[2].split(' ').filter(x => !STOP.has(x) && !FILLER.has(x)); if (w.length && w.length <= 3) return titleCase(w.join(' ') + ' ' + coll[1].replace('catalogue', 'catalog')); }
  // a base-form verb word used as a noun ("a workout log for my phone", "a meal plan app") is part of the name, not the action
  const nounUse = i => !/s$/.test(all[i]) && i > 0 && !STOP.has(all[i - 1]) && !FILLER.has(all[i - 1]) && !BREAK.test(all[i - 1]) && !/^(i|we|you|they|people|users|gamers|players|can|will|to)$/.test(all[i - 1]) && (i === all.length - 1 || BREAK.test(all[i + 1]) || KIND.has(all[i + 1]) || all[i + 1] === 'app' || /^(generator|maker|builder|creator|planner|tracker|writer)$/.test(all[i + 1]));
  // newer verbs name tools ("pings my servers"), not games ("a game where a wizard rotates the world")
  const gameIdea = /\b(game|platformer|roguelike|roguelite|metroidvania|rpg|shooter|sim|simulator|visual novel)\b/.test(all.join(' '));
  const vi = all.findIndex((w, i) => VERB[w] && i > 0 && !nounUse(i) && !(w === 'rolls' && /^(back|out|over|up)$/.test(all[i + 1] || '')) && !(w === 'books' && /^(sort|sorts|sorting|read|reads|reading|shelve|shelves|shelving|stack|stacks|stacking|organize|organizes|organizing|return|returns|returning|stamp|stamps|collect|collects|collecting|my|our|your|the|old|rare|library|comic|picture)$/.test(all[i - 1] || '')) && !(/^(pings|rotates|collects|splits|rolls|tails|sorts?)$/.test(w) && (gameIdea || !(/^(that|which|who|it|and)$/.test(all[i - 1]) || (w === 'sort' && all[i - 1] === 'to')))));
  if (vi > 0) {
    // "tracks how much I spend on Claude Code each day" -> "Claude Code Spend Tracker"
    const rest = all.slice(vi + 1);
    if (rest[0] === 'how' && /^(much|many|long)$/.test(rest[1]) && rest.indexOf('on') > 1) {
      const tgt = [];
      for (const w of rest.slice(rest.indexOf('on') + 1)) {
        if (BREAK.test(w) || /^(each|every|per|day|daily|week|weekly|month|monthly|today)$/.test(w)) break;
        if (STOP.has(w) || FILLER.has(w)) continue;
        tgt.push(w); if (tgt.length === 2) break;
      }
      const noun = rest.includes('time') || rest[1] === 'long' ? 'Time' : rest.some(w => /^(spend|spent|spending|pay|paid|cost|costs|money)$/.test(w)) ? 'Spend' : '';
      if (tgt.length) return titleCase(tgt.join(' ')) + (noun ? ' ' + noun : '') + ' ' + VERB[all[vi]];
    }
    const obj = [];
    let oi = vi + 1, last = -1, first = -1;
    while (/^(up|out|off|away|down)$/.test(all[oi] || '')) oi++; // "cleans up my downloads" -> skip "up"
    for (let j = oi; j < all.length; j++) {
      const w = all[j];
      if (BREAK.test(w)) { if (obj.length) break; else continue; }
      if (STOP.has(w) || FILLER.has(w) || KIND.has(w)) continue;
      obj.push(w); last = j; if (first < 0) first = j;
      if (obj.length === 3) break;
    }
    // "uses whisper to transcribe and summarize": the object is another verb, not a thing to name the project after
    if (obj.every(w => VERB[w]) && !(obj.length === 1 && first > 0 && /^(my|our|your|the|all)$/.test(all[first - 1]) && /s$/.test(obj[0])) && !(/^(Scheduler|Writer|Generator|Planner|Sender|Organizer|Summarizer)$/.test(VERB[all[vi]]) && obj.length === 1 && /^(posts|logs|alerts|reviews|lists|plans|books)$/.test(obj[0]))) obj.length = 0;
    // "writes my dungeon master session recaps" -> "Session Recap Writer": a long noun phrase keeps its last two words (the head noun and one modifier)
    if (obj.length === 3 && /^(Writer|Generator|Summarizer)$/.test(VERB[all[vi]]) && last >= 0 && all[last + 1] && !BREAK.test(all[last + 1]) && !STOP.has(all[last + 1]) && !FILLER.has(all[last + 1]) && !KIND.has(all[last + 1]) && !VERB[all[last + 1]]) { obj.splice(0, 3, obj[2], all[last + 1]); last++; }
    // "writes my blog posts" -> "Blog Post Writer", "writes cover letters" -> "Cover Letter Writer"
    if (obj.length && /^(Writer|Scheduler)$/.test(VERB[all[vi]]) && /[^s]s$/.test(obj[obj.length - 1]) && !/(us|is)$/.test(obj[obj.length - 1]) && !/^(lyrics|news|minutes|docs|notes|series|status|thanks|terms|stats|specs|ads|dms|prs|faqs|rules)$/.test(obj[obj.length - 1])) obj[obj.length - 1] = obj[obj.length - 1].replace(/ies$/, 'y').replace(/s$/, '');
    // "schedules posts on twitter" -> "Twitter Post Scheduler"; "schedules tweets" -> "Tweet Scheduler"
    if (obj.length === 1 && /^(Scheduler|Poster)$/.test(VERB[all[vi]]) && /^(posts?|tweets?|threads?|reels?|videos?|stories)$/.test(obj[0])) { const pf = all.slice(last + 1).find(w => /^(twitter|x|instagram|linkedin|bluesky|threads|mastodon|facebook|tiktok|reddit|youtube|pinterest)$/.test(w)); obj[0] = obj[0].replace(/ies$/, 'y').replace(/s$/, ''); if (pf && obj[0] !== 'tweet') obj.unshift(pf === 'x' ? 'X' : pf); }
    // "reminds my family about birthdays" -> "Family Birthday Reminder"
    if (obj.length === 1 && VERB[all[vi]] === 'Reminder' && /^(about|of)$/.test(all[last + 1] || '') && all[last + 2] && !BREAK.test(all[last + 2]) && !STOP.has(all[last + 2]) && !FILLER.has(all[last + 2]) && !/^(it|this|that|things?|stuff)$/.test(all[last + 2])) { const ab = [all[last + 2]]; const n3 = all[last + 3]; if (n3 && !BREAK.test(n3) && !STOP.has(n3) && !FILLER.has(n3) && !KIND.has(n3) && (!VERB[n3] || !all[last + 4] || BREAK.test(all[last + 4])) && !/^(every|each|daily|weekly|today|tomorrow|tonight|morning|night|week|day)$/.test(n3)) ab.push(n3); ab[ab.length - 1] = ab[ab.length - 1].replace(/ies$/, 'y').replace(/([^s])s$/, '$1'); obj.push(...ab); }
    if (obj.length === 1 && VERB[all[vi]] === 'Reminder' && /^(team|group|clan|guild|channel|squad|crew|class|staff|employees|coworkers|colleagues|family|friends|roommates|housemates|kids|students|members|everyone|users|server)$/.test(obj[0]) && all[last + 1] === 'to' && all[last + 2]) {
      const tv = []; let k = last + 3;
      while (/^(out|up|in|on|off|their|our|his|her|its|the|a|an|my|your)$/.test(all[k] || '')) k++;
      for (; k < all.length; k++) { const w = all[k]; if (BREAK.test(w) || /^(every|each|daily|weekly|today|tomorrow|tonight|before|by|their|our)$/.test(w)) { if (tv.length) break; else continue; } if (STOP.has(w) || FILLER.has(w) || KIND.has(w)) continue; tv.push(w); if (tv.length === 2) break; }
      if (tv.length) { const l = tv.length - 1; if (!/(ss|us|is)$/.test(tv[l])) tv[l] = tv[l].replace(/ies$/, 'y').replace(/([^s])s$/, '$1'); if (/^(vote|review|check|update|backup|stretch|workout|call)$/.test(all[last + 2])) tv.push(all[last + 2]); obj.splice(0, 1, ...tv); }
    }
    if (obj.length && aiFeat) { const last = obj.length - 1; if (!/(ss|us|is)$/.test(obj[last])) obj[last] = obj[last].replace(/(calor|zomb|cook|mov|self|smooth|goal|pix|brown)ies$/, '$1ie').replace(/ies$/, 'y').replace(/([^s])s$/, '$1'); return 'AI ' + titleCase(obj.join(' ')) + ' ' + VERB[all[vi]]; }
    // "turns my git log into a changelog" -> "Changelog Generator"; "converts markdown to html" -> "Markdown to HTML Converter"
    if (obj.length && obj.length <= 2 && VERB[all[vi]] === 'Converter' && (all[last + 1] === 'into' || (all[last + 1] === 'to' && /^converts?$/.test(all[vi])))) {
      const tg = [];
      for (const w of all.slice(last + 2)) { if (BREAK.test(w)) { if (tg.length) break; else continue; } if (STOP.has(w) || FILLER.has(w) || KIND.has(w)) continue; tg.push(w); if (tg.length === 2) break; }
      if (tg.length) {
        const GEN = /^(changelogs?|release notes|flashcards?|quiz|quizzes|summary|summaries|podcasts?|threads?|newsletters?|playlists?|slides|presentations?|blog posts?|memes?|stickers?|wallpapers?)$/;
        if (GEN.test(tg.join(' '))) return titleCase(tg.join(' ').replace(/^(flashcard|podcast|thread|newsletter|playlist|presentation|meme|sticker|wallpaper|changelog)s$/, '$1').replace(/^(blog post)s$/, '$1').replace(/^quizzes$/, 'quiz').replace(/^summaries$/, 'summary')) + ' Generator';
        return titleCase(obj.join(' ')) + ' to ' + titleCase(tg.join(' ')) + ' Converter';
      }
    }
    // "shows price per ounce on amazon" -> "Price per Ounce Calculator"
    if (obj.length && obj.length < 3 && all[last + 1] === 'per' && /^(ounce|oz|pound|lb|gram|kg|kilo|liter|litre|unit|serving|item|load|mile|gallon|sheet|roll|count|square foot|sq)$/.test(all[last + 2] || '')) return titleCase(obj.join(' ')) + ' per ' + titleCase(all[last + 2]) + (VERB[all[vi]] === 'Viewer' ? ' Calculator' : ' ' + VERB[all[vi]]);
    // "tracks my dog's walks" -> "Dog Walk Tracker" (not "Dog's Walks Tracker")
    if (obj.length === 2 && /'s$/.test(obj[0]) && /[^s]s$/.test(obj[1]) && !/(ss|us|is)$/.test(obj[1])) { obj[0] = obj[0].slice(0, -2); obj[1] = obj[1].replace(/ies$/, 'y').replace(/s$/, ''); }
    // "renames my photos by date" -> "Photo Date Renamer", "downloads youtube transcripts" -> "YouTube Transcript Downloader"
    if (obj.length && /^(Renamer|Downloader|Resizer|Identifier|Scanner|Shortener|Sorter|Booker|Splitter)$/.test(VERB[all[vi]])) {
      const last = obj.length - 1;
      if (!/(ss|us|is)$|^downloads$/.test(obj[last])) obj[last] = obj[last].replace(/ies$/, 'y').replace(/([^s])s$/, '$1');
      const bi = all.indexOf('by', vi);
      if (VERB[all[vi]] === 'Renamer' && bi > vi && all[bi + 1] && /^(date|name|size|type|time|month|year|artist|album|title|camera|location)$/.test(all[bi + 1]) && obj.length < 3) obj.push(all[bi + 1]);
    }
    // "tracks crypto prices" -> "Crypto Price Tracker", "checks ssl certificates" -> "SSL Certificate Checker"
    if (obj.length && /^(Tracker|Checker|Monitor|Alerts|Watcher)$/.test(VERB[all[vi]]) && /^(prices|ranks|certificates|certs|links|domains)$/.test(obj[obj.length - 1])) obj[obj.length - 1] = obj[obj.length - 1].replace(/s$/, '');
    // "finds cheap flights" -> "Cheap Flight Finder", "finds recipes" -> "Recipe Finder"
    if (obj.length && VERB[all[vi]] === 'Finder' && /^(flights|recipes|jobs|deals|links|hotels|apartments|games|movies|books|restaurants|events|gigs|houses|cars|bugs|typos|coupons|internships|roommates|friends|teammates|players|podcasts|songs|tracks|shows|places|campsites|tickets)$/.test(obj[obj.length - 1])) obj[obj.length - 1] = obj[obj.length - 1].replace(/s$/, '');
    if (obj.length) return titleCase(obj.join(' ')) + ' ' + VERB[all[vi]];
  }
  const words = [];
  let stopAt = all.length;
  for (const [i, w] of all.entries()) {
    if (BREAK.test(w)) { if (words.length) { stopAt = i; break; } else continue; }
    if (STOP.has(w) || FILLER.has(w)) continue;
    if (KIND.has(w) && words.length >= 2) continue; // "youtube summarizer chrome extension" -> "YouTube Summarizer"
    words.push(w);
    if (words.length === 3) { const nx = all[i + 1]; if (nx && /^(generator|maker|builder|scheduler|tracker|planner|finder|picker|timer|counter|calculator|converter|randomizer|roller|leaderboard|bot|checker)$/.test(nx) && !words.includes(nx)) words.push(nx); break; }
  }
  // a lone generic word ("a game where you...", "a vr app for meditation") reads badly; prefix what comes after the break
  if (words.length === 2 && /^(threejs|unity|godot|phaser|roblox|unreal|pico8|browser|web|online|simple|small|tiny|little|fun|mobile|cozy|cosy|relaxing|chill|casual)$/.test(words[0]) && words[1] === 'game' && stopAt < all.length) words.shift();
  // "a unity vr game where you paint graffiti" -> "Graffiti Painting VR Game"
  let dimMod = '';
  if (words.length === 3 && /^(threejs|unity|godot|phaser|roblox|unreal|browser|web|mobile)$/.test(words[0]) && /^(vr|ar|3d|2d)$/.test(words[1]) && words[2] === 'game' && BREAK.test(all[all.indexOf('game') + 1] || '')) { stopAt = all.indexOf('game') + 1; dimMod = words[1]; words.splice(0, 2); }
  // "a godot puzzle game about light and mirrors" -> "Light and Mirrors Puzzle Game" (engine + genre alone says nothing about this game)
  const egi = all.indexOf('game');
  // "a horror game about a haunted school" / "a godot horror game set in an abandoned hospital" -> "Haunted School Horror Game" / "Abandoned Hospital Horror Game"
  const ENG_RE = /^(unity|godot|phaser|roblox|unreal|pico8|threejs)$/, GENRE_RE = /^(puzzle|horror|stealth|rhythm|physics|survival|strategy|card|word|racing|fighting|adventure|action|mystery|detective|cooking|fishing)$/;
  if (words.length === 3 && !ENG_RE.test(words[0]) && GENRE_RE.test(words[0]) && words[1] === 'game' && words[2] === 'set' && all[egi + 2] === 'in') words.pop();
  const setIn = egi > 0 && (all[egi + 1] === 'set' && /^(in|inside|on|aboard)$/.test(all[egi + 2] || '') ? 3 : /^(in|inside|aboard)$/.test(all[egi + 1] || '') ? 2 : 0);
  const gw = words.length === 3 && ENG_RE.test(words[0]) ? words.slice(1) : words.length === 2 && /^(horror|puzzle|stealth|mystery|detective)$/.test(words[0]) ? words : null;
  if (gw && GENRE_RE.test(gw[0]) && gw[1] === 'game' && egi > 0 && (/^(about|with|featuring|starring)$/.test(all[egi + 1] || '') && (words.length === 3 || all[egi + 1] === 'about') || setIn) && !(setIn && /^(vr|ar|3d|2d|mobile|browser|web|phones?|pc|steam|first|third|unity|godot|unreal|roblox|phaser|javascript|typescript|python|lua|c|gdscript|pixel|real|one|a|my|the)$/.test((all.slice(egi + setIn).find(w => !/^(an?|the)$/.test(w))) || '') && !/^(an?|the)$/.test(all[egi + setIn] || 'x'))) {
    const th = []; let and = false;
    for (const w of all.slice(egi + (setIn || 2))) { if (w === 'and' && th.length === 1 && !and) { and = true; continue; } if (BREAK.test(w) || /^(where|that|which|who|when|while)$/.test(w)) { if (th.length) break; else continue; } if (STOP.has(w) || FILLER.has(w) || KIND.has(w) || /^(you|player|players)$/.test(w)) continue; th.push(w); if (th.length === 2) break; }
    if (th.length === 1 && !/(ss|us|is)$|^(woods|backrooms|ruins|depths|outskirts|wilds|badlands)$/.test(th[0])) th[0] = th[0].replace(/(sh|ch|x)es$/, '$1').replace(/ies$/, 'y').replace(/([^s])s$/, '$1');
    if (th.length) return titleCase(th.join(and && th.length === 2 ? ' and ' : ' ') + ' ' + gw[0] + ' game').replace(/ And /, ' and ');
  }
  // "a godot platformer about a snail with a jetpack" -> "Snail Jetpack Platformer" (engine + genre alone says nothing about this game)
  if (words.length === 2 && /^(unity|godot|phaser|roblox|unreal|pico8|threejs)$/.test(words[0]) && /^(platformer|roguelike|roguelite|metroidvania|shooter|rpg|puzzler|deckbuilder|racer|runner|brawler|beat em up|soulslike|obby)$/.test(words[1]) && /^(about|where|with|starring|featuring|of)$/.test(all[stopAt] || '')) {
    const th = [];
    // "a roblox obby about escaping a haunted school" -> "Haunted School Escape Obby" (the action goes after the place)
    const GER = { escaping: 'escape', surviving: 'survival', climbing: 'climb', racing: 'race', running: 'run', jumping: 'jump', parkouring: 'parkour', hiding: 'hide and seek' };
    let ger = '';
    for (const w of all.slice(stopAt + 1)) { if (/^(where|that|which|who|when|while|to|for|in|on|at|and|or|but)$/.test(w) && th.length) break; if (BREAK.test(w) || STOP.has(w) || FILLER.has(w) || KIND.has(w) || /^(you|player|players)$/.test(w)) continue; if (GER[w] && !th.length && !ger) { ger = GER[w]; continue; } th.push(w); if (th.length === 2) break; }
    if (th.length) return titleCase(th.join(' ') + (ger ? ' ' + ger : '') + ' ' + words[1]);
  }
  // "an MCP server that reads my Notion roadmap" -> "Notion MCP Server"
  if (words.join(' ') === 'mcp server' && stopAt < all.length) { const rest = all.slice(stopAt); const brand = rest.find(w => ACRO[w] && !/^(ai|mcp|api|llm|gpt|claude|cursor|vscode|cli|ui|mvp|dns|ssl|tls|http|https)$/.test(w)); if (brand) return titleCase(brand + ' mcp server'); const hi = rest.join(' ').indexOf('home assistant'); if (hi >= 0) return 'Home Assistant MCP Server'; const cb = rest.find(w => MCP_BRANDS[w]); if (cb) return MCP_BRANDS[cb] + ' MCP Server'; }
  // "a tower defense game with zombies" -> "Zombie Tower Defense"
  if (/^tower defen[cs]e game$/.test(words.join(' ')) && /^(with|where|against|of|about|featuring)$/.test(all[all.indexOf('game') + 1] || '')) { const th = []; for (const w of all.slice(all.indexOf('game') + 2)) { if (BREAK.test(w) || /^(attack|invade|come|try|want)\w*$/.test(w)) break; if (!STOP.has(w) && !FILLER.has(w) && !KIND.has(w) && !/^(enem(y|ies)|waves?|towers?|levels?)$/.test(w)) th.push(w); } const theme = th[th.length - 1]; if (theme) return titleCase(theme.replace(/(zomb|cook|pix|goal)ies$/, '$1ie').replace(/ies$/, 'y').replace(/([^s])s$/, '$1') + ' ' + words.slice(0, 2).join(' ')); }
  if (words.length === 1 && stopAt < all.length) {
    const more = [];
    for (const w of all.slice(stopAt + 1)) {
      // "a pico-8 game about a cat that collects fish" -> "Cat Collects Fish Game" (not "Cat Game")
      if (/^(that|who|which)$/.test(w) && more.length === 1) continue;
      if (!more.length && /^(managing|organizing|organising|tracking|browsing|viewing|controlling|keeping)$/.test(w)) continue; // "a rust tui for managing my todo list" -> "Todo List TUI"
      if (BREAK.test(w)) { if (more.length) break; else continue; }
      if (STOP.has(w) || FILLER.has(w) || KIND.has(w) || w === words[0]) continue;
      more.push(w);
      if (more.length === 3) break;
    }
    const GERUND = { paint: 'painting', build: 'building', cook: 'cooking', grow: 'growing', draw: 'drawing', explore: 'exploring', fix: 'fixing', catch: 'catching', fly: 'flying', drive: 'driving', sculpt: 'sculpting', spray: 'spraying', dig: 'digging', mine: 'mining', fish: 'fishing', bake: 'baking', brew: 'brewing', tame: 'taming', sort: 'sorting', stack: 'stacking' };
    const NOUNV = { repair: 'repair', restore: 'restoration', deliver: 'delivery', rescue: 'rescue', clean: 'cleaning', wash: 'washing', decorate: 'decorating', knit: 'knitting', feed: 'feeding' };
    if (words[0] === 'game' && more.length === 3 && (GERUND[more[0]] || NOUNV[more[0]]) && /^(old|broken|ancient|rare|tiny|little|lost|magic|magical|cute|small|big|giant|wild|stray|abandoned|dusty|vintage|antique|damaged|hungry|sick|injured|dirty|fresh|hot|warm)$/.test(more[1]) && all[stopAt] === 'where' && /^(you|players?)$/.test(all[stopAt + 1] || '') && all[stopAt + 2] === more[0]) more.splice(1, 1);
    if (words[0] === 'game' && more.length === 2 && NOUNV[more[0]] && all[stopAt] === 'where' && /^(you|players?)$/.test(all[stopAt + 1] || '') && all[stopAt + 2] === more[0]) return titleCase((/(ss|us|is)$/.test(more[1]) ? more[1] : more[1].replace(/(zomb|cook|goal)ies$/, '$1ie').replace(/(sh|ch|x)es$/, '$1').replace(/ies$/, 'y').replace(/([^s])s$/, '$1')) + ' ' + NOUNV[more[0]] + (dimMod ? ' ' + dimMod : '') + ' game');
    if (words[0] === 'game' && more.length === 2 && GERUND[more[0]] && all[stopAt] === 'where' && /^(you|players?)$/.test(all[stopAt + 1] || '') && all[stopAt + 2] === more[0]) return titleCase((/(ss|us|is)$/.test(more[1]) ? more[1] : more[1].replace(/(sh|ch|x)es$/, '$1').replace(/ies$/, 'y').replace(/([^s])s$/, '$1')) + ' ' + GERUND[more[0]] + (dimMod ? ' ' + dimMod : '') + ' game');
    if (more.length) return titleCase(more.join(' ') + (dimMod ? ' ' + dimMod : '') + ' ' + words[0]);
  }
  return titleCase(words.join(' ')) || 'My Project';
}

function fixCase(s) { return s.replace(/\bgo (?=(web |http |rest )?(servers?|apis?|backends?|cli|tui|command|program|binary|tool|microservices?)\b)/gi, 'Go ').replace(/\bpico[- ]?8\b/gi, 'PICO-8').replace(/\bthree\.?js\b/g, 'Three.js').replace(/\bnext\.?js\b/gi, 'Next.js').replace(/\bunreal engine\b/gi, 'Unreal Engine').replace(/[A-Za-z0-9]+/g, (w, i, str) => (w === w.toLowerCase() && ACRO[w] && w !== 'ar' && str[i - 1] !== '.') ? ACRO[w] : w); }
function cap(s) { s = s.trim(); return /^[a-z][A-Z]/.test(s) ? s : s.charAt(0).toUpperCase() + s.slice(1); }

function generate(idea) {
  idea = String(idea || '').trim().slice(0, 600);
  if (idea.length < 4 || !/[a-z0-9]{2,}/i.test(idea)) throw new Error('Tell me a bit more about your idea (at least a few words).');
  const keys = detectTypes(idea);
  let primary = keys[0] === 'extension' && VSCODE.test(idea.toLowerCase()) ? { ...TYPES.extension, label: 'VS Code Extension' } : keys[0] === 'extension' && RAYCAST.test(idea.toLowerCase()) ? { ...TYPES.extension, label: 'Raycast Extension' } : keys[0] === 'extension' && FIGMA.test(idea.toLowerCase()) ? { ...TYPES.extension, label: 'Figma Plugin' } : TYPES[keys[0]];
  const secondary = keys[1] ? TYPES[keys[1]] : null;
  const lower = idea.toLowerCase();
  let name = projectName(idea);
  // "a minecraft server plugin that adds quests" -> "Minecraft Quests Plugin"
  const mcAdds = keys[0] === 'mcmod' && lower.match(/\b(?:adds?|adding)\s+((?:(?:a|an|the|new|some|custom|more)\s+)*)([a-z0-9]+(?:\s+[a-z0-9]+)?)/);
  if (mcAdds) {
    const obj = mcAdds[2].split(' ').filter(w => !BREAK.test(w) && !STOP.has(w) && !FILLER.has(w) && !/^(to|for|players?)$/.test(w));
    const base = /\bminecraft\b/.test(lower) ? 'minecraft' : (lower.match(/\b(fabric|forge|neoforge|paper|spigot|bukkit)\b/) || ['minecraft'])[0];
    if (obj.length) name = titleCase(base + ' ' + obj.join(' ')) + (/\bmod\b/.test(lower) && !/\bplugin\b/.test(lower) ? ' Mod' : ' Plugin');
  }

  // "a rag chatbot over my obsidian notes" -> "Obsidian Notes Chat"
  const ragSrc = keys[0] === 'rag' && lower.match(new RegExp('\\b(?:over|about|from|on|for|with|across|using|of|in|chat with|talk to|ask)\\s+(?:my|our|your|the|their|a|all)?\\s*((?:[a-z0-9]+\\s+){0,3}' + RAG_DOCS + ')\\b'));
  if (ragSrc) { let w = ragSrc[1].split(/\s+/); const cut = w.map((x, i) => BREAK.test(x) || /^(my|our|your|the|their)$/.test(x) ? i : -1).reduce((m, i) => Math.max(m, i), -1); w = w.slice(cut + 1).filter(x => !/^(a|an|the|all|questions?|answers?|chat|chatbot|bot|ai|any|some)$/.test(x)).slice(-3); if (w.length) name = titleCase(w.join(' ')) + ' Chat'; }

  // "a customer support chatbot for my shopify store" -> "Shopify Store Support Chat"
  const supportFor = keys.includes('rag') && !ragSrc && SUPPORT.test(lower) && lower.match(/\b(?:for|on|of)\s+(?:my|our|a|the)\s+((?:[a-z0-9]+\s+){0,2}?)(store|shop|business|saas|website|site|app|product|restaurant|server|company|startup|clinic|salon|gym|course)\b/);
  if (supportFor) { let w = (supportFor[1].trim() + ' ' + supportFor[2]).trim().split(/\s+/).filter(x => !STOP.has(x) && !FILLER.has(x) && !/^(online|small|little|new)$/.test(x)); if (w.length > 1 && /^(website|site)$/.test(w[w.length - 1])) w.pop(); if (keys[0] === 'bot' && /\bdiscord\b/.test(lower) && w.join(' ') === 'server') w = ['discord', 'server']; if (w.length) name = titleCase(w.join(' ')) + (keys[0] === 'bot' ? ' Support Bot' : ' Support Chat'); }

  // "a chatbot that roleplays as a pirate" -> "Pirate Chatbot"
  const who = keys[0] === 'persona' && lower.match(/\b(?:role ?plays?|pretends? to be|talks?|speaks?|acts?|chats?)\s+(?:as|like)?\s*(?:a|an|my|the)?\s*(?:favou?rite\s+)?([a-z0-9]+(?:\s+[a-z0-9]+)?)/);
  if (who) { const w = who[1].split(' ').filter(x => !BREAK.test(x) && !STOP.has(x) && !FILLER.has(x)); if (w.length) name = titleCase(w.join(' ')) + ' Chatbot'; }

  const engine = keys[0] === 'game' ? gameEngine(lower) : null;
  const vscode = keys[0] === 'extension' && VSCODE.test(lower);
  const raycast = keys[0] === 'extension' && !vscode && RAYCAST.test(lower);
  const figma = keys[0] === 'extension' && !vscode && !raycast && FIGMA.test(lower);
  const fabric = keys[0] === 'mcmod' && /\b(mod|fabric|forge|neoforge|modpack)\b/.test(lower) && !/\b(plugin|paper|spigot|bukkit|server)\b/.test(lower);
  if (fabric) primary = { ...primary, label: 'Minecraft Mod' };
  const stack = (engine ? GAME_ENGINES[engine] : vscode ? VSCODE_STACK : raycast ? RAYCAST_STACK : figma ? FIGMA_STACK : fabric ? MCMOD_FABRIC : primary.stack).map(([tech, why]) => ({ tech, why }));
  if (engine && engine !== 'roblox' && (engine === 'unreal' || /\b(3d|three dimensional|vr|virtual reality)\b|\bthree\.?js\b/.test(lower))) stack.push({ tech: 'Blender + Blender MCP (optional)', why: 'Lets Claude Code or Cursor model and export simple 3D assets for you, so you are not stuck on art.' });
  const botSdk = () => {
    const sdk = /\bwhatsapp\b/.test(lower) ? ['Node.js + WhatsApp Cloud API (Meta) or Twilio for WhatsApp', 'The official ways to message on WhatsApp from code (Twilio has the easiest sandbox); messages you start outside a 24-hour reply window must use a pre-approved template.']
      : /\btelegram\b/.test(lower) ? ['Node.js + grammY (Telegram)', 'Modern, well-documented Telegram bot framework; easy for AI tools to write.']
      : /\bslack\b/.test(lower) ? ['Node.js + Slack Bolt', "Slack's official bot framework, with slash commands and events built in."]
      : /\btwitch\b/.test(lower) ? ['Node.js + tmi.js / Twurple (Twitch)', 'Reads and posts Twitch chat; Twurple also covers the Twitch API.']
      : /\bdiscord\b/.test(lower) ? ['Node.js + discord.js', 'Best docs and examples for Discord bots; easy for AI tools to write.']
      : /\b(twitter|x)\b/.test(lower) ? ['Node.js + twitter-api-v2 (X API)', 'Typed client for posting and reading on X; check the X API plan limits first.'] : null;
    const i = stack.findIndex(s => s.tech.startsWith(TYPES.bot.stack[0][0]));
    if (sdk && i >= 0) stack[i] = { tech: sdk[0], why: sdk[1] + (i > 0 ? ' (for the bot side)' : '') };
  };
  // "a godot game where you run a lighthouse and guide ships" -> "Lighthouse Keeper Game" with a gentle management loop
  const mgmt = keys[0] === 'game' && !NOT_GENTLE.test(lower) && lower.match(MGMT_GAME);
  if (mgmt) name = mgmt[1] === 'lighthouse' ? 'Lighthouse Keeper Game' : titleCase(mgmt[1]) + ' Management Game';
  const cozy = !!mgmt || keys[0] === 'game' && ((COZY.test(lower) && !/\b(flight|racing|driving|space|combat|battle|war|mech) (sim|simulator)\b/.test(lower)) || (GENTLE.test(lower) && !NOT_GENTLE.test(lower)));
  if (secondary) for (const [tech, why] of secondary.stack.slice(0, 2)) if (!stack.find(s => s.tech === tech)) stack.push({ tech, why: why + ' (for the ' + lbl(secondary.label) + ' side)' });
  if (keys[1] === 'rag' && !stack.find(s => s.tech === TYPES.rag.stack[2][0])) stack.push({ tech: TYPES.rag.stack[2][0], why: TYPES.rag.stack[2][1] + ' (for the RAG chatbot side)' });
  botSdk();
  if (keys[0] === 'overlay') {
    if (/\btwitch\b/.test(lower)) stack.push({ tech: 'tmi.js (read-only Twitch chat)', why: 'Reads chat anonymously from the page, so the overlay needs no login or server.' });
    if (/\bspotify\b/.test(lower)) stack.push({ tech: 'Spotify Web API (currently-playing endpoint)', why: 'Shows the song that is playing; needs a one-time Spotify login (PKCE) by the streamer.' });
  }
  if ((/\b(ai|llm|gpt|agent|smart|summar)/.test(lower) || (/\bgenerat/.test(lower) && !/\bprocedural/.test(lower))) && !keys.includes('agent') && !keys.includes('rag') && !keys.includes('persona') && !keys.includes('aiapp') && keys[0] !== 'mcp') stack.push(/\b(identif\w*|recogni[sz]\w*|detects?|scans?|photos?|images?|pictures?|camera)\b/.test(lower) ? { tech: 'A vision-capable model API (GPT-4o, Claude or Gemini) called from one server function', why: 'Send the photo, get structured JSON back; keep the API key on the server, never in the app.' } : { tech: 'An LLM API behind a single wrapper function', why: 'Your idea sounds AI-powered; keep the model swappable.' });

  const tower = keys[0] === 'game' && !cozy && TOWER.test(lower) && !(VEHICLE.test(lower) && lower.search(VEHICLE) < lower.search(TOWER));
  const turn = keys[0] === 'game' && !cozy && !tower && TURN.test(lower);
  const roblox = engine === 'roblox' && !cozy && !turn && !tower;
  const vehicle = keys[0] === 'game' && !cozy && !turn && !roblox && !tower && VEHICLE.test(lower);
  const must = cozy ? (cozyLoop(lower) ? [cozyLoop(lower), ...COZY_MUST.slice(1)] : [...COZY_MUST]) : tower ? [...TOWER_MUST] : turn ? [...TURN_MUST] : roblox ? [...ROBLOX_MUST] : vehicle ? [...VEHICLE_MUST] : fabric ? [...MCMOD_FABRIC_MUST] : vscode ? [...VSCODE_MUST] : raycast ? [...RAYCAST_MUST] : figma ? [...FIGMA_MUST] : [...primary.must];
  let boss = cozy ? COZY_BOSS : tower ? TOWER_BOSS : turn ? TURN_BOSS : roblox ? ROBLOX_BOSS : vehicle ? VEHICLE_BOSS : fabric ? FABRIC_BOSS : vscode ? VSCODE_BOSS : raycast ? RAYCAST_BOSS : figma ? FIGMA_BOSS : primary.boss;
  // "a python script that renames my photos by date": a Python CLI (Typer + uv), not a Node/npx package
  if (keys[0] === 'cli' && /\bpython\b/.test(lower)) {
    const py = [['Python 3.12 + Typer', 'Type-hinted commands with --help for free; AI tools write clean Typer CLIs.'], ['Rich', 'Readable output, progress bars and friendly errors.'], ['uv', 'Creates the project, pins dependencies and runs it with one command.'], ['pipx / uvx (publish to PyPI when ready)', 'Anyone can install it as a command without touching their system Python.']];
    for (let k = 0; k < 4; k++) if (stack[k] && TYPES.cli.stack.some(([tech]) => tech === stack[k].tech)) stack[k] = { tech: py[k][0], why: py[k][1] };
    const ni = must.indexOf('Runnable with npx from a fresh folder');
    if (ni >= 0) must[ni] = 'Runnable with uvx (or pipx) from a fresh folder, with a --dry-run flag before it changes any files';
  }
  // "a bash script that backs up my server": one strict-mode Bash file checked by ShellCheck and tested with bats, not a Node/npx package
  const bashCli = keys[0] === 'cli' && /\b(bash|shell|zsh|sh) scripts?\b/.test(lower) && !/\b(python|node|powershell|typescript|javascript|rust|go)\b/.test(lower);
  if (bashCli) {
    const sh = [['Bash (#!/usr/bin/env bash + set -euo pipefail)', 'One file with no runtime to install; strict mode stops on the first error instead of carrying on.'], ['ShellCheck + shfmt', 'Catches quoting bugs and unsafe patterns before they bite, and keeps the style consistent; AI tools fix ShellCheck warnings well.'], ['bats-core', 'Tests for the script: the happy path, a missing argument and a failing command.'], ['One file in a GitHub repo (copy to your PATH, Homebrew tap later)', 'People install it by copying one file and running chmod +x; no package manager needed.']];
    for (let k = 0; k < 4; k++) if (stack[k] && TYPES.cli.stack.some(([tech]) => tech === stack[k].tech)) stack[k] = { tech: sh[k][0], why: sh[k][1] };
    if (/\b(s3|aws)\b/.test(lower)) stack.push({ tech: 'AWS CLI v2 (aws s3 sync / aws s3 cp)', why: 'Does the upload, retries and credentials for you; the script just calls it with the right flags.' });
    const oi = must.indexOf('Read options from flags first, then a config file or env vars');
    if (oi >= 0) must[oi] = 'Read options from flags (getopts) first, then env vars, and check required tools with command -v before doing anything';
    const ni = must.indexOf('Runnable with npx from a fresh folder');
    if (ni >= 0) must[ni] = 'Runs as one executable file (chmod +x) on a fresh machine, with -h usage text and a --dry-run flag before it changes or deletes anything';
    must.push('Passes shellcheck with no warnings and has bats tests for the happy path and one failure');
    // "a shell script that sets up my new mac" -> "Mac Setup Script" instead of "Shell Script"
    if (/^(Bash|Shell|Zsh|Sh) Script$/.test(name)) {
      const m = lower.match(/\bscripts?\s+(?:that|which|to)\s+(.*)$/);
      const ow = [];
      for (const w of (m ? m[1] : '').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean).slice(1)) { if (/^(up|out|off|down)$/.test(w) && !ow.length) continue; if (BREAK.test(w)) { if (ow.length) break; else continue; } if (STOP.has(w) || FILLER.has(w) || KIND.has(w)) continue; ow.push(w); if (ow.length === 3) break; }
      if (ow.length) name = titleCase(ow.join(' ')) + (/\b(sets? up|setup|bootstraps?|installs?|configures?)\b/.test(lower) ? ' Setup Script' : ' Script');
    }
    boss = 'Portable, safe shell: quoting paths with spaces, macOS Bash 3.2 and BSD tools (sed -i, date, stat) vs GNU on Linux, cleanup with trap on errors, and never deleting the wrong thing when a variable is empty';
  }
  // "a rust cli that finds duplicate files" / "a go cli that checks my sites": one compiled binary (clap + cargo-dist, cobra + GoReleaser), not a Node/npx package
  const tui = keys[0] === 'cli' && /\b(tui|terminal ui)\b/.test(lower);
  const cliLang = keys[0] === 'cli' && !bashCli && !/\b(python|node|typescript|javascript|powershell)\b/.test(lower) ? (/\b(rust|cargo|ratatui)\b/.test(lower) ? 'rust' : /\b(golang|bubble ?tea)\b|\bgo (cli|tui|command|terminal|program|binary|tool)\b|\b(in|with|using|written in) go\b/.test(lower) ? 'go' : null) : null;
  if (cliLang) {
    const ls = cliLang === 'rust'
      ? [['Rust + clap (derive API)', 'Typed flags and subcommands with --help generated from your structs; AI tools write idiomatic clap well.'], tui ? ['ratatui + crossterm', 'The standard Rust TUI stack: immediate-mode widgets, with crossterm handling keys and the terminal on macOS, Linux and Windows.'] : ['anyhow + indicatif', 'Readable error chains and progress bars with almost no code.'], ['cargo fmt, clippy and test (+ assert_cmd)', 'Formatting, lints and tests are built in; assert_cmd runs your binary in tests the way a user would.'], ['cargo-dist (GitHub Releases) + crates.io', 'Builds prebuilt binaries for macOS, Linux and Windows with a shell/Homebrew installer, and cargo install works for Rust users.']]
      : [['Go + cobra (or the standard flag package for a single command)', 'Subcommands, flags and --help the way kubectl and gh do it; AI tools write solid Go CLIs.'], tui ? ['Bubble Tea + Lip Gloss (Charm)', 'The go-to Go TUI framework (Elm-style model, update, view) with styling; AI tools know it well.'] : ['One static binary (go build)', 'No runtime to install; cross-compile for macOS, Linux and Windows with GOOS/GOARCH.'], ['go test + golangci-lint', 'Tests and the common linters in one command each, easy to run in CI.'], ['GoReleaser + GitHub Releases (Homebrew tap)', 'Tag a version and it builds every platform\'s binary, checksums and a Homebrew formula; go install works for Go users.']];
    for (let k = 0; k < 4; k++) if (stack[k] && TYPES.cli.stack.some(([tech]) => tech === stack[k].tech)) stack[k] = { tech: ls[k][0], why: ls[k][1] };
    const ni = must.indexOf('Runnable with npx from a fresh folder');
    if (ni >= 0) must[ni] = cliLang === 'rust' ? 'Installs as one binary (cargo install or a cargo-dist release) and runs on a fresh machine with no runtime' : 'Installs as one static binary (go install or a GoReleaser release) and runs on a fresh machine with no runtime';
    boss = cliLang === 'rust' ? 'Shipping one fast binary everywhere: macOS, Linux and Windows builds in CI, paths and terminals that differ, and errors people can act on (keep data ownership simple so you are not fighting the borrow checker)' : 'Shipping one binary everywhere: cross-compiling for macOS (Intel and Apple Silicon), Linux and Windows, paths and line endings, and errors people can act on';
  }
  if (tui) {
    const ci = must.indexOf('One command that does the core job, with --help');
    if (ci >= 0) must[ci] = 'A full-screen terminal UI with keyboard navigation (arrows or j/k, enter, q to quit) and a --help flag';
    boss = 'Terminal UI edge cases: window resizes, restoring the terminal on a crash or Ctrl-C, and keys and colors that differ across terminals and Windows';
  }
  // "a pico-8 game about ...": PICO-8's limits are the real constraint, and it ships as a cart + web export
  if (engine === 'pico8') {
    must.push('Fits PICO-8\'s limits (8192 Lua tokens, 128 8x8 sprites plus a shared map, 64 sound effects) and ships as a .p8.png cart and an HTML web export');
    boss += '; all inside PICO-8\'s limits: watch the token count (ctrl-p / info) from day one and reuse sprites and functions before you run out';
  }
  if (tower && engine === 'roblox') must.push('Waves and money run on the server, saved with DataStoreService');
  if (keys.includes('rag') && SUPPORT.test(lower)) { must.push('Hand off to a human (email or ticket link) when the bot cannot answer or the customer asks for one'); if (STORE.test(lower)) must.push('One read-only order-status lookup by order number + email' + (/\bshopify\b/.test(lower) ? ' (Shopify Admin API)' : /\bwoocommerce\b/.test(lower) ? ' (WooCommerce REST API)' : '') + ', never refunds or edits'); }
  // "a mobile app that uses ai to identify plants": the core action is photo -> model -> result, not an offline-first local feature
  const visionAI = stack.some(x => /^A vision-capable model/.test(x.tech));
  if (keys[0] === 'mobile' && visionAI && !secondary) { const i = must.indexOf('Core action that works offline-first with local state'); if (i >= 0) must.splice(i, 1, 'Take or pick a photo (expo-image-picker), send it to your server function, and show the model\'s answer as a clear result card', 'Handle the camera permission being denied and a blurry or unrelated photo with a friendly retry message'); }
  // "a mobile app that uses ai to count calories from a photo of my food": the hard part is the answer being right on real photos, not store submission
  const photoAI = keys[0] === 'mobile' && visionAI && !secondary;
  if (photoAI) boss = /\b(calor\w*|food|meals?|nutrition|macros?|dish\w*)\b/.test(lower) ? 'Estimate accuracy on real meal photos: portion sizes, mixed dishes and hidden oil or sauce, so show an editable estimate with a range instead of one confident number' : 'Result accuracy on real photos: bad light, odd angles and look-alikes, plus a confidence threshold so it says "not sure" instead of guessing';
  // "an android app that translates street signs from the camera": camera -> read the text -> translate, even without the word "ai"
  const camTranslate = keys[0] === 'mobile' && !secondary && /\btranslat\w*/.test(lower) && /\b(camera|photos?|pictures?|images?|signs?|menus?|labels?|scan\w*|snap\w*)\b/.test(lower);
  if (camTranslate) {
    const tr = { tech: 'A vision-capable model API (GPT-4o, Claude or Gemini) called from one server function', why: 'Reads the text in the photo and translates it in one call; keep the API key on the server. (Offline option: ML Kit text recognition + ML Kit translation.)' };
    const vi = stack.findIndex(x => /^A vision-capable model/.test(x.tech) || /^An LLM API behind/.test(x.tech));
    if (vi >= 0) stack.splice(vi, 1, tr); else stack.push(tr);
    const flow = ['Point the camera at the text (expo-camera) or pick a photo, send it to your server function, and show the original text next to its translation', 'Handle a denied camera, blurry or angled text, and a photo with no text in it with a friendly retry message'];
    const i = must.indexOf('Core action that works offline-first with local state');
    if (i >= 0) must.splice(i, 1, ...flow);
    else { const j = must.findIndex(m => /^Take or pick a photo/.test(m)); if (j >= 0) must.splice(j, 2, ...flow); }
    const what = (lower.match(/\b(signs?|menus?|labels?)\b/) || [])[1];
    boss = 'Reading and translating ' + (what ? 'real ' + what.replace(/s?$/, 's') : 'text in real photos') + ': glare, angles, stylized fonts and mixed languages; show the detected text so users can spot a misread';
    name = name.replace(/\b(\w+)s Translator$/, (m, w) => /^(new|statu|bu|gla|ga|thi)$|(s|u|i)s$/i.test(w) ? m : w + ' Translator');
  }
  // "an iphone app that identifies birds from their songs": the core action is mic clip -> audio-ID model/API -> result, not a photo or an offline-first local feature
  const audioID = keys[0] === 'mobile' && !secondary && AUDIO_ID.test(lower) && !/\b(spam|phone|robo)\s*calls?\b/.test(lower);
  if (audioID) {
    const tech = /\bbirds?\b|\bbirdsong/.test(lower) ? { tech: 'BirdNET (bird sound ID model) behind one server function', why: 'Send a short clip, get the top species matches with confidence back; free for non-commercial use, check the license before you charge.' }
      : /\b(songs?|music|playing|hum|humming|whistl\w*)\b/.test(lower) ? { tech: 'A music recognition API (AudD or ACRCloud) called from one server function', why: 'Send a short clip, get the song match back; keep the API key on the server, never in the app.' }
      : { tech: 'An audio classification model (YAMNet, on-device with TensorFlow Lite or on one server function)', why: 'Labels short sounds like barks, alarms or crying with a confidence score; no training needed to start.' };
    const vi = stack.findIndex(x => /^A vision-capable model/.test(x.tech) || /^An LLM API behind/.test(x.tech));
    if (vi >= 0) stack.splice(vi, 1, tech); else stack.push(tech);
    const i = must.indexOf('Core action that works offline-first with local state');
    if (i >= 0) must.splice(i, 1, 'Record a 5-15 second clip with the microphone (expo-audio), send it to your server function, and show the top match with a confidence score as a result card', 'Handle the microphone permission being denied and a noisy or silent clip with a friendly retry message');
    boss = 'Identification quality on real recordings: background noise, short or quiet clips, and a confidence threshold so it says "not sure" instead of guessing';
    // "Birds Identifier" -> "Bird Song Identifier", "Bird Calls Identifier" -> "Bird Call Identifier", "What Song Phone" -> "Song Identifier"
    const snd = (lower.match(/\bfrom (?:their|its|the|a|my)?\s*(song|call|sound|chirp)s?\b/) || [])[1];
    if (/ Identifier$/.test(name)) { name = name.replace(/(\w+?)s Identifier$/, '$1 Identifier'); if (snd && name.split(' ').length === 2) name = name.replace(/ Identifier$/, ' ' + titleCase(snd) + ' Identifier'); }
    else if (/\bwhat song\b/.test(lower)) name = 'Song Identifier';
  }
  // "an app that transcribes my voice notes with whisper": the core step is audio -> speech-to-text API -> transcript, not a generic form or an offline-first local feature
  const stt = keys[0] !== 'game' && STT.test(lower) && !audioID;
  if (stt) {
    const srv = /^(mobile|web|aiapp)$/.test(keys[0]);
    const st = { tech: 'A speech-to-text API (OpenAI Whisper / gpt-4o-transcribe, or Deepgram)' + (srv ? ' called from one server function' : ''), why: 'Send the recording, get the transcript text back; keep the API key ' + (srv ? 'on the server' : 'in an env var') + ', and note the 25 MB per-file upload limit on OpenAI.' };
    const li = stack.findIndex(x => /^A vision-capable model/.test(x.tech));
    if (li >= 0) stack.splice(li, 1, st); else stack.push(st);
    const core = { mobile: 'Core action that works offline-first with local state', web: 'The one core flow, end to end', aiapp: 'One input form for what the user gives you (text, a few options, or an upload)' }[keys[0]];
    const i = core && !secondary ? must.indexOf(core) : -1;
    if (i >= 0) {
      must.splice(i, 1, 'Record a voice note' + (keys[0] === 'mobile' ? ' with the microphone (expo-audio)' : ' in the browser (MediaRecorder)') + ' or upload an audio file, send it to your server function, and show the transcript' + (/\bsummar\w*/.test(lower) ? ' plus a short summary' : '') + ' with a copy button', 'Handle a denied microphone, a silent clip, and a file over the size limit (split long recordings into chunks) with a clear message');
      boss = 'Transcription quality and cost on real recordings: background noise, names and jargon (pass a vocabulary prompt), long files split into chunks, and the per-minute API bill';
    }
  }
  // "a guitar tuner app for my phone": the core step is live mic audio -> pitch detection -> note and cents, not an offline-first form
  const tuner = /^(mobile|web)$/.test(keys[0]) && !secondary && /\b((guitar|ukulele|uke|bass|violin|cello|banjo|mandolin|instrument|chromatic) tuner|tunes? (my |a |your )?(guitar|ukulele|uke|bass|violin|cello|banjo|mandolin|instrument)s?|pitch detect\w*)\b/.test(lower);
  if (tuner) {
    const mob = keys[0] === 'mobile';
    stack.push({ tech: mob ? 'react-native-audio-api (live mic PCM) + pitchy (pitch detection), in an Expo development build' : 'Web Audio API (getUserMedia + AnalyserNode) + pitchy (pitch detection)', why: (mob ? 'Streams raw microphone samples on the phone (a native module, so it needs a dev build, not Expo Go); ' : 'Reads the microphone in the browser with no server; ') + 'pitchy finds the note frequency in each frame.' });
    const core = mob ? 'Core action that works offline-first with local state' : 'The one core flow, end to end';
    const i = must.indexOf(core);
    if (i >= 0) must.splice(i, 1, 'Listen through the microphone and show the nearest note and how many cents sharp or flat it is, updating live like a needle', 'Handle a denied microphone permission and a quiet or noisy room (show "play a string" instead of a jumping needle)');
    if (mob) { const j = must.indexOf('Run on a real device via Expo Go'); if (j >= 0) must[j] = 'Run on a real device with an Expo development build (live microphone audio needs a native module, so Expo Go is not enough)'; }
    boss = 'Pitch accuracy in a real room: low notes (the low E string on a guitar is about 82 Hz, so each frame needs enough samples), background noise, and smoothing so the needle does not jitter';
    const inst = (lower.match(/\b(guitar|ukulele|uke|bass|violin|cello|banjo|mandolin)\b/) || [])[1];
    if (!/ Tuner$/.test(name) && inst) name = titleCase(inst === 'uke' ? 'ukulele' : inst) + ' Tuner';
  }
  // "a metronome app for drummers": clicks scheduled ahead on the audio clock, not setInterval
  const metronome = !tuner && /^(mobile|web)$/.test(keys[0]) && !secondary && /\b(metronome|click track|bpm counter)\b/.test(lower);
  if (metronome) {
    const mob = keys[0] === 'mobile';
    stack.push({ tech: mob ? 'react-native-audio-api (Web Audio API for React Native), in an Expo development build' : 'Web Audio API (AudioContext + a lookahead scheduler)', why: 'Schedules each click on the audio clock a little ahead of time, so the beat stays sample-accurate instead of drifting like setInterval.' });
    const core = mob ? 'Core action that works offline-first with local state' : 'The one core flow, end to end';
    const i = must.indexOf(core);
    if (i >= 0) must.splice(i, 1, 'Play a click at the chosen BPM (40-240) scheduled on the audio clock (AudioContext.currentTime) with a short lookahead, never with setInterval or setTimeout alone', 'Tap tempo, an accented first beat, and a time signature picker (4/4, 3/4, 6/8)');
    if (mob) { const j = must.indexOf('Run on a real device via Expo Go'); if (j >= 0) must[j] = 'Run on a real device with an Expo development build (audio-clock scheduling needs a native module, so Expo Go is not enough)'; }
    boss = 'Timing accuracy: clicks that drift or stutter when ' + (mob ? 'the app goes to the background, the screen locks' : 'the tab is in the background') + ' or the CPU is busy, so schedule on the audio clock and check it against a reference metronome for 5 minutes';
    if (/\bdrum\w*\b/.test(lower)) name = 'Drum Metronome';
    { const si = stack.findIndex(x => /Supabase/.test(x.tech)); if (si >= 0) stack.splice(si, 1); const pi = must.findIndex(m => /^Persist data/.test(m)); if (pi >= 0) must[pi] = 'Remember the last BPM and time signature in localStorage'; }
  }
  // "a beat maker web app": Web Audio step sequencer (sample playback + lookahead), not Auth/Supabase
  const beatMaker = !metronome && !tuner && /^(web|mobile)$/.test(keys[0]) && !secondary && /\b(beat makers?|drum machines?|step sequencers?)\b/.test(lower);
  if (beatMaker) {
    const mob = keys[0] === 'mobile';
    stack.push({ tech: mob ? 'react-native-audio-api (Web Audio API for React Native), in an Expo development build' : 'Web Audio API (AudioContext + AudioBufferSourceNode + a lookahead scheduler)', why: 'Plays one-shot drum samples on the audio clock a little ahead of time, so the grid stays tight instead of drifting like setInterval.' });
    const core = mob ? 'Core action that works offline-first with local state' : 'The one core flow, end to end';
    const i = must.indexOf(core);
    if (i >= 0) must.splice(i, 1, 'A 16-step (or 8/16 toggle) grid for at least 4 drum pads (kick, snare, hat, clap) that plays on a loop at a chosen BPM', 'Schedule each hit on the audio clock (AudioContext.currentTime) with a short lookahead, never with setInterval alone, and let the user load or swap a sample per pad');
    if (mob) { const j = must.indexOf('Run on a real device via Expo Go'); if (j >= 0) must[j] = 'Run on a real device with an Expo development build (sample playback needs a native module, so Expo Go is not enough)'; }
    { const si = stack.findIndex(x => /Supabase/.test(x.tech)); if (si >= 0) stack.splice(si, 1); const pi = must.findIndex(m => /^Persist data/.test(m)); if (pi >= 0) must[pi] = 'Save the pattern, BPM and pad-to-sample map in localStorage so a refresh keeps the beat'; }
    boss = 'Tight timing under load: samples that fire late or double when the ' + (mob ? 'app is backgrounded or the CPU is busy' : 'tab is in the background or the main thread is busy') + ', so schedule on the audio clock and check a 16-step loop against a reference metronome for 2 minutes';
    if (/\bdrum machines?\b/.test(lower)) name = 'Drum Machine';
    else if (/\bstep sequencers?\b/.test(lower)) name = 'Step Sequencer';
    else name = 'Beat Maker';
  }
  // "a speedrun timer for my steam deck": a local-first stopwatch with splits, no accounts or database
  const runTimer = /^(web|mobile)$/.test(keys[0]) && !secondary && /\b(speed ?run\w* timer|split timer|livesplit)\b/.test(lower);
  if (runTimer) {
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    const local = { tech: 'localStorage (IndexedDB if runs get large)', why: 'A timer needs no account or server; runs, splits and personal bests stay on the device.' };
    if (si >= 0) stack.splice(si, 1, local); else stack.push(local);
    const core = keys[0] === 'mobile' ? 'Core action that works offline-first with local state' : 'The one core flow, end to end';
    const i = must.indexOf(core);
    if (i >= 0) must.splice(i, 1, 'Start, split and reset with one key each, plus big on-screen buttons' + (/\bsteam ?deck\b/.test(lower) ? ' for the Steam Deck touchscreen' : ' for a touchscreen'), 'Time from performance.now() differences, never by adding up setInterval ticks, and show each split against your personal best with a green or red delta');
    const pi = must.findIndex(m => /^Persist data/.test(m));
    if (pi >= 0) must[pi] = 'Save runs, splits and personal bests in localStorage so they survive a restart';
    if (/livesplit/i.test(name)) name = 'Split Timer';
    boss = 'Timing you can trust: no drift over a 1-hour run, and hotkeys that still work while the game has focus (a browser tab only hears keys when it is focused, so global hotkeys need a desktop wrapper like Tauri or Electron)';
  }
  // "a habit tracker for my android phone": check off today's habits and keep a streak, all on the device, no accounts
  const habit = !metronome && !runTimer && /^(mobile|web)$/.test(keys[0]) && !secondary && /\b(habits?|streaks?)\b/.test(lower) && /\b(track\w*|app|streaks?|log|checklist|builder)\b/.test(lower) && !/\b(ai|gpt|claude|llm|gemini|openai|friends?|leaderboards?|social|group|team|share\w*|accountability|multiplayer)\b/.test(lower);
  if (habit) {
    const mob = keys[0] === 'mobile';
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    const local = mob ? { tech: 'expo-sqlite (on-device database)', why: 'Habits and daily check-ins stay on the phone, so it works offline with no account or server.' } : { tech: 'localStorage (IndexedDB if history grows)', why: 'Habits and daily check-ins stay in the browser, so there is no account or server to build.' };
    if (si >= 0) stack.splice(si, 1, local); else stack.push(local);
    const core = mob ? 'Core action that works offline-first with local state' : 'The one core flow, end to end';
    const i = must.indexOf(core);
    if (i >= 0) must.splice(i, 1, 'Add a habit, then check it off for today with one tap and see the current streak', mob ? 'A daily reminder at a time you pick, as a local notification (expo-notifications), with no server' : 'A 30-day grid per habit so missed days are visible at a glance');
    const pi = must.findIndex(m => /^Persist data/.test(m));
    if (pi >= 0) must[pi] = 'Save habits and check-ins in localStorage so they survive a refresh';
    boss = 'Streak logic: store each check-in as a local date (YYYY-MM-DD), not a timestamp, so a late-night check-off, a missed day, daylight saving and travel across time zones never break or double-count a streak';
    // "a streak app for learning japanese every day" / "a japanese learning streak app" -> "Japanese Learning Streak"
    const learnJunk = /^(every|each|day|daily|week|weekly|month|a|an|the|my|our|apps?|streaks?|habits?|for|of|about|by|while|when|after|before|with|from|on|in|to)$/;
    const learnWords = raw => (raw || '').split(/\s+/).filter(w => w && !learnJunk.test(w));
    const learnAfter = learnWords((lower.match(/\b(?:learning|studying|practicing)\s+([a-z]+(?:\s+[a-z]+)?)/) || [])[1]);
    const learnBefore = learnWords((lower.match(/\b([a-z]+)\s+(?:learning|studying|practicing)\b/) || [])[1]);
    const subj = learnAfter.length ? learnAfter : learnBefore;
    if (subj.length) name = titleCase(subj.join(' ')) + ' Learning Streak';
    else if (/^Habits? (Tracker|App)$/.test(name) || name === 'Habit') name = 'Habit Tracker';
  }
  // "a pomodoro timer web app": focus/break countdown on the device, no accounts or database
  const pomo = !metronome && !runTimer && !habit && /^(web|mobile)$/.test(keys[0]) && !secondary && /\b(pomodoro|focus timer|tomato timer)\b/.test(lower);
  if (pomo) {
    const mob = keys[0] === 'mobile';
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    const local = mob ? { tech: 'expo-sqlite or AsyncStorage (on-device)', why: 'Timer settings and completed sessions stay on the phone, so there is no account or server.' } : { tech: 'localStorage', why: 'Timer settings and completed sessions stay in the browser; a pomodoro needs no account or database.' };
    if (si >= 0) stack.splice(si, 1, local); else stack.push(local);
    const core = mob ? 'Core action that works offline-first with local state' : 'The one core flow, end to end';
    const i = must.indexOf(core);
    if (i >= 0) must.splice(i, 1, 'Start, pause and reset a focus countdown (default 25 minutes) that switches into a short break, with editable focus and break lengths', 'Play a short sound or ' + (mob ? 'local notification' : 'browser notification') + ' when a focus or break ends (with permission handled)');
    const pi = must.findIndex(m => /^Persist data/.test(m));
    if (pi >= 0) must[pi] = 'Remember focus/break lengths and today\'s completed session count in ' + (mob ? 'on-device storage' : 'localStorage');
    boss = 'A countdown you can trust when ' + (mob ? 'the app is backgrounded or the screen locks' : 'the tab is in the background') + ': store the end timestamp and derive remaining time from Date.now(), never by counting setInterval ticks alone';
    if (/\bpomodoro\b/.test(lower)) name = 'Pomodoro Timer';
    else if (/\bfocus timer\b/.test(lower)) name = 'Focus Timer';
    else if (/\btomato timer\b/.test(lower)) name = 'Tomato Timer';
  }
  // "a pomodoro chrome extension": service-worker countdown + badge timer, not a generic content-script extension
  const pomoExt = !pomo && keys[0] === 'extension' && !vscode && !raycast && !secondary && /\b(pomodoro|focus timer|tomato timer)\b/.test(lower);
  if (pomoExt) {
    const i = must.indexOf('Manifest + popup that opens');
    if (i >= 0) must.splice(i, 1, 'Manifest V3 with a popup that shows start/pause/reset and the remaining time', 'A service worker that runs the countdown from an end timestamp (chrome.alarms + Date.now()), updates chrome.action.setBadgeText while a session is running, and fires a notification when a focus or break ends');
    const j = must.indexOf('Content script that does one thing on one site');
    if (j >= 0) must.splice(j, 1, 'Editable focus and break lengths; no content script required for the MVP');
    const k = must.indexOf('Settings saved in chrome.storage');
    if (k >= 0) must[k] = 'Remember focus/break lengths and today\'s completed session count in chrome.storage.local';
    boss = 'An accurate timer across MV3 service worker sleeps: store the end timestamp, use chrome.alarms so the worker wakes for the session end, and keep the badge time correct when Chrome throttles the worker';
    if (/\bpomodoro\b/.test(lower)) name = 'Pomodoro Timer';
    else if (/\bfocus timer\b/.test(lower)) name = 'Focus Timer';
    else if (/\btomato timer\b/.test(lower)) name = 'Tomato Timer';
  }
  // "a todo app" / "a simple todo list": add/complete tasks on the device, no Auth/Supabase
  const todo = !metronome && !runTimer && !habit && !pomo && /^(web|mobile)$/.test(keys[0]) && !secondary && /\b(to-?dos?|todo lists?|task lists?|checklist)\b/.test(lower) && !/\b(ai|gpt|claude|llm|gemini|openai|prioriti[sz]\w*|agents?|assistants?)\b/.test(lower);
  if (todo) {
    const mob = keys[0] === 'mobile';
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    const local = mob ? { tech: 'expo-sqlite or AsyncStorage (on-device)', why: 'Tasks stay on the phone, so the list works offline with no account or server.' } : { tech: 'localStorage (IndexedDB if the list grows)', why: 'Tasks stay in the browser; a personal todo list needs no account or database.' };
    if (si >= 0) stack.splice(si, 1, local); else stack.push(local);
    const core = mob ? 'Core action that works offline-first with local state' : 'The one core flow, end to end';
    const i = must.indexOf(core);
    if (i >= 0) must.splice(i, 1, 'Add a task, mark it done with one tap, and delete or clear completed tasks', 'Filter or show Active / Completed / All');
    const pi = must.findIndex(m => /^Persist data/.test(m));
    if (pi >= 0) must[pi] = 'Save tasks in ' + (mob ? 'on-device storage' : 'localStorage') + ' so they survive a restart';
    boss = 'Local data you can trust: tasks never silently disappear on refresh, and an export (JSON or CSV) lets you leave without lock-in';
    if (/^Todos?$/.test(name) || name === 'Todo List App') name = 'Todo List';
  }
  // "an iphone app that logs my espresso shots" / "a plant watering log app": any personal log of my own stuff
  const PERSONAL_LOG = /\b(logs?|logging|logger|journal)\s+(of\s+)?my\b|\b(log|journal)\s+(app|for)\b|\b(log|journal)$/;
  // "a workout tracker for my iphone" / "a sleep tracker app for my phone": personal logs stay on-device
  const personalLog = !habit && !pomo && !todo && /^(mobile|web)$/.test(keys[0]) && !secondary && ((/\b(workouts?|gym sessions?|exercises?|sleep|mood|water intake|weight|meditation)\b/.test(lower) && /\b(track\w*|log|logger|journal)\b/.test(lower)) || PERSONAL_LOG.test(lower)) && !/\b(server|error|api|console|crash|access|system|files?|parse\w*|viewer|analy\w+|webhooks?|requests?|deploy\w*|chat|discord|slack|twitch)\b/.test(lower) && !/\b(ai|gpt|claude|llm|gemini|openai|friends?|leaderboards?|social|group|team|share\w*|fitbit|strava|garmin|apple health|healthkit|google fit|vr|ar|game)\b/.test(lower);
  if (personalLog) {
    const mob = keys[0] === 'mobile';
    const kind = /\bsleep\b/.test(lower) ? 'sleep' : /\b(workouts?|gym|exercises?)\b/.test(lower) ? 'workout' : 'log';
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    const local = mob ? { tech: 'expo-sqlite (on-device database)', why: 'Personal ' + kind + ' entries stay on the phone, so it works offline with no account or server.' } : { tech: 'localStorage (IndexedDB if history grows)', why: 'Personal ' + kind + ' entries stay in the browser; no account or server to build.' };
    if (si >= 0) stack.splice(si, 1, local); else stack.push(local);
    const core = mob ? 'Core action that works offline-first with local state' : 'The one core flow, end to end';
    const i = must.indexOf(core);
    if (kind === 'workout' && i >= 0) must.splice(i, 1, 'Log a workout with date, exercise or type, and a duration or set count, then see a history list', mob ? 'A quick-add button on the home screen so logging takes under 15 seconds' : 'A simple weekly summary of sessions logged');
    else if (kind === 'sleep' && i >= 0) must.splice(i, 1, 'Log bedtime and wake time (or total hours) for a night and see a recent history', mob ? 'A local morning reminder to log last night (expo-notifications), with no server' : 'A 7-day bar chart of hours slept');
    else if (/\b(espresso|coffee|brews?|pour ?overs?|lattes?)\b/.test(lower) && i >= 0) must.splice(i, 1, 'Log a ' + (/\bespresso\b/.test(lower) ? 'shot' : 'brew') + ' with date, beans, dose (g), yield (g), time (s) and a 1-5 taste rating, then see recent entries', 'Prefill the next entry from the last one so dialing in only changes one variable');
    else if (i >= 0) must.splice(i, 1, 'Add a dated entry with the one field that matters, then browse recent history');
    const pi = must.findIndex(m => /^Persist data/.test(m));
    if (pi >= 0) must[pi] = 'Save entries in ' + (mob ? 'expo-sqlite' : 'localStorage') + ' so they survive a restart';
    boss = kind === 'sleep' ? 'Honest sleep math: store local dates and minutes, handle naps vs night sleep, and never trust a single timestamp across midnight or DST' : kind === 'workout' ? 'Logging that sticks: a session saved in under 15 seconds, edits that do not duplicate entries, and history that stays correct across time zones' : 'Local data you can trust across days, edits and time zone changes, with an export so nothing is locked in';
    if (mob) boss = boss.replace(/\.$/, '') + '; skip App Store / Play submission until the log loop works on a real device';
  }
  // "a raycast extension for my notion tasks": name it after what it shows, and add the service's API client
  if (raycast) {
    const svc = [[/\bnotion\b/, '@notionhq/client (Notion API)', 'Query your Notion database (filter by status) and update a page property to mark a task done; share the database with your integration, or use Notion OAuth via @raycast/utils.'],
      [/\bgithub\b/, '@octokit/rest (GitHub API)', 'Lists repos, issues or PRs with a personal access token from a password preference (or GitHub OAuth via @raycast/utils).'],
      [/\blinear\b/, '@linear/sdk (Linear API)', 'Typed client for issues and projects; use a personal API key preference or Linear OAuth.'],
      [/\btodoist\b/, 'Todoist REST API (@doist/todoist-api-typescript)', 'Read and complete tasks with an API token preference.'],
      [/\bspotify\b/, 'Spotify Web API (OAuth PKCE via @raycast/utils)', 'Control playback and search; Spotify requires a user login, so use the PKCE helper.']].find(([re]) => re.test(lower));
    if (svc) {
      stack.splice(2, 0, { tech: svc[1], why: svc[2] });
      if (/\bnotion\b/.test(lower) && /\b(tasks?|to-?dos?)\b/.test(lower)) must.splice(1, 1, 'List tasks from one Notion database (not done first, with status and due date), loaded with useCachedPromise so the list is instant on reopen');
    }
    const rm = lower.match(/raycast (?:extensions?|plugins?|commands?|scripts?)\s+(?:(?:that|which|to)\s+(?:uses?\s+(?:ai|gpt|chatgpt|claude|an llm|llms?|openai)\s+to\s+)?([a-z]+)\s+|for\s+)?(.*)$/);
    const nw = [];
    for (const w of (rm ? rm[2] : '').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)) { if (BREAK.test(w)) { if (nw.length) break; else continue; } if (STOP.has(w) || FILLER.has(w) || KIND.has(w) || w === 'raycast') continue; nw.push(w); if (nw.length === 3) break; }
    const rv = rm && rm[1] && VERB[rm[1]] && VERB[rm[1]] !== 'Viewer' ? ' ' + VERB[rm[1]] : '';
    name = nw.length ? (/\b(ai|gpt|chatgpt|claude|llm|openai)\b/.test(lower) ? 'AI ' : '') + titleCase(nw.join(' ')) + rv + ' for Raycast' : /^Raycast/.test(name) || !name ? 'Raycast Extension' : name;
  }
  // "a figma plugin that exports colors as tailwind config" -> "Tailwind Colors Exporter for Figma"
  if (figma) {
    if (/\btailwind\b/.test(lower) && /\b(colou?rs?|styles?|variables?|tokens?|theme)\b/.test(lower)) must.splice(1, 1, 'Read the local color styles and variables (getLocalPaintStylesAsync, figma.variables.getLocalVariablesAsync) and turn them into a Tailwind theme.colors config (plus CSS variables for Tailwind v4)');
    const ai = stack.findIndex(x => /^An LLM API behind/.test(x.tech));
    if (ai >= 0) stack[ai] = { tech: 'An LLM API called through your own small server function', why: 'Plugin code ships to every user, so an API key in it is public; send only the layer names or text the model needs, and add the server domain to networkAccess.' };
    let n = name.replace(/\s*\b(Figma )?(Plugins?|Widgets?)$/, '').replace(/^Figma$/, '');
    if (n && /\btailwind\b/.test(lower) && !/Tailwind/.test(n)) n = 'Tailwind ' + n;
    if (n && /\b(ai|gpt|chatgpt|claude|llm|openai)\b/.test(lower) && !/^AI\b/.test(n)) n = 'AI ' + n;
    const app = /\bfigjam\b/.test(lower) ? 'FigJam' : 'Figma';
    name = n ? (/Fig(ma|Jam)/.test(n) ? n : n + ' for ' + app) : app + ' Plugin';
  }
  // "an android app that reminds me to stretch": schedule local notifications from on-device settings, no accounts or store-submission boss
  const reminder = !habit && !pomo && !pomoExt && !todo && !personalLog && !metronome && !runTimer && !beatMaker && !tuner && !secondary && !vscode && !raycast && !figma && /^(mobile|web|extension|bot)$/.test(keys[0])
    && /\b(remind\w*|nudges? me)\b/.test(lower)
    && !/\b(ai|gpt|claude|llm|gemini|openai|calendar|emails?|inbox|meetings?|bills?|invoices?|share\w*|social|prices?|deals?|scrap\w*|api|stocks?|restocks?|releases?|drops?|news)\b/.test(lower)
    && !(keys[0] !== 'bot' && /\b(friends?|team|group)\b/.test(lower));
  // "a discord bot that reminds my team about standups": one reminder posted in a channel for the whole group, not per-user DMs
  const groupRemind = reminder && keys[0] === 'bot' && /\b(team|group|clan|guild|squad|crew|class|channel|server|friends|raid group|party)\b/.test(lower) && !/\bbirthdays?\b/.test(lower);
  if (reminder) {
    const k = keys[0];
    if (k === 'mobile') {
      const si = stack.findIndex(x => /Supabase/.test(x.tech));
      const tech = [{ tech: 'expo-notifications (local scheduled notifications)', why: 'Schedules repeating reminders on the phone itself, so there is no server, push token or account.' }, { tech: 'AsyncStorage (on-device settings)', why: 'Remembers what to remind you about, the interval and quiet hours.' }];
      if (si >= 0) stack.splice(si, 1, ...tech); else stack.push(...tech);
      const i = must.indexOf('Core action that works offline-first with local state');
      if (i >= 0) must.splice(i, 1, 'Pick the reminder and a schedule (every N minutes between set hours, or daily at a time), saved on the device', 'Schedule repeating local notifications with expo-notifications (no server or push tokens), with snooze, an on/off switch and a test-notification button');
      boss = 'Reminders that actually fire: the notification permission being denied (Android 13+ asks at runtime), Android battery savers and exact-alarm limits, iOS keeping only 64 pending notifications, and rescheduling after a time zone or daylight saving change; skip App Store / Play submission until it has reminded you reliably for a few days on a real device';
    } else if (k === 'web') {
      const si = stack.findIndex(x => /Supabase/.test(x.tech));
      const tech = { tech: 'localStorage + the Notification API', why: 'Reminder settings stay in the browser, and notifications need no server while the page is open.' };
      if (si >= 0) stack.splice(si, 1, tech); else stack.push(tech);
      const i = must.indexOf('The one core flow, end to end');
      if (i >= 0) must.splice(i, 1, 'Set what to be reminded about and when (every N minutes or at a time of day)', 'Show a browser notification when it is due, asking for permission from a button click, with an in-page fallback if it is denied');
      const pi = must.findIndex(m => /^Persist data/.test(m));
      if (pi >= 0) must[pi] = 'Save reminders in localStorage and compute the next due time from stored timestamps, not setInterval ticks';
      boss = 'Reminding you when the tab is closed or asleep: a web page can only notify while it is open, so start as an installed PWA or pinned tab that recomputes due times on wake, and add Web Push later only if you need it';
    } else if (k === 'extension') {
      const i = must.indexOf('Content script that does one thing on one site');
      if (i >= 0) must.splice(i, 1, 'A service worker that schedules the reminder with chrome.alarms and shows it with chrome.notifications (no content script needed)');
      const pi = must.indexOf('Manifest + popup that opens');
      if (pi >= 0) must[pi] = 'Manifest V3 with a popup to set the interval and turn reminders on or off';
      boss = 'Reminders across MV3 service worker sleeps: schedule with chrome.alarms (not setTimeout), keep state in chrome.storage, and use chrome.idle so it does not nag while you are away from the computer';
    } else if (k === 'bot') {
      const i = must.indexOf('One useful command that delivers the core value');
      if (i >= 0) must.splice(i, 1, 'A /remind command to set what and when (interval or time of day, in the user\'s time zone), plus /list and /stop');
      const j = must.indexOf('Store per-user data in SQLite');
      if (j >= 0) must[j] = 'Store each reminder and the user\'s time zone in SQLite, with the next due time';
      stack.splice(2, 0, { tech: 'A scheduler loop (node-cron or a 1-minute setInterval) that reads due reminders from SQLite', why: 'Reminders live in the database, so a restart or redeploy never loses them.' });
      boss = 'Reminders that fire on time for every user: per-user time zones and daylight saving, no lost or doubled reminders across restarts, and users who block the bot or leave the chat';
      if (groupRemind) {
        const gi = must.findIndex(m => /^A \/remind command/.test(m));
        if (gi >= 0) must[gi] = 'A /remind command to set what, when (a time of day and which weekdays, in the team\'s time zone) and which channel it posts in, plus /list and /stop';
        const gj = must.indexOf('Store each reminder and the user\'s time zone in SQLite, with the next due time');
        if (gj >= 0) must[gj] = 'Store each reminder with its channel and the server\'s time zone in SQLite, with the next due time';
        must.push('Skip days off: weekdays only by default, with a /pause for holidays');
        boss = 'Reminders that fire on time for the whole channel: one time zone per server and daylight saving, no lost or doubled posts across restarts, and the bot losing permission to post in that channel';
      }
    }
    name = name.replace(/^Take (\w+?)s? Reminder$/, '$1 Reminder').replace(/^Drink Water Reminder$/, 'Water Reminder').replace(/^([A-Z][a-z]+[^su])s Reminder$/, '$1 Reminder');
  }
  // "a twitch bot that runs a trivia game": rounds played in chat with points, not a Phaser game
  const chatGame = keys[0] === 'bot' && !secondary && !reminder && CHAT_GAME.test(lower) && !RAG.test(lower);
  if (chatGame) {
    const twitchy = /\btwitch\b/.test(lower);
    const g = (lower.match(CHAT_GAME) || ['trivia'])[0].replace(/^quiz\w*$/, 'quiz').replace(/^guess(ing games?| the \w+)$/, 'guessing game').replace(/^word games?$/, 'word game').replace(/^riddles?$/, 'riddle');
    const plat = (lower.match(/\b(twitch|discord|telegram|slack|whatsapp)\b/) || [])[1];
    name = titleCase(((plat ? plat + ' ' : '') + g).replace(/ game$/, '')) + ' Bot';
    const cmd = twitchy ? '!' : '/';
    must.length = 0;
    const qa = /^(trivia|quiz|riddle)$/.test(g);
    must.push(qa ? cmd + g + ' starts a round: the bot posts a question and accepts the first correct answer in chat within 30 seconds' : cmd + g.split(' ')[0] + ' starts a round in chat; players guess with a message and the bot replies with the result until someone wins or time runs out', 'Points per user saved in SQLite, with a ' + cmd + 'top leaderboard', qa ? 'A question bank from Open Trivia DB or your own JSON file, with no repeats until it runs out' : 'A word or puzzle list in a JSON file, with no repeats until it runs out', 'Mod-only start/stop and a cooldown so the game never floods chat');
    boss = 'Fair answers in a busy chat: matching answers despite case, typos and accents, deciding who was first under chat lag, and staying under the platform\'s message rate limits';
  }
  // "a whatsapp bot that ...": a WhatsApp number on the Cloud API or Twilio, with no slash commands
  if (keys[0] === 'bot' && /\bwhatsapp\b/.test(lower)) {
    for (let k = 0; k < must.length; k++) must[k] = must[k].replace('Connect the bot and respond to one slash command', 'Connect a WhatsApp number (the Cloud API test number or the Twilio sandbox) and reply to one incoming message').replace(/^A \/remind command to set/, 'A "remind" message to set').replace(', plus /list and /stop', ', plus "list" and "stop" replies');
    boss += '; plus WhatsApp rules: messages you start outside the 24-hour reply window must use a pre-approved template, and group chats need the right API access';
  }
  // "a whatsapp bot that reminds my family about birthdays": once a year per person, not an every-N-minutes reminder
  if (keys[0] === 'bot' && /\bbirthdays?\b/.test(lower) && /\b(remind\w*|notif\w*|alerts?|wish\w*|announce\w*|posts?)\b/.test(lower)) {
    const ri = must.findIndex(m => /^A (\/remind|"remind") (command|message)/.test(m));
    if (ri >= 0) must[ri] = 'Add birthdays (name + date, year optional) with one command, and list the upcoming ones';
    must.push('A daily check at a set hour in the group\'s time zone that sends the birthday message on the day, with an optional heads-up a few days before');
    boss = boss.replace(/^Reminders that fire on time for (every user: per-user time zones|the whole channel: one time zone per server) and daylight saving/, 'Birthdays that fire on the right day every year: the group\'s time zone, February 29 birthdays');
  }
  // "Cleans Up Downloads CLI" -> "Downloads Cleaner CLI"; "backs up my dotfiles" -> "Dotfiles Backup CLI"
  if (/\b(Cleaner|Backup)$/.test(name)) {
    name = name.replace(/\b(Folder|Directory|Dir) Cleaner$/, 'Cleaner');
    if (keys[0] === 'cli' && !/\bCLI$/.test(name)) name += ' CLI';
  }
  // "a local llm chatbot that runs on my laptop with ollama": talk to a model on your machine, no cloud API key
  const localLlm = LOCAL_LLM.test(lower) && /^(persona|aiapp|web)$/.test(keys[0]) && !secondary && /\b(chat\w*|assistant|conversation|talks?)\b/.test(lower) && !/\b(monitor\w*|dashboards?|usage|trackers?|costs?|spend\w*|alerts?)\b/.test(lower);
  if (localLlm) {
    const runner = /\blm[- ]?studio\b/.test(lower) && !/\bollama\b/.test(lower)
      ? { tech: "LM Studio's local OpenAI-compatible server (localhost)", why: 'Serves whatever model you loaded in LM Studio on your machine, so chats never leave your laptop.' }
      : { tech: 'Ollama running locally (HTTP API at localhost:11434)' + (/\blm[- ]?studio\b/.test(lower) ? ", or LM Studio's local OpenAI-compatible server" : ''), why: 'Serves the model on your machine so chats never leave your laptop. Pull a model with `ollama pull` (try llama3.2) before you start.' };
    const oai = stack.findIndex(x => /OpenAI \/ Anthropic/.test(x.tech) || /^An LLM API behind/.test(x.tech));
    if (oai >= 0) stack.splice(oai, 1, runner); else stack.push(runner);
    const vai = stack.findIndex(x => /Vercel AI SDK/.test(x.tech));
    if (vai >= 0) stack[vai] = { tech: 'Next.js + TypeScript + the Vercel AI SDK (ollama-ai-provider)', why: 'Streams tokens from your local Ollama (or LM Studio) server into a chat UI; the same SDK works later if you add a cloud model.' };
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    if (si >= 0) stack.splice(si, 1);
    const ve = stack.findIndex(x => x.tech === 'Vercel');
    if (ve >= 0) stack.splice(ve, 1);
    const coreIdx = must.findIndex(m => /^A system prompt that defines|^A chat UI that streams|^One input form for what the user|^The one core flow/.test(m));
    const localMust = [
      'A chat UI that streams tokens from Ollama at http://localhost:11434' + (/\blm[- ]?studio\b/.test(lower) ? " (or LM Studio's local OpenAI-compatible endpoint)" : ''),
      "A model picker filled from the local server's model list (Ollama GET /api/tags)",
      "Conversation history sent with each message, trimmed to the model's context window, plus a reset button",
      'A clear empty state when Ollama is not running or no model is pulled, with the exact command to start it and pull a model'
    ];
    if (coreIdx >= 0) must.splice(coreIdx, Math.min(4, must.length - coreIdx), ...localMust);
    else must.unshift(...localMust);
    boss = 'Staying fully local and usable: first-token latency on your hardware, context-window limits on smaller models, and a clear error when Ollama is not running or no model is pulled — never silently fall back to a cloud API';
    if (/\bollama\b/.test(lower)) name = 'Ollama Chat';
    else if (/\blm[- ]?studio\b/.test(lower)) name = 'LM Studio Chat';
    else name = 'Local LLM Chat';
  }
  // "a firefox extension that mutes autoplay videos": WebExtensions (browser.*) + web-ext + addons.mozilla.org, not Chrome MV3 + CRXJS
  const firefox = keys[0] === 'extension' && !vscode && !raycast && !figma && /\bfirefox\b/.test(lower);
  const crossBrowser = firefox && /\b(chrome|chromium|edge|brave|safari|all browsers|every browser|any browser|cross[- ]browser)\b/.test(lower);
  if (firefox) {
    primary = { ...primary, label: crossBrowser ? 'Browser Extension' : 'Firefox Extension' };
    const fs = crossBrowser
      ? [['WXT (Vite-based) + TypeScript', 'One codebase that builds both the Chrome MV3 and the Firefox package, using the promise-based browser.* API everywhere.'], ['web-ext (run, lint)', 'Mozilla\'s CLI: test the Firefox build in a clean profile and catch what addons.mozilla.org review rejects.'], ['browser.storage (WXT storage helper)', 'The same settings code works in both browsers.'], ['Chrome Web Store + addons.mozilla.org', 'Two listings, two reviews; WXT zips both builds for you.']]
      : [['WebExtensions (manifest.json with browser_specific_settings.gecko.id) + TypeScript', 'Firefox\'s extension API: the promise-based browser.* namespace (webextension-polyfill if you later port to Chrome).'], ['web-ext (run, lint, build)', 'Mozilla\'s CLI: web-ext run opens a clean Firefox profile with your add-on and reloads it on save; lint catches what review rejects.'], ['browser.storage', 'Built-in persistence; storage.sync follows the user across their Firefox installs.'], ['addons.mozilla.org (AMO)', 'Firefox only installs signed add-ons; list it on AMO (or self-distribute a signed .xpi) after a review.']];
    for (let k = 0; k < 3; k++) { const i = stack.findIndex(x => x.tech === TYPES.extension.stack[k][0]); if (i >= 0) stack[i] = { tech: fs[k][0], why: fs[k][1] }; }
    if (!stack.find(x => x.tech === fs[3][0])) stack.splice(3, 0, { tech: fs[3][0], why: fs[3][1] });
    for (let k = 0; k < must.length; k++) must[k] = must[k] === 'Settings saved in chrome.storage' ? (crossBrowser ? 'Settings saved with browser.storage so the same code runs in Chrome and Firefox' : 'Settings saved in browser.storage.sync') : crossBrowser ? must[k] : must[k].replace(/\bchrome\.(storage|alarms|notifications|idle|action)\b/g, 'browser.$1').replace(/\bChrome\b/g, 'Firefox').replace(/^A service worker that/, 'A background script (event page) that');
    must.push(crossBrowser ? 'Builds and loads in both Chrome and Firefox (wxt build -b firefox) and passes web-ext lint' : 'Loads with web-ext run in a clean Firefox profile and passes web-ext lint');
    if (boss === TYPES.extension.boss) boss = crossBrowser ? 'Handling sites that change their DOM, plus Chrome vs Firefox differences (service worker vs event-page background, manifest keys, API gaps) and passing two store reviews' : 'Handling sites that change their DOM, plus Firefox specifics: an event-page background script (not a Chrome service worker), the gecko add-on id, and passing addons.mozilla.org review (no remote code, readable source)';
    else if (!crossBrowser) boss = boss.replace(/\bchrome\.(storage|alarms|notifications|idle|action)\b/g, 'browser.$1').replace(/MV3 service worker sleeps/g, 'background script restarts').replace(/so the worker wakes/g, 'so the background script wakes').replace(/throttles the worker/g, 'suspends the background script').replace(/\bChrome\b/g, 'Firefox');
  }
  // "a ttrpg initiative tracker": turn order, HP and conditions at the table, kept in the browser (no login, server or cron)
  const initTracker = /^(web|mobile)$/.test(keys[0]) && !secondary && /\b(initiative|turn order|combat tracker|encounter tracker)\b/.test(lower) && (TABLETOP.test(lower) || /\b(combat|encounters?|monsters?)\b/.test(lower));
  if (initTracker) {
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    if (si >= 0) stack[si] = { tech: 'localStorage (or IndexedDB via Dexie)', why: 'Encounters live in the browser: no login or server at the table, and a refresh mid-fight loses nothing.' };
    must.length = 0;
    must.push('Add combatants (name, initiative roll, HP, AC) and sort them into turn order, with ties broken by a dex modifier', 'A next-turn button that highlights whose turn it is and counts rounds', 'Track HP (damage and healing) and conditions (poisoned, prone, concentrating) with durations that tick down each round', 'The encounter saved in localStorage so a refresh or a closed tab mid-fight loses nothing');
    boss = 'Table speed: adding monsters, ties, delayed turns and new arrivals in a few taps mid-fight without losing the turn order';
  }
  // "a go web server that shortens urls" / "a rust web api for my todo app": one Go (net/http + chi) or Rust (axum) binary with SQLite, not Next.js + Supabase
  const webLang = keys[0] === 'web' && !secondary && goRustWeb(lower) ? (/\b(rust|axum|actix|actix-web)\b/.test(lower) ? 'rust' : 'go') : null;
  const shortener = !!webLang && /\b(shorten\w*|short (links?|urls?)|url shortener)\b/.test(lower);
  if (webLang) {
    const apiOnly = /\b(apis?|backends?|rest|microservices?)\b/.test(lower) && !/\b(web ?apps?|pages?|website|site|dashboard|ui|frontend)\b/.test(lower);
    const ws = webLang === 'rust'
      ? [['Rust + axum + tokio', 'The most-used Rust web framework (from the tokio team): handlers are plain async functions with typed extractors, and AI tools write it well.'], ['SQLite with sqlx (migrations + compile-time checked queries)', 'One database file and no server to run; sqlx checks your SQL against the schema when you build.'], apiOnly ? ['serde JSON + tower-http (CORS, tracing, timeouts)', 'Typed request and response bodies, plus the middleware every API needs, in a few lines.'] : ['askama templates + htmx', 'Server-rendered pages checked at compile time, with a little interactivity and no JavaScript build step.'], ['One binary in a slim Docker image on Fly.io or Render (SQLite on a volume)', 'Build once, run anywhere; keep the database file on a persistent volume so a redeploy keeps your data.']]
      : [['Go 1.22+ net/http + chi router', 'The standard library already serves HTTP well; chi adds route groups and middleware without a framework, and AI tools write idiomatic Go handlers.'], ['SQLite (modernc.org/sqlite, no cgo) + sqlc', 'One database file and no server to run; sqlc turns plain SQL into typed Go functions.'], apiOnly ? ['encoding/json + chi middleware (logging, CORS, timeouts)', 'JSON in and out with no extra framework, plus the middleware every API needs.'] : ['html/template + htmx', 'Server-rendered pages with a little interactivity and no JavaScript build step.'], ['One static binary in a small Docker image on Fly.io or Render (SQLite on a volume)', 'Cross-compiles to a single file; keep the database file on a persistent volume so a redeploy keeps your data.']];
    stack.length = 0;
    for (const [tech, why] of ws) stack.push({ tech, why });
    primary = { ...primary, label: (webLang === 'rust' ? 'Rust' : 'Go') + (apiOnly ? ' Web API' : ' Web Server') };
    must.length = 0;
    must.push(shortener ? 'POST /shorten takes a URL, rejects invalid ones and returns a short code; GET /{code} redirects (302) to the original URL' : 'One route that does the core job end to end (create and read), with the right status codes (201, 400, 404)', 'Data saved in SQLite with a migration file, so a restart or redeploy loses nothing', webLang === 'rust' ? 'Handler tests with cargo test (tower::ServiceExt::oneshot against the router)' : 'Handler tests with go test and net/http/httptest', 'Input validated, errors returned as JSON with a clear message, and every request logged (' + (webLang === 'rust' ? 'tracing' : 'log/slog') + ')', 'Builds into one binary and deploys from a Dockerfile to a public URL');
    boss = (webLang === 'rust' ? 'Async Rust in a web server: shared state (Arc<AppState> with the sqlx pool), error types that turn into HTTP responses (IntoResponse), and keeping compile times sane' : 'Production basics in one binary: timeouts on the http.Server, graceful shutdown on SIGTERM, SQLite in WAL mode with one writer, and config from env vars') + (shortener ? '; plus short codes that never collide and redirects that stay fast' : '');
    if (shortener) name = 'URL Shortener';
    else if (/^(Go|Golang|Rust) (Web |REST |HTTP )?(Server|API|Backend|Service)$/.test(name)) { const fm = lower.match(/\bfor (?:my|our|a|the) ([a-z0-9]+(?: [a-z0-9]+)?) (?:app|site|website|game|project|blog|store)\b/); if (fm) name = titleCase(fm[1].split(' ').filter(w => !STOP.has(w) && !FILLER.has(w)).join(' ')) + ' API'; }
  }
  // "a board game night scheduler": find a date that works for the group, then RSVP; guests should not need an account
  const groupSched = /^(web|mobile)$/.test(keys[0]) && !secondary && /\b(schedul\w*|planners?|availability|when2meet|doodle|find a (date|time|day))\b/.test(lower) && /\b(game nights?|board games?|d&d|dnd|sessions?|ttrpgs?|raids?|lan part(y|ies)|poker nights?|movie nights?|trivia nights?|hangouts?|campaigns?|meetups?|band practice|book club|game days?)\b/.test(lower) && !/\b(workouts?|meals?|posts?|tweets?|study|classes|shifts?|employees?|appointments?|patients?)\b/.test(lower);
  if (groupSched) {
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    if (si >= 0) stack[si] = { tech: 'Supabase (Postgres; no login for guests)', why: 'Stores events, slots and votes; guests join from a share link with just a display name, so nobody has to sign up.' };
    must.length = 0;
    must.push('Create an event with 3-10 candidate dates and times and get a share link', 'Friends open the link, type a name and mark each slot yes / maybe / no, with no account', 'A grid showing who is free when, with the best slot highlighted', 'Lock in the date, then show an RSVP list (going / maybe / out) with an optional max table size and waitlist');
    boss = 'Time zones and identity without logins: slots stored in UTC and shown in each guest\'s zone, and a per-guest edit link so nobody can overwrite someone else\'s votes';
    if (/^Board Game Night$/.test(name) || / Night$/.test(name) && /\bschedul/.test(lower)) name += ' Scheduler';
  }
  // "a leaderboard for my friends' chess games": log results, update Elo, show standings
  const ratingBoard = /^(web|mobile)$/.test(keys[0]) && !secondary && /\b(leaderboards?|standings|elo|rankings?|ladder)\b/.test(lower) && /\b(games?|matches|chess|ping ?pong|table tennis|pool|billiards|smash|fifa|darts|foosball|mario kart|tennis|pickleball|padel|cornhole|league|club|office|friends?)\b/.test(lower) && !/\b(sales|stocks?|github|stars|crypto|steps|fitness|workouts?|students?|grades?)\b/.test(lower);
  if (ratingBoard) {
    must.length = 0;
    must.push('Record a match in a few taps: the players, the winner (or a draw) and the date', 'Ratings update with Elo (everyone starts at 1200, K = 32) and a standings table sorted by rating', 'A player page with rating history and recent results', 'Edit or delete a wrong result and recompute every rating from the match log');
    boss = 'Rating correctness: draws, new players (provisional until ~5 games), and replaying the whole match log after an edit so the standings stay right';
  }
  // "a web app where my friends vote on movie night": a share-link poll with no guest accounts (the scheduler flow, voting on options instead of dates)
  const groupVote = /^(web|mobile)$/.test(keys[0]) && !secondary && !groupSched && !ratingBoard && /\b(vot(e|es|ing)|polls?)\b/.test(lower) && /\b(friends?|family|group|we|our|us|roommates?|housemates?|flatmates?|coworkers?|co-workers?|colleagues?|office|classmates?|team|crew|squad|club|party|guests?|nights?)\b/.test(lower) && !/\b(elections?|ballots?|candidates?|politic\w*|surveys?|forms?|upvot\w*|downvot\w*|stack overflow|reddit|polling station)\b/.test(lower);
  if (groupVote) {
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    if (si >= 0) stack[si] = { tech: 'Supabase (Postgres + Realtime; no login for guests)', why: 'Stores polls, options and votes and pushes live results; friends vote from a share link with just a display name, so nobody signs up.' };
    must.length = 0;
    must.push('Create a poll with 2-10 options (movies, games, places or dishes) and get a share link', 'Friends open the link, type a name and vote with no account (one vote each, changeable until the poll closes)', 'Live results with the leader highlighted', 'Close the poll and announce the winner, with ties broken by a runoff or a coin flip');
    boss = 'One person, one vote without logins: a per-guest edit link or device token so nobody can vote twice or change someone else\'s vote, plus a fair tie-break everyone accepts';
    const ev = lower.match(/\b(movie|game|board game|pizza|trivia|karaoke|date|poker|d&d|dnd|book club) nights?\b/);
    const on = lower.match(/\b(?:vot\w*|polls?) (?:on|for|about) (?:the |our |a |which |what |where |tonight'?s? )?([a-z]+)/);
    if (ev) name = titleCase(ev[1].replace(/^d&d$/, 'dnd') + ' night') + (/\bpolls?\b/.test(lower) && !/\bvot/.test(lower) ? ' Poll' : ' Vote');
    else if (on && !STOP.has(on[1]) && !BREAK.test(on[1])) name = titleCase(on[1].replace(/ies$/, 'y').replace(/([^s])s$/, '$1')) + ' Vote';
    else { const fr = lower.match(/\b(?:vot\w*|polls?)\b.*?\bfor (?:our|my|the|a) ([a-z]+(?: [a-z]+)?)\b/); if (fr) name = titleCase(fr[1].split(' ').filter(w => !STOP.has(w) && !FILLER.has(w) && !BREAK.test(w)).join(' ')) + (/\bpolls?\b/.test(lower) && !/\bvot/.test(lower) ? ' Poll' : ' Vote'); }
  }
  // "a website where people vote on the best ai tools": a public vote/ranking board (entries, one vote per person, ranked list), not a friends' poll
  const crowdVote = keys[0] === 'web' && !secondary && !groupVote && !groupSched && !ratingBoard && /(\b(people|fans|users|visitors|readers|everyone|anyone|the community|community|players|gamers|viewers|devs|developers|the internet|you) (can )?(vote|votes|upvote|upvotes|rank|ranks)\b|\b(vote|voting|upvote) (site|website|board|page|app)\b)/.test(lower) && !/\b(elections?|ballots?|candidates?|politic\w*|surveys?|reddit|hacker news|clone|forum|posts|comments|threads)\b/.test(lower);
  if (crowdVote) {
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    if (si >= 0) stack[si] = { tech: 'Supabase (Postgres + Auth; a votes table with a unique (user, entry) key)', why: 'Sign-in by magic link or GitHub/Google, and the database itself refuses a second vote from the same person.' };
    stack.push({ tech: 'Cloudflare Turnstile + rate limits on the vote route', why: 'Stops bot and script votes without annoying real visitors.' });
    must.length = 0;
    must.push('A seeded list of entries (name, link, one-line description, image) plus a submit form that goes to a review queue', 'One vote per signed-in person per entry, with undo', 'A ranked board sorted by votes, with "this week" and "all time" tabs', 'Moderation: approve submissions, merge duplicates and remove spam');
    boss = 'Vote integrity in public: duplicate accounts, bots and vote brigades (auth, Turnstile and rate limits), plus a ranking that does not freeze the early leaders forever (a weekly board or time decay)';
    const vo = lower.match(/\b(?:vote|votes|upvote|upvotes|rank|ranks)\s+(?:on|for)\s+(?:the\s+|which\s+|what\s+)?((?:best|top|favou?rite|coolest|worst)\s+)?([a-z0-9'&]+(?:\s+[a-z0-9'&]+){0,2}?)(?=\s+(?:of|for|in|that|which|with|from|this|on|by|each|every|to|and)\b|\s*$)/);
    if (vo) { const w = vo[2].split(/\s+/).filter(x => !STOP.has(x) && !FILLER.has(x)); if (w.length) name = titleCase(((vo[1] || '').trim() + ' ' + w.join(' ')).trim().replace(/^favourite/, 'favorite')) + ' Vote'; }
  }
  // "a rust server plugin": Rust (the game) plugins are C# on Oxide/uMod (or Carbon), tested on a local dedicated server
  const rustPlugin = keys[0] === 'web' && !secondary && RUST_GAME_PLUGIN.test(lower);
  if (rustPlugin) {
    primary = { ...primary, label: 'Rust Server Plugin' };
    stack.length = 0;
    [['C# plugin for Oxide/uMod (works on Carbon too)', 'One .cs file the server compiles on load; Oxide hooks (OnPlayerConnected, OnEntityDeath, OnLootSpawn) and AI tools know the API from thousands of public plugins.'], ['A local Rust dedicated server via SteamCMD with Oxide installed', 'Test every change on your own box: drop the .cs into oxide/plugins and it hot-reloads, no client restarts.'], ['Visual Studio Code or Rider with the Oxide/Rust DLLs referenced', 'Autocomplete and compile errors before you upload, instead of reading the server console.'], ['uMod / Codefling (publish) + GitHub (source)', 'Where Rust server owners look for plugins.']].forEach(([tech, why]) => stack.push({ tech, why }));
    must.length = 0;
    const cmdW = (lower.match(/\badds? (?:a |an |the |custom |new )?([a-z]+)/) || [])[1];
    must.push('One chat command' + (cmdW ? ' (/' + cmdW.replace(/s$/, '') + ')' : '') + ' registered with a permission (permission.RegisterPermission) that only granted players can use', 'One Oxide hook that drives the core mechanic', 'Settings in a JSON config file and messages in a lang file, both created with sensible defaults on first load', 'Player data saved to a data file so it survives restarts, and reset (or not) on purpose at a wipe');
    boss = 'Server performance and wipes: hooks run on the main thread, so no heavy work per tick or per entity, timers instead of loops, and data that behaves correctly after a monthly forced wipe and Rust update';
    const ad = lower.match(/\badds? (?:a |an |the |custom |new |more )?([a-z]+(?: [a-z]+)?)/);
    if (ad) { const w = ad[1].split(' ').filter(x => !STOP.has(x) && !FILLER.has(x) && !BREAK.test(x) && !/^(players?|to|commands?)$/.test(x)); name = 'Rust ' + titleCase(w.join(' ') || ad[1]) + ' Plugin'; } else name = 'Rust Server Plugin';
  }
  // "a rust game server wipe tracker": wipe times come from BattleMetrics + each server's schedule, with the monthly forced wipe computed, not a generic scraper
  const rustWipe = !rustPlugin && /^(data|web|bot)$/.test(keys[0]) && /\brust\b/.test(lower) && /\bwipe (trackers?|schedules?|calendars?|times?|days?|dates?|countdowns?|alerts?)\b|\btracks? (rust )?(server )?wipes?\b|\bwipes? (tracker|schedule|calendar)\b/.test(lower) && !/\b(cli|command line|terminal|disk|drive|files?)\b/.test(lower);
  if (rustWipe) {
    name = 'Rust Wipe ' + (/\bcalendar\b/.test(lower) ? 'Calendar' : 'Tracker');
    stack.splice(Math.min(2, stack.length), 0, { tech: 'BattleMetrics API (server name, players, last wipe)', why: 'The data source most Rust wipe sites use; free with an API token, cache it and stay under the rate limit.' });
    must.length = 0;
    must.push('Add servers by BattleMetrics ID (or IP:port) and fetch name, player count and last wipe from the BattleMetrics API', 'Work out each server\'s next wipe from its schedule (weekly, biweekly or monthly) and the monthly forced wipe (first Thursday, 19:00 UK time)', 'A list sorted by next wipe with a countdown, shown in the visitor\'s own time zone', 'An alert (Discord webhook or email) an hour before a followed server wipes');
    boss = 'Wipe times you can trust: servers change their schedule, BattleMetrics lags or misses a wipe, forced wipe moves with Rust update days, and every time has to be right in the user\'s time zone and across daylight saving';
  }
  // "a web app to schedule posts on twitter": compose, queue, and a worker that posts on time through the platform API
  const socialSched = /^(web|mobile)$/.test(keys[0]) && !secondary && !groupSched && /\b(schedul\w*|queue\w*)\b/.test(lower) && /\b(posts?|tweets?|threads?|reels?)\b/.test(lower) && /\b(twitter|x|tweets?|instagram|linkedin|bluesky|threads|mastodon|facebook|tiktok|social media|socials)\b/.test(lower);
  if (socialSched) {
    const api = /\binstagram\b/.test(lower) ? ['Instagram Graph API (content publishing)', 'The official way to publish posts; needs an Instagram business or creator account linked to a Facebook page.'] : /\blinkedin\b/.test(lower) ? ['LinkedIn Posts API (OAuth 2.0)', 'Posts to your profile with the w_member_social scope.'] : /\bbluesky\b/.test(lower) ? ['@atproto/api (Bluesky)', 'Free, open API; log in with an app password.'] : /\bmastodon\b/.test(lower) ? ['Mastodon REST API (masto.js)', 'Free API with native scheduled_at support on most servers.'] : ['X API v2 via twitter-api-v2 (OAuth 2.0 PKCE)', 'Typed client for posting on X; check the API plan limits (posting needs at least the free tier) before you build.'];
    stack.splice(2, 0, { tech: api[0], why: api[1] }, { tech: 'A cron job or queue worker (Vercel Cron, Inngest or a 1-minute loop)', why: 'Posts go out at their scheduled time even when nobody has the app open.' });
    must.length = 0;
    must.push('Write a post with a live character count and a preview', 'Pick a date and time in your own time zone and add it to the queue', 'A worker that publishes due posts through the API and marks each one posted or failed (with the error)', 'A queue view to edit, reschedule or delete upcoming posts');
    boss = 'Posting exactly once, on time: OAuth tokens that expire and refresh, API rate limits and paid tiers, retries that never double-post, and time zones / daylight saving in the schedule';
  }
  // "a trivia game about pokemon" -> "Pokemon Trivia Game"; a quiz loop (question bank, timer, streak) instead of a board/hand turn model
  const quizGame = keys[0] === 'game' && !cozy && /\b(trivia|quiz\w*)\b/.test(lower) && !/\b(card game|board game|deckbuilder|chess|rpg|shooter|platformer|roguelike)\b/.test(lower);
  if (quizGame) {
    const qk = /\btrivia\b/.test(lower) ? 'Trivia' : 'Quiz';
    const tp = lower.match(/\b(?:trivia|quiz\w*)(?:\s+games?)?(?:\s+questions)?\s+(?:about|on|of)\s+(?:the\s+|my\s+|our\s+|famous\s+|all\s+)?([a-z0-9'&]+(?:\s+[a-z0-9'&]+)?)/);
    if (tp) { const w = tp[1].split(/\s+/); const cut = w.findIndex(x => BREAK.test(x) || STOP.has(x) || FILLER.has(x)); const tw = cut >= 0 ? w.slice(0, cut) : w; if (tw.length) { const l = tw.length - 1; if (tw.length === 1 && !/(ss|us|is|ics)$|^(pokemon|anime|series|news|sports|movies)$/.test(tw[l])) tw[l] = tw[l].replace(/ies$/, 'y').replace(/([^s])s$/, '$1'); name = titleCase(tw.join(' ')) + ' ' + qk + ' Game'; } }
    const ti = must.indexOf(TURN_MUST[0]);
    if (ti >= 0) {
      must.length = 0;
      must.push('A question bank in a JSON file (50+ questions' + (tp ? ' on the topic' : '') + ', each with one right answer and three wrong ones)', 'One round: a question, four shuffled answers, a 15-second timer and instant right/wrong feedback', 'Score and streak, and an end screen after 10 questions with a restart', 'No repeated questions within a run');
      if (/\b(multiplayer|friends|online|party|versus|vs)\b/.test(lower)) must.push('A room code so friends join from their phones and answer the same question at the same time');
      boss = 'Good questions: a bank big enough not to repeat, answers that are actually right, and difficulty that ramps instead of jumping';
    }
  }
  // "a godot game where the npcs are llm agents" -> "LLM NPCs Game"
  const npcAI = keys[0] === 'game' && lower.match(/\b(npcs?|villagers?|characters?|citizens|townsfolk|townspeople|shopkeepers?|companions?|animals|pets?|enemies|opponents?)\s+(?:are|is|run on|runs on|use|uses|talk using|talk with|talk through|speak using|are powered by|powered by|are driven by|driven by|controlled by|are controlled by)\s+(?:an?\s+|the\s+|real\s+)?(llms?|ai|gpt|chatgpt|claude|language models?)\b/);
  if (npcAI) { const who = npcAI[1].replace(/^npcs?$/, 'npcs').replace(/^(villager|character|shopkeeper|companion|pet|opponent)$/, '$1s'); const by = { llm: 'llm', llms: 'llm', ai: 'ai', gpt: 'gpt', chatgpt: 'chatgpt', claude: 'claude' }[npcAI[2]] || 'llm'; const gen = (lower.match(/\b(rpg|platformer|roguelike|roguelite|shooter|sim|simulator|visual novel|mmo|metroidvania)\b/) || [, 'game'])[1]; name = titleCase(by + ' ' + who + ' ' + gen); }
  // "a shooter against ai enemies" -> "Shooter vs AI Enemies"
  const vsWho = keys[0] === 'game' && lower.match(/^(?:an?|my)\s+([a-z0-9 -]+?)\s+against\s+(?:the\s+)?(ai|computer|cpu)\s+(bosses|boss|enemy|enemies|opponents?|drivers?|racers?|monsters?|bots?|soldiers?|units?|zombies?|guards?)\s*$/);
  if (vsWho) { const g = vsWho[1].split(/\s+/).filter(x => !STOP.has(x) && !FILLER.has(x)); if (g.length && g.length <= 3) name = titleCase(g.join(' ')) + ' vs ' + titleCase(vsWho[2]) + ' ' + titleCase(vsWho[3]); }
  // "a game where you run from zombies" -> "Zombie Chase Game"; "... escape from a haunted house" -> "Haunted House Escape Game"
  const chase = keys[0] === 'game' && !mgmt && lower.match(/\b(?:where|in which)\s+(?:you|players?|the player)\s+(run away|runs away|run|runs|flee|flees|escape|escapes|hide|hides)\s+from\s+(?:an?\s+|the\s+|some\s+|hordes? of\s+|waves? of\s+)?([a-z0-9']+(?:\s+[a-z0-9']+)?)/);
  if (chase) {
    const w = chase[2].split(/\s+/); const cut = w.findIndex(x => BREAK.test(x) || STOP.has(x) || FILLER.has(x)); const tw = cut >= 0 ? w.slice(0, cut) : w;
    if (tw.length) { const l = tw.length - 1; if (!/(ss|us|is)$/.test(tw[l])) tw[l] = tw[l].replace(/(zomb|cook|goal)ies$/, '$1ie').replace(/ies$/, 'y').replace(/([^s])s$/, '$1'); const gen = (lower.match(/\b(platformer|runner|shooter|roguelike|roguelite|rpg|obby|metroidvania)\b/) || [, 'game'])[1]; const act = /^(escape|escapes)$/.test(chase[1]) ? 'escape' : /^hides?$/.test(chase[1]) ? 'hiding' : 'chase'; name = titleCase(tw.join(' ') + ' ' + act + ' ' + gen); }
  }
  // "a steam deck app that tracks my playtime": the Steam Web API has the hours (total, last 2 weeks, Deck vs desktop); daily snapshots make the history
  const steamPlay = /^(web|mobile|data)$/.test(keys[0]) && !secondary && /\bsteam\b/.test(lower) && /\b(playtime|play time|hours played|time played|hours|how long i play\w*)\b/.test(lower) && !/\b(bot|discord|twitch)\b/.test(lower);
  if (steamPlay) {
    name = 'Steam Playtime Tracker';
    primary = { ...primary, label: 'Web App' };
    stack.length = 0;
    [['Next.js (App Router) + TypeScript', 'One app for the pages and the server routes that call Steam; opens fine in the Steam Deck browser.'], ['Steam Web API (GetOwnedGames + GetRecentlyPlayedGames) with a server-side key', 'Total, last-two-weeks and Steam Deck playtime (playtime_deck_forever) per game for any public profile; the Web API key never reaches the browser.'], ['Supabase (Postgres) + a daily cron (Vercel Cron)', 'Steam only gives running totals, so a daily snapshot per game is what turns them into hours per day and week.'], ['Tailwind CSS + a chart library (Recharts)', 'A small, readable dashboard at the Deck\'s 1280x800.'], ['Optional later: a Decky Loader plugin (React + Python)', 'Shows the same stats in the Steam Deck quick access menu in Game Mode; ship the web app first.']].forEach(([tech, why]) => stack.push({ tech, why }));
    must.length = 0;
    must.push('Sign in through Steam (OpenID) or paste a SteamID / profile URL, with a clear message when the profile or its game details are private', 'Fetch owned and recently played games from the Steam Web API and show hours per game: total, last 2 weeks, and Steam Deck vs desktop', 'A daily snapshot job that stores each game\'s playtime, so you can chart hours per day and per week', 'A dashboard sized for the Steam Deck browser: top games, this week vs last week, and longest streak');
    boss = 'Steam data limits: playtime only for public profiles, totals that update late, no per-session history (you build it from daily snapshots and their differences), and one server-side API key shared by every user under Steam\'s rate limit';
  }
  // "a website that shows when my favorite streamers are live": the Twitch Helix API (+ EventSub) answers "who is live", not a generic scraper
  const liveTrack = /^(web|mobile)$/.test(keys[0]) && !secondary && !steamPlay && /\b(streamers?|twitch channels?|twitch streams?|youtube channels?|youtubers?|youtube streams?)\b/.test(lower) && /\b(live|online|streaming|on air)\b/.test(lower) && !/\b(overlay|obs|chat|alerts? box|clips?)\b/.test(lower);
  if (liveTrack) {
    name = 'Streamer Live Tracker';
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    const tw = [{ tech: 'Twitch Helix API (Get Streams with up to 100 user_login values) via an app access token', why: 'One call says who is live, with title, game, viewers and start time; the client-credentials token stays on the server.' }, { tech: 'Twitch EventSub (stream.online / stream.offline webhooks)', why: 'Twitch tells you the moment someone goes live, instead of polling every minute.' }];
    if (si >= 0) stack.splice(si, 1, ...tw, { tech: 'localStorage for the followed list (Supabase later for accounts and alerts)', why: 'Nobody needs an account to follow a few streamers.' }); else stack.push(...tw);
    must.length = 0;
    must.push('Add streamers by Twitch username, checked with Get Users (avatar and display name), saved ' + (keys[0] === 'mobile' ? 'on the device' : 'in the browser'), 'Live now first: thumbnail, title, game, viewer count and uptime, each linking to the stream', 'One cached server route that asks Helix for every followed streamer in a single batched call, refreshed about once a minute', 'Offline streamers below with when they were last live');
    boss = 'Fresh live status without hammering Twitch: one cached, batched Helix call shared by all visitors (rate limits), app tokens that expire, and EventSub webhook signatures, challenges and revoked subscriptions';
    // "a website that shows when youtube streamers are live": YouTube has no Get Streams; channel RSS feeds + one batched videos.list call answer "who is live"
    if (/\byoutube\b/.test(lower)) {
      const both = /\btwitch\b/.test(lower);
      const yt = [{ tech: "Each channel's RSS feed (youtube.com/feeds/videos.xml?channel_id=...)", why: 'Lists the newest videos and scheduled or live streams for free, with no API quota.' }, { tech: 'YouTube Data API v3 (channels.list for @handles, videos.list for liveStreamingDetails)', why: 'videos.list costs 1 quota unit per 50 videos, so checking which feed videos are live stays inside the free 10,000 units a day; avoid search.list (100 units a call).' }];
      const ti = stack.findIndex(x => /^Twitch Helix/.test(x.tech));
      if (both) stack.splice(ti + 2, 0, ...yt); else { stack.splice(ti, 2, ...yt); }
      must.length = 0;
      must.push(both ? 'Add streamers by Twitch username or YouTube @handle (resolved with Get Users / channels.list), saved ' + (keys[0] === 'mobile' ? 'on the device' : 'in the browser') : 'Add channels by @handle or channel URL, resolved to a channel ID with channels.list (avatar and name), saved ' + (keys[0] === 'mobile' ? 'on the device' : 'in the browser'), 'Live now first: thumbnail, title, viewer count and uptime' + (both ? ' with a Twitch / YouTube badge' : '') + ', each linking to the stream', both ? 'One cached server route that makes one batched Helix Get Streams call for Twitch and, for YouTube, reads each channel\'s RSS feed and checks the newest video IDs with one batched videos.list call' : 'One cached server route that reads each channel\'s RSS feed and checks the newest video IDs with one batched videos.list call (liveBroadcastContent, actualStartTime), refreshed every few minutes', 'Upcoming scheduled streams next, then offline channels with when they were last live');
      boss = both ? 'Two platforms, two models: Twitch says who is live in one batched call, YouTube needs feeds plus videos.list inside a 10,000-unit daily quota; one cache shared by all visitors, and tokens and feeds that fail without breaking the other platform' : 'Quota, not code: the 10,000-unit daily Data API quota (search.list burns 100 per call), RSS feeds that lag a few minutes, scheduled streams that show up before they are live, and one cache shared by all visitors so refreshes do not multiply calls';
    }
  }
  // "a web app that splits restaurant bills": items, people, tax and tip, exact cents, and a share link, not accounts + a generic schema
  const billSplit = /^(web|mobile)$/.test(keys[0]) && !secondary && (/\bsplitwise\b/.test(lower) || (/\bsplit\w*\b/.test(lower) && /\b(bills?|checks?|tabs?|expenses?|costs?|dinner|restaurant|receipts?|rent|groceries)\b/.test(lower))) && !/\b(pdfs?|files?|videos?|audio|screens?|keyboards?|tests?|traffic|text)\b/.test(lower);
  if (billSplit) {
    const exp = /\b(expenses?|costs?|splitwise|trips?|rent|groceries|roommates?|housemates?|flatmates?)\b/.test(lower) && !/\b(bills?|checks?|tabs?|dinner|restaurant|receipts?)\b/.test(lower);
    if (/\bsplitwise\b/.test(lower)) name = 'Splitwise Clone'; else if (exp) name = /\brent\b/.test(lower) && !/\bexpenses?\b/.test(lower) ? 'Rent Splitter' : (/\btrips?\b/.test(lower) ? 'Trip ' : /\b(roommates?|housemates?|flatmates?)\b/.test(lower) ? 'Roommate ' : '') + 'Expense Splitter'; else name = 'Bill Splitter';
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    if (si >= 0) stack[si] = { tech: 'Supabase (Postgres; ' + (exp ? 'groups' : 'bills') + ' behind an unguessable share link, no sign-up)', why: 'Everyone opens the same link and sees the same numbers; amounts stored as integer cents.' };
    must.length = 0;
    if (exp) must.push('Create a group, add people by name and get a share link (no sign-up)', 'Add an expense: who paid, how much, and split evenly, by shares or by exact amounts', 'Balances: who owes whom, simplified to the fewest payments', 'Settle up: mark a payment as done, with an edit / delete history of every expense');
    const scanBill = !exp && /\b(scans?|scanning|photos?|camera|receipts?)\b/.test(lower);
    if (scanBill && !stack.some(x => /vision/.test(x.tech))) stack.push({ tech: 'A vision-capable model API (GPT-4o, Claude or Gemini) called from one server function', why: 'Send the receipt photo, get the items back as JSON; keep the API key on the server, never in the app.' });
    if (!exp) must.push(scanBill ? 'Snap or upload a receipt photo and read the items, prices, tax and tip with a vision model, editable before you split' : 'Enter the bill: items with prices (or just a total), plus tax and tip as % or an amount', 'Add the people and tap who had each item (shared items split between the people who had them)', 'Per-person totals with tax and tip split in proportion, rounded so the parts add up exactly to the bill', 'A share link (no sign-up) where everyone sees what they owe and can mark it paid');
    boss = 'Money math you can trust: integer cents, rounding remainders that still add up to the total, tax and tip split in proportion, and two people editing the same ' + (exp ? 'group' : 'bill') + ' at once';
  }
  // "an ai agent that books my flights": real fares from a flights API, and nothing is paid for without a yes
  const flightAgent = keys[0] === 'agent' && /\bflights?\b/.test(lower) && /\b(books?|booking|finds?|search\w*)\b/.test(lower);
  if (flightAgent) {
    stack.splice(3, 0, { tech: 'Duffel API (flight search, offers and orders; free test mode)', why: 'Real fares and bookings through one modern API; build everything against test mode before any real card is charged.' });
    const bk = /\b(books?|booking)\b/.test(lower);
    const ti = must.indexOf('Two real tools the agent can call');
    if (ti >= 0) must[ti] = bk ? 'Two real tools: search flights (Duffel offer requests) and book a chosen offer, both in Duffel test mode first' : 'Two real tools: search flights (Duffel offer requests) and save a route to re-check for price drops';
    const hi = must.findIndex(m => /^Hard limits/.test(m));
    if (hi >= 0 && bk) must[hi] = 'Hard limits: a max price and max steps, and the agent shows the exact flight, times and price and waits for your yes before it books';
    boss = bk ? 'Making the agent reliable with real money: offers that expire or change price, wrong dates or airports from a vague request, and never booking (or double-booking) without a confirmed yes' : 'Making the agent reliable: wrong dates or airports from a vague request, offers that expire or change price between searches, and search costs under control';
  }
  // "a typing speed game": a typing loop (words, live letter feedback, WPM + accuracy), not a player and an enemy
  const typingGame = keys[0] === 'game' && !cozy && !quizGame && /\b(typing|wpm|words per minute)\b/.test(lower);
  if (typingGame) {
    const foes = /\b(zombies?|enem(y|ies)|monsters?|aliens?|invaders?|asteroids?|meteors?|shoot\w*|ships?|defen[cs]e)\b/.test(lower);
    const fw = (lower.match(/\b(zombies?|monsters?|aliens?|invaders?|asteroids?|meteors?|ghosts?|robots?|dragons?)\b/) || [])[1];
    if (fw && name === 'Typing Game') name = titleCase(fw.replace(/(zomb)ies$/, '$1ie').replace(/([^s])s$/, '$1')) + ' Typing Game';
    must.length = 0;
    must.push(foes ? 'Enemies move toward you, each carrying a word; typing a word correctly destroys that enemy' : 'A word list (a few hundred common words in a JSON file) shown as a line of text to type', 'Live feedback: each letter turns green or red as you type, with backspace to fix mistakes', 'A timed run (30 or 60 seconds' + (foes ? ', or until an enemy reaches you' : '') + ') ending on a results screen with WPM, accuracy and your best score', 'Difficulty that ramps: longer words and less time as the run goes on');
    boss = 'Fair, responsive input: keydown handling with no missed or doubled letters, a WPM formula (correct characters / 5 per minute) that matches typing sites, and mobile / IME keyboards that do not send normal key events';
  }
  // "a roblox farming game": the cozy loop, but saves and money live on the server (DataStore), like any Roblox game
  if (engine === 'roblox' && cozy) {
    const si = must.indexOf(COZY_MUST[2]);
    if (si >= 0) must[si] = 'Progress (coins, upgrades, unlocks) saved with DataStoreService so it survives rejoining';
    must.push('Money and upgrades changed only on the server (RemoteEvents ask, the server checks), never trusted from the client');
    boss = COZY_BOSS + '; plus DataStore saves that never lose or duplicate progress, and a server that never trusts the client';
  }
  // "a godot puzzle game about light and mirrors": a puzzle loop (one mechanic, hand-made levels, undo), not a player and an enemy
  const plainGame = keys[0] === 'game' && must[0] === TYPES.game.must[0] && !quizGame && !typingGame;
  const horrorGame = plainGame && /\b(horror|scary|creepy|terrifying)\b/.test(lower) && !/\b(visual novel|card game|board game|shooter|fps|roguelike|roguelite|platformer|tower defen[cs]e|typing|trivia|quiz\w*|text adventure|chess|multiplayer)\b/.test(lower) && !/\b(?:where|in which) (?:you|players?) (?:run|runs|manage|manages|own|owns|build|builds) (?:an?|the|your|my) /.test(lower);
  const puzzleGame = plainGame && !horrorGame && /\b(puzzle|puzzles|puzzler|sokoban)\b/.test(lower) && !/\b(match[- ]?3|jigsaw|sudoku|crossword|wordle|word|tetris|platformer|shooter|roguelike|roguelite|rpg|metroidvania|escape rooms?|multiplayer|chess)\b/.test(lower);
  if (puzzleGame) {
    must.length = 0;
    must.push('One core mechanic (push, rotate, connect, swap or reflect) that the first level teaches without any text', '10 hand-made levels stored as data (a JSON or tile-map file), each adding one new idea or twist to the mechanic', 'Undo (one step back) and reset (restart the level) on single keys, and a clear solved moment before the next level', 'A level select that unlocks levels in order and remembers which ones are solved (saved locally)');
    boss = 'Level design, not code: a difficulty curve where each level teaches one idea, no level that is unsolvable or solved by accident (playtest each one or write a tiny solver), and undo that restores the exact previous state';
  }
  // "a horror game in a haunted lighthouse": tension (darkness, sound, one stalker, hiding), not a score and an obstacle
  if (horrorGame) {
    if (/^(Scary|Creepy|Terrifying) Game$/.test(name)) name = 'Horror Game';
    must.length = 0;
    must.push('One small, dark map (a few rooms) explored with a flashlight that has limited battery', 'One stalker enemy that patrols, investigates noises and chases on sight; being caught ends the run', 'Hide spots (lockers, under beds, closets) and footstep noise the stalker can hear, quieter when you crouch', 'A goal that forces you to move: find 3-5 keys or items, then reach the exit');
    boss = 'Tension that stays fair: a stalker AI (patrol, investigate, chase, lose you) that is scary but beatable, lighting and 3D sound that tell you where danger is, and pacing between quiet stretches and chases';
  }
  // "a discord bot that posts when my favorite streamer goes live": Twitch Helix + EventSub tell the bot, it posts once per stream
  const liveBot = keys[0] === 'bot' && streamLiveBot(lower);
  if (liveBot) {
    name = 'Streamer Live Alerts';
    const pf = /\bdiscord\b/.test(lower) ? ['Node.js + discord.js', 'Best docs and examples for Discord bots; easy for AI tools to write.'] : /\btelegram\b/.test(lower) ? ['Node.js + grammY (Telegram)', 'Modern, well-documented Telegram bot framework; easy for AI tools to write.'] : /\bslack\b/.test(lower) ? ['Node.js + Slack Bolt', "Slack's official bot framework, with slash commands and events built in."] : null;
    if (pf) stack[0] = { tech: pf[0], why: pf[1] };
    stack.splice(1, 0, { tech: 'Twitch Helix API (Get Users, Get Streams) via an app access token', why: 'Checks usernames and fetches the title, game and thumbnail for the post; the client-credentials token stays on the server.' }, { tech: 'Twitch EventSub (stream.online / stream.offline webhooks)', why: 'Twitch tells the bot the moment a streamer goes live; poll Get Streams once a minute until the webhook works.' });
    must.length = 0;
    const sl = /\bdiscord\b/.test(lower) || /\bslack\b/.test(lower);
    must.push((sl ? '/follow <twitch username> in a channel' : '/follow <twitch username>') + ' (checked with Get Users), stored per ' + (/\bdiscord\b/.test(lower) ? 'server' : /\bslack\b/.test(lower) ? 'workspace' : 'chat') + ' in SQLite, plus /unfollow and /list', 'An EventSub stream.online subscription for each followed streamer (or a once-a-minute Get Streams poll to start)', 'A go-live post with the stream title, game, thumbnail and link' + (/\bdiscord\b/.test(lower) ? ', with an optional role ping' : ''), 'One post per stream: no duplicates when the bot restarts or Twitch resends the event');
    boss = 'EventSub done right: verifying webhook signatures and the challenge, resubscribing after revocations and restarts, de-duplicating stream.online events, and app tokens that expire';
  }
  // "a horror game where a monster hunts you in a hospital" / "a puzzle game where you rotate pipes" / "a racing game set in space": name the game after its place, mechanic or setting
  if (keys[0] === 'game' && name === 'Horror Game') {
    const hp = lower.match(/\b(?:in|inside|at|through|explore|explores|exploring|escape|escapes|escaping|from|around|of)\s+(?:an?|the|your|my|this|some)?\s*((?:abandoned|haunted|old|dark|empty|flooded|ruined|creepy|cursed|derelict|deserted|forgotten|underground|sunken|frozen|burning|lonely|silent)\s+)?(gas station|diner|pizzeria|supermarket|hospital|asylum|school|house|mansion|lighthouse|hotel|motel|forest|woods|mall|prison|space station|station|ship|cabin|church|cemetery|graveyard|factory|office|subway|sewers?|farmhouse|farm|castle|village|town|carnival|circus|apartment|basement|attic|bunker|lab|laboratory|mine|cave|island|submarine|orphanage|museum|library|theater|theatre|zoo|morgue|warehouse|train|backrooms)\b/);
    if (hp) name = titleCase(((hp[1] || '') + hp[2]).replace(/s$/, (m) => /sewers$/.test(hp[2]) ? '' : m)) + ' Horror Game';
  }
  if (keys[0] === 'game' && name === 'Puzzle Game') {
    const pm = lower.match(/\b(?:where|in which) (?:you|players?) (rotate|slide|push|connect|swap|stack|flip|reflect|redirect|arrange|guide|bend|untangle|pour|fold|link|merge|drop|tilt)s?\s+(?:the |a |an |some |your )?(?:(?:colou?red|wooden|tiny|little|broken|glowing)\s+)?([a-z]+)/);
    if (pm && !/^(things|stuff|objects|them|it|items|around|up|to|and|everything|pieces?)$/.test(pm[2])) { const obj = pm[2].replace(/(sh|ch|x)es$/, '$1').replace(/ies$/, 'y').replace(/([^s])s$/, '$1'); name = titleCase((pm[1] === 'slide' ? 'sliding ' : '') + obj) + ' Puzzle Game'; }
  }
  if (keys[0] === 'game' && name === 'Racing Game') {
    const rv = lower.match(/\bwith (hover ?cars?|hovercrafts?|karts?|go[- ]karts?|bikes?|motorcycles?|motorbikes?|boats?|jet ?skis?|drones?|monster trucks?|trucks?|spaceships?|starships?|horses?|lawn ?mowers?|shopping carts?|tanks?|snails?|ducks?)\b/);
    const rs = lower.match(/\b(?:set )?(?:in|on|through|across|around|under)\s+(?:the |a |an )?(outer space|space|mars|the moon|moon|deserts?|neon city|cyberpunk city|city|mountains?|snow|jungle|ocean|underwater|sea|future|tokyo|beach|volcano|ice|sky|clouds|galaxy|sewers?|lava)\b/);
    if (rv) name = titleCase(rv[1].replace(/^hover ?cars?$/, 'hover car').replace(/^(go[- ]karts?|karts?)$/, 'kart').replace(/^(jet ?skis?)$/, 'jet ski').replace(/s$/, '')) + ' Racing Game';
    else if (rs) name = titleCase(rs[1].replace(/^outer space$/, 'space').replace(/^the moon$/, 'moon').replace(/^(deserts|mountains|sewers)$/, (m) => m.slice(0, -1))) + ' Racing Game';
  }
  // "a match-3 puzzle game" / "a jigsaw puzzle app" / "a horror visual novel": the genre's own loop, not a player and an enemy
  const genreBase = keys[0] === 'game' && !quizGame && !typingGame && !cozy && (must[0] === TYPES.game.must[0] || must[0] === TURN_MUST[0]);
  const match3 = genreBase && /\bmatch[- ]?(3|three)\b|\bcandy crush\b|\bbejeweled\b/.test(lower);
  const jigsaw = genreBase && !match3 && /\bjigsaws?\b/.test(lower);
  const vnGame = keys[0] === 'game' && !quizGame && !typingGame && !mgmt && engine !== 'roblox' && !match3 && !jigsaw && /\bvisual novels?\b|\bdating sims?\b/.test(lower) && !/\b(llm|gpt|chatgpt|claude|ai[- ]generated|ai characters?|ai npcs?|ai writes|generated by ai)\b/.test(lower);
  if (match3) {
    if (/^(?:(?:Godot|Unity|Phaser|Roblox|Unreal|PICO-8|Three\.js|Mobile|Browser|Web) )?Match 3(?: Puzzle| Game| Puzzle Game)?$/.test(name)) { const mt = lower.match(/\b(?:with|about|of)\s+(?:the |a |an )?(candy|candies|gems?|jewels?|fruits?|cats?|animals?|monsters?|cookies?|sweets|pets?|flowers?|food)\b/); name = (mt ? titleCase(mt[1].replace(/^candies$/, 'candy').replace(/^sweets$/, 'sweet').replace(/ies$/, 'y').replace(/([^s])s$/, '$1')) + ' ' : '') + 'Match-3 Game'; }
    must.length = 0;
    must.push('An 8x8 grid of 5-6 tile types, generated with no ready-made matches at the start', 'Swap two neighbouring tiles; the swap only stays if it makes a line of 3 or more, otherwise it slides back', 'Matched tiles clear, the tiles above fall, new ones drop in from the top, and cascades keep scoring until the board settles', 'A level goal: reach a target score (or clear N tiles of one colour) in a limited number of moves, with a reshuffle when no move is left');
    boss = 'Board logic in the right order: finding every match (lines of 3, 4, 5, L and T shapes), resolving clear, fall and refill as cascades while animations finish, and detecting when no valid move is left';
  }
  if (jigsaw) {
    must.length = 0;
    must.push('Load an image (built-in pictures or your own upload) and cut it into a grid of pieces, square first, classic tab shapes later', 'Drag and drop pieces with mouse and touch; a piece snaps into place when dropped close to its spot', 'A difficulty picker (12, 48 or 100 pieces), a timer and a completed-picture moment', 'Progress saved on the device so a half-done puzzle is still there tomorrow');
    boss = 'Pieces that feel right: cutting the image into tab shapes (canvas paths and masks), hit-testing irregular pieces, connected groups that move together, and staying smooth with 100+ pieces on a phone';
  }
  if (vnGame) {
    if (/ Visual$/.test(name)) name += ' Novel';
    if (/^(?:(?:Renpy|Ren'py|Godot|Unity|Phaser|Unreal|Cozy|Cosy|Simple|Short|Small|Little|Browser|Web) )?Visual Novel$/.test(name)) { const va = lower.match(/\bvisual novel (?:about|where|with|set in|in)\s+(?:an? |the |my |your |you )?([a-z]+)(?: ([a-z]+))?/); if (va && !/^(are|is|be|play|can|have|meet)$/.test(va[1])) name = titleCase(va[1] + (va[2] && !/^(who|that|which|where|and|in|with|on|at|to|for|of|is|are|solving|solves|trying)$/.test(va[2]) ? ' ' + va[2] : '')) + ' Visual Novel'; }
    if (!/\b(ren'?py|renpy)\b/.test(lower) && !stack.some(x => /\bInk\b/.test(x.tech))) stack.splice(1, 0, { tech: 'Ink + inkjs (branching script)', why: "Write scenes, dialogue and choices in Ink's plain-text format and play them in the browser; writers never touch the game code. (Ren'Py is the all-in-one alternative.)" });
    if (/\b(ren'?py)\b/.test(lower)) { stack.length = 0; [["Ren'Py 8 (.rpy scripts, Python for game logic)", 'The standard visual novel engine: dialogue, choices, saves, rollback and menus are built in, and AI tools know its script language well.'], ['Itch.io (Ren\'Py web, Windows, Mac and Android builds)', 'Ren\'Py builds every platform from one project; itch.io hosts them free.'], ['Git', 'Commit after every working scene so you can roll back a broken branch.']].forEach(([tech, why]) => stack.push({ tech, why })); }
    must.length = 0;
    const scary = /\b(horror|scary|creepy|psychological|thriller)\b/.test(lower);
    must.push((/\b(ren'?py)\b/.test(lower) ? 'Ren\'Py script files (.rpy)' : 'A script file (Ink, or Ren\'Py)') + ' holding every scene, line and choice, kept out of the game code', 'A dialogue box with the speaker\'s name and portrait over a background, click or space to advance, and a log of past lines', 'Choices that branch the story and set flags (trust, clues found' + (scary ? ', sanity' : '') + ') that later scenes check, leading to at least 2 endings', scary ? 'Atmosphere cues in the script: music and sound changes, screen effects and timed reveals for the scary beats' : 'Save / load slots and an auto-save at every choice');
    boss = 'Keeping the branches under control: flags and endings you can actually test (a debug menu that jumps to any scene and sets flags), choices that matter without the story exploding into too many paths' + (scary ? ', and dread built from pacing and sound rather than one jump scare after another' : ', and saves that still load after you edit the script');
  }
  // "a typing test website": a timed test with live letter feedback and WPM + accuracy, no accounts
  const typeTest = /^(web|mobile)$/.test(keys[0]) && !secondary && !/\b(tutor|lessons?|trainer|teacher|course|school|class|learn\w*|teach\w*|touch typing)\b/.test(lower) && /\btyping (tests?|speed|races?)\b|\bwpm\b|\bwords per minute\b|\bmonkeytype\b|\btyperacer\b/.test(lower);
  if (typeTest) {
    name = /\bspeed\b/.test(lower) ? 'Typing Speed Test' : /\b(races?|typeracer)\b/.test(lower) ? 'Typing Race' : 'Typing Test';
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    if (si >= 0) stack[si] = { tech: 'localStorage for best scores (Supabase later for a leaderboard)', why: 'Start a test in one click; nobody needs an account to see their WPM.' };
    must.length = 0;
    must.push('A test screen with a random line from a word list (or a quote), 15 / 30 / 60-second modes and a restart key', 'Live feedback: each character turns green or red as you type, with a caret and backspace to fix mistakes', 'A results screen with WPM, raw WPM, accuracy and a WPM-over-time chart', 'Personal best per mode saved on the device; no sign-up');
    boss = 'Fair, responsive input: keydown handling with no missed or doubled letters, a WPM formula (correct characters / 5 per minute) that matches typing sites, and mobile / IME keyboards that do not send normal key events';
  }
  // "a game where you clean dirty dishes" -> "Dish Washing Game", not "Dirty Dishes Cleaner"
  if (keys[0] === 'game' && / Cleaner$/.test(name)) {
    const cw = lower.match(/\b(?:where|in which) (?:you|players?) (?:clean|cleans|wash|washes|scrub|scrubs)\s+(?:up )?(?:the |a |an |some |your )?(?:(?:dirty|old|messy|filthy|greasy|muddy|dusty)\s+)?([a-z]+)/);
    if (cw) name = titleCase(cw[1].replace(/(sh|ch|x)es$/, '$1').replace(/ies$/, 'y').replace(/([^s])s$/, '$1')) + (/^(dish|plate|car|window|dog|cat|pet|truck|boat|clothe|laundry)/.test(cw[1]) ? ' Washing Game' : ' Cleaning Game');
  }
  // "a twitch bot that announces when i go live": EventSub stream.online -> one chat message, not a generic bot
  const goLiveChat = keys[0] === 'bot' && /\btwitch\b/.test(lower) && !/\b(discord|slack|telegram|guilded|youtube|kick|tweets?|tweeting|twitter|x|bluesky|instagram|email\w*|texts?|sms)\b/.test(lower) && /\b(go|goes|going|went|is|am) live\b|\bstart(s|ing)? (streaming|a stream|my stream)\b|\bstream starts?\b/.test(lower);
  if (goLiveChat) {
    name = 'Go Live Announcer';
    stack[0] = { tech: 'Node.js + Twurple (@twurple/chat + @twurple/eventsub-ws)', why: 'One TypeScript-friendly library for Twitch chat and EventSub over a WebSocket, so the bot needs no public URL.' };
    if (!stack.some(x => /EventSub/.test(x.tech))) stack.splice(1, 0, { tech: 'Twitch EventSub stream.online (WebSocket transport) + Helix Get Channel Information', why: 'Twitch tells the bot the moment you go live; Get Channel Information adds the title and game to the message.' });
    must.length = 0;
    must.push('A one-time Twitch login for the bot account and your channel (OAuth with chat scopes), with tokens refreshed automatically', 'An EventSub stream.online subscription for your channel over a WebSocket', 'A go-live chat message with the stream title and game, editable with !golive set <text> by mods', 'One announcement per stream: no repeats when the bot reconnects or Twitch resends the event');
    boss = 'EventSub over a WebSocket done right: user tokens that expire and need refreshing, session_reconnect messages and dropped connections without missing or repeating the go-live event, and chat rate limits';
  }
  // "a discord bot that posts my youtube uploads" / "... when i go live on youtube": the channel RSS feed (+ WebSub) and videos.list, not a generic bot
  const ytBot = keys[0] === 'bot' && !secondary && /\b(discord|slack|telegram|guilded)\b/.test(lower) && /\b(youtube|youtubers?)\b/.test(lower) && !/\btwitch\b/.test(lower) && /\b(uploads?|uploaded|new videos?|videos?|shorts|go live|goes live|going live|is live|live streams?|livestreams?|streams?)\b/.test(lower) && /\b(posts?|posting|alerts?|notif\w*|announces?|tells?|pings?|shares?|when)\b/.test(lower) && !/\b(summar\w*|transcri\w*|download\w*|music|play\w*|comments?|analytics|subscribers? count)\b/.test(lower);
  if (ytBot) {
    const live = /\b(go live|goes live|going live|is live|live streams?|livestreams?|streams?|streaming)\b/.test(lower);
    name = live ? 'YouTube Live Alerts' : 'YouTube Upload Alerts';
    const pf = /\bdiscord\b/.test(lower) ? ['Node.js + discord.js', 'Best docs and examples for Discord bots; easy for AI tools to write.'] : /\btelegram\b/.test(lower) ? ['Node.js + grammY (Telegram)', 'Modern, well-documented Telegram bot framework; easy for AI tools to write.'] : /\bslack\b/.test(lower) ? ['Node.js + Slack Bolt', "Slack's official bot framework, with slash commands and events built in."] : null;
    if (pf) stack[0] = { tech: pf[0], why: pf[1] };
    stack.splice(1, 0, { tech: "Each channel's RSS feed (youtube.com/feeds/videos.xml?channel_id=...), optionally pushed via WebSub", why: 'Lists the newest videos for free, no API quota; WebSub (PubSubHubbub) pushes new uploads within seconds once it works.' }, { tech: 'YouTube Data API v3 (channels.list for @handles' + (live ? ', videos.list for liveStreamingDetails' : '') + ')', why: live ? 'videos.list costs 1 quota unit per 50 videos, so checking which feed videos are live stays inside the free 10,000 units a day; avoid search.list (100 units a call).' : 'Turns an @handle or channel URL into the channel ID the feed needs; one cheap call per /follow.' });
    must.length = 0;
    must.push('/follow <@handle or channel URL>, resolved to a channel ID and stored per ' + (/\bdiscord\b/.test(lower) ? 'server' : /\bslack\b/.test(lower) ? 'workspace' : 'chat') + ' in SQLite, plus /unfollow and /list', "Check each followed channel's RSS feed every 5 minutes (or subscribe with WebSub for instant pushes)", live ? 'When a feed video is live (videos.list liveBroadcastContent = live), post the stream title, thumbnail and link' + (/\bdiscord\b/.test(lower) ? ', with an optional role ping' : '') : 'Post each new upload with its title, thumbnail and link' + (/\bdiscord\b/.test(lower) ? ', with an optional role ping' : ''), 'One post per video: seen video IDs stored, so restarts and edited titles never repost');
    boss = 'Feeds and quota: RSS feeds that lag a few minutes or briefly drop videos, WebSub subscriptions that expire every few days and must be renewed, ' + (live ? 'scheduled streams and premieres that show up before they are live' : 'Shorts and premieres in the same feed') + ', and the 10,000-unit daily Data API quota';
  }
  // "a discord bot that splits bills": /split, balances in SQLite, settle up, exact cents
  const splitBot = keys[0] === 'bot' && !secondary && ((/\bsplit\w*\b/.test(lower) && /\b(bills?|checks?|tabs?|expenses?|costs?|dinner|lunch|restaurant|receipts?|rent|groceries)\b/.test(lower)) || /\bowes?\b/.test(lower)) && !/\b(pdfs?|files?|videos?|audio|screens?|tests?|text|teams?)\b/.test(lower);
  if (splitBot) {
    if (/^Owe/.test(name)) name = 'Expense Splitter'; else if (name === 'Expense Splitter' && /\btrips?\b/.test(lower)) name = 'Trip Expense Splitter';
    const si = stack.findIndex(x => /^SQLite/.test(x.tech));
    if (si >= 0) stack[si] = { tech: 'SQLite (better-sqlite3), amounts as integer cents', why: 'Expenses and balances per ' + (/\bdiscord\b/.test(lower) ? 'server' : 'group') + ' in one file; integer cents so totals never drift.' };
    must.length = 0;
    must.push('/split <amount> <what> @people: who paid, split evenly or by shares, saved per ' + (/\bdiscord\b/.test(lower) ? 'server' : /\bslack\b/.test(lower) ? 'workspace' : 'group') + ' in SQLite', '/balance: who owes whom, simplified to the fewest payments', '/settle @person to record a payment, with /history and /undo for the last entry', 'Exact cents: rounding remainders go to someone, so every split adds up to the total');
    boss = 'Money math you can trust in chat: integer cents, remainders that still add up, two people running /split at the same moment, and keeping each ' + (/\bdiscord\b/.test(lower) ? 'server' : 'group') + '\'s balances separate';
  }
  // "a steam bot that tracks game prices": the Steam store price endpoint (and IsThereAnyDeal), alerts once per sale
  const steamDeal = /^(bot|web|data|mobile)$/.test(keys[0]) && !secondary && steamPrice(lower) && !steamPlay;
  if (steamDeal) {
    if (!/Steam/.test(name)) name = /\b(sales?|wishlist|deals?|discounts?|on sale)\b/.test(lower) && !/\bprices?\b/.test(lower) ? 'Steam Sale Alerts' : 'Steam Price Tracker';
    const api = { tech: 'Steam store API (appdetails with filters=price_overview and your cc region) + IsThereAnyDeal API (optional)', why: 'Current price, discount and currency per game straight from Steam; IsThereAnyDeal adds other stores and the lowest-ever price.' };
    const bi = keys[0] === 'bot' ? 1 : stack.findIndex(x => /Supabase|SQLite|Postgres/.test(x.tech));
    stack.splice(bi >= 0 ? bi : stack.length, 0, api);
    must.length = 0;
    if (keys[0] === 'bot') must.push('/watch <game name or Steam link>: find the app id (Steam store search) and save it with an optional target price in SQLite', 'A scheduled check every few hours of every watched game\'s price, batched and cached', 'Alert when a game goes on sale or drops below your target: old vs new price, % off and a store link', 'One alert per sale (no repeats every check), plus /list and /unwatch');
    else must.push('Search a game (Steam store search) and add it to a watchlist with a target price', 'Current price, % off and the lowest-ever price for each watched game', 'A daily price snapshot (cron) that draws a price-history chart per game', 'An email or push alert when a game drops below your target or hits a new low, once per sale');
    boss = 'Price data without getting blocked: the Steam store endpoints are unofficial and rate-limited (about 200 requests per 5 minutes), so batch and cache; regional prices and currencies; and alerting once per sale, not every check';
  }
  // "a typing tutor for kids": lessons that add keys a few at a time, not a generic web app with accounts
  const typeTutor = /^(web|mobile)$/.test(keys[0]) && !secondary && /\btyping (tutor|lessons?|trainer|teacher|course|practice|school|class)\b|\b(learn|learns|learning|teach|teaches|teaching)\b[a-z ]{0,24}\bto type\b|\btouch typing\b/.test(lower);
  if (typeTutor) {
    const kids = /\b(kids?|children|child|my son|my daughter|students|classroom)\b/.test(lower);
    name = kids ? 'Kids Typing Tutor' : 'Typing Tutor';
    const si = stack.findIndex(x => /Supabase/.test(x.tech));
    if (si >= 0) stack[si] = { tech: 'localStorage for progress (' + (kids ? 'one profile per child on the device; ' : '') + 'accounts later)', why: kids ? 'No sign-up and no personal data, which keeps it simple and kid-safe.' : 'Start practicing in one click; add accounts only when people ask to sync.' };
    must.length = 0;
    must.push('Lessons that add a few keys at a time (home row first), with an on-screen keyboard showing which finger to use', 'Live letter feedback (green / red) and WPM + accuracy at the end of each lesson, with stars or a pass mark to unlock the next one', kids ? 'Kid-friendly: big text, short lessons, no ads, chat or accounts; progress saved per child profile on the device' : 'Progress saved on the device: lessons passed, best WPM and the keys you miss most', 'A short typing game (falling words) as a reward after each lesson');
    boss = 'Fair, responsive input (no missed or doubled keys, mobile and IME keyboards that skip normal key events) and a lesson order that really builds skill' + (kids ? '; plus kid privacy: collect nothing personal, so COPPA rules for under-13s never come into play' : '');
  }
  // "an ai that writes my dungeon master session recaps": paste raw notes, get a recap
  const recap = keys[0] === 'aiapp' && /\brecaps?\b/.test(lower);
  if (recap) { const fi = must.findIndex(m => /^One input form/.test(m)); if (fi >= 0) must[fi] = 'One box to paste raw session notes (bullet points, a chat log or a transcript) plus the cast\'s names, so the recap spells them right'; }
  // "a chess game against an ai that trash talks": the engine picks moves; an LLM only writes the banter
  const vsAI = keys[0] === 'game' && /\bagainst (an? |the )?(ai|computer|bot|llm|cpu)\b(?! (bosses|enem(y|ies)|monsters?|robots?|zombies?|aliens?|minions?|soldiers?|arm(y|ies)|swarms?|hordes?|drones?|waves?))|\b(trash[- ]?talk\w*|banter\w*|taunt\w*|smack[- ]talk\w*)\b/.test(lower);
  const trash = vsAI && /\b(trash[- ]?talk\w*|banter\w*|taunt\w*|smack[- ]talk\w*|roasts?|insults?|talks?|chats?|commentary)\b/.test(lower);
  if (vsAI) {
    const chess = /\bchess\b/.test(lower);
    const li = stack.findIndex(x => /^An LLM API behind/.test(x.tech));
    if (li >= 0) stack.splice(li, 1);
    if (chess && !engine) {
      stack[0] = { tech: 'Vite + TypeScript + react-chessboard (or chessground)', why: 'A ready-made drag-and-drop board, so you build the game, not a chess UI; skip Phaser for a board game.' };
      const ki = stack.findIndex(x => /^Kenney/.test(x.tech)); if (ki >= 0) stack.splice(ki, 1);
      stack.splice(1, 0, { tech: 'chess.js + Stockfish (WASM, in a Web Worker)', why: 'chess.js knows every rule (castling, en passant, checkmate), so you never write move validation; Stockfish picks the AI\'s move at an adjustable skill level without freezing the page.' });
      const ti = must.indexOf(TURN_MUST[1]);
      if (ti >= 0) must[ti] = 'One full turn: you move (legal moves only, from chess.js) and the AI replies with a Stockfish move at a chosen skill level';
    } else {
      const ti = must.indexOf(TURN_MUST[1]);
      if (ti >= 0) must[ti] = 'One full turn: you act and the computer opponent responds with a legal move picked by simple rules or a search (minimax), at a chosen difficulty';
    }
    if (trash) {
      stack.push({ tech: 'An LLM API behind one server function (a persona prompt for the trash talk)', why: 'Only the banter comes from the model; moves come from the ' + (chess ? 'engine' : 'game logic') + ', so the AI never plays an illegal move. Keep the API key on the server.' });
      must.push('After each move, one short in-character trash-talk line from the LLM (given the move and who is winning), capped per game, with a mute toggle');
      boss = (must.length && boss === TURN_BOSS ? TURN_BOSS : boss) + '; plus trash talk that reacts to the real position (send the move and who is ahead, not the whole game) without slowing the reply or crossing into mean';
    }
    const gw = (lower.match(/\b(chess|checkers|go|connect four|connect 4|tic tac toe|poker|blackjack|card game|board game|othello|reversi|backgammon|battleship|pong|air hockey)\b/) || [])[1];
    if (gw) name = (trash ? 'Trash-Talking ' + titleCase(gw) + ' AI' : titleCase(gw) + ' vs AI');
  }
  // "a fighting game against ai bosses": the boss AI is a small state machine with readable tells
  const aiFoes = keys[0] === 'game' && !cozy && !turn && !tower && !vehicle && /\b(ai|computer|cpu) (bosses|boss|enem(y|ies)|opponents?)\b/.test(lower);
  if (aiFoes) { const ei = must.indexOf('One enemy or obstacle type'); if (ei >= 0) must[ei] = /\bboss(es)?\b/.test(lower) ? 'One boss whose AI is a small state machine (idle, approach, attack, recover) with a readable tell before each attack' : 'One enemy type whose AI is a small state machine (patrol, chase, attack) with a readable tell before it attacks'; }
  if (secondary) must.push('Integration point with your ' + lbl(secondary.label) + ' component');
  const loot = new Set();
  for (const f of FLAVOR) if (f.kw.some(k => hasWord(lower, k) || (k.length > 4 && lower.includes(k)))) f.loot.forEach(l => loot.add(l));
  // photo apps get photo-app loot instead of chatbot loot (no model picker or conversation memory)
  if (photoAI || camTranslate) { loot.delete('Model picker'); loot.delete('Conversation memory'); loot.delete('Eval set to test quality'); ['History of past scans on the device', 'Eval set of 20 real photos'].forEach(l => loot.add(l)); }
  if (habit) [keys[0] === 'mobile' ? 'Home screen widget for today\'s habits' : 'Installable as a PWA that works offline', 'Export check-ins as CSV'].forEach(l => loot.add(l));
  if (pomo) [keys[0] === 'mobile' ? 'Home screen widget or live activity for the running timer' : 'Installable as a PWA with an optional ambient tick sound', 'A simple daily/weekly session count chart'].forEach(l => loot.add(l));
  if (beatMaker) ['Export and import patterns as JSON', 'Swing / humanize amount and a master volume'].forEach(l => loot.add(l));
  if (pomoExt) ['Optional site blocker list while a focus session is running', 'A simple daily/weekly session count in the popup'].forEach(l => loot.add(l));
  if (todo) ['Export tasks as JSON or CSV', keys[0] === 'mobile' ? 'Home screen quick-add widget' : 'Installable as a PWA that works offline'].forEach(l => loot.add(l));
  if (reminder && keys[0] === 'mobile') ['Quiet hours and a weekdays-only schedule', 'Home screen widget showing the next reminder'].forEach(l => loot.add(l));
  if (raycast) { ['A menu bar command (MenuBarExtra) with a count', 'Keyboard shortcuts on the most-used actions'].forEach(l => loot.add(l)); }
  if (personalLog) ['Export entries as CSV', keys[0] === 'mobile' ? 'Home screen widget for today\'s summary' : 'Installable as a PWA that works offline'].forEach(l => loot.add(l));
  if (localLlm) { loot.delete('Cost / token meter'); loot.add('Optional system prompt editor'); }
  if (runTimer) { loot.delete('Leaderboards'); ['Import and export LiveSplit (.lss) splits', 'Sum of best and best possible time'].forEach(l => loot.add(l)); }
  if (crowdVote || (keys[0] === 'web' && !secondary && / (Directory|Catalog|Collection|Gallery|Showcase)$/.test(name) && /\b(ai|llm|gpt|chatgpt|mcp)\b/.test(lower))) { ['Model picker', 'Conversation memory', 'Cost / token meter', 'Eval set to test quality', 'Steam / game API integration', 'Achievement badges'].forEach(l => loot.delete(l)); ['Tags and filters (category, free / paid, open source)', crowdVote ? 'An embeddable "vote for us" badge for listed makers' : 'An embeddable "featured on" badge for listed makers', 'A weekly top-10 email or RSS feed'].forEach(l => loot.add(l)); }
  if (rustWipe) { ['Leaderboards', 'Achievement badges', 'Steam / game API integration'].forEach(l => loot.delete(l)); ['A Discord bot that posts the day\'s wipes in your channel', 'Server filters (region, group limit, gather rate, modded / vanilla)'].forEach(l => loot.add(l)); }
  ['Polish pass and onboarding', 'Share / invite flow', 'Basic analytics'].forEach(l => loot.add(l));
  if (raycast) loot.delete('Share / invite flow');
  if (cliLang || tui) { loot.delete('Share / invite flow'); loot.delete('Basic analytics'); [cliLang === 'go' ? 'Shell completions (cobra completion)' : cliLang === 'rust' ? 'Shell completions (clap_complete)' : 'Shell completions', 'A --json output mode for scripts', 'A Homebrew tap so macOS users can brew install it'].forEach(l => loot.add(l)); }
  if (firefox) { loot.delete('Share / invite flow'); ['Firefox for Android support (gecko_android in the manifest)', 'A toolbar badge showing how often it acted on this page'].forEach(l => loot.add(l)); }
  if (initTracker) { loot.delete('Share / invite flow'); loot.delete('Steam / game API integration'); loot.delete('Achievement badges'); loot.delete('Leaderboards'); ['Monster presets from the 5e SRD (HP, AC, initiative bonus)', 'A player-facing view for a second screen that hides monster HP', 'A d20 + modifier initiative roller'].forEach(l => loot.add(l)); }
  if (cliLang || tui || firefox || initTracker) ['Polish pass and onboarding', 'Basic analytics'].forEach(l => { if (loot.delete(l)) loot.add(l); });
  if (engine === 'pico8') { ['Steam / game API integration', 'Leaderboards', 'Achievement badges', 'Share / invite flow', 'Basic analytics'].forEach(l => loot.delete(l)); const pl = ['A title screen and a high score saved with cartdata / dget / dset', 'Post the .p8.png cart on the Lexaloffle BBS so players find it in Splore', 'Gamepad support checked in the web export (btn works with controllers)']; const rest = [...loot]; loot.clear(); pl.concat(rest).forEach(l => loot.add(l)); }
  if (bashCli) { loot.delete('Share / invite flow'); loot.delete('Basic analytics'); ['A cron (or launchd) example to run it on a schedule', 'Quiet (-q) and verbose (-v) output modes'].forEach(l => loot.add(l)); }
  const lootFront = arr => { const rest = [...loot]; loot.clear(); arr.forEach(l => loot.add(l)); rest.forEach(l => loot.add(l)); };
  if (webLang) { ['Share / invite flow', 'Basic analytics', 'Polish pass and onboarding'].forEach(l => loot.delete(l)); lootFront([shortener ? 'Click counts per link and a custom alias option' : 'An OpenAPI spec (and a /docs page) for the API', 'Rate limiting middleware per IP', 'A /healthz endpoint and structured logs your host can read']); }
  if (groupSched) { ['Steam / game API integration', 'Leaderboards', 'Achievement badges', 'Share / invite flow', 'Discord share button'].forEach(l => loot.delete(l)); lootFront(['Add to calendar (.ics file / Google Calendar link) once the date is locked', 'A Discord webhook or email reminder the day before', /\bboard games?\b/.test(lower) ? 'A "what are we playing?" vote from a BoardGameGeek collection' : 'Repeat the same group every week or month']); }
  if (ratingBoard) { ['Steam / game API integration', 'Achievement badges', 'Leaderboards', 'Friend lists', 'Realtime updates (WebSockets)', 'Moderation tools'].forEach(l => loot.delete(l)); lootFront(['Head-to-head record between any two players', /\bchess\b/.test(lower) ? 'Import games from Lichess or Chess.com by username' : 'Seasons that reset the standings', 'A share card image of the current top 3']); }
  if (vsAI) { ['Steam / game API integration', 'Achievement badges', 'Model picker', 'Conversation memory', 'Eval set to test quality'].forEach(l => loot.delete(l)); if (!trash) loot.delete('Cost / token meter'); lootFront(['Pick a difficulty' + (trash ? ' and an opponent personality' : ''), /\bchess\b/.test(lower) ? 'Move list (PGN) with undo and a "show me the best move" hint' : 'Undo and a hint button']); }
  if (groupVote) { ['Steam / game API integration', 'Leaderboards', 'Achievement badges', 'Share / invite flow', 'Discord share button', 'Friend lists', 'Moderation tools'].forEach(l => loot.delete(l)); lootFront([/\bmovies?\b/.test(lower) ? 'Search movies from TMDB (poster, runtime, where to stream) to add options' : /\bgames?\b/.test(lower) ? 'Add options from a BoardGameGeek collection or Steam library' : 'Suggest-an-option mode so anyone can add choices', 'Ranked-choice voting for bigger groups', 'A Discord webhook that posts the winner']); }
  if (rustPlugin) { ['Share / invite flow', 'Basic analytics', 'Polish pass and onboarding', 'Steam / game API integration', 'Achievement badges', 'Leaderboards'].forEach(l => loot.delete(l)); lootFront(['An in-game UI panel with CUI', 'A Discord webhook for key events (raids, kills, kit claims)', 'Publish on uMod or Codefling with a config example and permissions table']); }
  if (socialSched) { ['Share / invite flow'].forEach(l => loot.delete(l)); lootFront(['Best-time-to-post suggestions from your past engagement', 'Threads (multi-post) and image attachments', 'A calendar view of the queue']); }
  if (chatGame) { ['Steam / game API integration', 'Share / invite flow'].forEach(l => loot.delete(l)); lootFront([/^(trivia|quiz)/.test((lower.match(CHAT_GAME) || [''])[0]) ? 'Categories and difficulty picked per round' : 'Word categories and difficulty picked per round', /\btwitch\b/.test(lower) ? 'Channel-point redemptions to start a round' : 'Weekly season reset with a champion role', /\btwitch\b/.test(lower) ? 'An OBS overlay showing the current question and top 5' : 'Daily streak bonus points']); }
  if (recap) { ['Model picker', 'Conversation memory'].forEach(l => loot.delete(l)); lootFront(['Campaign memory: past recaps saved so the next one keeps names and plot threads straight', 'Voice options: in-world chronicle, bard\'s tale, or plain bullet summary']); }
  if (mgmt) { ['Steam / game API integration', 'Leaderboards'].forEach(l => loot.delete(l)); lootFront([mgmt[1] === 'lighthouse' ? 'A storm and night cycle that changes how many ships come and how hard they are to guide' : 'A day/night or season cycle that changes what arrives', 'Upgrades the player can see change the ' + mgmt[1], 'A logbook of milestones saved with the game']); }
  if (aiFoes) { const li = stack.findIndex(x => /^An LLM API behind/.test(x.tech)); if (li >= 0) stack.splice(li, 1); ['Model picker', 'Conversation memory', 'Cost / token meter', 'Eval set to test quality'].forEach(l => loot.delete(l)); lootFront([/\bboss(es)?\b/.test(lower) ? 'A second phase for the boss (new attack pattern below half health)' : 'Enemies that coordinate (flank, take cover, call for help)', 'Difficulty settings that change AI reaction time, not just damage']); }
  if (steamPlay) { ['Share / invite flow', 'Leaderboards', 'Achievement badges', 'Steam / game API integration'].forEach(l => loot.delete(l)); lootFront(['A weekly recap card (hours, top game, Deck vs desktop) to share', 'Compare with friends from your Steam friends list (public profiles)', 'Backlog view: owned games with zero hours']); }
  if (liveTrack) { ['Share / invite flow', 'Steam / game API integration', 'Leaderboards', 'Achievement badges'].forEach(l => loot.delete(l)); lootFront(/\byoutube\b/.test(lower) && !/\btwitch\b/.test(lower) ? ['Browser push notifications when a followed channel goes live', 'Log in with Google to import your YouTube subscriptions (subscriptions.list)', 'Twitch and Kick streamers in the same list'] : ['Browser push notifications when a followed streamer goes live', 'Log in with Twitch to import your follows (Get Followed Streams, user:read:follows)', /\byoutube\b/.test(lower) ? 'Kick streamers in the same list' : 'YouTube and Kick streamers in the same list']); }
  if (billSplit) { ['Leaderboards', 'Achievement badges', 'Steam / game API integration'].forEach(l => loot.delete(l)); ['Friend lists', 'Moderation tools'].forEach(l => loot.delete(l)); lootFront(['Venmo / PayPal / Cash App pay links per person', /\b(scans?|scanning|photos?|camera|receipts?)\b/.test(lower) ? 'Save past bills per group so regulars are one tap away' : 'Scan a receipt photo to fill in the items (a vision model)', 'A currency per ' + (/\btrips?\b/.test(lower) ? 'trip' : 'group') + ' with conversion']); }
  if (puzzleGame) { ['Steam / game API integration', 'Model picker', 'Conversation memory'].forEach(l => loot.delete(l)); lootFront(['A move counter with a par for each level', 'A level editor that saves levels as shareable codes']); }
  if (horrorGame) { ['Leaderboards', 'Model picker', 'Conversation memory'].forEach(l => loot.delete(l)); lootFront(['A second stalker behaviour (one that only moves when you are not looking)', 'Notes and recordings that tell the story as you explore']); }
  if (liveBot) { ['Leaderboards', 'Achievement badges', 'Steam / game API integration'].forEach(l => loot.delete(l)); lootFront(['A custom go-live message per streamer', 'YouTube and Kick go-live posts in the same channel']); }
  if (splitBot) { ['Leaderboards', 'Achievement badges', 'Steam / game API integration'].forEach(l => loot.delete(l)); lootFront(['Scan a receipt photo to fill in the items (a vision model)', 'A weekly balance reminder posted in the channel']); }
  if (steamDeal) { ['Model picker', 'Conversation memory', 'Achievement badges', 'Steam / game API integration', 'Leaderboards'].forEach(l => loot.delete(l)); lootFront(['Import your whole Steam wishlist (IWishlistService) in one go', 'Prices from other stores (GOG, Epic, Humble) through IsThereAnyDeal']); }
  if (typeTutor) { ['Model picker', 'Conversation memory', 'Steam / game API integration', 'Share / invite flow'].forEach(l => loot.delete(l)); lootFront([/\b(kids?|children|child|students|classroom)\b/.test(lower) ? 'A parent / teacher view of each child\'s progress' : 'A daily practice streak and reminder', 'Lessons for other keyboard layouts (AZERTY, Dvorak, Colemak)']); }
  if (match3) { ['Steam / game API integration', 'Model picker', 'Conversation memory'].forEach(l => loot.delete(l)); lootFront(['Special tiles for 4- and 5-matches (line clear, colour bomb)', 'A level map with star ratings and obstacles (ice, locked tiles)']); }
  if (jigsaw) { ['Steam / game API integration', 'Model picker', 'Conversation memory', 'Leaderboards'].forEach(l => loot.delete(l)); lootFront(['A daily puzzle that is the same picture for everyone', 'Edge-pieces-only filter and a ghost preview of the picture']); }
  if (vnGame) { ['Steam / game API integration', 'Leaderboards', 'Model picker', 'Conversation memory'].forEach(l => loot.delete(l)); lootFront(['A flowchart of scenes and endings you have unlocked', 'A gallery of unlocked art and endings']); }
  if (typeTest) { ['Model picker', 'Conversation memory', 'Steam / game API integration', 'Share / invite flow'].forEach(l => loot.delete(l)); lootFront(['A daily challenge text that is the same for everyone, with a leaderboard', 'Per-key mistake heatmap after each test']); }
  if (goLiveChat || ytBot) { ['Leaderboards', 'Achievement badges', 'Steam / game API integration'].forEach(l => loot.delete(l)); lootFront(goLiveChat ? ['A Discord go-live post from the same EventSub event', 'Auto shoutouts (!so) for raiders, using Get Channel Information'] : ['A custom message per channel', 'Twitch and Kick go-live posts in the same channel']); }
  if (typingGame) { ['Model picker', 'Conversation memory'].forEach(l => loot.delete(l)); lootFront(['A daily challenge text that is the same for everyone, with a leaderboard', 'Per-key mistake heatmap after each run']); }
  if (keys[0] === 'bot' && /\bbirthdays?\b/.test(lower)) lootFront(['A custom message per person (with their age when the year is known)', 'A gift-idea list per person, shared with the family']);
  if (webLang || groupSched || ratingBoard || groupVote || rustPlugin || socialSched || chatGame) ['Polish pass and onboarding', 'Basic analytics'].forEach(l => { if (loot.delete(l)) loot.add(l); });
  if (figma) { loot.delete('Share / invite flow'); loot.delete('Basic analytics'); loot.delete('Conversation memory'); ['Run on a whole page, not just the selection', 'A Dev Mode (codegen) version for developers'].forEach(l => loot.add(l)); }

  const stackLine = stack.slice(0, 3).map(s => s.tech).join(', ');
  const mvp = {
    name,
    pitch: `${cap(fixCase(idea.replace(/[.!?]+$/, '').replace(/^(please\s+)?((build|make|create|code)( me)?|i (want|need|would like) to (build|make|create)|i want|i need|help me (build|make))\s+/i, '')))} — shipped as ${article(primary.label)} ${lbl(primary.label)}${secondary ? ' with ' + article(secondary.label) + ' ' + lbl(secondary.label) + ' component' : ''}, scoped to one core loop that a real user can finish in under a minute.`,
    types: keys.map((k, i) => i === 0 ? primary.label : TYPES[k].label),
    mustHave: must,
    outOfScope: [crowdVote ? 'Payments, paid listings and sponsored spots (sign-in is only there to stop double votes)' : 'User accounts / payments (unless the idea is about them)', 'Admin dashboards', 'Mobile-perfect design', 'Anything not needed for the core loop'],
    boss: boss,
    loot: [...loot].slice(0, 6),
    success: [`A stranger can use it from a link or command with no explanation`, `The core loop works end to end 10 times in a row`, `You've shown it to 3 people and gotten feedback`],
  };

  const plan = [
    { level: 1, title: 'Tutorial Zone: Setup', xp: 100, steps: ['Demand check (15 minutes): find 3 posts or threads where people ask for this, complain about the problem, or ' + (keys[0] === 'game' ? 'play a similar game' : 'use a similar tool') + ', and paste the links in your notes; if you find none, sharpen the idea before building', 'Create the repo and scaffold with: ' + stackLine, 'Add a README with the one-sentence pitch', 'Get a "hello world" running locally and commit', 'Add an AGENTS.md rules file with your stack and conventions (Cursor, Codex and others read it; if you use Claude Code, make line 1 of CLAUDE.md "@AGENTS.md" so every tool shares one file)'], done: 'App runs locally and is pushed to GitHub.' },
    { level: 2, title: 'First Quest: Core Loop', xp: 250, steps: must.slice(0, 3).map(cap).concat(keys[0] === 'game' ? ['Fun check before art: play the loop with placeholder shapes for 10 minutes (and have one friend try it); if it is not fun yet, change one rule (speed, goal, or what pushes back) and play again before adding any art'] : []).concat(['Stuck on a bug for 20+ minutes? Start a fresh chat, paste the Debug helper prompt (below) with the exact error and the one file involved, and ask for the cause before any fix']), done: 'The core loop works with hardcoded/sample data.' },
    { level: 3, title: 'Side Quest: Real Data & State', xp: 250, steps: ['Replace sample data with real input and persistence', 'Handle empty, loading, and error states', 'Add input validation'], done: 'Data survives a refresh/restart.' },
    { level: 4, title: 'Boss Fight: ' + boss, xp: 400, steps: ['Reproduce the hardest problem in isolation', 'Ask your AI tool for 2-3 approaches, pick the simplest', 'Implement, then test with ugly inputs', 'Add logging so failures are visible', 'Stuck on a bug for 20+ minutes? Start a fresh chat, paste the Debug helper prompt (below) with the exact error and the one file involved, and ask for the cause before any fix'], done: 'The boss problem no longer breaks the core loop.' },
    { level: 5, title: 'Polish & Loot', xp: 200, steps: ['Fix the 5 most annoying rough edges'].concat(keys[0] === 'game' ? ['Give it its own look so it does not read as another default AI game: pick one palette, one font and one art pack (or style), and write them into AGENTS.md so every later change sticks to them'] : []).concat(['Add one loot item: ' + mvp.loot[0], 'Write a 3-line how-to-use in the README']), done: 'You would be proud to show it to a friend.' },
    keys[0] === 'game'
      ? { level: 6, title: 'Launch: Ship It', xp: 300, steps: [(engine === null || engine === 'three' ? 'Publish a playable build on itch.io, and once it plays well also on CrazyGames, whose developer dashboard shows playtime and retention and pays a share of ad revenue; ' : 'Publish a playable build (see stack for hosting), and ') + 'test it on a phone and a second computer', 'First-minute check: a new player is playing within one click, the first minute is forgiving, and only what that minute needs loads up front', 'Watch 3 numbers: average playtime, share still playing after 1 minute, and share who come back the next day', 'Find 3 places where players of similar games already hang out (a subreddit, a Discord server, an itch.io tag), post a short gameplay clip there, collect feedback and list the next 3 quests (a reason to come back tomorrow is usually one)'], done: 'It is live, strangers played it, and you know your playtime, first-minute and next-day numbers.' }
      : { level: 6, title: 'Launch: Ship It', xp: 300, steps: ['Deploy (see stack for hosting)', 'Test the public URL/command on a second device', 'Post-deploy check: env vars are set on the host, and for web apps, refreshing a non-home page works, login redirects go to the live URL (not localhost), database access rules are on, and the domain resolves', 'Send it to 5 people who have the problem it solves and ask them to try it, then post it on X / Discord / Reddit with a short demo clip', 'Collect feedback and list the next 3 quests'], done: 'It is live and someone other than you used it.' },
  ];

  const ctx = `Project: ${name}\nIdea: ${idea}\nType: ${mvp.types.join(' + ')}\nStack: ${stack.map(s => s.tech).join('; ')}`;
  const prompts = [
    { title: 'Rules file (save as AGENTS.md; for Claude Code, put @AGENTS.md on line 1 of CLAUDE.md)', text: `You are my senior pair-programmer on "${name}".\n\n${ctx}\n\nRules:\n- Build the smallest thing that works; no extra features beyond the MVP list.\n- MVP must-haves: ${must.join('; ')}.\n- Out of scope: ${mvp.outOfScope.join('; ')}.\n- Keep files small and named clearly. Explain each change in 1-2 sentences.\n- After each change, tell me exactly how to run and test it.\n- Ask me before adding any new dependency, and before deleting files or data.\n- Never edit .env files or commit secrets.\n- If a test fails, fix the code, not the test. Never change, skip or delete a test to make it pass; ask me if you think the test itself is wrong.\n- If the same error comes back after 2 fix attempts, stop. Tell me the exact error, what you tried, and what you need from me.\n- If I bring up a new project idea before this one is launched, remind me to park it in IDEAS.md and finish this one first.\n- Once every MVP must-have works and I've tested it, tell me the MVP is done and suggest I launch it before adding anything new.\n\nCommands (fill these in once Level 1 runs):\n- Run: \n- Test: \n- Lint: \n\nMistakes to avoid in this repo (add one line each time the AI repeats a mistake):\n- ` },
    { title: 'Level 1: scaffold the project', text: `${ctx}\n\nScaffold this project from scratch using the stack above. Give me the exact terminal commands, the folder structure, and the minimal code for a working "hello world". Do not build features yet. End with how to run it.` },
    { title: 'Level 2: build the core loop', text: `Using the existing scaffold for "${name}", implement the core loop: ${must.slice(0, 3).join('; ')}. Use hardcoded sample data. Keep it to the fewest files possible. Before writing the feature code, write 2-3 small checks that pass only when the core loop works (automated tests if the stack has a test runner, otherwise a short manual checklist in TESTING.md), and keep them passing on every later change so new features can't quietly break old ones. Show the diff and how to run the checks.` },
    { title: 'Level 3: real data and persistence', text: `Replace sample data in "${name}" with real input and persistent storage. Add loading, empty, and error states plus input validation. List any edge cases I should test by hand.` },
    { title: 'Boss fight', text: `The hardest part of "${name}" is: ${boss}. Propose 3 approaches ranked by simplicity, with tradeoffs. Then implement the simplest one, add logging, and write 5 nasty test cases.` },
    { title: 'Debug helper', text: `Something is broken in "${name}". Here's what I expected: [X]. Here's what happened: [Y]. Here's the error/log: [paste]. First, list the 3 most likely causes. Then suggest the smallest change to test each. Don't rewrite unrelated code. If we've already tried 2 fixes that didn't work, stop, tell me what we've ruled out, and suggest I start a fresh chat with just this prompt and the one relevant file.` },
    { title: 'Pre-launch security check', text: `Act as a hostile reviewer of "${name}" before anyone else uses it. Check for: API keys or tokens in the code or repo history, missing auth on routes, unvalidated input, data another user could read or change, a user who can raise their own role (make themselves owner or admin, including through database rules), data or secrets sent to the browser that a logged-out visitor could see in view-source or the network tab (build the front end and search the output for secret key names such as sk_live, service_role, secret and private_key), and costs an attacker could run up (API calls, LLM tokens). Rank what you find by damage, fix the top 3, and tell me how to verify each fix. If it has user accounts, also give me a two-account test: create accounts A and B in two browsers, make data in A, then try to see or edit it from B (change IDs in URLs and requests) and again while logged out.` },
    { title: 'Polish and launch', text: `Review "${name}" like a picky user. List the top 10 rough edges (UX, copy, errors, performance), then fix the top 5. Next, write a README with a one-line pitch, setup, usage, and a demo section, and give me deploy steps for the stack above. Then give me a post-deploy check for the 5 things that most often break when a vibe-coded app goes live, with how to test and fix each on this stack: environment variables missing on the host, a 404 when refreshing a page that isn't the home page, login or OAuth redirects still pointing to localhost, database row-level security (or equivalent access rules) left off, and the custom domain's DNS not resolving. Skip any that don't apply to this stack.` },

  ];
  if (engine === 'pico8') {
    const hi = plan[0].steps.indexOf('Get a "hello world" running locally and commit');
    if (hi >= 0) plan[0].steps[hi] = 'Get one sprite moving with the arrow keys (_init, _update, _draw), save the .p8 cart and commit';
    prompts[1].text = prompts[1].text.replace('the minimal code for a working "hello world"', 'the minimal .p8 cart where one sprite moves with the arrow keys (_init, _update, _draw)');
  }
  if (keys[0] === 'game') prompts.push({ title: 'After launch: keep players playing', text: `"${name}" is live. Here are its numbers: average playtime [X], share of players still playing 1 minute after starting [Y], share who come back the next day [Z]. Read the code and, for each number, explain what in the game is causing it (load size and order, first-minute difficulty, how much content one run has, reasons to return). Then write a fix plan with one phase per number, first-minute first. For each fix give the files, the change and a test I can run. Make one commit per phase and stop after each so I can ship it and watch the numbers.` });

  return { mvp, stack, plan, prompts, totalXp: plan.reduce((a, l) => a + l.xp, 0), engine: 'template-v1' };
}

module.exports = { generate };
