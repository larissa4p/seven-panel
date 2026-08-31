const base = () => process.env.EVOLUTION_URL?.replace(/\/$/, '');
const instance = () => process.env.EVOLUTION_INSTANCE;
const headers = () => ({
  'Content-Type': 'application/json',
  apikey: process.env.EVOLUTION_API_KEY!,
});

async function post(path: string, body: object) {
  const res = await fetch(`${base()}${path}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Evolution API error: ${res.status}`);
  return res.json();
}

async function get(path: string) {
  const res = await fetch(`${base()}${path}`, { headers: headers() });
  if (!res.ok) throw new Error(`Evolution API error: ${res.status}`);
  return res.json();
}

export const wa = {
  checkConnection: async () => {
    const data = await get(`/instance/connectionState/${instance()}`);
    return data?.instance?.state === 'open';
  },

  sendText: (phone: string, text: string) =>
    post(`/message/sendText/${instance()}`, { number: phone, text }),

  sendImage: (phone: string, url: string) =>
    post(`/message/sendMedia/${instance()}`, { number: phone, mediatype: 'image', media: url }),

  sendAudio: (phone: string, url: string) =>
    post(`/message/sendMedia/${instance()}`, { number: phone, mediatype: 'audio', media: url }),

  sendVideo: (phone: string, url: string) =>
    post(`/message/sendMedia/${instance()}`, { number: phone, mediatype: 'video', media: url }),

  sendDocument: (phone: string, url: string, filename: string) =>
    post(`/message/sendMedia/${instance()}`, { number: phone, mediatype: 'document', media: url, fileName: filename }),
};
