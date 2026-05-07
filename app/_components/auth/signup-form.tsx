'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import glass from '@/app/assessment/_components/glass.module.css';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import { mapAuthErrorKey } from './auth-errors';
import styles from './auth-modal.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({
  onPendingEmail,
}: {
  onPendingEmail: (email: string) => void;
}) {
  const setMode = useAuthModal((s) => s.setMode);
  const t = useTranslations('auth.signup');
  const tErrors = useTranslations('auth.errors');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName) {
      setError(tErrors('nameRequired'));
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setError(tErrors('invalidEmail'));
      return;
    }
    if (password.length < 8) {
      setError(tErrors('passwordTooShort'));
      return;
    }
    if (password !== confirm) {
      setError(tErrors('passwordMismatch'));
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    // Pass the current path through `next` so the email-confirm callback
    // returns the user to the same /assessment/<slug> page, where
    // quiz-runner picks up persisted answers and auto-submits.
    const nextPath =
      typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '/';
    const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
      nextPath,
    )}`;
    const { error: signUpError } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: { display_name: trimmedName },
        emailRedirectTo: callbackUrl,
      },
    });
    setSubmitting(false);

    if (signUpError) {
      setError(tErrors(mapAuthErrorKey(signUpError)));
      return;
    }
    onPendingEmail(trimmedEmail);
    setMode('signup-demographics');
  }

  return (
    <>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.subtitle}>{t('subtitle')}</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-signup-name">
            {t('nameLabel')}
          </label>
          <input
            id="auth-signup-name"
            type="text"
            autoComplete="name"
            className={glass.input}
            placeholder={t('namePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-signup-email">
            {t('emailLabel')}
          </label>
          <input
            id="auth-signup-email"
            type="email"
            autoComplete="email"
            className={glass.input}
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-signup-password">
            {t('passwordLabel')}
          </label>
          <input
            id="auth-signup-password"
            type="password"
            autoComplete="new-password"
            className={glass.input}
            placeholder={t('passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={submitting}
            required
            minLength={8}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-signup-confirm">
            {t('confirmLabel')}
          </label>
          <input
            id="auth-signup-confirm"
            type="password"
            autoComplete="new-password"
            className={glass.input}
            placeholder={t('confirmPlaceholder')}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={submitting}
            required
            minLength={8}
          />
        </div>
        {error ? <div className={styles.error}>{error}</div> : null}
        <button type="submit" className={glass.cta} disabled={submitting}>
          <span className={glass.ctaLabel}>{submitting ? t('submitting') : t('submit')}</span>
        </button>
      </form>
      <p className={styles.switch}>
        {t('switchPrompt')}{' '}
        <button
          type="button"
          className={styles.link}
          onClick={() => setMode('login')}
          disabled={submitting}
        >
          {t('switchCta')}
        </button>
      </p>
    </>
  );
}
