# Axcelasia RSVP organiser dashboard

The guest RSVP page is `/`. The private organiser page is `/admin`; there is no organiser link on the guest page, and `/admin` is marked `noindex`.

## Access

Organisers sign in at `/admin` with a shared organiser password. Two Railway variables on the web service control access:

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | The organiser password. Share it only with approved organisers. |
| `ADMIN_SESSION_SECRET` | Long random value that signs the 12-hour, HTTP-only session cookie. |

If either is missing, the dashboard stays locked. To revoke access, change `ADMIN_PASSWORD` (and `ADMIN_SESSION_SECRET` to sign out existing sessions) in Railway → service → Variables; Railway redeploys automatically. Never put the password, secrets or guest data in this repository.

## Responses and exports

The dashboard reads the Postgres `registrations` table. It shows total responses, spa interest, represented companies, and guest details. Search by name, company or phone and filter by spa interest. Refresh reloads the current responses. Excel exports include the current search/filter, preserve phone numbers as text, and use Kuala Lumpur time. Repeat submissions for the same phone update that guest rather than adding a duplicate. Guest data lives only in the Railway Postgres database, not in GitHub.

## Local development

Use Node 22.13 or later. Run `npm install`, then:

```sh
DATABASE_URL=postgres://... ADMIN_PASSWORD=local-only ADMIN_SESSION_SECRET=local-only npm run dev
```

Run `npm test` for the access, filtering and spreadsheet checks, and `npm run build` to build.
