import type { AboutContent } from '@/lib/about-content';
import { cn } from '@/lib/cn';

interface ArticleHeaderProps {
  meta: AboutContent['meta'];
  lang: 'en' | 'es';
  onLangChange: (lang: 'en' | 'es') => void;
}

const langBtnBase =
  'cursor-pointer rounded-md border border-[#d8defa] bg-transparent px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.1em] text-[#4d5b9a] transition-[background,border-color,color] duration-200 hover:border-brand-300 hover:bg-[#eff6ff]';
const langBtnActive =
  'bg-brand-700 border-brand-700 text-white hover:bg-brand-700 hover:border-brand-700 hover:text-white';

export default function ArticleHeader({ meta, lang, onLangChange }: ArticleHeaderProps) {
  return (
    <header>
      <nav className="flex items-center justify-between pt-3 pb-12">
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
        <div className="flex gap-1">
          <button
            type="button"
            aria-pressed={lang === 'en'}
            onClick={() => onLangChange('en')}
            className={cn(langBtnBase, lang === 'en' && langBtnActive)}
          >
            English
          </button>
          <button
            type="button"
            aria-pressed={lang === 'es'}
            onClick={() => onLangChange('es')}
            className={cn(langBtnBase, lang === 'es' && langBtnActive)}
          >
            Español
          </button>
        </div>
      </nav>

      <h1 className="text-brand-700 mb-4 font-serif text-[clamp(28px,5vw,42px)] leading-tight font-bold">
        {meta.title}
      </h1>
      <p className="mb-2 font-sans text-lg leading-relaxed font-normal text-[#4d5b9a]">
        {meta.subtitle}
      </p>
      <p className="text-brand-300 mb-12 font-mono text-xs tracking-[0.08em] uppercase">
        {meta.author} &middot; {meta.authorHandle} &middot; {meta.readTime}
      </p>
    </header>
  );
}
