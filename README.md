# KidsBrain Platform

Personalized cognitive games (memory, attention, fast thinking) themed around each child's interests.
See `81300457-kidsbrain_platform_architecture.md` (in the project brief) for the full plan.

## 🎮 Live demo

Once this branch is merged to `main`, the demo deploys to GitHub Pages automatically.

- **Hub** — `index.html`: pick a sample child profile (dinosaurs / space / ocean)
- **Memory Match game** — `memory.html?child=emma`: config-driven, fully themed
- **Bonus Snake** — `snake.html`: the original game

The same game template renders very differently per child because each child's config supplies their cards, colors, and welcome message. This is the "one template + per-child config = personalized experience" pattern from the architecture doc.

## Repository layout

```
minigames/
├── index.html     KidsBrain demo hub (child profile picker)
├── memory.html    Config-driven Memory Match game
├── configs.js     Demo child profiles (in real platform, these come from DB)
├── snake.html     Original standalone Snake game
├── server/        Phase 1 — Node + Express + SQLite + JWT auth (backend API)
└── .github/       Pages deploy workflow
```

## Phase 1 — Backend foundation (done)

### What's in `server/`
- **Express 4** API server
- **SQLite** (`better-sqlite3`) — zero-setup local DB; schema mirrors the Postgres design from the architecture doc
- **JWT auth** with `bcryptjs` password hashing
- Tables: `users`, `games`, `scores`
- Roles: `child`, `parent`, `admin`
- Seed script creates one admin account

### Run it locally
```bash
cd server
npm install
cp .env.example .env        # then edit JWT_SECRET, ADMIN_PASSWORD
npm run db:init             # creates tables
npm run db:seed             # creates admin user
npm start                   # listens on http://localhost:3001
```

### Endpoints (Phase 1)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET  | `/api/health` | — | Liveness check |
| POST | `/api/auth/register` | — | Create a user (defaults to `role=child`) |
| POST | `/api/auth/login` | — | Returns `{ token, user }` |
| GET  | `/api/auth/me` | Bearer | Current user profile |

### Smoke test
```bash
# health
curl localhost:3001/api/health

# login as seeded admin
curl -X POST localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"changeme"}'
```

## Next phases
- **Phase 2** — Build the 3 config-driven game templates (Memory Match, Focus Finder, Speed Dash) as React components
- **Phase 3** — Child hub page that loads each child's theme + game configs
- **Phase 4** — Parent stats dashboard (same account, view toggle)
- **Phase 5** — Admin panel (create child, edit game configs, client list)
- **Phase 6** — Marketing landing page + deploy (Vercel + Railway)
