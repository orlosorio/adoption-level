import type { AboutContent } from '@/lib/about-content';

interface ArticleHeaderProps {
  meta: AboutContent['meta'];
}

export default function ArticleHeader({ meta }: ArticleHeaderProps) {
  return (
    <header className="pt-12">
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
