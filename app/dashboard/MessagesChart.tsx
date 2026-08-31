'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type DataPoint = { day: string; enviadas: number; recebidas: number };

export default function MessagesChart({ data }: { data: DataPoint[] }) {
  return (
    <div className="bg-bg-surface border border-border rounded-2xl p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-4">Mensagens — últimos 7 dias</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barCategoryGap="35%">
          <XAxis dataKey="day" tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: 'var(--color-bg-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: 'var(--color-text-primary)' }}
            itemStyle={{ color: 'var(--color-text-muted)' }}
            cursor={{ fill: 'rgba(59,130,246,0.05)' }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12, color: 'var(--color-text-muted)' }} />
          <Bar dataKey="enviadas" fill="var(--color-accent-green)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="recebidas" fill="var(--color-accent-blue)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
