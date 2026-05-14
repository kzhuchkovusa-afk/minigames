# KidsBrain Platform

Personalized cognitive games (memory, attention, fast thinking) themed around each child's interests.
See `81300457-kidsbrain_platform_architecture.md` (in the project brief) for the full plan.

## Repository layout

```
minigames/
├── server/        Phase 1 — Node + Express + SQLite + JWT auth
├── client/        (coming in Phase 2/3 — React frontend)
├── index.html     Legacy standalone Snake game (deployed via GitHub Pages)
└── .github/       Pages deploy workflow for the Snake game
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
