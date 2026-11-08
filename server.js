'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const { generate } = require('./generator');
const PORT = process.env.PORT || 4173;
const PUB = path.join(__dirname, 'public');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' };
const LASTMOD = (() => { try { return fs.statSync(path.join(PUB, 'index.html')).mtime.toISOString().slice(0, 10); } catch (e) { return new Date().toISOString().slice(0, 10); } })();
const EXAMPLES = ["A Discord bot that tracks my friends' game stats and posts a weekly leaderboard", "A 2D roguelike platformer with procedurally generated dungeons", "An AI agent that reads my GitHub issues and drafts fixes", "A web app that shows free game drops and patch notes for my wishlist", "A Chrome extension that summarizes any page with AI"];
// Extra example quests listed only in the sitemap and llms.txt (not the homepage chips), so crawlers find more real /q/ pages
const SITEMAP_EXAMPLES = ["A TikTok caption generator", "A meal planner that uses AI to suggest recipes", "A mobile app that uses AI to identify plants", "A mobile app that uses AI to count calories from a photo of my food", "An iPhone app that identifies birds from their songs", "An app that transcribes my voice notes with Whisper", "An Android app that translates street signs from the camera", "A metronome app for drummers", "A speedrun timer for my Steam Deck", "A habit tracker for my Android phone", "A pomodoro timer web app", "A local LLM chatbot that runs on my laptop with Ollama", "A beat maker web app", "An MCP server that lets Claude Code read my Notion roadmap", "A speedrun splits overlay for OBS", "A racing game where you drift around neon tracks", "A Minecraft server plugin that adds quests", "A CLI that scaffolds a new Next.js project", "A chatbot that roleplays as a pirate", "A RAG chatbot over my Obsidian notes", "A tower defense game with zombies", "A customer support chatbot for my Shopify store", "A study planner that uses GPT to make flashcards", "A workout tracker that uses AI to plan my week"];
const ALL_EXAMPLES = EXAMPLES.concat(SITEMAP_EXAMPLES);
const LLMS = `# QuestStarter

> QuestStarter is a free web tool that turns any app, game, Discord bot, browser extension or AI agent idea into an actionable "Quest Card": a scoped MVP, recommended tech stack, a 6-level build plan with XP, and 8 copy-paste prompts (including a pre-launch security check; game quests add a 9th for fixing playtime and next-day retention after launch) for AI coding tools like Cursor and Claude Code.

## How it works
- User types a project idea; no signup, free.
- Output: scoped MVP (must-haves, out-of-scope, boss fight risk), tech stack, build plan, prompts, downloadable Markdown.
- Quests are shareable: __BASE__/q/<base64url-of-idea> regenerates the same quest.

## Links
- [Home / generator](__BASE__/)
- [Sitemap](__BASE__/sitemap.xml)

## Example quests
__EXAMPLES__

## Newsletter
QuestStarter Weekly: weekly vibe-coding quests, build tips, and AI dev + game news. Free. Subscribe: https://buttondown.com/queststarter (signup box also on the homepage and below every quest).

## FAQ
- What is QuestStarter? A free, no-signup tool that turns a project idea into a Quest Card: scoped MVP, tech stack, 6-level build plan with XP, and copy-paste prompts for AI coding tools.
- What kinds of ideas work? Web apps, browser games, Discord/Telegram/Slack/Twitch/X bots, AI agents and chatbots, local Ollama chatbots, MCP servers, CLI tools, Chrome and VS Code extensions, Minecraft plugins and mods, OBS and stream overlays, mobile apps, personal trackers, and data or alert tools.
- Can it plan an MCP server or a VS Code extension? Yes. Ideas that mention MCP get a TypeScript MCP SDK plan with Zod tool schemas, the MCP Inspector and a client config for Claude Code, Claude Desktop or Cursor. VS Code extension ideas get a VS Code Extension API plan that also runs in Cursor and Windsurf. Card, board, chess, trivia, strategy and text adventure games get a turn-based MVP instead of movement and collision.
- Which AI coding tools do the prompts work with? Cursor, Claude Code, Codex, Windsurf, GitHub Copilot, ChatGPT and any other assistant.
- Does it work for Unity, Godot, Roblox, Unreal or Three.js games? Yes. Game ideas that mention Unity get a Unity 6 (C#) plan, ideas that mention Godot or 3D get a Godot 4 plan, and both include an MCP server so Claude Code or Cursor can edit scenes directly. Ideas that mention Three.js or a 3D browser game get a Three.js plan that runs from a link. Roblox and obby ideas get a Roblox Studio (Luau) plan with the Studio MCP server and Rojo, and Unreal ideas get an Unreal Engine 5 plan with an Unreal MCP plugin. 3D, VR and Unreal plans also suggest Blender MCP so your AI tool can make simple 3D assets. Other game ideas get Phaser 3 for the browser. Cozy and sim games get a progression-focused MVP instead of combat.
- Can it plan a CLI tool or a Minecraft plugin? Yes. Command line ideas (CLI, terminal, npx) get a Node.js + TypeScript plan with commander, tsup and npm publishing so anyone can run it with npx. Minecraft server plugins get a Paper (Java) plan with plugin.yml, config.yml and a local test server, and Fabric or Forge mod ideas get a Fabric plan. Roblox obbies get checkpoints, server-checked progress and DataStore saves, and text adventures get an Ink story plan instead of Phaser.
- Can it plan a stream overlay or a racing game? Yes. OBS and stream overlay ideas (Twitch, YouTube Live, Kick) get a static page plan for an OBS Browser Source: Vite + TypeScript, a transparent 1920x1080 layout, settings in URL params and free static hosting, with no server or database; Twitch chat overlays add tmi.js and now-playing overlays add the Spotify Web API. Racing, kart, drifting and flight games get a vehicle MVP: tuned handling, a track with checkpoints, a best-time timer and a ghost or AI opponent.
- Can it plan a RAG chatbot over my own notes or docs? Yes. Ideas to chat with or ask questions about your own notes, docs, PDFs, wiki or codebase (Obsidian, Notion exports, help center articles) get a retrieval (RAG) plan instead of an agent loop: load and chunk the documents, store embeddings in a local vector store such as pgvector, sqlite-vec or Chroma, retrieve the best-matching chunks, answer only from them with citations, and say so when the documents do not have the answer. The plan includes a small eval set of real questions so you can tell whether changes help.
- Can it plan a roleplay or character chatbot? Yes. Chatbots that roleplay or talk like a character (a pirate, an anime character, a companion) get a persona chatbot plan instead of a tool-calling agent: a versioned system prompt that defines the character's voice and rules, a streaming chat UI, chat history trimmed to a token budget, and a per-user message limit. The boss fight is keeping it in character over long chats.
- Can it plan a tower defense game? Yes. Tower defense ideas get their own plan instead of a generic player-and-enemy game: an enemy path from spawn to your base, tower placement with range, damage and fire rate, waves that ramp up with lives lost when enemies get through, and money from kills to buy and upgrade towers. The boss fight is wave balance and the economy.
- Can it plan a customer support chatbot for my store? Yes. Support and FAQ chatbots for a store, SaaS, website or Discord server get a retrieval (RAG) plan instead of a tool-calling agent: load your FAQ, shipping and return policies into a vector store, answer only from them with a source, say when it does not know, and hand off to a human. Store bots also get one read-only order-status lookup (the Shopify Admin API for Shopify stores) and never issue refunds or edit orders.
- Does every AI idea get an agent plan? No. An app that uses AI to generate, write, summarize, review, suggest, find or rename something (a recipe suggester, podcast clip finder, screenshot renamer or resume reviewer) gets an AI web app plan (or keeps a CLI or extension plan with one AI call): one form, one server-side LLM call with a versioned prompt and Zod-checked structured output, a result view with copy and regenerate, and a rate limit and token cap. The boss is output quality on 10 real inputs. Ideas that act on things (send emails, file issues, control devices) still get the tool-calling agent loop.
- Can it plan a study or flashcard app that uses AI? Yes. An idea like "a study planner that uses GPT to make flashcards" becomes the AI Study Planner quest: an AI web app with one input form for your notes, one server-side LLM call that returns flashcards as Zod-checked structured output, copy and regenerate buttons, and a rate limit plus token cap. The boss fight is getting consistent, useful cards on 10 real inputs.
- Can it plan a normal app with one AI feature, like a workout tracker or todo list? Yes. An idea like "a workout tracker that uses AI to plan my week" or "a todo app that uses AI to prioritize my tasks" is planned as an AI web app, not a tool-calling agent: one input form, one server-side LLM call with a versioned prompt and Zod-checked structured output, copy and regenerate buttons, and a rate limit plus token cap. Ideas that name Claude, GPT or another model directly get the same plan.
- Can it plan a mobile app that uses AI to identify things from a photo? Yes. An idea like "a mobile app that uses AI to identify plants" becomes the AI Plant Identifier quest: an Expo (React Native) mobile app plan with one vision-capable model call (GPT-4o, Claude or Gemini) made from a server function, so the API key never ships in the app. A phone app, Chrome extension, bot or CLI with one AI feature keeps its own plan and adds the AI call, instead of turning into a tool-calling agent.
- Can it plan an AI calorie counter that works from a photo of my food? Yes. An idea like "a mobile app that uses AI to count calories from a photo of my food" becomes the AI Calorie Counter quest: an Expo (React Native) phone app whose core step is take or pick a photo, send it to one vision-capable model call (GPT-4o, Claude or Gemini) on your server, and show the answer as a result card. The plan also covers a denied camera permission and a blurry or unrelated photo with a friendly retry, instead of a generic offline-first app or a tool-calling agent.
- Can it plan a caption, name or bio generator that does not mention AI? Yes. A generator or writer of short text, like "a TikTok caption generator", "a fantasy name generator" or "a cover letter writer", becomes an AI web app quest even if the idea never says AI: one server-side LLM call behind an input form, structured output checked with Zod, copy and regenerate buttons, and a rate limit so strangers cannot run up your API bill. Generators that need no model, like a password or QR code generator, stay plain web apps.
- Can it plan an app that identifies birds or songs by their sound? Yes. An idea like "an iPhone app that identifies birds from their songs" becomes the Bird Song Identifier quest: an Expo (React Native) phone app whose core step is record a 5-15 second clip with the microphone, send it to one server function that calls an audio-ID model or API (BirdNET for birds, AudD or ACRCloud for songs, YAMNet for sounds like a dog barking), and show the top match with a confidence score. The plan also covers a denied microphone permission and a noisy or silent clip, and its boss fight is identification quality on real recordings, instead of a generic offline-first app.
- Can it plan a voice note transcriber or a guitar tuner app? Yes. An idea like "an app that transcribes my voice notes with Whisper" becomes the Voice Notes Transcriber quest: record a voice note in the browser (or upload an audio file), send it to one server function that calls a speech-to-text API (OpenAI Whisper or gpt-4o-transcribe, or Deepgram), and show the transcript with a copy button; its boss fight is transcription quality and cost on real recordings, including splitting long files under the 25 MB upload limit. "A guitar tuner app for my phone" becomes the Guitar Tuner quest: live microphone audio (react-native-audio-api in an Expo development build, or the Web Audio API on the web) fed to a pitch detector (pitchy) that shows the nearest note and how many cents sharp or flat it is, with a boss fight on pitch accuracy, low strings and a needle that does not jitter.
- Can it plan a camera translator or a photo app like a calorie counter? Yes. An idea like "an Android app that translates street signs from the camera" becomes the Street Sign Translator quest: an Expo (React Native) phone app where you point the camera at the text (or pick a photo), one server function sends it to a vision-capable model (GPT-4o, Claude or Gemini) that reads and translates it, and the app shows the original text next to the translation; ML Kit text recognition and translation is the offline option. Its boss fight is glare, angles, stylized fonts and mixed languages. "A mobile app that uses AI to count calories from a photo of my food" becomes the AI Calorie Counter quest, whose boss fight is estimate accuracy (portion sizes, mixed dishes, hidden oil or sauce), so the plan shows an editable estimate with a range instead of one confident number.
- Can it plan a metronome or a speedrun timer, where timing has to be exact? Yes. An idea like "a metronome app for drummers" becomes the Drum Metronome quest: a web app that schedules every click on the Web Audio clock (AudioContext) with a short lookahead instead of setInterval, with tap tempo, an accented first beat and a time signature picker, and a boss fight about clicks that drift when the tab is in the background. "A speedrun timer for my Steam Deck" becomes a local-first Speedrun Timer: start, split and reset hotkeys, times taken from performance.now() so they never drift, splits compared with your personal best, everything saved in localStorage with no accounts or database, and a note that global hotkeys while the game has focus need a desktop wrapper like Tauri or Electron.
- Can it plan a simple habit tracker without accounts or a database? Yes. An idea like "a habit tracker for my Android phone" becomes the Habit Tracker quest: an Expo (React Native) app where you add a habit, check it off for today with one tap and see your streak, with a daily reminder as a local notification (expo-notifications) and everything saved on the phone in expo-sqlite, so there is no sign-up, server or Supabase. A habit tracker web app keeps check-ins in localStorage and shows a 30-day grid. The boss fight is streak logic: each check-in is stored as a local date, not a timestamp, so late-night check-offs, missed days, daylight saving and time zone changes never break a streak. Words like tracker no longer add a data or API component to a personal tracker.
- Can it plan a pomodoro timer or a todo list without accounts? Yes. An idea like "a pomodoro timer web app" becomes the Pomodoro Timer quest: a local-first web app with start/pause/reset, editable focus and break lengths, a sound or browser notification when a session ends, and settings plus today's session count saved in localStorage — no Supabase or sign-up. The boss fight is a countdown you can trust when the tab is in the background (store the end timestamp and derive remaining time from Date.now(), never by counting setInterval ticks alone). "A todo app" becomes a Todo List with add/complete/filter and localStorage persistence; workout and sleep trackers on a phone get the same local-first treatment with expo-sqlite instead of a generic store-submission boss.
- Can it plan a beat maker or a pomodoro Chrome extension? Yes. An idea like "a beat maker web app" becomes the Beat Maker quest: a local-first Web Audio step sequencer with a 16-step grid, at least 4 drum pads, samples scheduled on the audio clock with a short lookahead (not setInterval), patterns saved in localStorage, and a boss fight about tight timing when the tab is busy. "A pomodoro chrome extension" becomes a Pomodoro Timer browser extension: Manifest V3 with a popup for start/pause/reset, a service worker countdown from an end timestamp (chrome.alarms), a badge that shows remaining time, settings in chrome.storage.local, and a boss fight about keeping the timer accurate across MV3 service worker sleeps — not a generic content-script extension.
- Can it plan a local chatbot that runs on my laptop with Ollama? Yes. An idea like "a local LLM chatbot that runs on my laptop with Ollama" becomes the Ollama Chat quest: a streaming chat UI that talks to Ollama on your machine at http://localhost:11434 (via the Vercel AI SDK's ollama-ai-provider), a model picker filled from the models you have already pulled, conversation history trimmed to the model's context window, and a clear empty state when Ollama is not running or no model is pulled — with no cloud API key and no silent fallback to a hosted model. The boss fight is first-token latency on your hardware and staying fully local. LM Studio chat apps get the same local-server plan.
- Can I save or share a quest? Yes: download it as Markdown, or share the /q/ link, which rebuilds the same quest for anyone.

## Good for
Vibe coders, indie game devs and AI-agent builders who don't know what to build or where to start.
`;
// Privacy-friendly usage counter: in-memory totals only. No cookies, IPs, user agents or ideas are stored.
// Counts reset when the server restarts or redeploys; each event also logs one line to stdout (Render logs).
const STARTED = new Date().toISOString();
const EVENTS = ['view_home', 'view_quest', 'view_bot', 'quest_generated', 'prompt_copy', 'share_click', 'md_download', 'newsletter_signup'];
const counts = Object.fromEntries(EVENTS.map(e => [e, 0]));
const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|curl|wget|python|headless/i;
function track(ev) { if (!(ev in counts)) return false; counts[ev]++; console.log('[stat] ' + ev + ' ' + counts[ev]); return true; }
http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/event') {
    let body = '';
    req.on('data', d => { body += d; if (body.length > 200) req.destroy(); });
    req.on('end', () => {
      let ev = ''; try { ev = (JSON.parse(body || '{}').e || '') + ''; } catch (e) { ev = body.trim(); }
      const ok = ['prompt_copy', 'share_click', 'md_download', 'newsletter_signup'].includes(ev) && track(ev);
      res.writeHead(ok ? 204 : 400); res.end();
    });
    return;
  }
  if (req.method === 'GET' && req.url.split('?')[0] === '/stats') {
    const key = process.env.STATS_KEY, given = new URL(req.url, 'http://x').searchParams.get('key') || req.headers['x-stats-key'];
    if (!key || given !== key) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify({ since: STARTED, note: 'In-memory; resets on restart/deploy', counts }, null, 2));
  }
  if (req.method === 'POST' && req.url === '/api/generate') {
    let body = '';
    req.on('data', d => { body += d; if (body.length > 10000) req.destroy(); });
    req.on('end', async () => {
      try {
        const { idea } = JSON.parse(body || '{}');
        const out = await generate(idea); track('quest_generated');
        res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(out));
      } catch (e) { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: e.message })); }
    });
    return;
  }
  const base = process.env.BASE_URL || ('https://' + (req.headers.host || 'queststarter.onrender.com'));
  const u = req.url.split('?')[0];
  if (u === '/robots.txt') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('User-agent: *\nAllow: /\n\nSitemap: ' + base + '/sitemap.xml\n'); }
  if (u === '/sitemap.xml') { res.writeHead(200, { 'Content-Type': 'application/xml' }); return res.end('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + base + '/</loc><lastmod>' + LASTMOD + '</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>' + ALL_EXAMPLES.map(e => '<url><loc>' + base + '/q/' + Buffer.from(e).toString('base64url') + '</loc><lastmod>' + LASTMOD + '</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>').join('') + '<url><loc>' + base + '/llms.txt</loc><lastmod>' + LASTMOD + '</lastmod><priority>0.3</priority></url></urlset>\n'); }
  if (u === '/llms.txt') { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end(LLMS.replace('__EXAMPLES__', ALL_EXAMPLES.map(e => '- [' + e + '](__BASE__/q/' + Buffer.from(e).toString('base64url') + ')').join('\n')).replace(/__BASE__/g, base)); }
  if (u === '/' || u.startsWith('/q/')) {
    if (req.method === 'GET') track(BOT_RE.test(req.headers['user-agent'] || '') ? 'view_bot' : (u === '/' ? 'view_home' : 'view_quest'));
    let id = u.startsWith('/q/') ? u.slice(3) : '', title = 'QuestStarter — Turn any app idea into a quest', desc = '', ok = true, quest = null;
    if (id) { if (!/^[\w-]{1,4000}$/.test(id)) ok = false; else { try { const full = Buffer.from(id, 'base64url').toString('utf8').trim(), idea = full.slice(0, 70); if (!full || full.includes('\uFFFD') || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(full)) throw new Error('bad id'); try { quest = generate(full); } catch (e) { quest = null; } if (idea) { title = 'Quest: ' + idea + ' | QuestStarter'; desc = 'Quest Card for "' + idea + '": scoped MVP, tech stack, 6-level build plan with XP and copy-paste prompts for Cursor and Claude Code. Free.'; } } catch (e) { ok = false; } } }
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const html = fs.readFileSync(path.join(PUB, 'index.html'), 'utf8').replace(/__BASE__/g, base).replace(/__PATH__/g, id ? 'q/' + id : '').replace(/__TITLE__/g, esc(title)).replace(/<title>[^<]*<\/title>/, '<title>' + esc(title) + '</title>');
    // Server-render the quest summary so crawlers and LLMs without JS see the real content; the client re-renders the full card over it.
    const ssr = quest ? '<div id="out"><div class="card"><h2>🎯 Quest: ' + esc(quest.mvp.name) + '</h2><p>' + esc(quest.mvp.pitch) + '</p><b>Level 1 must-haves</b><ul>' + quest.mvp.mustHave.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul><b>👹 Boss fight:</b> ' + esc(quest.mvp.boss) + '</div><div class="card"><h2>🧰 Tech Stack</h2><ul>' + quest.stack.map(x => '<li><b>' + esc(x.tech) + '</b> <span class="mut">— ' + esc(x.why) + '</span></li>').join('') + '</ul></div><div class="card"><h2>🗺️ Build Plan</h2><ol>' + quest.plan.map(l => '<li><b>Level ' + l.level + ': ' + esc(l.title) + '</b> (+' + l.xp + ' XP). ' + esc(l.done) + '</li>').join('') + '</ol></div></div>' : '';
    const html2 = ssr ? html.replace('<div id="out" class="hidden"></div>', ssr) : html;
    const page = desc ? html2.replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*"/g, (m, a) => a + esc(desc) + '"') : html2;
    res.writeHead(ok ? 200 : 404, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(page);
  }
  if (req.url === '/health') { res.end('ok'); return; }
  let p = req.url.split('?')[0]; if (p === '/') p = '/index.html';
  const f = path.join(PUB, path.normalize(p).replace(/^(\.\.[\/\\])+/, ''));
  if (!f.startsWith(PUB) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('Not found'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(PORT, '0.0.0.0', () => console.log('QuestStarter on http://localhost:' + PORT));
