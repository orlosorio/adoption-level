'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ABOUT_CONTENT } from '@/lib/about-content';
import ArticleHeader from '@/components/About/ArticleHeader';
import ArticleSection from '@/components/About/ArticleSection';
import CitationCard from '@/components/About/CitationCard';
import AuthorSignoff from '@/components/About/AuthorSignoff';
import StickyAssessmentBar from '@/components/About/StickyAssessmentBar';

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
      <div className="about-page-layout">
        <div className="about-container">
          <ArticleHeader meta={content.meta} lang={lang} onLangChange={setLang} />

          {content.sections.map((section, i) => (
            <div key={section.id}>
              <ArticleSection heading={section.heading} body={section.body} />
              {i === citationAfterIndex && <CitationCard citation={content.citation} />}
              {i < content.sections.length - 1 && <hr className="about-divider" />}
            </div>
          ))}

          <AuthorSignoff />

          <div className="about-bottom-cta">
            <h2 className="about-bottom-cta-heading">{cta.heading}</h2>
            <p className="about-bottom-cta-text">{cta.text}</p>
            <a href="/assessment" className="about-bottom-cta-btn">
              {cta.button}
            </a>
          </div>
        </div>

        <aside className="about-sidebar-col">
          <div className="about-sidebar-card">
            <p className="about-sidebar-heading">{sidebar.heading}</p>
            <p className="about-sidebar-text">{sidebar.text}</p>
            <button
              type="button"
              onClick={() => router.push('/assessment')}
              className="about-sidebar-btn"
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

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.round(pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="about-progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />
  );
}
