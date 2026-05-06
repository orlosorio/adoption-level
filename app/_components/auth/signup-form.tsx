'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UI } from '@/lib/content';
import glass from '@/app/assessment/_components/glass.module.css';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import { mapAuthError } from './auth-errors';
import styles from './auth-modal.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({
  onPendingEmail,
}: {
  onPendingEmail: (email: string) => void;
}) {
  const language = useAuthModal((s) => s.language);
  const setMode = useAuthModal((s) => s.setMode);
  const copy = UI.auth[language].signup;
  const errorsCopy = UI.auth[language].errors;

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
      setError(errorsCopy.nameRequired);
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setError(errorsCopy.invalidEmail);
      return;
    }
    if (password.length < 8) {
      setError(errorsCopy.passwordTooShort);
      return;
    }
    if (password !== confirm) {
      setError(errorsCopy.passwordMismatch);
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
      setError(mapAuthError(signUpError, language));
      return;
    }
    onPendingEmail(trimmedEmail);
    setMode('signup-demographics');
  }

  return (
    <>
      <h2 className={styles.title}>{copy.title}</h2>
      <p className={styles.subtitle}>{copy.subtitle}</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-signup-name">
            {copy.nameLabel}
          </label>
          <input
            id="auth-signup-name"
            type="text"
            autoComplete="name"
            className={glass.input}
            placeholder={copy.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-signup-email">
            {copy.emailLabel}
          </label>
          <input
            id="auth-signup-email"
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
          <label className={styles.label} htmlFor="auth-signup-password">
            {copy.passwordLabel}
          </label>
          <input
            id="auth-signup-password"
            type="password"
            autoComplete="new-password"
            className={glass.input}
            placeholder={copy.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={submitting}
            required
            minLength={8}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-signup-confirm">
            {copy.confirmLabel}
          </label>
          <input
            id="auth-signup-confirm"
            type="password"
            autoComplete="new-password"
            className={glass.input}
            placeholder={copy.confirmPlaceholder}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={submitting}
            required
            minLength={8}
          />
        </div>
        {error ? <div className={styles.error}>{error}</div> : null}
        <button type="submit" className={glass.cta} disabled={submitting}>
          <span className={glass.ctaLabel}>{submitting ? copy.submitting : copy.submit}</span>
        </button>
      </form>
      <p className={styles.switch}>
        {copy.switchPrompt}{' '}
        <button
          type="button"
          className={styles.link}
          onClick={() => setMode('login')}
          disabled={submitting}
        >
          {copy.switchCta}
        </button>
      </p>
    </>
  );
}
