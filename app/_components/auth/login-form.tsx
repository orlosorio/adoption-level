'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UI } from '@/lib/content';
import glass from '@/app/assessment/_components/glass.module.css';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import { mapAuthError } from './auth-errors';
import styles from './auth-modal.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const language = useAuthModal((s) => s.language);
  const setMode = useAuthModal((s) => s.setMode);
  const close = useAuthModal((s) => s.close);
  const copy = UI.auth[language].login;
  const errorsCopy = UI.auth[language].errors;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (password.length < 8) {
      setError(errorsCopy.passwordTooShort);
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: trimmed,
      password,
    });
    setSubmitting(false);

    if (signInError) {
      setError(mapAuthError(signInError, language));
      return;
    }
    close();
  }

  return (
    <>
      <h2 className={styles.title}>{copy.title}</h2>
      <p className={styles.subtitle}>{copy.subtitle}</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-login-email">
            {copy.emailLabel}
          </label>
          <input
            id="auth-login-email"
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
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-login-password">
            {copy.passwordLabel}
          </label>
          <input
            id="auth-login-password"
            type="password"
            autoComplete="current-password"
            className={glass.input}
            placeholder={copy.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={submitting}
            required
            minLength={8}
          />
        </div>
        {error ? <div className={styles.error}>{error}</div> : null}
        <button type="submit" className={glass.cta} disabled={submitting}>
          <span className={glass.ctaLabel}>{submitting ? copy.submitting : copy.submit}</span>
        </button>
        <div className={styles.linkRow}>
          <button
            type="button"
            className={styles.link}
            onClick={() => setMode('forgot')}
            disabled={submitting}
          >
            {copy.forgot}
          </button>
        </div>
      </form>
      <p className={styles.switch}>
        {copy.switchPrompt}{' '}
        <button
          type="button"
          className={styles.link}
          onClick={() => setMode('signup')}
          disabled={submitting}
        >
          {copy.switchCta}
        </button>
      </p>
    </>
  );
}
