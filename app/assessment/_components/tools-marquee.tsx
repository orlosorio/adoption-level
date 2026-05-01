import type { Language } from '@/lib/content';
import type { Tool } from '@/lib/tools';
import { ROW_1, ROW_2 } from '@/lib/tools';
import styles from './tools-marquee.module.css';

const LABELS = {
  es: 'Las herramientas que están usando los mejores',
  en: 'Tools the best professionals are using',
} as const;

function ToolPill({ emoji, name }: Tool) {
  return (
    <div className={styles.pill}>
      <span>{emoji}</span>
      <span>{name}</span>
    </div>
  );
}

function MarqueeRow({ tools, direction }: { tools: Tool[]; direction: 'left' | 'right' }) {
  const doubled = [...tools, ...tools];
  const scrollClass = direction === 'left' ? styles.scrollLeft : styles.scrollRight;
  return (
    <div className={styles.rowOuter}>
      <div className={`${styles.rowInner} ${scrollClass}`}>
        {doubled.map((tool, i) => (
          <ToolPill key={`${tool.name}-${i}`} emoji={tool.emoji} name={tool.name} />
        ))}
      </div>
    </div>
  );
}

export default function ToolsMarquee({ language }: { language: Language }) {
  return (
    <section
      className={styles.section}
      aria-hidden="true"
      aria-label="AI tools used by top professionals"
    >
      <p className={styles.label}>{LABELS[language]}</p>
      <div className={styles.wrapper}>
        <MarqueeRow tools={ROW_1} direction="left" />
        <MarqueeRow tools={ROW_2} direction="right" />
      </div>
    </section>
  );
}
