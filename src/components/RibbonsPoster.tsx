// Static SVG fallback for the hero ribbons: used when WebGL is unavailable,
// prefers-reduced-motion is set, or Save-Data is on. Mirrors the colour ramp
// and silhouette of the WebGL version so there is no visual regression.
export default function RibbonsPoster() {
  const strands = Array.from({ length: 18 });
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ribbon-ramp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4630D0" />
          <stop offset="40%" stopColor="#6B4DFF" />
          <stop offset="75%" stopColor="#A08DFF" />
          <stop offset="100%" stopColor="#DCD5FF" />
        </linearGradient>
      </defs>
      {strands.map((_, i) => {
        const amp = 60 + (i % 5) * 8;
        const phase = i * 18;
        const yBase = 250 + i * 4;
        const d = `M0,${yBase} C 250,${yBase - amp} 400,${yBase + amp} 500,${yBase} C 600,${yBase - amp} 750,${yBase + amp} 1000,${yBase}`;
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#ribbon-ramp)"
            strokeWidth={1}
            opacity={0.66 - (i / strands.length) * 0.5}
            style={{ transform: `translateX(${phase * 0}px)` }}
          />
        );
      })}
    </svg>
  );
}
