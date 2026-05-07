'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { isLocale, locales, type Locale } from '@/i18n/routing';
import styles from './language-switcher.module.css';

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function writeLocaleCookie(next: Locale) {
  document.cookie = `NEXT_LOCALE=${next}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('languageSwitcher');
  const [isPending, startTransition] = useTransition();

  function setLocale(next: Locale) {
    if (next === locale) return;
    writeLocaleCookie(next);
    startTransition(() => router.refresh());
  }

  return (
    <div className={styles.group} role="group" aria-label={t('ariaLabel')}>
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            className={`${styles.btn} ${active ? styles.active : ''}`}
            onClick={() => isLocale(code) && setLocale(code)}
            disabled={isPending}
            aria-pressed={active}
          >
            {t(code)}
          </button>
        );
      })}
    </div>
  );
}
