'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function StickyAssessmentBar() {
  const router = useRouter();
  const t = useTranslations('about.stickyBar');

  return (
    <div className="fixed right-0 bottom-0 left-0 z-[100] flex items-center justify-center gap-4 border-t border-white/45 bg-white/25 px-6 py-4 backdrop-blur-[16px] backdrop-saturate-[1.6] max-sm:flex-col max-sm:gap-3 max-sm:px-5 max-sm:py-3.5 max-sm:text-center lg:hidden">
      <p className="text-brand-700 font-sans text-[15px] font-medium max-sm:text-sm">{t('text')}</p>
      <button
        type="button"
        onClick={() => router.push('/assessment')}
        className="bg-brand-700 hover:bg-brand-600 shrink-0 cursor-pointer rounded-lg border border-[rgba(31,54,169,0.2)] px-5 py-2.5 font-sans text-sm font-semibold whitespace-nowrap text-white transition-[background,box-shadow] duration-200 hover:shadow-[0_4px_16px_rgba(31,54,169,0.2)] max-sm:w-full"
      >
        {t('button')}
      </button>
    </div>
  );
}
