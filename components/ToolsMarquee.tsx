import type { Language } from '@/lib/content';
import type { Tool } from '@/lib/tools';
import { ROW_1, ROW_2 } from '@/lib/tools';

const LABELS = {
  es: 'Las herramientas que están usando los mejores',
  en: 'Tools the best professionals are using',
} as const;

function ToolPill({ emoji, name }: Tool) {
  return (
    <div className="marquee-pill">
      <span>{emoji}</span>
      <span>{name}</span>
    </div>
  );
}

function MarqueeRow({
  tools,
  direction,
}: {
  tools: Tool[];
  direction: 'marquee-scroll-left' | 'marquee-scroll-right';
}) {
  const doubled = [...tools, ...tools];
  return (
    <div className="marquee-row-outer">
      <div className={`marquee-row-inner ${direction}`}>
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
      className="marquee-section"
      aria-hidden="true"
      aria-label="AI tools used by top professionals"
    >
      <p className="marquee-label">{LABELS[language]}</p>
      <div className="marquee-wrapper">
        <MarqueeRow tools={ROW_1} direction="marquee-scroll-left" />
        <MarqueeRow tools={ROW_2} direction="marquee-scroll-right" />
      </div>
    </section>
  );
}
