# Axcelasia Executive Leadership Roundtable — RSVP

Single-page RSVP site (Next.js 16) hosted on Railway, storing registrations in Railway Postgres.

Ported from the original OpenAI Sites export (Cloudflare Workers + D1) to a standard Node.js Next.js app. Page design and validation rules are unchanged.

## Configuration

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string (on Railway: `${{Postgres.DATABASE_URL}}`) |

The `registrations` table is created automatically on the first RSVP. One RSVP per phone number; resubmitting updates the existing row.

## Local development

```sh
npm install
DATABASE_URL=postgres://... npm run dev
```

## Viewing RSVPs

Railway dashboard → Postgres service → Data → `registrations` (export to CSV from there), or:

```sql
SELECT name, company, phone, spa, created_at FROM registrations ORDER BY created_at;
```
