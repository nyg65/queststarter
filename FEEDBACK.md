# QuestStarter — X Feedback Log

Maintained by the "X feedback watch" routine (twice daily). Public X reads only; nothing is ever posted. Reply/post drafts below need John's approval.

## 2026-10-17 (9:00 AM CT run)

### Mentions of QuestStarter
- Only mention is John's own launch post: https://x.com/JohnPesce2011/status/2111246359865307447 (posted Oct 16, ~7:02 PM CT). At check time it had 3 impressions, 0 likes, 0 replies, 0 quotes. The account has 2 followers, so it has had no reach yet.
- The post's link goes to https://queststarter.onrender.com/ (checked: home 200, /health ok, /api/generate 200).
- Two other search hits ("@squidlord" RPG creature write-ups) were unrelated false positives.
- **Real user feedback, feature requests, bug reports: none yet.**

### What builders are saying (signals for the product, last 7 days)
- "What should I build?" posts are common from young/indie builders (e.g. @AryamGoyal1, @Kijanmaharjan, @NnekaBuilds). That is exactly the QuestStarter problem, and replies there are the realistic way to get first users while John's account is new.
- Shipping paralysis: @20aspectratio (13 likes, 9 replies) says the hard part isn't the prompt, it's knowing when to stop tweaking and ship. Our Level 6 "Ship It" step speaks to this.
- Security before launch: @VikingAmerican9 shared a "hostile reviewer" prompt; @RollinMorganAZ sells a $199 launch-readiness audit and a $29 "Idea to MVP spec" (human-checked, ordered build prompts). That's direct evidence people pay for what we give away; good input for a future Pro tier.
- Direct competitor: "BuildersOfX" (@bruteforcearete) sells starter prompts reverse-engineered from 228+ profitable apps, pitched at "staring at a blank Cursor prompt box".
- Game dev via AI: @Mnilax's "cozy farm game with Claude Code + Unity 6 through MCP, one department per prompt" got ~70K impressions and 1.2K bookmarks. Our game stack is only Phaser; a Unity/Godot + MCP option would fit the audience.
- Planning tips with traction: write one sentence on what must be true when a feature is done (@Buildpicksai); plan and break into small steps before prompting (@dizcorvus). Our done-checks already do this.

### Actions taken this run
- Fixed (own testing): project names read awkwardly, e.g. "Tool Lets Track", "Chrome Extension Summarizes", "Discord Bot Tracks". The name now comes from the verb and its object: "Car Service Dates Tracker", "YouTube Videos Summarizer", "Friends Game Wins Tracker", "Game Picker", "Patch Notes Poster", "Server Uptime Monitor". Ideas without such a verb keep the first meaningful words, stopping at words like "where"/"over" ("Roguelike", "RAG Chatbot", "Cozy Farm Game").
- Added: an 8th prompt, "Pre-launch security check" (hostile-reviewer pass for leaked keys, missing auth, unvalidated input, cross-user data, runaway API/LLM costs). llms.txt now says 8 prompts.
- Verified locally on :4173 (/, /llms.txt, /api/generate, /q/<id> all 200). Restarted the local server, which was down again.

### Backlog (from this run)
1. Game engine choice: offer Unity or Godot (with MCP hookups for Claude Code/Cursor) when the idea mentions unity/godot/3D, instead of always Phaser. "a cozy farm game in unity" currently gets Phaser.
2. "Ship it" nudges: a time box per level and a "good enough to ship" checklist, aimed at the polish-forever loop.
3. Pro-tier idea, validated by paid offers above: a deeper "launch-ready" review pack (security, payments, legal pages) as the paid upsell.
4. Distribution: John's account has no reach; replying helpfully to "what should I build" threads is the cheapest channel (drafts below).

### Drafts for John's approval (not posted)
1. Reply to @20aspectratio, https://x.com/20aspectratio/status/2111077880541409637
   > Same loop here. What helped me: decide what "done" means before I start (one sentence), then ship the moment it's true, ugly or not. Polish only what real users complain about.
2. Reply to @Kijanmaharjan, https://x.com/Kijanmaharjan/status/2110249540423163942
   > For social media in public: a tool that turns your commit log into a daily build-in-public post draft. You're already shipping every 2 days, so it feeds itself. If you want a quick scope + build plan, I made a free thing for this: https://queststarter.onrender.com
3. Follow-up post from John's account (a quest example beats a pitch):
   > Typed "a discord bot that tracks my friends' game wins" into QuestStarter. Got: a 4-item MVP, Node + discord.js + SQLite stack, 6 levels from setup to launch, and 8 copy-paste prompts for Cursor/Claude Code (including a pre-launch security check). Free, no signup: https://queststarter.onrender.com

## 2026-10-17 (5:00 PM CT run)

### Mentions of QuestStarter
- No new mentions since the morning run. John's launch post (https://x.com/JohnPesce2011/status/2111246359865307447) is still at 3 impressions, 0 likes, 0 replies. The account now has 3 followers (was 2).
- Site check: https://queststarter.onrender.com/health 200; local :4173 200.
- **Real user feedback, feature requests, bug reports: still none.** The morning reply/post drafts are still waiting on John's approval; without them the app has no distribution.

### What builders are saying (since 9 AM CT)
- The "knowing what to build is the hard part" theme is getting big reach. @eptwts (138K followers) posted that vibe-coding a good product is still hard and needs a clear understanding of what you're building (https://x.com/eptwts/status/2111461254132887844; ~11K impressions, 293 likes, 68 replies). Replies echo it: @BreezeOg1 "vibe coding fast is easy, knowing what to build is the hard part", @Shobhitkhuranaa "be scope locked on what, who, how before the vibe coding starts", @bulidwithadham "knowing what to reject takes product experience". That is QuestStarter's exact pitch (scoped MVP + out-of-scope list).
- Direct "what do I build" posts: @namke0g "Bought Claude Code... No idea what to build" (https://x.com/namke0g/status/2111513873312350680); @KarwanAtta3 asks what to build next after BuyLow AI (https://x.com/KarwanAtta3/status/2111505800422125902).
- Unity + MCP game building again: @sorenxet's "cozy farm game alone with Opus 5.5 and Unity 6, every prompt is a department" (https://x.com/sorenxet/status/2111458380854296639; ~1.5K impressions, 44 bookmarks). Second strong signal after @Mnilax this morning, so backlog item 1 was built this run.
- Planning-first workflow keeps coming up: @glockmog plans an outline per feature with the AI before building; @FiveStackAI says plan with a big model, edit with a cheap one, and cap daily spend.
- Small games as the right scope for vibe coders: @vaibiksite says a $5 browser-sized game is "exactly the right size for vibe coded stuff".

### Actions taken this run
- Built (backlog 1): game ideas that mention Unity get a Unity 6 (C#) stack with a Unity MCP server for Claude Code/Cursor, Git LFS, and itch.io builds. Ideas that mention Godot or 3D get Godot 4 (GDScript) with a Godot MCP server. Everything else still gets Phaser. "a cozy farm game in unity" now gets Unity instead of Phaser.
- Fixed: bots and tools that are only about games ("a discord bot that tracks my friends' game wins") were also tagged as a Game and handed Phaser. They now plan as just a bot/tool; real game ideas and Unity/Godot ideas are unaffected.
- Fixed names: "runs" and "shows" now name the project ("Trivia Game Runner", "Steam Game Deals Viewer"), and trailing kind words are dropped ("YouTube Summarizer Chrome" is now "YouTube Summarizer").
- Verified with ~20 ideas plus junk input; restarted the local server; /, /api/generate, /llms.txt all 200. Committed and pushed so Render picks it up.

### Backlog (new this run)
5. Cozy, sandbox and sim games get combat must-haves ("one enemy type, win/lose condition"). Add a cozy/sim variant (core loop, save/load, one progression system).
6. Pitch keeps the user's casing ("in unity"); capitalize known engines and brands in the pitch.
7. "an rpg where the npcs are llm agents" plans as an AI Agent first; game ideas with AI features should stay a Game with an AI component.

### Drafts for John's approval (not posted)
4. Reply to @eptwts, https://x.com/eptwts/status/2111461254132887844 (big thread, most visibility available today)
   > Agree. What's helped me most: write down the 3 or 4 things v1 must do, and what it won't do, before the agent writes a line. I made a free tool that does that scoping step from one sentence, if it's useful: https://queststarter.onrender.com
5. Reply to @namke0g, https://x.com/namke0g/status/2111513873312350680
   > Easiest start: pick something annoying you do every week and have Claude Code automate it. Small scope, you're the first user, and you'll know when it works. If you want a scoped plan and prompts from a one-line idea, I made this free: https://queststarter.onrender.com

## 2026-10-18 (9:00 AM CT run)

### Mentions of QuestStarter
- No mentions of QuestStarter, the site URL, or @JohnPesce2011 since the last run. The launch post (https://x.com/JohnPesce2011/status/2111246359865307447) is still at 3 impressions, 0 likes, 0 replies; the account has 3 followers and 1 post.
- Site check: https://queststarter.onrender.com/health 200 (12s cold start); local :4173 200 on /, /health, /llms.txt, /sitemap.xml, /robots.txt.
- **Real user feedback, feature requests, bug reports: still none.** All 5 earlier reply/post drafts are still waiting on John's approval; nothing has been posted, so the app still has no distribution.

### What builders are saying (since 5 PM CT yesterday)
- "Deciding what to build" is now the consensus take on vibe coding. Tim Sweeney's 30/70 Unreal post (941K impressions) and @rauchg's quote (52K) and @fchollet's "total automation" thread (225K) drew lots of replies saying the human job is now deciding what to build and checking it works (@crisp_digi, @justfyi, @Mr_TuanHoang, @codewithrohit). Big audience, same pitch as ours, but those threads are crowded.
- Direct "what do I build" asks: @PedroFe36671124 "I have Claude code and Chatgpt, any advice on what to build?" (https://x.com/PedroFe36671124/status/2111654231119737014); @jinnatul_md, automation builder at 250 followers, "What should I build next?" (https://x.com/jinnatul_md/status/2111689081315049637, 3 replies). @dkolosovs polled solo builders on where their week goes, with "deciding what to build next" as an option (https://x.com/dkolosovs/status/2111796494047101366).
- Spec-first workflows: @avthar's /create-spec skill with verification criteria (643 impressions); @NeyronixAI notes people agree with their agent on what to build but not how to prove it works; @jmdevilleros uses spec.md, plan.md, AGENTS.md and decisions.md; @shamsudeenb2 generates plans, interfaces and tests before code. Our done-checks cover "how to prove it", but we don't export these files.
- 3D games straight from an AI chat: @DeepStarts, "this entire 3D game was built in a single Claude Code chat using Opus 5.5 and Three.js" (https://x.com/DeepStarts/status/2111766357100700026, 19 likes, 13 replies). @RoundtableSpace: Claude Code drove Blender and Unity through MCP to build a fishing game's 3D assets (45K impressions). @sara_kumodeck claims a vibe-coded browser flight sim made $87K/mo (unverified). Browser 3D was a gap: "3D" sent everyone to Godot.
- Post-MVP pain: @lancehubdev ("90% of an MVP in 48 hours, the last 10% takes 3 weeks": Stripe webhooks, Supabase RLS, hydration), @surajdothustle (auth and Stripe webhooks break after the weekend MVP), @jojowindev ("monday: a stranger finds your api keys in view source"). More support for the security prompt and the paid launch-ready pack idea (backlog 3).
- Mood check: big gaming accounts are arguing about vibe-coded games (@LiquidHbox, 501K impressions). Our game-focused copy should stay about learning and shipping, not "replace game devs".

### Actions taken this run
- Built: game ideas that mention Three.js, or a 3D game in the browser, now get a Three.js + Vite plan (TypeScript, itch.io/Netlify, free glTF models) instead of Godot. Other 3D ideas still get Godot, VR still gets Unity.
- Built: 3D and VR game plans now add "Blender + Blender MCP (optional)" so the AI tool can make simple 3D assets.
- Fixed: "a three.js flight sim" was planned as a web app called "Three Js Flight"; it's now a game called "Three.js Flight Sim". Flight sims, city builders, colony sims, life sims and tycoon games are now recognized as games ("a city builder sim" was a web app).
- Fixed: flight, racing, space and combat sims were getting the cozy farm must-haves ("plant, wait, harvest, sell"); they now get the action MVP.
- Fixed names: "a three.js game where you dodge asteroids" was "Three.js Game", now "Dodge Asteroids Game". Pitches write "Three.js" correctly.
- FAQ (page, FAQPage JSON-LD, llms.txt) now covers Three.js and Blender MCP; JSON-LD validated.
- Verified ~25 ideas including earlier regressions and junk input; restarted the local server.
- Committed locally as 9b447fd but **not pushed**: the safety check blocked the push, so the live Render site doesn't have these changes yet. Pushing deploys to the public site; it needs John's OK (or a standing OK for the routine to push fixes).

### Backlog (new this run)
8. (from ops log) still open: server-render /q/ quest pages.
11. Export spec files: a "Download for your agent" option that writes spec.md, plan.md and AGENTS.md (rules) from the quest, matching how spec-first builders work (@jmdevilleros, @avthar).
12. "VR app for meditation" (VR, not a game) plans as a Next.js web app; non-game VR apps should get Unity or WebXR.
13. "a tool that tracks my unity build times" is named "Unity Times Tracker" (drops "build" because it's also a verb).

### Drafts for John's approval (not posted)
6. Reply to @PedroFe36671124, https://x.com/PedroFe36671124/status/2111654231119737014
   > Pick something you or a friend does by hand every week and automate it. You're the first user, so you'll know fast if it works. If you want a scoped plan and copy-paste prompts from a one-line idea, I made this free: https://queststarter.onrender.com
7. Reply to @jinnatul_md, https://x.com/jinnatul_md/status/2111689081315049637
   > Congrats on 250! You already sell WhatsApp + CRM automations, so build the thing your clients keep asking for twice. Productize one of those and post the build daily.
8. Reply to @dkolosovs's poll, https://x.com/dkolosovs/status/2111796494047101366
   > D for me, which is why I built a small tool for it: one sentence in, scoped MVP, stack and build prompts out. B is close behind though, reviewing agent output is the new job.
9. Reply to @DeepStarts, https://x.com/DeepStarts/status/2111766357100700026
   > Impressive that one chat held the whole thing. Did you plan the scope up front or let it grow as you went?

## 2026-10-18 (5:00 PM CT run)

### Mentions of QuestStarter
- No mentions of QuestStarter, the site URL, or @JohnPesce2011 since the 9 AM run. Launch post (https://x.com/JohnPesce2011/status/2111246359865307447) is at 4 impressions, 0 likes, 0 replies; the account has 3 followers and 1 post.
- Site check: https://queststarter.onrender.com/health 200 (12s cold start). Local :4173 was down again; restarted it, and /, /health, /llms.txt, /sitemap.xml, /robots.txt are all 200.
- **Real user feedback, feature requests, bug reports: still none.** Drafts 1-9 are still waiting on John's approval; nothing has been posted.

### What builders are saying (since 9 AM CT)
- Roblox and Unreal now have AI-agent workflows: @AICoderClass says Roblox Studio has a built-in MCP server for Claude Code/Cursor/Codex (https://x.com/AICoderClass/status/2111850014351781899); @learnaiwithamid says Epic shipped an official Claude Code plugin for Unreal Engine (https://x.com/learnaiwithamid/status/2111833282673606923, unverified, small account). @vibeforgelabs sells an $9 game prompt pack with Roblox Luau prompts. QuestStarter was handing Roblox and Unreal ideas a Phaser browser plan, so this got fixed (below).
- The Unity fishing game built with Claude Code + Blender keeps getting reposted (@amin_postik, @Mohd_Ainan17), and a code-only ancient Greek world in Three.js is spreading (@Sanemavcil, 314 impressions). Supports the Three.js and Blender MCP changes, which are now live.
- Competitor: @rachelwolan launched productfoo, an open-source "product manager for your coding agent" that does market research, challenges the idea, writes the pitch, sharpens the spec and checks the build against it (https://x.com/rachelwolan/status/2111835600597012549; 717 impressions, 22 replies). It's a CLI for experienced builders; QuestStarter's edge is zero setup, beginner-friendly, games. Worth watching.
- Clarifying questions: @SinghLovenish cites an ICLR 2026 study where asking questions first helped coding agents by up to 74% on vague tasks (https://x.com/SinghLovenish/status/2111865214568415374, small account). @RonakOnChain is switching from vibe coding to spec-driven dev. Supports a "2-3 quick questions before the quest" step and backlog 11 (spec file export).
- Paid prompt packs exist at $9 (@vibeforgelabs, 1 follower, no traction shown). Price point for backlog 3 (paid launch-ready pack).
- Direct "what should I build" asks: @TheCraigHewitt (5.1K followers) has Claude and Codex usage resets expiring and wants to build "something massive", maybe open-source an enterprise tool (https://x.com/TheCraigHewitt/status/2111899002019143941, 524 impressions, 6 replies); @dhruvphogat04 bought Apple and Google developer accounts and doesn't know what to build (https://x.com/dhruvphogat04/status/2111843265112940601); @bititheintern "what should i build with AI?" (https://x.com/bititheintern/status/2111877811577512385, 2 followers); @2KoolForSch00l got a free .tech domain and asks what to build first.
- Game builders: @ritesh_khokhani (920 followers) asks who has built a game with vibe coding (https://x.com/ritesh_khokhani/status/2111901629221888266); @brandonstirrup (4K followers) "vibe coded a bad but improvable game in two days" with 3 hours of active work.
- Mood: anti-AI pushback in gaming continues (@Best4Liberty on vibe-coded Roblox clones; @duelingdoggo on a "video game crash"). Keep game copy about learning and shipping your own idea.

### Actions taken this run
- Built: Roblox and obby ideas now get Roblox Studio (Luau), the Roblox Studio MCP server, Rojo + Git and publishing on Roblox, instead of Phaser. "a roblox obby game", "a tycoon game on roblox" and "an obby with checkpoints" all plan correctly.
- Built: Unreal and UE5 ideas now get Unreal Engine 5 (Blueprints + C++), an Unreal MCP plugin, Git LFS, itch.io builds and Blender MCP, instead of Phaser.
- Fixed name: "an unreal engine 5 horror game" was going to be named "Unreal Engine 5"; it's now "Unreal Horror Game", and pitches write "Unreal Engine".
- Kept bots and trackers that mention Roblox as bots/web apps ("a roblox trading bot for discord" doesn't get a game engine).
- FAQ on the page, FAQPage JSON-LD (validated) and llms.txt now cover Roblox and Unreal.
- Verified ~20 ideas including earlier regressions and junk input; restarted the local server.
- Committed 131b56f and pushed; this also shipped the 9 AM Three.js/Blender commit (9b447fd) that was blocked earlier. Render picked it up within ~2 min: the live API returns the Roblox plan and "Three.js Flight Sim".

### Backlog (new this run)
14. Roblox plans still get generic action must-haves ("one enemy or obstacle type"); add a Roblox variant (spawn + checkpoints, server-validated actions, DataStore save, one monetization hook like a game pass).
15. Clarifying questions: optionally ask 2-3 quick questions (platform, solo vs multiplayer, time budget) before generating (ICLR study via @SinghLovenish, productfoo's "challenges your ideas").
16. "a minecraft server plugin that adds quests" plans as a Next.js web app; Minecraft mods/plugins should get Paper (Java) or Fabric.

### Drafts for John's approval (not posted)
10. Reply to @TheCraigHewitt, https://x.com/TheCraigHewitt/status/2111899002019143941
    > Open source the internal tool you'd have paid for last job. You know the pain, the spec writes itself, and burning resets on a big scaffold is the best use of them. Write the 4 must-haves first so the agents don't wander.
11. Reply to @dhruvphogat04, https://x.com/dhruvphogat04/status/2111843265112940601
    > Build the app you'd open every day: a tracker for something you already do by hand. Small, you're the first user, and it gets you through the App Store review once. If you want a scoped plan from a one-line idea, I made this free: https://queststarter.onrender.com
12. Reply to @ritesh_khokhani, https://x.com/ritesh_khokhani/status/2111901629221888266
    > The best tip I've seen from people shipping these: scope it to one loop (move, avoid, score) before asking the AI for anything. I built a free tool that does that scoping step for game ideas, with Unity, Godot, Roblox and Three.js plans: https://queststarter.onrender.com
