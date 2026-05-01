'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/lib/auth/use-user';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import { UI, type Language } from '@/lib/content';
import styles from './header.module.css';

function readLanguage(param: string | null): Language {
  return param === 'en' ? 'en' : 'es';
}

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, isLoading } = useUser();
  const open = useAuthModal((s) => s.open);
  const setLanguage = useAuthModal((s) => s.setLanguage);
  const [signingOut, setSigningOut] = useState(false);

  const language = readLanguage(searchParams.get('lang'));
  const copy = UI.auth[language];

  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  if (pathname?.startsWith('/about')) return null;
  if (isLoading) return null;

  const aboutLink = (
    <Link href="/about" className={styles.aboutLink}>
      About · Sobre
    </Link>
  );

  if (!user) {
    return (
      <div className={styles.bar}>
        {aboutLink}
        <button type="button" className={styles.btn} onClick={() => open('login', language)}>
          {copy.loginCta}
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
  }

  return (
    <div className={styles.bar}>
      {aboutLink}
      <span className={styles.user}>
        <span className={styles.userName}>{displayName}</span>
      </span>
      <button type="button" className={styles.btn} onClick={handleLogout} disabled={signingOut}>
        {copy.logout}
      </button>
    </div>
  );
}
