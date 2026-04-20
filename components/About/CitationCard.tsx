import type { AboutCitation } from '@/lib/about-content';

interface CitationCardProps {
  citation: AboutCitation;
}

export default function CitationCard({ citation }: CitationCardProps) {
  return (
    <blockquote className="about-citation">
      <p className="about-citation-text">&ldquo;{citation.text}&rdquo;</p>
      <footer className="about-citation-footer">
        <span>&mdash; {citation.author}</span>
        <br />
        <span>{citation.source}</span>
        <br />
        <a
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="about-citation-link"
        >
          {citation.views}
        </a>
      </footer>
    </blockquote>
  );
}
