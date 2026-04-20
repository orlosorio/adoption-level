'use client';

import type { Language } from '@/lib/content';
import { UI } from '@/lib/content';
import type { BenchmarkResult } from '@/lib/benchmarkMock';

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
    <div className="bench-section">
      <p className="bench-label">{label}</p>
      <p className="bench-statement">{statement}</p>
      <div className="bench-track" aria-label={statement}>
        <div className="bench-fill" style={{ width: `${percentile}%` }} />
      </div>
      <p className="bench-pct">{percentile}%</p>
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
    <div className="bench-panel">
      <p className="bench-heading">📊 {copy.panelHeading}</p>
      <p className="bench-respondents">{copy.respondentCount(data.totalRespondents)}</p>

      {!hasEnoughTotal ? (
        <p className="bench-not-enough italic">{copy.notEnoughData}</p>
      ) : (
        <>
          <PercentileBar
            label={copy.overallLabel}
            statement={copy.percentileText(data.overall, '')}
            percentile={data.overall}
          />

          <hr className="bench-divider" />

          {data.totalRespondents >= minSegmentSize ? (
            <PercentileBar
              label={copy.countryLabel(labels.country)}
              statement={copy.percentileText(data.country, labels.country)}
              percentile={data.country}
            />
          ) : (
            <div className="bench-section">
              <p className="bench-label">{copy.countryLabel(labels.country)}</p>
              <p className="bench-not-enough italic">{copy.notEnoughData}</p>
            </div>
          )}

          <hr className="bench-divider" />

          <PercentileBar
            label={copy.companyLabel(labels.companyType)}
            statement={copy.percentileText(data.companyType, labels.companyType)}
            percentile={data.companyType}
          />

          <hr className="bench-divider" />

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
