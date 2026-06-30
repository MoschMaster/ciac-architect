// Vercel Serverless Function — slaat een kennismakingsaanvraag op in Supabase.
// Draait server-side, zodat de service-role key nooit in de browser komt.
// Env vars (in Vercel → Project → Settings → Environment Variables):
//   SUPABASE_URL                — bv. https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY   — de service_role key (NIET de anon key)

const VALID_TOPICS = ['strategie', 'landscaping', 'assessment', 'eaaas', 'anders'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase env vars ontbreken');
    return res.status(500).json({ error: 'Server is niet correct geconfigureerd.' });
  }

  const body = req.body ?? {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (!name || !email) {
    return res.status(400).json({ error: 'Naam en e-mail zijn verplicht.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Vul een geldig e-mailadres in.' });
  }

  const payload = { name, email, status: 'new' };
  if (typeof body.company === 'string' && body.company.trim()) {
    payload.company = body.company.trim();
  }
  if (typeof body.topic === 'string' && VALID_TOPICS.includes(body.topic)) {
    payload.topic = body.topic;
  }
  if (typeof body.message === 'string' && body.message.trim()) {
    payload.message = body.message.trim();
  }

  try {
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/consultation_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error('Supabase insert mislukt:', resp.status, detail);
      return res.status(502).json({ error: 'Opslaan is mislukt. Probeer het later opnieuw.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('consultation handler error:', error);
    return res.status(500).json({ error: 'Er ging iets mis. Probeer het later opnieuw.' });
  }
}
