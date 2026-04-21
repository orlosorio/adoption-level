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
      <div className={styles.pageLayout}>
        <div className={styles.container}>
          <ArticleHeader meta={content.meta} lang={lang} onLangChange={setLang} />

          {content.sections.map((section, i) => (
            <div key={section.id}>
              <ArticleSection heading={section.heading} body={section.body} />
              {i === citationAfterIndex && <CitationCard citation={content.citation} />}
              {i < content.sections.length - 1 && <hr className={styles.divider} />}
            </div>
          ))}

          <AuthorSignoff />

          <div className={styles.bottomCta}>
            <h2 className={styles.bottomCtaHeading}>{cta.heading}</h2>
            <p className={styles.bottomCtaText}>{cta.text}</p>
            <a href="/assessment" className={styles.bottomCtaBtn}>
              {cta.button}
            </a>
          </div>
        </div>

        <aside className={styles.sidebarCol}>
          <div className={styles.sidebarCard}>
            <p className={styles.sidebarHeading}>{sidebar.heading}</p>
            <p className={styles.sidebarText}>{sidebar.text}</p>
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
