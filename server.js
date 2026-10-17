'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const { generate } = require('./generator');
const PORT = process.env.PORT || 4173;
const PUB = path.join(__dirname, 'public');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const EXAMPLES = ["A Discord bot that tracks my friends' game stats and posts a weekly leaderboard", "A 2D roguelike platformer with procedurally generated dungeons", "An AI agent that reads my GitHub issues and drafts fixes", "A web app that shows free game drops and patch notes for my wishlist", "A Chrome extension that summarizes any page with AI"];
const LLMS = `# QuestStarter

> QuestStarter is a free web tool that turns any app, game, Discord bot, browser extension or AI agent idea into an actionable "Quest Card": a scoped MVP, recommended tech stack, a 6-level build plan with XP, and 7 copy-paste prompts for AI coding tools like Cursor and Claude Code.

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
- What kinds of ideas work? Web apps, browser games, Discord/Telegram/Slack bots, AI agents and chatbots, Chrome extensions, mobile apps, and data trackers or alert tools.
- Which AI coding tools do the prompts work with? Cursor, Claude Code, Codex, Windsurf, GitHub Copilot, ChatGPT and any other assistant.
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
  if (u === '/sitemap.xml') { res.writeHead(200, { 'Content-Type': 'application/xml' }); return res.end('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + base + '/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url></urlset>\n'); }
  if (u === '/llms.txt') { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end(LLMS.replace('__EXAMPLES__', EXAMPLES.map(e => '- [' + e + '](__BASE__/q/' + Buffer.from(e).toString('base64url') + ')').join('\n')).replace(/__BASE__/g, base)); }
  if (u === '/' || u.startsWith('/q/')) {
    let id = u.startsWith('/q/') ? u.slice(3) : '', title = 'QuestStarter — Turn any app idea into a quest', desc = '', ok = true;
    if (id) { if (!/^[\w-]{1,4000}$/.test(id)) ok = false; else { try { const idea = Buffer.from(id, 'base64url').toString('utf8').trim().slice(0, 70); if (idea) { title = 'Quest: ' + idea + ' | QuestStarter'; desc = 'Quest Card for "' + idea + '": scoped MVP, tech stack, 6-level build plan with XP and copy-paste prompts for Cursor and Claude Code. Free.'; } } catch (e) { ok = false; } } }
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const html = fs.readFileSync(path.join(PUB, 'index.html'), 'utf8').replace(/__BASE__/g, base).replace(/__PATH__/g, id ? 'q/' + id : '').replace(/__TITLE__/g, esc(title)).replace(/<title>[^<]*<\/title>/, '<title>' + esc(title) + '</title>');
    const page = desc ? html.replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*"/g, (m, a) => a + esc(desc) + '"') : html;
    res.writeHead(ok ? 200 : 404, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(page);
  }
  if (req.url === '/health') { res.end('ok'); return; }
  let p = req.url.split('?')[0]; if (p === '/') p = '/index.html';
  const f = path.join(PUB, path.normalize(p).replace(/^(\.\.[\/\\])+/, ''));
  if (!f.startsWith(PUB) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('Not found'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(PORT, '0.0.0.0', () => console.log('QuestStarter on http://localhost:' + PORT));
