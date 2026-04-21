'use client';

import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import type { BenchmarkResult } from '@/lib/benchmarkMock';
import styles from './benchmark.module.css';

interface BenchmarkPanelProps {
  language: Language;
  data: BenchmarkResult;
  labels: {
    country: string;
    companyType: string;
    industry: string;
  };
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

export default function BenchmarkPanel({
  language,
  data,
  labels,
  minSegmentSize = 10,
}: BenchmarkPanelProps) {
  const copy = UI.benchmark[language];
  const hasEnoughTotal = data.totalRespondents >= 50;

  return (
    <div className={styles.panel}>
      <p className={styles.heading}>📊 {copy.panelHeading}</p>
      <p className={styles.respondents}>{copy.respondentCount(data.totalRespondents)}</p>

      {!hasEnoughTotal ? (
        <p className={`${styles.notEnough} italic`}>{copy.notEnoughData}</p>
      ) : (
        <>
          <PercentileBar
            label={copy.overallLabel}
            statement={copy.percentileText(data.overall, '')}
            percentile={data.overall}
          />

          <hr className={styles.divider} />

          {data.totalRespondents >= minSegmentSize ? (
            <PercentileBar
              label={copy.countryLabel(labels.country)}
              statement={copy.percentileText(data.country, labels.country)}
              percentile={data.country}
            />
          ) : (
            <div className={styles.section}>
              <p className={styles.label}>{copy.countryLabel(labels.country)}</p>
              <p className={`${styles.notEnough} italic`}>{copy.notEnoughData}</p>
            </div>
          )}

          <hr className={styles.divider} />

          <PercentileBar
            label={copy.companyLabel(labels.companyType)}
            statement={copy.percentileText(data.companyType, labels.companyType)}
            percentile={data.companyType}
          />

          <hr className={styles.divider} />

          <PercentileBar
            label={copy.industryLabel(labels.industry)}
            statement={copy.percentileText(data.industry, labels.industry)}
            percentile={data.industry}
          />
        </>
      )}
    </div>
  );
}

export { styles as benchmarkStyles };
