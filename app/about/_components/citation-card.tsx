import type { AboutCitation } from '@/lib/about-content';
import styles from '../about.module.css';

interface CitationCardProps {
  citation: AboutCitation;
}

export default function CitationCard({ citation }: CitationCardProps) {
  return (
    <blockquote className={styles.citation}>
      <p className={styles.citationText}>&ldquo;{citation.text}&rdquo;</p>
      <footer className={styles.citationFooter}>
        <span>&mdash; {citation.author}</span>
        <br />
        <span>{citation.source}</span>
        <br />
        <a
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.citationLink}
        >
          {citation.views}
        </a>
      </footer>
    </blockquote>
  );
}
