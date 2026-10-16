'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const { generate } = require('./generator');
const PORT = process.env.PORT || 4173;
const PUB = path.join(__dirname, 'public');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
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
  if (req.url === '/health') { res.end('ok'); return; }
  let p = req.url.split('?')[0]; if (p === '/') p = '/index.html';
  const f = path.join(PUB, path.normalize(p).replace(/^(\.\.[\/\\])+/, ''));
  if (!f.startsWith(PUB) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('Not found'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(PORT, '0.0.0.0', () => console.log('QuestStarter on http://localhost:' + PORT));
