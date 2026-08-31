import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const body = await req.json();

  if (body.event === 'messages.upsert') {
    const msg = body.data?.messages?.[0];
    if (msg && !msg.key?.fromMe) {
      const supabase = await createClient();
      await supabase.from('messages').insert({
        phone: msg.key?.remoteJid?.replace('@s.whatsapp.net', ''),
        body: msg.message?.conversation || msg.message?.extendedTextMessage?.text || '',
        type: 'text',
        direction: 'in',
      });
    }
  }

  return NextResponse.json({ ok: true });
}
