import { createClient } from '@/lib/supabase/server';

export const revalidate = 0;

type Message = {
  id: string;
  phone: string;
  body: string;
  type: string;
  direction: 'in' | 'out';
  created_at: string;
};

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight text-text-primary">Mensagens</h1>

      <div className="bg-bg-surface rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-surface-2 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">Telefone</th>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">Mensagem</th>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">Tipo</th>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(messages as Message[])?.map(msg => (
              <tr key={msg.id}>
                <td className="px-4 py-3 text-text-primary font-mono text-xs">{msg.phone}</td>
                <td className="px-4 py-3 text-text-muted max-w-xs truncate">{msg.body}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${msg.direction === 'out' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-blue/10 text-accent-blue'}`}>
                    {msg.direction === 'out' ? 'enviada' : 'recebida'}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-muted text-xs">
                  {new Date(msg.created_at).toLocaleString('pt-BR')}
                </td>
              </tr>
            ))}
            {!messages?.length && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-text-muted">
                  Nenhuma mensagem ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
