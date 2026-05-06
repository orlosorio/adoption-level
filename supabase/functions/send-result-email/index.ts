// Supabase Edge Function: send-result-email
//
// POST { attempt_id } with the caller's JWT in Authorization. Validates that
// the attempt belongs to the caller, loads score + band copy, and sends a
// transactional email via Resend.
//
// Local dev: requires `[edge_runtime] enabled = true` in supabase/config.toml
// and `RESEND_API_KEY` in supabase/.env. Production picks both up automatically
// from the Supabase project's secrets.

// deno-lint-ignore-file no-explicit-any
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const FROM_ADDRESS = 'adoptionlevel.ai <noreply@mail.adoptionlevel.ai>';

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildEmail(opts: {
  locale: 'es' | 'en';
  score: number;
  maxScore: number;
  scorePct: number;
  bandShortLabel: string | null;
  bandDescription: string;
  bandNextStep: string;
}): { subject: string; html: string; text: string } {
  const { locale, score, maxScore, scorePct, bandShortLabel, bandDescription, bandNextStep } = opts;

  const headings =
    locale === 'es'
      ? {
          subject: 'Tus resultados de adopción de IA',
          yourLevel: 'Tu nivel',
          totalScore: 'Puntuación total',
          nextStep: 'Tu siguiente paso',
        }
      : {
          subject: 'Your AI adoption results',
          yourLevel: 'Your level',
          totalScore: 'Total score',
          nextStep: 'Your next step',
        };

  const pct = Math.round(scorePct);
  const safeLabel = escapeHtml(bandShortLabel ?? '');
  const safeDesc = escapeHtml(bandDescription);
  const safeNext = escapeHtml(bandNextStep);

  const html = `<!doctype html>
<html lang="${locale}">
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111;">
    <h1 style="font-size: 22px; color: #1f36a9; margin: 0 0 16px;">${escapeHtml(headings.subject)}</h1>
    <p style="font-size: 14px; color: #4d5b9a; margin: 0 0 8px;">${escapeHtml(headings.yourLevel)}</p>
    <p style="font-size: 20px; font-weight: 700; color: #1f36a9; margin: 0 0 16px;">${safeLabel}</p>
    <p style="font-size: 14px; color: #4d5b9a; margin: 0 0 4px;">${escapeHtml(headings.totalScore)}</p>
    <p style="font-size: 16px; font-weight: 600; margin: 0 0 16px;">${score} / ${maxScore} (${pct}%)</p>
    <p style="font-size: 15px; line-height: 1.55; margin: 0 0 16px;">${safeDesc}</p>
    <h2 style="font-size: 14px; color: #111; margin: 16px 0 8px;">${escapeHtml(headings.nextStep)}</h2>
    <p style="font-size: 15px; line-height: 1.55; margin: 0;">${safeNext}</p>
  </body>
</html>`;

  const text = [
    headings.yourLevel + ': ' + (bandShortLabel ?? ''),
    headings.totalScore + ': ' + score + ' / ' + maxScore + ' (' + pct + '%)',
    '',
    bandDescription,
    '',
    headings.nextStep + ':',
    bandNextStep,
  ].join('\n');

  return { subject: headings.subject, html, text };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let body: { attempt_id?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const attemptId = body.attempt_id;
  if (!attemptId) {
    return new Response(JSON.stringify({ error: 'attempt_id required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const resendKey = Deno.env.get('RESEND_API_KEY');
  if (!supabaseUrl || !supabaseAnonKey || !resendKey) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Forward the user's JWT so RLS scopes the attempt query to the caller.
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  const userEmail = userData.user.email;
  if (!userEmail) {
    return new Response(JSON.stringify({ error: 'User has no email on file' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // RLS limits this to the caller's own attempts.
  const { data: attempt, error: attemptErr } = await supabase
    .from('quiz_attempts')
    .select('id, quiz_id, locale, score, max_score, score_pct')
    .eq('id', attemptId)
    .maybeSingle();

  if (attemptErr || !attempt) {
    return new Response(JSON.stringify({ error: 'Attempt not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Resolve the band copy for this score.
  const pct = Number(attempt.score_pct ?? 0);
  const bandOrdinal = Math.min(Math.floor(pct / 20), 4);
  const { data: band } = await supabase
    .from('result_band_copies')
    .select('short_label, description, next_step')
    .eq('quiz_id', attempt.quiz_id)
    .eq('locale', attempt.locale)
    .eq('ordinal', bandOrdinal)
    .maybeSingle();

  const { subject, html, text } = buildEmail({
    locale: attempt.locale === 'en' ? 'en' : 'es',
    score: attempt.score,
    maxScore: attempt.max_score,
    scorePct: pct,
    bandShortLabel: band?.short_label ?? null,
    bandDescription: band?.description ?? '',
    bandNextStep: band?.next_step ?? '',
  });

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [userEmail],
      subject,
      html,
      text,
    }),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text();
    return new Response(JSON.stringify({ error: 'Email send failed', detail: errText }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
