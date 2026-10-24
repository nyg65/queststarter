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
    label: 'Game', kw: ['game', 'platformer', 'rpg', 'roguelike', 'shooter', 'puzzle', 'arcade', 'tower defense', 'tower defence', 'card game', 'multiplayer', 'unity', 'godot', 'flight sim', 'racing sim', 'city builder', 'colony sim', 'life sim', 'tycoon', 'escape room', 'vr game', 'sim game', 'farming sim', 'fishing sim', 'cozy sim', 'space sim', 'driving sim', 'simulator', 'roblox', 'obby', 'unreal', 'deckbuilder', 'board game', 'chess', 'tic tac toe', 'strategy game', 'turn-based', 'turn based', 'text adventure', 'trivia game', 'word game'],
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
    label: 'CLI Tool', kw: ['cli', 'command line', 'command-line', 'terminal tool', 'terminal app', 'npx'],
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
    label: 'Browser Extension', kw: ['extension', 'chrome', 'browser plugin', 'userscript'],
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
  godot: [['Godot 4 (GDScript)', 'Free, open-source, lightweight; GDScript is simple for AI tools to write.'], ['Godot MCP server for Claude Code / Cursor', 'Lets your AI tool run the project and edit scenes and scripts directly.'], ['Git', 'Godot scenes are text files, so diffs and AI edits stay readable.'], ['Itch.io (HTML5 or desktop export)', 'Free, instant sharing of playable builds.']],
};
// Cozy, sandbox and sim games don't need combat; give them a core-loop + progression MVP instead.
// Client-side Minecraft mods (Fabric/Forge) instead of server plugins (Paper)
const MCMOD_FABRIC = [['Fabric API (Java 21) + Fabric Loom (Gradle)', 'The lightweight, fast-updating mod loader; AI tools know its registries and mixins. Use NeoForge if your modpack needs it.'], ['Loom runClient dev setup', 'Launches a test Minecraft client with your mod in one command.'], ['A JSON config + data generators', 'Players expect a config file; datagen writes recipes and models so you do not hand-edit JSON.'], ['Modrinth / CurseForge', 'Where players already search for mods.']];
const MCMOD_FABRIC_MUST = ['One new thing registered (an item, block, or command) that works in a test world', 'The core mechanic driven by one event or mixin', 'A config file with sensible defaults', 'Runs in a clean Fabric install with only Fabric API alongside'];
const COZY = /\b(cozy|cosy|farming|farm|sim|simulator|sandbox|life sim|idle|incremental|tycoon|management|builder|city builder|crafting|walking sim|relaxing)\b/;
const COZY_MUST = ['A core loop the player repeats (e.g. plant, wait, harvest, sell)', 'One progression system (unlocks, upgrades, or money)', 'Save and load so progress survives a restart', 'A clear on-screen goal for the first 5 minutes'];
const ROBLOX_MUST = ['Spawn point, checkpoints and respawn when a player falls or dies', 'Progress checked on the server, never trusted from the client', 'Progress saved with DataStoreService so it survives rejoining', 'A leaderstats display (stage, coins or wins)'];
const ROBLOX_BOSS = 'Server/client split and DataStore reliability: exploit-proof progress that saves without data loss';
const COZY_BOSS = 'Pacing and progression: making the loop satisfying for 10+ minutes without combat';
function gameEngine(lower) {
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
const PERSONA = /\b(role ?plays?|roleplaying|persona|companion|pretends? to be|in character|(talks?|speaks?|acts?|chats?) (like|as) (a|an|my|the)\b)/;
const STOP = new Set('a an the to for of and or that i my me with on in it is be build make create want app project idea simple'.split(' '));

function detectTypes(text) {
  const t = ' ' + text.toLowerCase() + ' ';
  const scored = [];
  for (const [key, def] of Object.entries(TYPES)) {
    let s = 0;
    const tt = key === 'game' ? t.replace(/\bgam(er|ers|ing)\b/g, ' ') : t;
    // match keywords at the start of a word so "community" is not "unity" and "dispatch" is not "patch"
    for (const k of def.kw) if (k.length <= 3 ? tt.includes(' ' + k) : new RegExp('(^|[^a-z0-9])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(tt)) s += k.length > 3 ? 2 : 1;
    if (s) scored.push([key, s]);
  }
  scored.sort((a, b) => b[1] - a[1]);
  const keys = scored.map(x => x[0]);
  // generic "app/web/tool" shouldn't beat specific types
  if (keys.length > 1 && keys[0] === 'web') keys.push(keys.shift());
  // "app"/"tool" alone is just a noun, not a web-app signal when a specific type was found
  if (keys.length > 1 && keys[0] !== 'web' && !/\b(web|website|site|saas|platform|landing|portfolio)\b/.test(t)) { const i = keys.indexOf('web'); if (i > 0) keys.splice(i, 1); }
  // an app that picks/tracks/recommends games is a web/data tool about games, not a game to build
  const gameGenre = /\bgame (where|about|in which|set)\b|\b(platformer|rpg|roguelike|shooter|puzzle|arcade|tower defense|card game|deckbuilder|multiplayer|level|player|enemy|enemies|npc|npcs|dungeon|escape room)\b/.test(t);
  // a game with AI features ("an rpg where the npcs are llm agents") is a game first, with an AI component
  if (keys[0] === 'agent' && keys.includes('game') && gameGenre) { keys.splice(keys.indexOf('game'), 1); keys.unshift('game'); }
  if (keys[0] === 'game' && !gameGenre && /\b(pick|picks|recommend\w*|suggest\w*|choose|finder|track\w*|backlog|library|wishlist|review\w*|deals?|rat(e|es|ing|ings)|timer|stats|compar\w*|performance|benchmarks?|generator|sprites?|assets?|overlay|splits|wiki|guides?|launcher)\b/.test(t)) { keys.shift(); if (!keys.includes('web') && !keys.includes('data')) keys.unshift('web'); }
  // a bot/tool that is merely about games ("tracks my friends' game wins") shouldn't also get a game engine
  if (keys[0] !== 'game' && keys.includes('game') && !gameGenre && !/\b(unity|godot|three\.?js)\b/.test(t)) keys.splice(keys.indexOf('game'), 1);
  // "an MCP server that lets my coding agent read X": the agent is the client, so plan only the MCP server
  if (keys.includes('mcp') && /^\s*(an? |my |the )?(\w+ ){0,2}mcp server\b/.test(t)) { const i = keys.indexOf('agent'); if (i >= 0) keys.splice(i, 1); keys.splice(keys.indexOf('mcp'), 1); keys.unshift('mcp'); }
  // an OBS / stream overlay is a static page loaded as a Browser Source, not a full web app or a bot
  if (keys.includes('overlay') && /\b(overlay|browser source)\b/.test(t) && /\b(obs|stream|streaming|streamer|streams|twitch|kick|streamlabs|browser source|youtube live|livestream\w*|speedrun\w*|splits)\b/.test(t)) { keys.length = 0; keys.push('overlay'); }
  else if (keys.includes('overlay')) keys.splice(keys.indexOf('overlay'), 1);
  // a personal tracker ("a habit tracker app", "a workout log") is an app the user fills in, not a data fetcher
  if (keys[0] === 'data' && PERSONAL.test(t) && !/\b(scrap\w*|alerts?|api|monitor\w*|prices?|deals?|patch\w*|news|digest|feed|spend\w*|costs?)\b/.test(t)) { keys.shift(); const m = /\b(mobile|ios|android|iphone|phone)\b/.test(t) ? 'mobile' : 'web'; if (!keys.includes(m)) keys.unshift(m); else { keys.splice(keys.indexOf(m), 1); keys.unshift(m); } }
  // chat or Q&A over the user's own documents is retrieval (ingest, retrieve, cite), not a tool-calling agent loop
  if (keys.includes('agent') && RAG.test(t) && /\b(rag|retrieval|chat\w*|ask\w*|answer\w*|questions?|q&a|search\w*|tutor|quiz\w*|talk to|trained on|knowledge)\b/.test(t)) keys[keys.indexOf('agent')] = 'rag';
  // a character or roleplay chatbot just talks: a persona prompt, chat history and a streaming UI, no tools or agent loop
  if (keys[0] === 'agent' && PERSONA.test(t) && !/\b(files?|sends?|books?|posts?|reads? my|emails?|schedules?|orders?|buys?|deploys?|creates? (issues|tickets|bugs))\b/.test(t)) keys[0] = 'persona';
  return keys.length ? keys.slice(0, 2) : ['web'];
}

const ACRO = { ai: 'AI', rag: 'RAG', mcp: 'MCP', cli: 'CLI', pdfs: 'PDFs', obsidian: 'Obsidian', saas: 'SaaS', claude: 'Claude', cursor: 'Cursor', vscode: 'VS Code', turnbased: 'Turn-Based', api: 'API', llm: 'LLM', gpt: 'GPT', ios: 'iOS', iphone: 'iPhone', mvp: 'MVP', rpg: 'RPG', ui: 'UI', '2d': '2D', '3d': '3D', npc: 'NPC', mmo: 'MMO', fps: 'FPS', pc: 'PC', vr: 'VR', ar: 'AR', youtube: 'YouTube', github: 'GitHub', tiktok: 'TikTok', gpu: 'GPU', cpu: 'CPU', pdf: 'PDF', seo: 'SEO', sql: 'SQL', npcs: 'NPCs', unity: 'Unity', godot: 'Godot', unreal: 'Unreal', ue5: 'UE5', obby: 'Obby', threejs: 'Three.js', webgl: 'WebGL', discord: 'Discord', telegram: 'Telegram', slack: 'Slack', twitter: 'Twitter', reddit: 'Reddit', steam: 'Steam', chrome: 'Chrome', android: 'Android', notion: 'Notion', spotify: 'Spotify', twitch: 'Twitch', minecraft: 'Minecraft', roblox: 'Roblox', xbox: 'Xbox', playstation: 'PlayStation', openai: 'OpenAI', chatgpt: 'ChatGPT', nextjs: 'Next.js', obs: 'OBS', csv: 'CSV', json: 'JSON', npx: 'npx' };
function titleCase(s) { return s.split(' ').map(w => ACRO[w] || w.replace(/\b\w/g, c => c.toUpperCase())).join(' '); }
function hasWord(text, k) { return new RegExp('(^|[^a-z0-9])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])').test(text); }
function lbl(l) { return l.toLowerCase().replace(/\bai\b/g, 'AI').replace(/\bapi\b/g, 'API').replace(/\bmcp\b/g, 'MCP').replace(/\bvs code\b/g, 'VS Code').replace(/\bminecraft\b/g, 'Minecraft').replace(/\bcli\b/g, 'CLI').replace(/\brag\b/g, 'RAG'); }
function article(w) { if (/^RAG\b/.test(w)) return 'a'; if (/^[A-Z]{2,}/.test(w)) return /^[AEFHILMNORSX]/.test(w) ? 'an' : 'a'; return /^[aeiou]/i.test(w) ? 'an' : 'a'; }

const FILLER = new Set('helps help lets let allows allow can will you your which who where when using use uses via from into just some every all also really like new built made so tells shows gives are was were has have get gets play plays playing style'.split(' '));
const KIND = new Set('cli bot tool extension plugin agent website site webapp saas platform thing chrome browser discord telegram slack mobile ios android iphone web'.split(' '));
const VERB = { track: 'Tracker', tracks: 'Tracker', summarize: 'Summarizer', summarizes: 'Summarizer', review: 'Reviewer', reviews: 'Reviewer', pick: 'Picker', picks: 'Picker', find: 'Finder', finds: 'Finder', recommend: 'Recommender', recommends: 'Recommender', suggest: 'Suggester', suggests: 'Suggester', plan: 'Planner', plans: 'Planner', generate: 'Generator', generates: 'Generator', monitor: 'Monitor', monitors: 'Monitor', alert: 'Alerts', alerts: 'Alerts', organize: 'Organizer', organizes: 'Organizer', schedule: 'Scheduler', schedules: 'Scheduler', compare: 'Comparer', compares: 'Comparer', translate: 'Translator', translates: 'Translator', scrape: 'Scraper', scrapes: 'Scraper', log: 'Logger', logs: 'Logger', remind: 'Reminder', reminds: 'Reminder', count: 'Counter', counts: 'Counter', rate: 'Rater', rates: 'Rater', write: 'Writer', writes: 'Writer', build: 'Builder', builds: 'Builder', create: 'Creator', creates: 'Creator', explain: 'Explainer', explains: 'Explainer', analyze: 'Analyzer', analyzes: 'Analyzer', post: 'Poster', posts: 'Poster', send: 'Sender', sends: 'Sender', watch: 'Watcher', watches: 'Watcher', run: 'Runner', runs: 'Runner', show: 'Viewer', shows: 'Viewer', turn: 'Converter', turns: 'Converter', block: 'Blocker', blocks: 'Blocker', book: 'Booker', books: 'Booker', teach: 'Tutor', teaches: 'Tutor', convert: 'Converter', converts: 'Converter', rename: 'Renamer', renames: 'Renamer', hide: 'Hider', hides: 'Hider', triage: 'Triager', triages: 'Triager', scaffold: 'Scaffolder', scaffolds: 'Scaffolder', check: 'Checker', checks: 'Checker' };
const BREAK = /^(to|for|with|on|in|at|by|and|or|when|so|from|using|via|while|before|after|based|over|where|as|that|which|who|if|like|into|about|across|between|during|without|per|than)$/;

// "a discord bot that tracks my friends game wins" -> "Friends Game Wins Tracker" (falls back to the first 3 meaningful words)
function projectName(idea) {
  const all = idea.toLowerCase().replace(/\bthree\.js\b/g, 'threejs').replace(/\bnext\.?js\b/g, 'nextjs').replace(/\bunreal engine( \d)?\b/g, 'unreal').replace(/\bturn[- ]based\b/g, 'turnbased').replace(/\bvs ?code\b|\bvisual studio code\b/g, 'vscode').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  // a base-form verb word used as a noun ("a workout log for my phone", "a meal plan app") is part of the name, not the action
  const nounUse = i => !/s$/.test(all[i]) && i > 0 && !STOP.has(all[i - 1]) && !FILLER.has(all[i - 1]) && !BREAK.test(all[i - 1]) && !/^(i|we|you|they|people|users|gamers|players|can|will|to)$/.test(all[i - 1]) && (i === all.length - 1 || BREAK.test(all[i + 1]) || KIND.has(all[i + 1]) || all[i + 1] === 'app');
  const vi = all.findIndex((w, i) => VERB[w] && i > 0 && !nounUse(i));
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
    for (const w of all.slice(vi + 1)) {
      if (BREAK.test(w)) { if (obj.length) break; else continue; }
      if (STOP.has(w) || FILLER.has(w) || KIND.has(w)) continue;
      obj.push(w);
      if (obj.length === 3) break;
    }
    if (obj.length) return titleCase(obj.join(' ')) + ' ' + VERB[all[vi]];
  }
  const words = [];
  let stopAt = all.length;
  for (const [i, w] of all.entries()) {
    if (BREAK.test(w)) { if (words.length) { stopAt = i; break; } else continue; }
    if (STOP.has(w) || FILLER.has(w)) continue;
    if (KIND.has(w) && words.length >= 2) continue; // "youtube summarizer chrome extension" -> "YouTube Summarizer"
    words.push(w);
    if (words.length === 3) break;
  }
  // a lone generic word ("a game where you...", "a vr app for meditation") reads badly; prefix what comes after the break
  if (words.length === 2 && /^(threejs|unity|godot|phaser|roblox|unreal|browser|web|online|simple|small|tiny|little|fun|mobile)$/.test(words[0]) && words[1] === 'game' && stopAt < all.length) words.shift();
  // "an MCP server that reads my Notion roadmap" -> "Notion MCP Server"
  if (words.join(' ') === 'mcp server' && stopAt < all.length) { const brand = all.slice(stopAt).find(w => ACRO[w] && !/^(ai|mcp|api|llm|gpt|claude|cursor|vscode|cli|ui|mvp)$/.test(w)); if (brand) return titleCase(brand + ' mcp server'); }
  // "a tower defense game with zombies" -> "Zombie Tower Defense"
  if (/^tower defen[cs]e game$/.test(words.join(' ')) && /^(with|where|against|of|about|featuring)$/.test(all[all.indexOf('game') + 1] || '')) { const th = []; for (const w of all.slice(all.indexOf('game') + 2)) { if (BREAK.test(w) || /^(attack|invade|come|try|want)\w*$/.test(w)) break; if (!STOP.has(w) && !FILLER.has(w) && !KIND.has(w) && !/^(enem(y|ies)|waves?|towers?|levels?)$/.test(w)) th.push(w); } const theme = th[th.length - 1]; if (theme) return titleCase(theme.replace(/(zomb|cook|pix|goal)ies$/, '$1ie').replace(/ies$/, 'y').replace(/([^s])s$/, '$1') + ' ' + words.slice(0, 2).join(' ')); }
  if (words.length === 1 && stopAt < all.length) {
    const more = [];
    for (const w of all.slice(stopAt + 1)) {
      if (BREAK.test(w)) { if (more.length) break; else continue; }
      if (STOP.has(w) || FILLER.has(w) || KIND.has(w) || w === words[0]) continue;
      more.push(w);
      if (more.length === 3) break;
    }
    if (more.length) return titleCase(more.join(' ') + ' ' + words[0]);
  }
  return titleCase(words.join(' ')) || 'My Project';
}

function fixCase(s) { return s.replace(/\bthree\.?js\b/g, 'Three.js').replace(/\bnext\.?js\b/gi, 'Next.js').replace(/\bunreal engine\b/gi, 'Unreal Engine').replace(/[A-Za-z0-9]+/g, (w, i, str) => (w === w.toLowerCase() && ACRO[w] && w !== 'ar' && str[i - 1] !== '.') ? ACRO[w] : w); }
function cap(s) { s = s.trim(); return /^[a-z][A-Z]/.test(s) ? s : s.charAt(0).toUpperCase() + s.slice(1); }

function generate(idea) {
  idea = String(idea || '').trim().slice(0, 600);
  if (idea.length < 4 || !/[a-z0-9]{2,}/i.test(idea)) throw new Error('Tell me a bit more about your idea (at least a few words).');
  const keys = detectTypes(idea);
  let primary = keys[0] === 'extension' && VSCODE.test(idea.toLowerCase()) ? { ...TYPES.extension, label: 'VS Code Extension' } : TYPES[keys[0]];
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

  // "a chatbot that roleplays as a pirate" -> "Pirate Chatbot"
  const who = keys[0] === 'persona' && lower.match(/\b(?:role ?plays?|pretends? to be|talks?|speaks?|acts?|chats?)\s+(?:as|like)?\s*(?:a|an|my|the)?\s*(?:favou?rite\s+)?([a-z0-9]+(?:\s+[a-z0-9]+)?)/);
  if (who) { const w = who[1].split(' ').filter(x => !BREAK.test(x) && !STOP.has(x) && !FILLER.has(x)); if (w.length) name = titleCase(w.join(' ')) + ' Chatbot'; }

  const engine = keys[0] === 'game' ? gameEngine(lower) : null;
  const vscode = keys[0] === 'extension' && VSCODE.test(lower);
  const fabric = keys[0] === 'mcmod' && /\b(mod|fabric|forge|neoforge|modpack)\b/.test(lower) && !/\b(plugin|paper|spigot|bukkit|server)\b/.test(lower);
  if (fabric) primary = { ...primary, label: 'Minecraft Mod' };
  const stack = (engine ? GAME_ENGINES[engine] : vscode ? VSCODE_STACK : fabric ? MCMOD_FABRIC : primary.stack).map(([tech, why]) => ({ tech, why }));
  if (engine && engine !== 'roblox' && (engine === 'unreal' || /\b(3d|three dimensional|vr|virtual reality)\b|\bthree\.?js\b/.test(lower))) stack.push({ tech: 'Blender + Blender MCP (optional)', why: 'Lets Claude Code or Cursor model and export simple 3D assets for you, so you are not stuck on art.' });
  const botSdk = () => {
    const sdk = /\btelegram\b/.test(lower) ? ['Node.js + grammY (Telegram)', 'Modern, well-documented Telegram bot framework; easy for AI tools to write.']
      : /\bslack\b/.test(lower) ? ['Node.js + Slack Bolt', "Slack's official bot framework, with slash commands and events built in."]
      : /\btwitch\b/.test(lower) ? ['Node.js + tmi.js / Twurple (Twitch)', 'Reads and posts Twitch chat; Twurple also covers the Twitch API.']
      : /\bdiscord\b/.test(lower) ? ['Node.js + discord.js', 'Best docs and examples for Discord bots; easy for AI tools to write.']
      : /\b(twitter|x)\b/.test(lower) ? ['Node.js + twitter-api-v2 (X API)', 'Typed client for posting and reading on X; check the X API plan limits first.'] : null;
    const i = stack.findIndex(s => s.tech.startsWith(TYPES.bot.stack[0][0]));
    if (sdk && i >= 0) stack[i] = { tech: sdk[0], why: sdk[1] + (i > 0 ? ' (for the bot side)' : '') };
  };
  const cozy = keys[0] === 'game' && COZY.test(lower) && !/\b(flight|racing|driving|space|combat|battle|war|mech) (sim|simulator)\b/.test(lower);
  if (secondary) for (const [tech, why] of secondary.stack.slice(0, 2)) if (!stack.find(s => s.tech === tech)) stack.push({ tech, why: why + ' (for the ' + lbl(secondary.label) + ' side)' });
  if (keys[1] === 'rag' && !stack.find(s => s.tech === TYPES.rag.stack[2][0])) stack.push({ tech: TYPES.rag.stack[2][0], why: TYPES.rag.stack[2][1] + ' (for the RAG chatbot side)' });
  botSdk();
  if (keys[0] === 'overlay') {
    if (/\btwitch\b/.test(lower)) stack.push({ tech: 'tmi.js (read-only Twitch chat)', why: 'Reads chat anonymously from the page, so the overlay needs no login or server.' });
    if (/\bspotify\b/.test(lower)) stack.push({ tech: 'Spotify Web API (currently-playing endpoint)', why: 'Shows the song that is playing; needs a one-time Spotify login (PKCE) by the streamer.' });
  }
  if ((/\b(ai|llm|gpt|agent|smart|summar)/.test(lower) || (/\bgenerat/.test(lower) && !/\bprocedural/.test(lower))) && !keys.includes('agent') && !keys.includes('rag') && !keys.includes('persona') && keys[0] !== 'mcp') stack.push({ tech: 'An LLM API behind a single wrapper function', why: 'Your idea sounds AI-powered; keep the model swappable.' });

  const tower = keys[0] === 'game' && !cozy && TOWER.test(lower) && !(VEHICLE.test(lower) && lower.search(VEHICLE) < lower.search(TOWER));
  const turn = keys[0] === 'game' && !cozy && !tower && TURN.test(lower);
  const roblox = engine === 'roblox' && !cozy && !turn && !tower;
  const vehicle = keys[0] === 'game' && !cozy && !turn && !roblox && !tower && VEHICLE.test(lower);
  const must = cozy ? [...COZY_MUST] : tower ? [...TOWER_MUST] : turn ? [...TURN_MUST] : roblox ? [...ROBLOX_MUST] : vehicle ? [...VEHICLE_MUST] : fabric ? [...MCMOD_FABRIC_MUST] : vscode ? [...VSCODE_MUST] : [...primary.must];
  const boss = cozy ? COZY_BOSS : tower ? TOWER_BOSS : turn ? TURN_BOSS : roblox ? ROBLOX_BOSS : vehicle ? VEHICLE_BOSS : fabric ? FABRIC_BOSS : vscode ? VSCODE_BOSS : primary.boss;
  if (tower && engine === 'roblox') must.push('Waves and money run on the server, saved with DataStoreService');
  if (secondary) must.push('Integration point with your ' + lbl(secondary.label) + ' component');
  const loot = new Set();
  for (const f of FLAVOR) if (f.kw.some(k => hasWord(lower, k) || (k.length > 4 && lower.includes(k)))) f.loot.forEach(l => loot.add(l));
  ['Polish pass and onboarding', 'Share / invite flow', 'Basic analytics'].forEach(l => loot.add(l));

  const stackLine = stack.slice(0, 3).map(s => s.tech).join(', ');
  const mvp = {
    name,
    pitch: `${cap(fixCase(idea.replace(/[.!?]+$/, '').replace(/^(please\s+)?((build|make|create|code)( me)?|i (want|need|would like) to (build|make|create)|i want|i need|help me (build|make))\s+/i, '')))} — shipped as ${article(primary.label)} ${lbl(primary.label)}${secondary ? ' with ' + article(secondary.label) + ' ' + lbl(secondary.label) + ' component' : ''}, scoped to one core loop that a real user can finish in under a minute.`,
    types: keys.map((k, i) => i === 0 ? primary.label : TYPES[k].label),
    mustHave: must,
    outOfScope: ['User accounts / payments (unless the idea is about them)', 'Admin dashboards', 'Mobile-perfect design', 'Anything not needed for the core loop'],
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
      : { level: 6, title: 'Launch: Ship It', xp: 300, steps: ['Deploy (see stack for hosting)', 'Test the public URL/command on a second device', 'Post-deploy check: env vars are set on the host, and for web apps, refreshing a non-home page works, login redirects go to the live URL (not localhost), database access rules are on, and the domain resolves', 'Post it on X / Discord / Reddit with a short demo clip', 'Collect feedback and list the next 3 quests'], done: 'It is live and someone other than you used it.' },
  ];

  const ctx = `Project: ${name}\nIdea: ${idea}\nType: ${mvp.types.join(' + ')}\nStack: ${stack.map(s => s.tech).join('; ')}`;
  const prompts = [
    { title: 'Rules file (save as AGENTS.md; for Claude Code, put @AGENTS.md on line 1 of CLAUDE.md)', text: `You are my senior pair-programmer on "${name}".\n\n${ctx}\n\nRules:\n- Build the smallest thing that works; no extra features beyond the MVP list.\n- MVP must-haves: ${must.join('; ')}.\n- Out of scope: ${mvp.outOfScope.join('; ')}.\n- Keep files small and named clearly. Explain each change in 1-2 sentences.\n- After each change, tell me exactly how to run and test it.\n- Ask me before adding any new dependency, and before deleting files or data.\n- Never edit .env files or commit secrets.\n- If a test fails, fix the code, not the test. Never change, skip or delete a test to make it pass; ask me if you think the test itself is wrong.\n- If the same error comes back after 2 fix attempts, stop. Tell me the exact error, what you tried, and what you need from me.\n- If I bring up a new project idea before this one is launched, remind me to park it in IDEAS.md and finish this one first.\n\nCommands (fill these in once Level 1 runs):\n- Run: \n- Test: \n- Lint: \n\nMistakes to avoid in this repo (add one line each time the AI repeats a mistake):\n- ` },
    { title: 'Level 1: scaffold the project', text: `${ctx}\n\nScaffold this project from scratch using the stack above. Give me the exact terminal commands, the folder structure, and the minimal code for a working "hello world". Do not build features yet. End with how to run it.` },
    { title: 'Level 2: build the core loop', text: `Using the existing scaffold for "${name}", implement the core loop: ${must.slice(0, 3).join('; ')}. Use hardcoded sample data. Keep it to the fewest files possible. Before writing the feature code, write 2-3 small checks that pass only when the core loop works (automated tests if the stack has a test runner, otherwise a short manual checklist in TESTING.md), and keep them passing on every later change so new features can't quietly break old ones. Show the diff and how to run the checks.` },
    { title: 'Level 3: real data and persistence', text: `Replace sample data in "${name}" with real input and persistent storage. Add loading, empty, and error states plus input validation. List any edge cases I should test by hand.` },
    { title: 'Boss fight', text: `The hardest part of "${name}" is: ${boss}. Propose 3 approaches ranked by simplicity, with tradeoffs. Then implement the simplest one, add logging, and write 5 nasty test cases.` },
    { title: 'Debug helper', text: `Something is broken in "${name}". Here's what I expected: [X]. Here's what happened: [Y]. Here's the error/log: [paste]. First, list the 3 most likely causes. Then suggest the smallest change to test each. Don't rewrite unrelated code. If we've already tried 2 fixes that didn't work, stop, tell me what we've ruled out, and suggest I start a fresh chat with just this prompt and the one relevant file.` },
    { title: 'Pre-launch security check', text: `Act as a hostile reviewer of "${name}" before anyone else uses it. Check for: API keys or tokens in the code or repo history, missing auth on routes, unvalidated input, data another user could read or change, a user who can raise their own role (make themselves owner or admin, including through database rules), data or secrets sent to the browser that a logged-out visitor could see in view-source or the network tab (build the front end and search the output for secret key names such as sk_live, service_role, secret and private_key), and costs an attacker could run up (API calls, LLM tokens). Rank what you find by damage, fix the top 3, and tell me how to verify each fix. If it has user accounts, also give me a two-account test: create accounts A and B in two browsers, make data in A, then try to see or edit it from B (change IDs in URLs and requests) and again while logged out.` },
    { title: 'Polish and launch', text: `Review "${name}" like a picky user. List the top 10 rough edges (UX, copy, errors, performance), then fix the top 5. Next, write a README with a one-line pitch, setup, usage, and a demo section, and give me deploy steps for the stack above. Then give me a post-deploy check for the 5 things that most often break when a vibe-coded app goes live, with how to test and fix each on this stack: environment variables missing on the host, a 404 when refreshing a page that isn't the home page, login or OAuth redirects still pointing to localhost, database row-level security (or equivalent access rules) left off, and the custom domain's DNS not resolving. Skip any that don't apply to this stack.` },

  ];
  if (keys[0] === 'game') prompts.push({ title: 'After launch: keep players playing', text: `"${name}" is live. Here are its numbers: average playtime [X], share of players still playing 1 minute after starting [Y], share who come back the next day [Z]. Read the code and, for each number, explain what in the game is causing it (load size and order, first-minute difficulty, how much content one run has, reasons to return). Then write a fix plan with one phase per number, first-minute first. For each fix give the files, the change and a test I can run. Make one commit per phase and stop after each so I can ship it and watch the numbers.` });

  return { mvp, stack, plan, prompts, totalXp: plan.reduce((a, l) => a + l.xp, 0), engine: 'template-v1' };
}

module.exports = { generate };
