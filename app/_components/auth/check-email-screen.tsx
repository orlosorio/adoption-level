'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import glass from '@/app/assessment/_components/glass.module.css';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import { mapAuthErrorKey } from './auth-errors';
import styles from './auth-modal.module.css';

export default function CheckEmailScreen({
  pendingEmail,
  origin,
}: {
  pendingEmail: string;
  origin: 'signup' | 'forgot';
}) {
  const close = useAuthModal((s) => s.close);
  const t = useTranslations('auth.checkEmail');
  const tResend = useTranslations('auth.resend');
  const tErrors = useTranslations('auth.errors');

  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const title = origin === 'signup' ? t('signupTitle') : t('resetTitle');
  const bodyKey = origin === 'signup' ? 'signupBody' : 'resetBody';

  async function handleResend() {
    setError(null);
    setResending(true);
    const supabase = createClient();
    const nextPath =
      typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '/';
    const signupCallback = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
      nextPath,
    )}`;
    const { error: resendError } =
      origin === 'signup'
        ? await supabase.auth.resend({
            type: 'signup',
            email: pendingEmail,
            options: { emailRedirectTo: signupCallback },
          })
        : await supabase.auth.resetPasswordForEmail(pendingEmail, {
            redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
          });
    setResending(false);
    if (resendError) {
      setResendStatus('error');
      setError(tErrors(mapAuthErrorKey(resendError)));
      return;
    }
    setResendStatus('sent');
  }

  return (
    <div className={styles.checkEmail}>
      <div className={styles.checkEmailIcon} aria-hidden>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>
        {t.rich(bodyKey, {
          email: () => <span className={styles.checkEmailEmail}>{pendingEmail}</span>,
        })}
      </p>
      {error ? <div className={styles.error}>{error}</div> : null}
      <button type="button" className={glass.cta} onClick={close}>
        <span className={glass.ctaLabel}>{t('close')}</span>
      </button>
      <p className={styles.switch}>
        {tResend('prompt')}{' '}
        <button
          type="button"
          className={styles.link}
          onClick={handleResend}
          disabled={resending || resendStatus === 'sent'}
        >
          {resendStatus === 'sent' ? tResend('sent') : tResend('cta')}
        </button>
      </p>
    </div>
  );
}
