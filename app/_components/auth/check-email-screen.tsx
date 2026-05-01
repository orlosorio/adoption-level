'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UI } from '@/lib/content';
import glass from '@/app/assessment/_components/glass.module.css';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import { mapAuthError } from './auth-errors';
import styles from './auth-modal.module.css';

export default function CheckEmailScreen({
  pendingEmail,
  origin,
}: {
  pendingEmail: string;
  origin: 'signup' | 'forgot';
}) {
  const language = useAuthModal((s) => s.language);
  const close = useAuthModal((s) => s.close);
  const copy = UI.auth[language].checkEmail;
  const resendCopy = UI.auth[language].resend;

  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const title = origin === 'signup' ? copy.signupTitle : copy.resetTitle;
  const bodyTemplate = origin === 'signup' ? copy.signupBody : copy.resetBody;
  const [before, after] = bodyTemplate.split('{email}');

  async function handleResend() {
    setError(null);
    setResending(true);
    const supabase = createClient();
    const { error: resendError } =
      origin === 'signup'
        ? await supabase.auth.resend({
            type: 'signup',
            email: pendingEmail,
            options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
          })
        : await supabase.auth.resetPasswordForEmail(pendingEmail, {
            redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
          });
    setResending(false);
    if (resendError) {
      setResendStatus('error');
      setError(mapAuthError(resendError, language));
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
        {before}
        <span className={styles.checkEmailEmail}>{pendingEmail}</span>
        {after}
      </p>
      {error ? <div className={styles.error}>{error}</div> : null}
      <button type="button" className={glass.cta} onClick={close}>
        <span className={glass.ctaLabel}>{copy.close}</span>
      </button>
      <p className={styles.switch}>
        {resendCopy.prompt}{' '}
        <button
          type="button"
          className={styles.link}
          onClick={handleResend}
          disabled={resending || resendStatus === 'sent'}
        >
          {resendStatus === 'sent' ? resendCopy.sent : resendCopy.cta}
        </button>
      </p>
    </div>
  );
}
