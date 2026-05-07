import { updateSession } from '@/lib/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale, type Locale } from '@/i18n/routing';

const LOCALE_COOKIE = 'NEXT_LOCALE';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const localeCookieOptions = {
  path: '/',
  maxAge: ONE_YEAR_SECONDS,
  sameSite: 'lax' as const,
};

function pickFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  // We don't honor q-weights — list order is a fine preference proxy here.
  const tags = header.split(',').map((part) => part.trim().split(';')[0]?.toLowerCase() ?? '');
  for (const tag of tags) {
    const primary = tag.split('-')[0];
    if (isLocale(primary)) return primary;
  }
  return defaultLocale;
}

export async function proxy(request: NextRequest) {
  const langParam = request.nextUrl.searchParams.get('lang');

  // ?lang=en|es is a one-shot hint: persist in cookie, redirect to a clean URL.
  if (langParam && isLocale(langParam)) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('lang');
    const redirect = NextResponse.redirect(url, 308);
    redirect.cookies.set(LOCALE_COOKIE, langParam, localeCookieOptions);
    return redirect;
  }

  // First visit with no cookie: write to BOTH request and response so the
  // in-flight render's getLocale() resolves correctly AND the browser persists.
  if (!request.cookies.get(LOCALE_COOKIE)) {
    const sniffed = pickFromAcceptLanguage(request.headers.get('accept-language'));
    request.cookies.set(LOCALE_COOKIE, sniffed);
    const response = await updateSession(request);
    response.cookies.set(LOCALE_COOKIE, sniffed, localeCookieOptions);
    return response;
  }

  return updateSession(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
