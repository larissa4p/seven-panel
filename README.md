# seven-panel

WhatsApp admin panel built with Next.js and Supabase, powered by the [Evolution API](https://doc.evolution-api.com/) via the [7six5](https://github.com/larissa4p/7six5) SDK.

## Features

- Authentication via Supabase Auth
- Dashboard with sent/received message counts
- Send messages in multiple formats: text, image, audio, video, document
- Full message history
- Webhook endpoint to receive and store incoming messages

## Stack

- **Next.js 14** (App Router)
- **Supabase** — database + auth
- **Tailwind CSS** — styling
- **7six5** — WhatsApp SDK (Evolution API wrapper)
- **TypeScript**

## Setup

Copy `.env.local.example` to `.env.local` and fill in the values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
EVOLUTION_URL=
EVOLUTION_API_KEY=
EVOLUTION_INSTANCE=
```

## Database

Create the `messages` table in Supabase:

```sql
create table messages (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  body text,
  type text default 'text',
  direction text not null,
  created_at timestamptz default now()
);
```

## Running

```bash
npm install
npm run dev
```

## Webhook

Point your Evolution API webhook URL to `/api/webhook` — incoming messages will be automatically saved to Supabase.

## License

MIT
