'use client';

import { useEffect, useState } from 'react';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import LoginForm from './login-form';
import SignupForm from './signup-form';
import SignupDemographicsForm from './signup-demographics-form';
import ForgotForm from './forgot-form';
import CheckEmailScreen from './check-email-screen';
import styles from './auth-modal.module.css';

export default function AuthModal() {
  const isOpen = useAuthModal((s) => s.isOpen);
  const mode = useAuthModal((s) => s.mode);
  const prevMode = useAuthModal((s) => s.prevMode);
  const close = useAuthModal((s) => s.close);

  const [pendingEmail, setPendingEmail] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const checkEmailOrigin: 'signup' | 'forgot' = prevMode === 'forgot' ? 'forgot' : 'signup';

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.panel}>
        <button type="button" className={styles.closeBtn} onClick={close} aria-label="Close">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {mode === 'login' && <LoginForm />}
        {mode === 'signup' && <SignupForm onPendingEmail={setPendingEmail} />}
        {mode === 'signup-demographics' && <SignupDemographicsForm />}
        {mode === 'forgot' && <ForgotForm onPendingEmail={setPendingEmail} />}
        {mode === 'check-email' && (
          <CheckEmailScreen pendingEmail={pendingEmail} origin={checkEmailOrigin} />
        )}
      </div>
    </div>
  );
}
