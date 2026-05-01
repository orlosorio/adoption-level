'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { UI, type Language } from '@/lib/content';
import glass from '@/app/assessment/_components/glass.module.css';
import { mapAuthError } from '@/app/_components/auth/auth-errors';
import styles from '@/app/_components/auth/auth-modal.module.css';

export default function ResetPasswordForm({ language }: { language: Language }) {
  const router = useRouter();
  const copy = UI.auth[language].reset;
  const errorsCopy = UI.auth[language].errors;

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

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
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (updateError) {
      setError(mapAuthError(updateError, language));
      return;
    }
    router.push('/');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px] rounded-[20px] border border-white/70 bg-white/95 p-7 shadow-[0_24px_64px_rgba(15,22,56,0.18)]">
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.subtitle}>{copy.subtitle}</p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="reset-password">
              {copy.passwordLabel}
            </label>
            <input
              id="reset-password"
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
            <label className={styles.label} htmlFor="reset-confirm">
              {copy.confirmLabel}
            </label>
            <input
              id="reset-confirm"
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
      </div>
    </main>
  );
}
