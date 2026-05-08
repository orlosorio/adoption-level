'use client';

import { useTranslations } from 'next-intl';
import styles from './benchmark.module.css';

export interface BenchmarkRow {
  label: string;
  statement: string;
  percentile: number;
}

interface BenchmarkPanelProps {
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

export default function BenchmarkPanel({ totalRespondents, rows }: BenchmarkPanelProps) {
  const t = useTranslations('benchmark');
  const showRespondentCount = totalRespondents >= 50;

  return (
    <div className={styles.panel}>
      <p className={styles.heading}>📊 {t('panelHeading')}</p>
      {showRespondentCount && (
        <p className={styles.respondents}>{t('respondentCount', { n: totalRespondents })}</p>
      )}

      {rows.map((row, i) => (
        <div key={`${row.label}-${i}`}>
          {i > 0 && <hr className={styles.divider} />}
          <PercentileBar label={row.label} statement={row.statement} percentile={row.percentile} />
        </div>
      ))}
    </div>
  );
}

export { styles as benchmarkStyles };
