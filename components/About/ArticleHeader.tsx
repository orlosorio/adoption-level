import type { AboutContent } from '@/lib/about-content';

interface ArticleHeaderProps {
  meta: AboutContent['meta'];
  lang: 'en' | 'es';
  onLangChange: (lang: 'en' | 'es') => void;
}

export default function ArticleHeader({ meta, lang, onLangChange }: ArticleHeaderProps) {
  return (
    <header className="about-header">
      <nav className="about-nav">
        <a
          href="/assessment"
          className="flex items-center gap-1.5 rounded-lg border border-white/40 bg-white/25 px-3 py-1.5 text-[13px] font-medium text-[#1f36a9]/60 backdrop-blur-md transition-all hover:bg-white/40 hover:text-[#1f36a9]"
          aria-label="Back to home"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">Home</span>
        </a>
        <div className="about-lang-toggle">
          <button
            type="button"
            aria-pressed={lang === 'en'}
            onClick={() => onLangChange('en')}
            className={`about-lang-btn ${lang === 'en' ? 'about-lang-btn-active' : ''}`}
          >
            English
          </button>
          <button
            type="button"
            aria-pressed={lang === 'es'}
            onClick={() => onLangChange('es')}
            className={`about-lang-btn ${lang === 'es' ? 'about-lang-btn-active' : ''}`}
          >
            Español
          </button>
        </div>
      </nav>

      <h1 className="about-title">{meta.title}</h1>
      <p className="about-subtitle">{meta.subtitle}</p>
      <p className="about-byline">
        {meta.author} &middot; {meta.authorHandle} &middot; {meta.readTime}
      </p>
    </header>
  );
}
