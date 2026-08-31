import { createClient } from '@/lib/supabase/server';
import { ReactNode } from 'react';
import MessagesChart from './MessagesChart';

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ count: total }, { count: sent }, { count: received }, { data: recent }] = await Promise.all([
    supabase.from('messages').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('direction', 'out'),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('direction', 'in'),
    supabase
      .from('messages')
      .select('direction, created_at')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at'),
  ]);

  const chartData = buildChartData(recent ?? []);

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold tracking-tight text-text-primary">Visão geral</h1>

      <div className="grid grid-cols-3 gap-4">
        <Stat label="Total de mensagens" value={total ?? 0} green={false}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}
        />
        <Stat label="Enviadas" value={sent ?? 0} green
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>}
        />
        <Stat label="Recebidas" value={received ?? 0} green={false}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>}
        />
      </div>

      <MessagesChart data={chartData} />
    </div>
  );
}

function buildChartData(rows: { direction: string; created_at: string }[]) {
  const days: Record<string, { enviadas: number; recebidas: number }> = {};

  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const key = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    days[key] = { enviadas: 0, recebidas: 0 };
  }

  for (const row of rows) {
    const key = new Date(row.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    if (!days[key]) continue;
    if (row.direction === 'out') days[key].enviadas++;
    else days[key].recebidas++;
  }

  return Object.entries(days).map(([day, counts]) => ({ day, ...counts }));
}

function Stat({ label, value, green, icon }: { label: string; value: number; green: boolean; icon: ReactNode }) {
  return (
    <div className={`bg-bg-surface rounded-2xl p-5 flex flex-col gap-4 border border-border border-l-[3px] ${green ? 'border-l-accent-green' : 'border-l-accent-blue'}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${green ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-blue/10 text-accent-blue'}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold tracking-tight text-text-primary">
        {value.toLocaleString('pt-BR')}
      </p>
    </div>
  );
}
