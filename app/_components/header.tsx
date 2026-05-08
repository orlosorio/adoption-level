'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/lib/auth/use-user';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import LanguageSwitcher from './language-switcher';
import styles from './header.module.css';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const open = useAuthModal((s) => s.open);
  const t = useTranslations('header');
  const tNav = useTranslations('assessment.nav');
  const [signingOut, setSigningOut] = useState(false);

  if (isLoading) return null;

  const isHome = pathname === '/';

  const backLink = !isHome ? (
    <Link href="/" className={styles.backLink} aria-label={tNav('backToHome')}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <path
          d="M10 12L6 8L10 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.backLabel}>{tNav('home')}</span>
    </Link>
  ) : null;

  const aboutLink = (
    <Link href="/about" className={styles.aboutLink}>
      {t('about')}
    </Link>
  );

  if (!user) {
    return (
      <div className={styles.bar}>
        <div className={styles.left}>{backLink}</div>
        <div className={styles.right}>
          <LanguageSwitcher />
          {aboutLink}
          <button type="button" className={styles.btn} onClick={() => open('login')}>
            {t('signIn')}
          </button>
        </div>
      </div>
    );
  }

  const displayName =
    (user.user_metadata?.display_name as string | undefined) ||
    (user.user_metadata?.full_name as string | undefined) ||
    user.email ||
    '';

  async function handleLogout() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setSigningOut(false);
    router.push('/');
    router.refresh();
  }

  return (
    <div className={styles.bar}>
      <div className={styles.left}>{backLink}</div>
      <div className={styles.right}>
        <LanguageSwitcher />
        {aboutLink}
        <Link href="/profile" className={styles.user}>
          <span className={styles.userName}>{displayName}</span>
        </Link>
        <button type="button" className={styles.btn} onClick={handleLogout} disabled={signingOut}>
          {t('signOut')}
        </button>
      </div>
    </div>
  );
}
