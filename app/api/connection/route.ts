import { NextResponse } from 'next/server';
import { wa } from '@/lib/whatsapp';

export async function GET() {
  try {
    const connected = await wa.checkConnection();
    return NextResponse.json({ connected });
  } catch {
    return NextResponse.json({ connected: false });
  }
}
