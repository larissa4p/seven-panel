import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, role, tenant_id')
    .eq('id', user.id)
    .single();

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-xl font-semibold tracking-tight text-text-primary">Perfil</h1>

      <div className="bg-bg-surface border border-border rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-blue/15 text-accent-blue flex items-center justify-center text-lg font-semibold">
            {(profile?.name ?? user.email ?? '?')[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{profile?.name ?? '—'}</p>
            <p className="text-xs text-text-muted">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <InfoField label="Role" value={profile?.role ?? '—'} />
          <InfoField label="Tenant" value={profile?.tenant_id ?? '—'} />
          <InfoField label="ID do usuário" value={user.id.slice(0, 8) + '…'} />
          <InfoField label="Criado em" value={new Date(user.created_at).toLocaleDateString('pt-BR')} />
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</p>
      <p className="text-sm text-text-primary font-mono">{value}</p>
    </div>
  );
}
