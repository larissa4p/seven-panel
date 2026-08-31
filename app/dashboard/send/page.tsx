'use client';

import { useState, ReactNode } from 'react';

const types = ['text', 'image', 'audio', 'video', 'document'];

const input = 'w-full bg-bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue transition-colors';

export default function SendPage() {
  const [type, setType] = useState('text');
  const [phone, setPhone] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('');
  const [filename, setFilename] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, phone, body, url, filename }),
    });

    setStatus(res.ok ? 'Mensagem enviada.' : 'Erro ao enviar.');
    setLoading(false);
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-xl font-semibold tracking-tight text-text-primary">Enviar mensagem</h1>

      <form onSubmit={handleSubmit} className="bg-bg-surface border border-border rounded-2xl p-6 space-y-4">
        <Field label="Tipo">
          <select value={type} onChange={e => setType(e.target.value)} className={input}>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="Telefone">
          <input type="text" placeholder="5561999999999" value={phone} onChange={e => setPhone(e.target.value)} required className={input} />
        </Field>

        {type === 'text' && (
          <Field label="Mensagem">
            <textarea value={body} onChange={e => setBody(e.target.value)} required rows={4} className={`${input} resize-none`} />
          </Field>
        )}

        {type !== 'text' && (
          <Field label="URL do arquivo">
            <input type="url" value={url} onChange={e => setUrl(e.target.value)} required className={input} />
          </Field>
        )}

        {type === 'document' && (
          <Field label="Nome do arquivo">
            <input type="text" value={filename} onChange={e => setFilename(e.target.value)} placeholder="arquivo.pdf" className={input} />
          </Field>
        )}

        {status && (
          <p className={`text-sm ${status.includes('Erro') ? 'text-red-400' : 'text-accent-green'}`}>{status}</p>
        )}

        <button type="submit" disabled={loading} className="bg-accent-blue hover:bg-accent-blue/90 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition-opacity">
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
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
