import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Spark Digital Agency';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(ellipse at center, rgba(248,211,71,0.18), rgba(7,7,8,0) 55%), #070708',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 22,
          }}
        >
          {/* Asterisk mark */}
          <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
            <line x1="60" y1="6"  x2="60"  y2="114" stroke="#F8D347" strokeWidth="14" strokeLinecap="round" />
            <line x1="12" y1="84" x2="108" y2="36"  stroke="#F8D347" strokeWidth="14" strokeLinecap="round" />
            <line x1="12" y1="36" x2="108" y2="84"  stroke="#F8D347" strokeWidth="14" strokeLinecap="round" />
            <circle cx="60" cy="60" r="10" fill="#F8D347" />
          </svg>
          <span
            style={{
              color: '#F5F5F3',
              fontSize: 128,
              fontWeight: 400,
              letterSpacing: -4,
              fontFamily: 'serif',
            }}
          >
            spark
          </span>
        </div>
        <div
          style={{
            marginTop: 32,
            color: '#9A9A90',
            fontSize: 22,
            letterSpacing: 8,
            fontFamily: 'monospace',
          }}
        >
          DIGITAL AGENCY
        </div>
      </div>
    ),
    { ...size },
  );
}
