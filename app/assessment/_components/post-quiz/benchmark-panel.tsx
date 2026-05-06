'use client';

import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import styles from './benchmark.module.css';

export interface BenchmarkRow {
  label: string;
  statement: string;
  percentile: number;
}

interface BenchmarkPanelProps {
  language: Language;
  totalRespondents: number;
  rows: BenchmarkRow[];
  minSegmentSize?: number;
}

function PercentileBar({
  label,
  statement,
  percentile,
}: {
  label: string;
  statement: string;
  percentile: number;
}) {
  return (
    <div className={styles.section}>
      <p className={styles.label}>{label}</p>
      <p className={styles.statement}>{statement}</p>
      <div className={styles.track} aria-label={statement}>
        <div className={styles.fill} style={{ width: `${percentile}%` }} />
      </div>
      <p className={styles.pct}>{percentile}%</p>
    </div>
  );
}

export default function BenchmarkPanel({ language, totalRespondents, rows }: BenchmarkPanelProps) {
  const copy = UI.benchmark[language];
  const hasEnoughTotal = totalRespondents >= 50;

  return (
    <div className={styles.panel}>
      <p className={styles.heading}>📊 {copy.panelHeading}</p>
      <p className={styles.respondents}>{copy.respondentCount(totalRespondents)}</p>

      {!hasEnoughTotal ? (
        <p className={`${styles.notEnough} italic`}>{copy.notEnoughData}</p>
      ) : (
        rows.map((row, i) => (
          <div key={`${row.label}-${i}`}>
            {i > 0 && <hr className={styles.divider} />}
            <PercentileBar
              label={row.label}
              statement={row.statement}
              percentile={row.percentile}
            />
          </div>
        ))
      )}
    </div>
  );
}

export { styles as benchmarkStyles };
