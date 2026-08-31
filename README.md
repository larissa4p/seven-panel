# seven-panel

Painel de administração para WhatsApp via [Evolution API](https://doc.evolution-api.com/), usando [7six5](https://github.com/larissa4p/7six5) como SDK.

## Stack

- Next.js 14 (App Router)
- Supabase (banco + auth)
- Tailwind CSS

## Funcionalidades

- Login com Supabase Auth
- Dashboard com contagem de mensagens enviadas e recebidas
- Envio de mensagens (texto, imagem, áudio, vídeo, documento)
- Histórico de mensagens
- Webhook para receber mensagens e salvar no banco

## Configuração

Copie o `.env.local.example` para `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
EVOLUTION_URL=
EVOLUTION_API_KEY=
EVOLUTION_INSTANCE=
```

## Banco de dados

Crie a tabela `messages` no Supabase:

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

## Rodando

```bash
npm install
npm run dev
```

## Webhook

Configure a URL do webhook na Evolution API apontando para `/api/webhook`.

## Licença

MIT
