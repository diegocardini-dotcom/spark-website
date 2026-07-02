'use client';

/**
 * Logo — Spark's brand lockup.
 *
 * Composition:  [SparkMark] + "spark" wordmark (Outfit 700) [+ optional tagline]
 *
 * The tagline is rebuilt: medium weight Outfit at a tighter tracking,
 * baseline-aligned under "spark" with a small ember rule. No more
 * loose / floating "DIGITAL AGENCY" line.
 *
 * Variants:
 *   compact (nav)   — mark + wordmark, no tagline
 *   full    (footer/hero) — mark + wordmark + ember-ruled tagline
 */

import { SparkMark } from './SparkMark';

type LogoProps = {
  /** wordmark cap height in px. Mark + tagline scale from this. */
  size?: number;
  variant?: 'compact' | 'full';
  glow?: boolean;
  className?: string;
};

export function Logo({ size = 30, variant = 'compact', glow = false, className }: LogoProps) {
  const markSize = size * 1.15;        // mark slightly taller than cap-height
  const tagSize = Math.max(9, size * 0.26);
  const ruleW   = size * 0.55;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.36,
        lineHeight: 1,
      }}
    >
      <SparkMark size={markSize} color="#F8D347" glow={glow} />

      <span style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span
          style={{
            fontFamily: 'Outfit, system-ui, sans-serif',
            fontWeight: 700,
            fontSize: size,
            lineHeight: 0.92,
            color: '#F6F6F8',
            letterSpacing: '-0.03em',
          }}
        >
          spark
        </span>

        {variant === 'full' && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: tagSize * 0.7,
              marginTop: size * 0.22,
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: ruleW,
                height: 1,
                background: 'linear-gradient(to right, rgba(248,211,71,0.7), rgba(248,211,71,0.1))',
              }}
            />
            <span
              style={{
                fontFamily: 'Outfit, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: tagSize,
                letterSpacing: '0.24em',
                color: '#b8b8c2',
                textTransform: 'uppercase',
              }}
            >
              digital agency
            </span>
          </span>
        )}
      </span>
    </span>
  );
}
