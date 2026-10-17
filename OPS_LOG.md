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
