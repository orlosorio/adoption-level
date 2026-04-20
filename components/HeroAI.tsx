const A_PATH =
  'M 0 150 L 50 0 L 80 0 L 130 150 L 104 150 L 86 92 L 44 92 L 26 150 Z M 50 78 L 65 24 L 80 78 Z';
const I_PATH =
  'M 145 0 L 210 0 L 210 18 L 188 18 L 188 132 L 210 132 L 210 150 L 145 150 L 145 132 L 167 132 L 167 18 L 145 18 Z';

const ANCHORS: [number, number][] = [
  [0, 150],
  [50, 0],
  [80, 0],
  [130, 150],
  [104, 150],
  [86, 92],
  [44, 92],
  [26, 150],
  [50, 78],
  [65, 24],
  [80, 78],
  [145, 0],
  [210, 0],
  [210, 18],
  [188, 18],
  [188, 132],
  [210, 132],
  [210, 150],
  [145, 150],
  [145, 132],
  [167, 132],
  [167, 18],
  [145, 18],
];

export default function HeroAI() {
  return (
    <svg viewBox="-6 -6 222 162" className="hero-ai-svg" role="img" aria-label="AI">
      <path d={A_PATH} fillRule="evenodd" className="ai-fill" />
      <path d={I_PATH} className="ai-fill ai-fill-i" />

      <path d={A_PATH} fillRule="evenodd" className="ai-stroke" pathLength={1} />
      <path d={I_PATH} className="ai-stroke ai-stroke-i" pathLength={1} />

      {ANCHORS.map(([x, y], i) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={4.5}
          className="ai-anchor"
          style={{ '--ai-i': i } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}
