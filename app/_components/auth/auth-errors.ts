import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';

type ErrorKey = keyof typeof UI.auth.es.errors;

export function mapAuthError(error: unknown, language: Language): string {
  const errors = UI.auth[language].errors;
  if (!error) return errors.generic;

  const message =
    typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message: unknown }).message ?? '')
      : String(error);

  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code: unknown }).code ?? '')
      : '';

  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? Number((error as { status: unknown }).status ?? 0)
      : 0;

  const lower = message.toLowerCase();

  const key = ((): ErrorKey => {
    if (code === 'invalid_credentials' || lower.includes('invalid login credentials')) {
      return 'invalidCredentials';
    }
    if (
      code === 'user_already_exists' ||
      code === 'email_exists' ||
      lower.includes('already registered') ||
      lower.includes('user already')
    ) {
      return 'emailExists';
    }
    if (code === 'email_not_confirmed' || lower.includes('email not confirmed')) {
      return 'emailNotConfirmed';
    }
    if (code === 'over_email_send_rate_limit' || status === 429 || lower.includes('rate limit')) {
      return 'rateLimited';
    }
    if (
      code === 'weak_password' ||
      lower.includes('weak password') ||
      lower.includes('password should')
    ) {
      return 'weakPassword';
    }
    if (code === 'same_password' || lower.includes('different from the old')) {
      return 'sameOrigin';
    }
    if (code === 'otp_expired' || lower.includes('expired') || lower.includes('invalid token')) {
      return 'sessionExpired';
    }
    return 'generic';
  })();

  return errors[key];
}
