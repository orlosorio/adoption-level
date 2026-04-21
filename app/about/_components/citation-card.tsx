import type { AboutCitation } from '@/lib/about-content';

interface CitationCardProps {
  citation: AboutCitation;
}

export default function CitationCard({ citation }: CitationCardProps) {
  return (
    <blockquote className="border-l-brand-600 my-10 rounded-r-[10px] border-l-4 bg-[#eff6ff] px-7 py-6 max-sm:px-[18px] max-sm:py-[16px]">
      <p className="text-brand-700 mb-4 font-serif text-[19px] leading-[1.6] font-normal italic">
        &ldquo;{citation.text}&rdquo;
      </p>
      <footer className="font-mono text-[11px] leading-[1.8] tracking-[0.08em] text-[#4d5b9a] uppercase">
        <span>&mdash; {citation.author}</span>
        <br />
        <span>{citation.source}</span>
        <br />
        <a
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 underline"
        >
          {citation.views}
        </a>
      </footer>
    </blockquote>
  );
}
