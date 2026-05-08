// Supabase Edge Function: send-result-email
//
// POST { attempt_id, benchmark? } with the caller's JWT in Authorization.
// Validates that the attempt belongs to the caller, loads score + band copy,
// and sends a branded transactional email via Resend that mirrors the post-quiz
// results screen (level, score, description, next step, benchmark).
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
const HERO_IMAGE_URL = 'https://adoptionlevel.ai/email-hero.png';

interface BenchmarkRow {
  label: string;
  statement: string;
  percentile: number;
}

interface BenchmarkPayload {
  totalRespondents: number;
  rows: BenchmarkRow[];
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Defense-in-depth: body is user-controlled. Reject anything malformed.
function parseBenchmark(input: unknown): BenchmarkPayload | null {
  if (input == null) return null;
  if (typeof input !== 'object') return null;
  const obj = input as Record<string, unknown>;

  const totalRespondents = Number(obj.totalRespondents);
  if (!Number.isFinite(totalRespondents) || totalRespondents < 0) return null;

  if (!Array.isArray(obj.rows)) return null;
  if (obj.rows.length > 10) return null;

  const rows: BenchmarkRow[] = [];
  for (const r of obj.rows) {
    if (!r || typeof r !== 'object') return null;
    const row = r as Record<string, unknown>;
    const label = typeof row.label === 'string' ? row.label : '';
    const statement = typeof row.statement === 'string' ? row.statement : '';
    const percentile = Number(row.percentile);
    if (!Number.isInteger(percentile) || percentile < 0 || percentile > 100) return null;
    if (label.length > 200 || statement.length > 200) return null;
    rows.push({ label, statement, percentile });
  }

  return { totalRespondents: Math.floor(totalRespondents), rows };
}

function buildBenchmarkSectionHtml(
  benchmark: BenchmarkPayload | null,
  headings: { benchmark: string; respondentCount: (n: number) => string },
): string {
  if (!benchmark || benchmark.rows.length === 0) return '';

  const showCount = benchmark.totalRespondents >= 50;

  const rowsHtml = benchmark.rows
    .map((row, i) => {
      const pct = Math.max(0, Math.min(100, row.percentile));
      const fillWidth = Math.max(2, pct); // tiny minimum so 0% still shows the track shape
      const divider =
        i === 0
          ? ''
          : `<tr><td style="padding:14px 0 0;border-top:1px solid #eef1ff;font-size:0;line-height:0;">&nbsp;</td></tr>`;
      return `${divider}
        <tr>
          <td style="padding:${i === 0 ? '0' : '14px'} 0 0;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#1a1a2e;">${escapeHtml(row.label)}</p>
            <p style="margin:0 0 8px;font-size:14px;line-height:1.5;color:#4d5b9a;">${escapeHtml(row.statement)}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef1ff;border-radius:6px;">
              <tr>
                <td width="${fillWidth}%" style="background:#365cff;border-radius:6px;height:8px;line-height:8px;font-size:0;">&nbsp;</td>
                <td width="${100 - fillWidth}%" style="line-height:8px;font-size:0;">&nbsp;</td>
              </tr>
            </table>
            <p style="margin:6px 0 0;font-size:12px;font-weight:600;color:#365cff;text-align:right;">${pct}%</p>
          </td>
        </tr>`;
    })
    .join('');

  const countHtml = showCount
    ? `<p style="margin:0 0 14px;font-size:13px;line-height:1.5;color:#8893b8;">${escapeHtml(headings.respondentCount(benchmark.totalRespondents))}</p>`
    : '';

  return `
    <tr>
      <td style="padding:24px 0 0;border-top:1px solid #eef1ff;">
        <h2 style="margin:0 0 10px;font-size:16px;font-weight:700;color:#1a1a2e;">${escapeHtml(headings.benchmark)}</h2>
        ${countHtml}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${rowsHtml}
        </table>
      </td>
    </tr>`;
}

function buildEmail(opts: {
  locale: 'es' | 'en';
  score: number;
  maxScore: number;
  scorePct: number;
  bandShortLabel: string | null;
  bandDescription: string;
  bandNextStep: string;
  benchmark: BenchmarkPayload | null;
}): { subject: string; html: string; text: string } {
  const {
    locale,
    score,
    maxScore,
    scorePct,
    bandShortLabel,
    bandDescription,
    bandNextStep,
    benchmark,
  } = opts;

  const headings =
    locale === 'es'
      ? {
          subject: 'Tus resultados de adopción de IA',
          yourLevel: 'Tu nivel',
          totalScore: 'Puntuación total',
          nextStep: 'Tu siguiente paso',
          benchmark: 'Cómo te comparas',
          respondentCount: (n: number) =>
            `Basado en ${n.toLocaleString('es')} profesionales que tomaron este quiz`,
          footer: 'Recibiste este correo porque pediste tus resultados en adoptionlevel.ai.',
          preheader: 'Tu nivel de adopción de IA, cómo te comparas y el siguiente paso.',
        }
      : {
          subject: 'Your AI adoption results',
          yourLevel: 'Your level',
          totalScore: 'Total score',
          nextStep: 'Your next step',
          benchmark: 'How you compare',
          respondentCount: (n: number) =>
            `Based on ${n.toLocaleString('en')} professionals who've taken this quiz`,
          footer: 'You received this email because you requested your results at adoptionlevel.ai.',
          preheader: 'Your AI adoption level, how you compare, and your next step.',
        };

  const pct = Math.round(scorePct);
  const safeLabel = escapeHtml(bandShortLabel ?? '');
  const safeDesc = escapeHtml(bandDescription);
  const safeNext = escapeHtml(bandNextStep);

  const benchmarkSection = buildBenchmarkSectionHtml(benchmark, headings);

  const html = `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${escapeHtml(headings.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a2e;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;font-size:1px;line-height:1px;mso-hide:all;">${escapeHtml(headings.preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6fb;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
            <tr>
              <td style="background:#eef1ff;border:1px solid #d8defa;border-bottom:0;border-radius:16px 16px 0 0;padding:0;line-height:0;font-size:0;">
                <img src="${HERO_IMAGE_URL}" width="560" alt="adoptionlevel.ai" style="display:block;width:100%;height:auto;border:0;border-radius:16px 16px 0 0;" />
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;border:1px solid #d8defa;border-top:0;border-radius:0 0 16px 16px;padding:32px 28px;">
                <h1 style="margin:0 0 18px;font-size:22px;font-weight:700;color:#1a1a2e;">${escapeHtml(headings.subject)}</h1>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      <p style="margin:0 0 4px;font-size:13px;color:#8893b8;text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(headings.yourLevel)}</p>
                      <p style="margin:0 0 14px;font-size:22px;font-weight:700;color:#365cff;">${safeLabel}</p>
                      <p style="margin:0 0 4px;font-size:13px;color:#8893b8;text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(headings.totalScore)}</p>
                      <p style="margin:0 0 18px;font-size:18px;font-weight:600;color:#1a1a2e;">${score} / ${maxScore} <span style="color:#4d5b9a;font-weight:500;">(${pct}%)</span></p>
                      <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#4d5b9a;">${safeDesc}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 4px;border-top:1px solid #eef1ff;padding-top:24px;">
                      <h2 style="margin:0 0 8px;font-size:16px;font-weight:700;color:#1a1a2e;">${escapeHtml(headings.nextStep)}</h2>
                      <p style="margin:0;font-size:15px;line-height:1.6;color:#4d5b9a;">${safeNext}</p>
                    </td>
                  </tr>
                  ${benchmarkSection}
                </table>
              </td>
            </tr>
          </table>
          <p style="margin:20px 4px 0;max-width:560px;font-size:12px;line-height:1.55;color:#8893b8;">${escapeHtml(headings.footer)}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const textLines: string[] = [
    headings.yourLevel + ': ' + (bandShortLabel ?? ''),
    headings.totalScore + ': ' + score + ' / ' + maxScore + ' (' + pct + '%)',
    '',
    bandDescription,
    '',
    headings.nextStep + ':',
    bandNextStep,
  ];

  if (benchmark && benchmark.rows.length > 0) {
    textLines.push('', headings.benchmark + ':');
    if (benchmark.totalRespondents >= 50) {
      textLines.push(headings.respondentCount(benchmark.totalRespondents));
    }
    for (const row of benchmark.rows) {
      textLines.push('', `- ${row.label}: ${row.statement} (${row.percentile}%)`);
    }
  }

  return { subject: headings.subject, html, text: textLines.join('\n') };
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

  let body: { attempt_id?: string; benchmark?: unknown };
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

  // benchmark is optional; reject only if it's present AND malformed.
  let benchmark: BenchmarkPayload | null = null;
  if (body.benchmark != null) {
    benchmark = parseBenchmark(body.benchmark);
    if (benchmark === null) {
      return new Response(JSON.stringify({ error: 'Invalid benchmark payload' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
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
    benchmark,
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
    console.error('[send-result-email] Resend error', resendRes.status, errText);
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
