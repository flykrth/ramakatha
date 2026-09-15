# Ramakatha 2026 — Competition Registration System

> **Archived.** This repository is preserved as a public reference. The event it served has concluded and the Supabase backend has been paused. The system is no longer active.

Ramakatha 2026 was the official online registration portal for Amrita LEAP's Ramayana-themed inter-school competition programme. Students could register for competitions across multiple categories, view competition guidelines and scoring criteria, and track their registration status through a personal dashboard.

---

## What this project does

- **Student registration** — sign up using name, email, mobile number, school, class, and address
- **Competition catalog** — browse competitions across age/class categories (drawing, painting, essay, drama, quiz, mono act, etc.)
- **Guidelines & scoring** — view official competition rules and evaluation criteria sourced directly from the database
- **Student dashboard** — view registered competitions and submission instructions post-login
- **Admin dashboard** — paginated registrations table with search, filtering by competition/gender/class, and CSV export
- **Rate limiting & logging** — server-side rate limiting and structured logging for production reliability

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Auth & Database | Supabase (Auth + PostgreSQL) |
| Styling | Tailwind CSS |
| Validation | Zod |

## Project structure

```
src/
├── app/              # Next.js pages (home, register, dashboard, competitions, admin)
├── components/       # React components (admin, competitions, dashboard, home, layout, ui)
├── lib/              # Supabase clients, rate limiter, logger, validation schemas
├── services/         # Business logic — auth, competitions, registrations
├── types/            # Shared TypeScript types
└── middleware.ts     # Session management
supabase/
├── migrations/       # Full PostgreSQL schema, RLS policies, indexes, seed data
└── seed.sql          # Development seed data
```

## Running locally

> **Note:** The Supabase project backing the production instance has been paused due to inactivity. You will need to provision your own Supabase project to run this locally.

1. Clone the repository
2. Create a Supabase project at [supabase.com](https://supabase.com)
3. Run the migrations in `supabase/migrations/` in order against your project
4. Create a `.env.local` file with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_PASSWORD_SALT=your-secret-salt
```

5. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

---

## Security & data notice

> **No sensitive or personal data is included in this repository.**

This repository has been audited before being made public. The following was verified:

- ✅ **No API keys or secrets** — all credentials are loaded exclusively from environment variables (`process.env`). No `.env` files were ever committed to this repository.
- ✅ **No real user data** — seed and migration files contain only competition structure data (titles, guidelines, scoring criteria) authored by the event organisers. No real student names, emails, phone numbers, addresses, or personal records are present in any file or commit.
- ✅ **No hardcoded passwords or tokens** — the password derivation function uses a `SUPABASE_PASSWORD_SALT` environment variable with no committed fallback value. The WhatsApp group invite link that was embedded in the UI has been redacted before making this repository public.
- ✅ **Git history is clean** — the full commit history was scanned. An early development commit contained a naive password scheme (`email_ramakatha2026_secure`) which was replaced with a proper HMAC-SHA256 derivation before the system went live. No real production secrets appear in any commit.
- ℹ️ **Supabase is paused** — the production database has been paused by Supabase due to inactivity. No live data is accessible.

---

*Built for Ramakatha 2026 · Amrita LEAP, Amrita Vishwa Vidyapeetham · Karthik Krishna*
