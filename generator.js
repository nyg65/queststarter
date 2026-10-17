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
    label: 'Game', kw: ['game', 'platformer', 'rpg', 'roguelike', 'shooter', 'puzzle', 'arcade', 'tower defense', 'card game', 'multiplayer'],
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
  extension: {
    label: 'Browser Extension', kw: ['extension', 'chrome', 'browser plugin', 'userscript'],
    stack: [['Chrome Extension MV3 + Vite (CRXJS)', 'Modern manifest with hot reload.'], ['TypeScript', 'Safer message passing between scripts.'], ['chrome.storage', 'Built-in persistence.']],
    must: ['Manifest + popup that opens', 'Content script that does one thing on one site', 'Settings saved in chrome.storage'],
    boss: 'Handling sites that change their DOM, and MV3 service worker lifecycle',
  },
  mobile: {
    label: 'Mobile App', kw: ['mobile', 'ios', 'android', 'iphone', 'phone app'],
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
  web: {
    label: 'Web App', kw: ['web', 'website', 'app', 'site', 'saas', 'platform', 'landing', 'portfolio', 'tool'],
    stack: [['Next.js (App Router) + TypeScript', 'Most-documented stack for AI coding tools.'], ['Tailwind CSS + shadcn/ui', 'Good-looking UI with minimal design work.'], ['Supabase (Postgres + Auth)', 'Backend in an afternoon.'], ['Vercel', 'Free deploy on every push.']],
    must: ['Landing view explaining the value in one sentence', 'The one core flow, end to end', 'Persist data (Supabase or localStorage first)', 'Deploy to a public URL'],
    boss: 'Auth and data model — get the schema right before adding features',
  },
};

const FLAVOR = [
  { kw: ['game', 'gaming', 'gamer', 'steam', 'xbox', 'playstation', 'esports', 'twitch', 'minecraft', 'discord'], loot: ['Steam / game API integration', 'Leaderboards', 'Discord share button', 'Achievement badges'] },
  { kw: ['ai', 'llm', 'gpt', 'agent', 'prompt', 'chatbot', 'rag'], loot: ['Model picker', 'Conversation memory', 'Cost / token meter', 'Eval set to test quality'] },
  { kw: ['social', 'community', 'friends', 'chat', 'multiplayer'], loot: ['Friend lists', 'Realtime updates (WebSockets)', 'Moderation tools'] },
  { kw: ['money', 'budget', 'finance', 'crypto', 'trading', 'bet'], loot: ['CSV export', 'Charts', 'Disclaimer page (not financial advice)'] },
];

const STOP = new Set('a an the to for of and or that i my me with on in it is be build make create want app project idea simple'.split(' '));

function detectTypes(text) {
  const t = ' ' + text.toLowerCase() + ' ';
  const scored = [];
  for (const [key, def] of Object.entries(TYPES)) {
    let s = 0;
    for (const k of def.kw) if (t.includes(k.length <= 3 ? ' ' + k : k)) s += k.length > 3 ? 2 : 1;
    if (s) scored.push([key, s]);
  }
  scored.sort((a, b) => b[1] - a[1]);
  const keys = scored.map(x => x[0]);
  // generic "app/web/tool" shouldn't beat specific types
  if (keys.length > 1 && keys[0] === 'web') keys.push(keys.shift());
  // "app"/"tool" alone is just a noun, not a web-app signal when a specific type was found
  if (keys.length > 1 && keys[0] !== 'web' && !/\b(web|website|site|saas|platform|landing|portfolio)\b/.test(t)) { const i = keys.indexOf('web'); if (i > 0) keys.splice(i, 1); }
  // an app that picks/tracks/recommends games is a web/data tool about games, not a game to build
  const gameGenre = /\bgame (where|about|in which|set)\b|\b(platformer|rpg|roguelike|shooter|puzzle|arcade|tower defense|card game|deckbuilder|multiplayer|level|player|enemy|enemies)\b/.test(t);
  if (keys[0] === 'game' && !gameGenre && /\b(pick|picks|recommend\w*|suggest\w*|choose|finder|track\w*|backlog|library|wishlist|review\w*|deals?)\b/.test(t)) { keys.shift(); if (!keys.includes('web') && !keys.includes('data')) keys.unshift('web'); }
  return keys.length ? keys.slice(0, 2) : ['web'];
}

const ACRO = { ai: 'AI', rag: 'RAG', api: 'API', llm: 'LLM', gpt: 'GPT', ios: 'iOS', iphone: 'iPhone', mvp: 'MVP', rpg: 'RPG', ui: 'UI', '2d': '2D', '3d': '3D', npc: 'NPC', mmo: 'MMO', fps: 'FPS', pc: 'PC', vr: 'VR', ar: 'AR', youtube: 'YouTube', github: 'GitHub', tiktok: 'TikTok' };
function titleCase(s) { return s.split(' ').map(w => ACRO[w] || w.replace(/\b\w/g, c => c.toUpperCase())).join(' '); }
function hasWord(text, k) { return new RegExp('(^|[^a-z0-9])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])').test(text); }
function lbl(l) { return l.toLowerCase().replace(/\bai\b/g, 'AI').replace(/\bapi\b/g, 'API'); }
function article(w) { return /^[aeiou]/i.test(w) ? 'an' : 'a'; }

const FILLER = new Set('helps help lets let allows allow can will you your which who where when using use uses via from into just some every all also really like so tells shows gives'.split(' '));
const KIND = new Set('bot tool extension plugin agent website site webapp saas platform thing chrome browser discord telegram slack mobile ios android iphone web'.split(' '));
const VERB = { track: 'Tracker', tracks: 'Tracker', summarize: 'Summarizer', summarizes: 'Summarizer', review: 'Reviewer', reviews: 'Reviewer', pick: 'Picker', picks: 'Picker', find: 'Finder', finds: 'Finder', recommend: 'Recommender', recommends: 'Recommender', suggest: 'Suggester', suggests: 'Suggester', plan: 'Planner', plans: 'Planner', generate: 'Generator', generates: 'Generator', monitor: 'Monitor', monitors: 'Monitor', alert: 'Alerts', alerts: 'Alerts', organize: 'Organizer', organizes: 'Organizer', schedule: 'Scheduler', schedules: 'Scheduler', compare: 'Comparer', compares: 'Comparer', translate: 'Translator', translates: 'Translator', scrape: 'Scraper', scrapes: 'Scraper', log: 'Logger', logs: 'Logger', remind: 'Reminder', reminds: 'Reminder', count: 'Counter', counts: 'Counter', rate: 'Rater', rates: 'Rater', write: 'Writer', writes: 'Writer', build: 'Builder', builds: 'Builder', create: 'Creator', creates: 'Creator', explain: 'Explainer', explains: 'Explainer', analyze: 'Analyzer', analyzes: 'Analyzer', post: 'Poster', posts: 'Poster', send: 'Sender', sends: 'Sender', watch: 'Watcher', watches: 'Watcher', turn: 'Converter', turns: 'Converter', convert: 'Converter', converts: 'Converter' };
const BREAK = /^(to|for|with|on|in|at|by|and|or|when|so|from|using|via|while|before|after|based|over|where|as|that|which|who|if|like|into|about)$/;

// "a discord bot that tracks my friends game wins" -> "Friends Game Wins Tracker" (falls back to the first 3 meaningful words)
function projectName(idea) {
  const all = idea.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const vi = all.findIndex((w, i) => VERB[w] && i > 0);
  if (vi > 0) {
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
  for (const w of all) {
    if (BREAK.test(w)) { if (words.length) break; else continue; }
    if (STOP.has(w) || FILLER.has(w)) continue;
    words.push(w);
    if (words.length === 3) break;
  }
  return titleCase(words.join(' ')) || 'My Project';
}

function cap(s) { s = s.trim(); return /^[a-z][A-Z]/.test(s) ? s : s.charAt(0).toUpperCase() + s.slice(1); }

function generate(idea) {
  idea = String(idea || '').trim().slice(0, 600);
  if (idea.length < 4 || !/[a-z0-9]{2,}/i.test(idea)) throw new Error('Tell me a bit more about your idea (at least a few words).');
  const keys = detectTypes(idea);
  const primary = TYPES[keys[0]];
  const secondary = keys[1] ? TYPES[keys[1]] : null;
  const name = projectName(idea);
  const lower = idea.toLowerCase();

  const stack = primary.stack.map(([tech, why]) => ({ tech, why }));
  if (secondary) for (const [tech, why] of secondary.stack.slice(0, 2)) if (!stack.find(s => s.tech === tech)) stack.push({ tech, why: why + ' (for the ' + lbl(secondary.label) + ' side)' });
  if (/\b(ai|llm|gpt|agent|smart|generate|summar)/.test(lower) && !keys.includes('agent')) stack.push({ tech: 'An LLM API behind a single wrapper function', why: 'Your idea sounds AI-powered; keep the model swappable.' });

  const must = [...primary.must];
  if (secondary) must.push('Integration point with your ' + lbl(secondary.label) + ' component');
  const loot = new Set();
  for (const f of FLAVOR) if (f.kw.some(k => hasWord(lower, k) || (k.length > 4 && lower.includes(k)))) f.loot.forEach(l => loot.add(l));
  ['Polish pass and onboarding', 'Share / invite flow', 'Basic analytics'].forEach(l => loot.add(l));

  const stackLine = stack.slice(0, 3).map(s => s.tech).join(', ');
  const mvp = {
    name,
    pitch: `${cap(idea.replace(/[.!?]+$/, ''))} — shipped as ${article(primary.label)} ${lbl(primary.label)}${secondary ? ' with ' + article(secondary.label) + ' ' + lbl(secondary.label) + ' component' : ''}, scoped to one core loop that a real user can finish in under a minute.`,
    types: keys.map(k => TYPES[k].label),
    mustHave: must,
    outOfScope: ['User accounts / payments (unless the idea is about them)', 'Admin dashboards', 'Mobile-perfect design', 'Anything not needed for the core loop'],
    boss: primary.boss,
    loot: [...loot].slice(0, 6),
    success: [`A stranger can use it from a link or command with no explanation`, `The core loop works end to end 10 times in a row`, `You've shown it to 3 people and gotten feedback`],
  };

  const plan = [
    { level: 1, title: 'Tutorial Zone: Setup', xp: 100, steps: ['Create the repo and scaffold with: ' + stackLine, 'Add a README with the one-sentence pitch', 'Get a "hello world" running locally and commit', 'Add a .cursor/rules (or CLAUDE.md) file with your stack and conventions'], done: 'App runs locally and is pushed to GitHub.' },
    { level: 2, title: 'First Quest: Core Loop', xp: 250, steps: must.slice(0, 3).map(cap), done: 'The core loop works with hardcoded/sample data.' },
    { level: 3, title: 'Side Quest: Real Data & State', xp: 250, steps: ['Replace sample data with real input and persistence', 'Handle empty, loading, and error states', 'Add input validation'], done: 'Data survives a refresh/restart.' },
    { level: 4, title: 'Boss Fight: ' + primary.boss, xp: 400, steps: ['Reproduce the hardest problem in isolation', 'Ask your AI tool for 2-3 approaches, pick the simplest', 'Implement, then test with ugly inputs', 'Add logging so failures are visible'], done: 'The boss problem no longer breaks the core loop.' },
    { level: 5, title: 'Polish & Loot', xp: 200, steps: ['Fix the 5 most annoying rough edges', 'Add one loot item: ' + mvp.loot[0], 'Write a 3-line how-to-use in the README'], done: 'You would be proud to show it to a friend.' },
    { level: 6, title: 'Launch: Ship It', xp: 300, steps: ['Deploy (see stack for hosting)', 'Test the public URL/command on a second device', 'Post it on X / Discord / Reddit with a short demo clip', 'Collect feedback and list the next 3 quests'], done: 'It is live and someone other than you used it.' },
  ];

  const ctx = `Project: ${name}\nIdea: ${idea}\nType: ${mvp.types.join(' + ')}\nStack: ${stack.map(s => s.tech).join('; ')}`;
  const prompts = [
    { title: 'Rules file (paste in .cursor/rules or CLAUDE.md)', text: `You are my senior pair-programmer on "${name}".\n\n${ctx}\n\nRules:\n- Build the smallest thing that works; no extra features beyond the MVP list.\n- MVP must-haves: ${must.join('; ')}.\n- Out of scope: ${mvp.outOfScope.join('; ')}.\n- Keep files small and named clearly. Explain each change in 1-2 sentences.\n- After each change, tell me exactly how to run and test it.\n- Ask me before adding any new dependency.` },
    { title: 'Level 1: scaffold the project', text: `${ctx}\n\nScaffold this project from scratch using the stack above. Give me the exact terminal commands, the folder structure, and the minimal code for a working "hello world". Do not build features yet. End with how to run it.` },
    { title: 'Level 2: build the core loop', text: `Using the existing scaffold for "${name}", implement the core loop: ${must.slice(0, 3).join('; ')}. Use hardcoded sample data. Keep it to the fewest files possible. Show the diff and how to test it manually.` },
    { title: 'Level 3: real data and persistence', text: `Replace sample data in "${name}" with real input and persistent storage. Add loading, empty, and error states plus input validation. List any edge cases I should test by hand.` },
    { title: 'Boss fight', text: `The hardest part of "${name}" is: ${primary.boss}. Propose 3 approaches ranked by simplicity, with tradeoffs. Then implement the simplest one, add logging, and write 5 nasty test cases.` },
    { title: 'Debug helper', text: `Something is broken in "${name}". Here's what I expected: [X]. Here's what happened: [Y]. Here's the error/log: [paste]. First, list the 3 most likely causes. Then suggest the smallest change to test each. Don't rewrite unrelated code.` },
    { title: 'Pre-launch security check', text: `Act as a hostile reviewer of "${name}" before anyone else uses it. Check for: API keys or tokens in the code or repo history, missing auth on routes, unvalidated input, data another user could read, and costs an attacker could run up (API calls, LLM tokens). Rank what you find by damage, fix the top 3, and tell me how to verify each fix.` },
    { title: 'Polish and launch', text: `Review "${name}" like a picky user. List the top 10 rough edges (UX, copy, errors, performance), then fix the top 5. Next, write a README with a one-line pitch, setup, usage, and a demo section, and give me deploy steps for the stack above.` },
  ];

  return { mvp, stack, plan, prompts, totalXp: plan.reduce((a, l) => a + l.xp, 0), engine: 'template-v1' };
}

module.exports = { generate };
