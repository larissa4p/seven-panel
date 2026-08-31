'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const input = 'w-full bg-bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue transition-colors';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('larissabessa4@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('E-mail ou senha incorretos.');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base">
      <form onSubmit={handleSubmit} className="bg-bg-surface border border-border rounded-2xl p-8 w-full max-w-sm space-y-4">
        <div className="mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold mb-4 bg-accent-blue/15 text-accent-blue">
            S
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-text-primary">Seven Panel</h1>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required className={input} />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required className={input} />

        <button type="submit" disabled={loading} className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition-opacity">
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
