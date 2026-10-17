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
