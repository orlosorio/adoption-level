'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/lib/auth/use-user';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import LanguageSwitcher from './language-switcher';
import styles from './header.module.css';

export default function Header() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const open = useAuthModal((s) => s.open);
  const t = useTranslations('header');
  const [signingOut, setSigningOut] = useState(false);

  if (isLoading) return null;

  const aboutLink = (
    <Link href="/about" className={styles.aboutLink}>
      {t('about')}
    </Link>
  );

  if (!user) {
    return (
      <div className={styles.bar}>
        <LanguageSwitcher />
        {aboutLink}
        <button type="button" className={styles.btn} onClick={() => open('login')}>
          {t('signIn')}
        </button>
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
      <LanguageSwitcher />
      {aboutLink}
      <span className={styles.user}>
        <span className={styles.userName}>{displayName}</span>
      </span>
      <button type="button" className={styles.btn} onClick={handleLogout} disabled={signingOut}>
        {t('signOut')}
      </button>
    </div>
  );
}
