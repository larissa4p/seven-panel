'use client';

import { useState, useEffect, ReactNode } from 'react';

const input = 'w-full bg-bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue transition-colors';

type Config = { url: string; apiKey: string; instance: string };

export default function SettingsPage() {
  const [fields, setFields] = useState<Config>({ url: '', apiKey: '', instance: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('evo_config');
    if (saved) setFields(JSON.parse(saved));
  }, []);

  function save(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem('evo_config', JSON.stringify(fields));
    setStatus('Salvo.');
  }

  async function checkConnection() {
    setConnected(null);
    const res = await fetch('/api/connection');
    const data = await res.json();
    setConnected(data.connected);
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-xl font-semibold tracking-tight text-text-primary">Configurações</h1>

      <form onSubmit={save} className="bg-bg-surface border border-border rounded-2xl p-6 space-y-4">
        <Field label="URL da Evolution API">
          <input type="url" value={fields.url} onChange={e => setFields(f => ({ ...f, url: e.target.value }))} placeholder="https://api.seuservidor.com" className={input} />
        </Field>

        <Field label="API Key">
          <input type="password" value={fields.apiKey} onChange={e => setFields(f => ({ ...f, apiKey: e.target.value }))} className={input} />
        </Field>

        <Field label="Nome da instância">
          <input type="text" value={fields.instance} onChange={e => setFields(f => ({ ...f, instance: e.target.value }))} placeholder="minha-instancia" className={input} />
        </Field>

        {status && <p className="text-sm text-accent-green">{status}</p>}

        <div className="flex gap-3 items-center pt-1">
          <button type="submit" className="bg-accent-blue hover:bg-accent-blue/90 text-white px-5 py-2 rounded-lg text-sm font-medium transition-opacity">
            Salvar
          </button>
          <button type="button" onClick={checkConnection} className="border border-border text-text-muted hover:text-text-primary px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            Testar conexão
          </button>
          {connected !== null && (
            <span className={`text-sm ${connected ? 'text-accent-green' : 'text-red-400'}`}>
              {connected ? '✓ conectado' : '✗ desconectado'}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</label>
      {children}
    </div>
  );
}
