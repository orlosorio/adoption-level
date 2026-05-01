'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ABOUT_CONTENT } from '@/lib/about-content';
import ArticleHeader from './_components/article-header';
import ArticleSection from './_components/article-section';
import CitationCard from './_components/citation-card';
import AuthorSignoff from './_components/author-signoff';
import StickyAssessmentBar from './_components/sticky-assessment-bar';
import ReadingProgress from './_components/reading-progress';
import styles from './about.module.css';

type Lang = 'en' | 'es';

const SIDEBAR_COPY = {
  en: {
    heading: 'AI Adoption Assessment',
    text: 'Discover your real AI adoption level in just 2 minutes.',
    button: 'Take the free assessment \u2192',
  },
  es: {
    heading: 'Assessment de Adopci\u00f3n de IA',
    text: 'Descubre tu nivel real de adopci\u00f3n de IA en solo 2 minutos.',
    button: 'Tomar el assessment gratuito \u2192',
  },
} as const;

const CTA_COPY = {
  en: {
    heading: 'Ready to find out where you stand?',
    text: '15 questions. 2 minutes. No fluff.',
    button: 'Take the free assessment',
  },
  es: {
    heading: '\u00bfListo para saber d\u00f3nde est\u00e1s?',
    text: '15 preguntas. 2 minutos. Sin relleno.',
    button: 'Tomar el assessment gratuito',
  },
} as const;

function getInitialLang(): Lang {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('accionables_about_lang');
    if (saved === 'en' || saved === 'es') return saved;
    if (navigator.language.startsWith('es')) return 'es';
  }
  return 'en';
}

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLang(getInitialLang());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('accionables_about_lang', lang);
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  const content = ABOUT_CONTENT[lang];
  const sidebar = SIDEBAR_COPY[lang];
  const cta = CTA_COPY[lang];
  const citationAfterIndex = 1;

  return (
    <>
      <ReadingProgress />
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        <div className="pt-10 pb-[120px]">
          <ArticleHeader meta={content.meta} lang={lang} onLangChange={setLang} />

          {content.sections.map((section, i) => (
            <div key={section.id}>
              <ArticleSection heading={section.heading} body={section.body} />
              {i === citationAfterIndex && <CitationCard citation={content.citation} />}
              {i < content.sections.length - 1 && (
                <hr className="my-10 border-t border-none border-t-[#d8defa]" />
              )}
            </div>
          ))}

          <AuthorSignoff />

          <div className="mt-14 mb-12 border-t border-t-[rgba(31,54,169,0.08)] py-10 text-center">
            <h2 className="text-brand-700 m-0 mb-2 font-sans text-[22px] font-bold">
              {cta.heading}
            </h2>
            <p className="text-brand-700 m-0 mb-6 font-sans text-[15px] font-normal opacity-55">
              {cta.text}
            </p>
            <a href="/assessment" className={styles.bottomCtaBtn}>
              {cta.button}
            </a>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className={styles.sidebarCard}>
            <p className="text-brand-700 font-sans text-[15px] leading-[1.35] font-semibold">
              {sidebar.heading}
            </p>
            <p className="text-brand-700 font-sans text-[13px] leading-[1.55] font-normal opacity-65">
              {sidebar.text}
            </p>
            <button
              type="button"
              onClick={() => router.push('/assessment')}
              className={styles.sidebarBtn}
            >
              {sidebar.button}
            </button>
          </div>
        </aside>
      </div>
      <StickyAssessmentBar lang={lang} />
    </>
  );
}
