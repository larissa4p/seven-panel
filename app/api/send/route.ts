import { NextResponse } from 'next/server';
import { wa } from '@/lib/whatsapp';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const { type, phone, body, url, filename } = await req.json();

  try {
    if (type === 'text') await wa.sendText(phone, body);
    else if (type === 'image') await wa.sendImage(phone, url);
    else if (type === 'audio') await wa.sendAudio(phone, url);
    else if (type === 'video') await wa.sendVideo(phone, url);
    else if (type === 'document') await wa.sendDocument(phone, url, filename);

    const supabase = await createClient();
    await supabase.from('messages').insert({
      phone,
      body: body || url,
      type,
      direction: 'out',
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
