'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UI } from '@/lib/content';
import glass from '@/app/assessment/_components/glass.module.css';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import { mapAuthError } from './auth-errors';
import styles from './auth-modal.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotForm({
  onPendingEmail,
}: {
  onPendingEmail: (email: string) => void;
}) {
  const language = useAuthModal((s) => s.language);
  const setMode = useAuthModal((s) => s.setMode);
  const copy = UI.auth[language].forgot;
  const errorsCopy = UI.auth[language].errors;

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError(errorsCopy.invalidEmail);
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(trimmed, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    });
    setSubmitting(false);

    if (resetError) {
      setError(mapAuthError(resetError, language));
      return;
    }
    onPendingEmail(trimmed);
    setMode('check-email');
  }

  return (
    <>
      <h2 className={styles.title}>{copy.title}</h2>
      <p className={styles.subtitle}>{copy.subtitle}</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-forgot-email">
            {copy.emailLabel}
          </label>
          <input
            id="auth-forgot-email"
            type="email"
            autoComplete="email"
            className={glass.input}
            placeholder={copy.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
          />
        </div>
        {error ? <div className={styles.error}>{error}</div> : null}
        <button type="submit" className={glass.cta} disabled={submitting}>
          <span className={glass.ctaLabel}>{submitting ? copy.submitting : copy.submit}</span>
        </button>
      </form>
      <p className={styles.switch}>
        <button
          type="button"
          className={styles.link}
          onClick={() => setMode('login')}
          disabled={submitting}
        >
          {copy.back}
        </button>
      </p>
    </>
  );
}
