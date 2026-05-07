'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function AssessmentNav() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('assessment.nav');
  const isEntry = pathname === '/assessment';

  const className =
    'absolute top-[8px] left-0 flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/40 bg-white/25 px-2.5 py-1 text-[12px] font-medium text-[#1f36a9]/60 backdrop-blur-md transition-all hover:bg-white/40 hover:text-[#1f36a9] sm:top-[20px] sm:px-3 sm:py-1.5 sm:text-[13px]';

  const inner = (
    <>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <path
          d="M10 12L6 8L10 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="hidden sm:inline">{t('home')}</span>
    </>
  );

  return (
    <div className="relative z-20 flex w-full items-center pt-1 sm:pt-2">
      {isEntry ? (
        <Link href="/" className={className} aria-label={t('backToHome')}>
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => router.push('/assessment')}
          className={className}
          aria-label={t('backToHome')}
        >
          {inner}
        </button>
      )}
    </div>
  );
}
