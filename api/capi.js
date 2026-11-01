// Meta Conversions API relay for the bridge pages.
//
// The browser sends each event here (sendBeacon) with the same event_id it gave the pixel, so Meta
// deduplicates the pair. This function adds what only the server knows (client IP, user agent),
// attaches the access token from the META_CAPI_TOKEN env var, and forwards to the Graph API.
// The token never reaches the browser and is never returned in a response.

const site = require('./_site.json'); // written by build/assemble.mjs from src/site.config.json

const EVENTS = new Set(['PageView', 'ViewContent', 'InitiateCheckout']);
const CUSTOM_KEYS = ['variant', 'utm_content', 'value', 'currency', 'content_ids', 'content_type', 'destination', 'destination_key'];
const ALLOWED_HOSTS = /(^|\.)theloafreport\.com$|\.vercel\.app$|^localhost$/;

const str = (v, max = 500) => (typeof v === 'string' && v.length <= max ? v : undefined);

function cleanCustomData(input) {
  const out = {};
  if (!input || typeof input !== 'object') return out;
  for (const key of CUSTOM_KEYS) {
    const v = input[key];
    if (key === 'value') { if (typeof v === 'number' && isFinite(v)) out.value = v; continue; }
    if (key === 'content_ids') { if (Array.isArray(v)) out.content_ids = v.filter((x) => str(x, 40)).slice(0, 5); continue; }
    const s = str(v);
    if (s !== undefined && s !== '') out[key] = s;
  }
  return out;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'POST only' }); return; }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) { res.status(500).json({ ok: false, error: 'META_CAPI_TOKEN is not set' }); return; }

  // sendBeacon posts text/plain, so the body may arrive as a string.
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body !== 'object') { res.status(400).json({ ok: false, error: 'bad body' }); return; }

  const eventName = body.event_name;
  const eventId = str(body.event_id, 120);
  if (!EVENTS.has(eventName) || !eventId) { res.status(400).json({ ok: false, error: 'bad event' }); return; }

  let sourceUrl;
  try {
    const u = new URL(body.event_source_url);
    if (!ALLOWED_HOSTS.test(u.hostname)) throw new Error('host');
    sourceUrl = u.toString();
  } catch { res.status(400).json({ ok: false, error: 'bad event_source_url' }); return; }

  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const userData = {
    client_ip_address: forwarded || req.headers['x-real-ip'] || (req.socket && req.socket.remoteAddress) || undefined,
    client_user_agent: str(req.headers['user-agent'], 1000),
    fbp: str(body.fbp, 200),
    fbc: str(body.fbc, 400),
  };
  for (const k of Object.keys(userData)) if (!userData[k]) delete userData[k];

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: sourceUrl,
      user_data: userData,
      custom_data: cleanCustomData(body.custom_data),
    }],
    access_token: token,
  };
  const testCode = str(body.test_event_code, 40);
  if (testCode) payload.test_event_code = testCode;

  try {
    const r = await fetch(`https://graph.facebook.com/${site.graphVersion}/${site.pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      res.status(502).json({ ok: false, error: j.error ? { message: j.error.message, code: j.error.code, fbtrace_id: j.error.fbtrace_id } : 'graph error' });
      return;
    }
    res.status(200).json({ ok: true, events_received: j.events_received, fbtrace_id: j.fbtrace_id });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'graph unreachable' });
  }
};
