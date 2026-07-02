'use client';

/**
 * SparkMark — Spark's actual isologo, rebuilt as crisp themeable SVG.
 *
 * Geometry traced pixel-accurately from the original logo:
 *   6 capsule rays at 60° spacing, alternating —
 *   • 3 CONNECTED arms forming a 120° "Y" (up, down-left, down-right)
 *   • 3 FLOATING rays in the gaps (down, upper-left, upper-right)
 *
 * Variants:
 *   'solid'    — flat fill (use currentColor / color prop)
 *   'hotcore'  — radial gradient: white-hot center → gold tips (ember feel)
 *
 * Props:
 *   glow      — soft light bloom behind the mark
 *   animated  — floating rays twinkle (respects prefers-reduced-motion)
 */

let uid = 0;

type Props = {
  size?: number;
  color?: string;
  variant?: 'solid' | 'hotcore';
  glow?: boolean;
  animated?: boolean;
  className?: string;
};

const CONNECTED = [270, 30, 150]; // Y arms — start at center
const FLOATING = [90, 210, 330];  // gap rays — start at R_in

// viewBox 100×100, center (50,50)
const C = 50;
const R_OUT = 39;
const R_IN = 16;
const W = 10.5; // stroke width (capsule thickness)

function pt(angle: number, r: number): [number, number] {
  const a = (angle * Math.PI) / 180;
  return [+(C + Math.cos(a) * r).toFixed(2), +(C + Math.sin(a) * r).toFixed(2)];
}

export function SparkMark({
  size = 40,
  color = '#F8D347',
  variant = 'solid',
  glow = false,
  animated = false,
  className,
}: Props) {
  const id = `spark-${++uid}`;
  const stroke = variant === 'hotcore' ? `url(#${id}-core)` : color;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Spark"
      className={className}
      style={glow ? { filter: `drop-shadow(0 0 ${size * 0.13}px rgba(248,211,71,0.55))` } : undefined}
    >
      <defs>
        {variant === 'hotcore' && (
          <radialGradient id={`${id}-core`} cx="50%" cy="50%" r="52%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7DC" />
            <stop offset="38%" stopColor="#FBE17F" />
            <stop offset="100%" stopColor={color} />
          </radialGradient>
        )}
      </defs>

      {/* connected Y arms */}
      {CONNECTED.map((a) => {
        const [x2, y2] = pt(a, R_OUT);
        return (
          <line key={`c${a}`} x1={C} y1={C} x2={x2} y2={y2} stroke={stroke} strokeWidth={W} strokeLinecap="round" />
        );
      })}

      {/* floating rays */}
      {FLOATING.map((a) => {
        const [x1, y1] = pt(a, R_IN);
        const [x2, y2] = pt(a, R_OUT);
        return (
          <line
            key={`f${a}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth={W}
            strokeLinecap="round"
            className={animated ? 'spark-ray' : undefined}
            style={
              animated
                ? { transformOrigin: '50px 50px', animationDelay: `${FLOATING.indexOf(a) * 0.45}s` }
                : undefined
            }
          />
        );
      })}

      {animated && (
        <style>{`
          @keyframes sparkRay { 0%,100%{opacity:.55} 50%{opacity:1} }
          .spark-ray { animation: sparkRay 2.6s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce){ .spark-ray{ animation:none; opacity:.85 } }
        `}</style>
      )}
    </svg>
  );
}
