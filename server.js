'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const { generate } = require('./generator');
const PORT = process.env.PORT || 4173;
const PUB = path.join(__dirname, 'public');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' };
const LASTMOD = (() => { try { return fs.statSync(path.join(PUB, 'index.html')).mtime.toISOString().slice(0, 10); } catch (e) { return new Date().toISOString().slice(0, 10); } })();
const EXAMPLES = ["A Discord bot that tracks my friends' game stats and posts a weekly leaderboard", "A 2D roguelike platformer with procedurally generated dungeons", "An AI agent that reads my GitHub issues and drafts fixes", "A web app that shows free game drops and patch notes for my wishlist", "A Chrome extension that summarizes any page with AI"];
// Extra example quests listed only in the sitemap and llms.txt (not the homepage chips), so crawlers find more real /q/ pages
const SITEMAP_EXAMPLES = ["A meal planner that uses AI to suggest recipes", "An MCP server that lets Claude Code read my Notion roadmap", "A speedrun splits overlay for OBS", "A racing game where you drift around neon tracks", "A Minecraft server plugin that adds quests", "A CLI that scaffolds a new Next.js project", "A chatbot that roleplays as a pirate", "A RAG chatbot over my Obsidian notes", "A tower defense game with zombies", "A customer support chatbot for my Shopify store"];
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

## FAQ
- What is QuestStarter? A free, no-signup tool that turns a project idea into a Quest Card: scoped MVP, tech stack, 6-level build plan with XP, and copy-paste prompts for AI coding tools.
- What kinds of ideas work? Web apps, browser games, Discord/Telegram/Slack/Twitch/X bots, AI agents and chatbots, MCP servers, CLI tools, Chrome and VS Code extensions, Minecraft plugins and mods, OBS and stream overlays, mobile apps, personal trackers, and data or alert tools.
- Can it plan an MCP server or a VS Code extension? Yes. Ideas that mention MCP get a TypeScript MCP SDK plan with Zod tool schemas, the MCP Inspector and a client config for Claude Code, Claude Desktop or Cursor. VS Code extension ideas get a VS Code Extension API plan that also runs in Cursor and Windsurf. Card, board, chess, trivia, strategy and text adventure games get a turn-based MVP instead of movement and collision.
- Which AI coding tools do the prompts work with? Cursor, Claude Code, Codex, Windsurf, GitHub Copilot, ChatGPT and any other assistant.
- Does it work for Unity, Godot, Roblox, Unreal or Three.js games? Yes. Game ideas that mention Unity get a Unity 6 (C#) plan, ideas that mention Godot or 3D get a Godot 4 plan, and both include an MCP server so Claude Code or Cursor can edit scenes directly. Ideas that mention Three.js or a 3D browser game get a Three.js plan that runs from a link. Roblox and obby ideas get a Roblox Studio (Luau) plan with the Studio MCP server and Rojo, and Unreal ideas get an Unreal Engine 5 plan with an Unreal MCP plugin. 3D, VR and Unreal plans also suggest Blender MCP so your AI tool can make simple 3D assets. Other game ideas get Phaser 3 for the browser. Cozy and sim games get a progression-focused MVP instead of combat.
- Can it plan a CLI tool or a Minecraft plugin? Yes. Command line ideas (CLI, terminal, npx) get a Node.js + TypeScript plan with commander, tsup and npm publishing so anyone can run it with npx. Minecraft server plugins get a Paper (Java) plan with plugin.yml, config.yml and a local test server, and Fabric or Forge mod ideas get a Fabric plan. Roblox obbies get checkpoints, server-checked progress and DataStore saves, and text adventures get an Ink story plan instead of Phaser.
- Can it plan a stream overlay or a racing game? Yes. OBS and stream overlay ideas (Twitch, YouTube Live, Kick) get a static page plan for an OBS Browser Source: Vite + TypeScript, a transparent 1920x1080 layout, settings in URL params and free static hosting, with no server or database; Twitch chat overlays add tmi.js and now-playing overlays add the Spotify Web API. Racing, kart, drifting and flight games get a vehicle MVP: tuned handling, a track with checkpoints, a best-time timer and a ghost or AI opponent.
- Can it plan a RAG chatbot over my own notes or docs? Yes. Ideas to chat with or ask questions about your own notes, docs, PDFs, wiki or codebase (Obsidian, Notion exports, help center articles) get a retrieval (RAG) plan instead of an agent loop: load and chunk the documents, store embeddings in a local vector store such as pgvector, sqlite-vec or Chroma, retrieve the best-matching chunks, answer only from them with citations, and say so when the documents do not have the answer. The plan includes a small eval set of real questions so you can tell whether changes help.
- Can it plan a roleplay or character chatbot? Yes. Chatbots that roleplay or talk like a character (a pirate, an anime character, a companion) get a persona chatbot plan instead of a tool-calling agent: a versioned system prompt that defines the character's voice and rules, a streaming chat UI, chat history trimmed to a token budget, and a per-user message limit. The boss fight is keeping it in character over long chats.
- Can it plan a tower defense game? Yes. Tower defense ideas get their own plan instead of a generic player-and-enemy game: an enemy path from spawn to your base, tower placement with range, damage and fire rate, waves that ramp up with lives lost when enemies get through, and money from kills to buy and upgrade towers. The boss fight is wave balance and the economy.
- Can it plan a customer support chatbot for my store? Yes. Support and FAQ chatbots for a store, SaaS, website or Discord server get a retrieval (RAG) plan instead of a tool-calling agent: load your FAQ, shipping and return policies into a vector store, answer only from them with a source, say when it does not know, and hand off to a human. Store bots also get one read-only order-status lookup (the Shopify Admin API for Shopify stores) and never issue refunds or edit orders.
- Does every AI idea get an agent plan? No. An app that uses AI to generate, write, summarize, review or suggest something (a recipe suggester, cover letter writer or resume reviewer) gets an AI web app plan: one form, one server-side LLM call with a versioned prompt and Zod-checked structured output, a result view with copy and regenerate, and a rate limit and token cap. The boss is output quality on 10 real inputs. Ideas that act on things (send emails, file issues, control devices) still get the tool-calling agent loop.
- Can I save or share a quest? Yes: download it as Markdown, or share the /q/ link, which rebuilds the same quest for anyone.

## Good for
Vibe coders, indie game devs and AI-agent builders who don't know what to build or where to start.
`;
http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/generate') {
    let body = '';
    req.on('data', d => { body += d; if (body.length > 10000) req.destroy(); });
    req.on('end', async () => {
      try {
        const { idea } = JSON.parse(body || '{}');
        const out = await generate(idea);
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
    let id = u.startsWith('/q/') ? u.slice(3) : '', title = 'QuestStarter — Turn any app idea into a quest', desc = '', ok = true, quest = null;
    if (id) { if (!/^[\w-]{1,4000}$/.test(id)) ok = false; else { try { const full = Buffer.from(id, 'base64url').toString('utf8').trim(), idea = full.slice(0, 70); try { quest = generate(full); } catch (e) { quest = null; } if (idea) { title = 'Quest: ' + idea + ' | QuestStarter'; desc = 'Quest Card for "' + idea + '": scoped MVP, tech stack, 6-level build plan with XP and copy-paste prompts for Cursor and Claude Code. Free.'; } } catch (e) { ok = false; } } }
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
