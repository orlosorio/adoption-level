'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/lib/auth/use-user';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import type { Language } from '@/lib/content';
import { loadPreferredLanguage, savePreferredLanguage } from '@/lib/preferredLanguage';
import styles from './header.module.css';

function readLanguage(param: string | null): Language | null {
  if (param === 'en' || param === 'es') return param;
  return null;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, isLoading } = useUser();
  const open = useAuthModal((s) => s.open);
  const setLanguage = useAuthModal((s) => s.setLanguage);
  const [signingOut, setSigningOut] = useState(false);

  // URL `?lang=` wins; otherwise fall back to the user's last picked
  // language (persisted in localStorage), and finally to Spanish.
  const urlLanguage = readLanguage(searchParams.get('lang'));
  const [storedLanguage, setStoredLanguage] = useState<Language | null>(null);
  useEffect(() => {
    setStoredLanguage(loadPreferredLanguage());
  }, []);
  const language: Language = urlLanguage ?? storedLanguage ?? 'es';

  // Mirror the URL choice into localStorage so the auth modal stays in the
  // right language even when the user lands on a page without `?lang=`.
  useEffect(() => {
    if (urlLanguage) savePreferredLanguage(urlLanguage);
  }, [urlLanguage]);

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
          Sign in
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
    // Always land on the homepage after signing out so the user isn't stuck
    // mid-flow on a page they may not be authorized to see.
    router.push('/');
    router.refresh();
  }

  return (
    <div className={styles.bar}>
      {aboutLink}
      <span className={styles.user}>
        <span className={styles.userName}>{displayName}</span>
      </span>
      <button type="button" className={styles.btn} onClick={handleLogout} disabled={signingOut}>
        Sign out
      </button>
    </div>
  );
}
