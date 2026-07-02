'use client';

/* Logo Lab v5 — A vs B, big wordmark, eight pro typefaces.
   localhost:3000/logo-lab  (not linked from nav) */

import { useState } from 'react';
import { SparkMark } from '@/components/ui/SparkMark';

const GOLD = '#F8D347';

type FontDef = {
  key: string;
  family: string;          // CSS font-family
  weight: number;
  tracking: string;        // letter-spacing
  name: string;
  vibe: string;
  /* Optional adjustments per-font so visual size matches across families */
  scale?: number;
};

const FONTS: FontDef[] = [
  {
    key: 'baloo',
    family: '"Baloo 2", sans-serif',
    weight: 700,
    tracking: '-0.015em',
    name: 'Baloo 2',
    vibe: 'Rounded geometric. Closest to your original wordmark — friendly, approachable, warm.',
  },
  {
    key: 'bricolage',
    family: '"Bricolage Grotesque", sans-serif',
    weight: 700,
    tracking: '-0.025em',
    name: 'Bricolage Grotesque',
    vibe: 'Designer-favorite of 2024. Confident, editorial-tech feel. Modern agency standard.',
  },
  {
    key: 'manrope',
    family: '"Manrope", sans-serif',
    weight: 700,
    tracking: '-0.03em',
    name: 'Manrope',
    vibe: 'Sharp, modern geometric. Reads as a serious systems-led agency. Premium SaaS feel.',
    scale: 0.97,
  },
  {
    key: 'plusjakarta',
    family: '"Plus Jakarta Sans", sans-serif',
    weight: 800,
    tracking: '-0.035em',
    name: 'Plus Jakarta Sans',
    vibe: 'Geometric with personality. Slightly distinctive letterforms — the "k" has character.',
    scale: 0.96,
  },
  {
    key: 'dm',
    family: '"DM Sans", sans-serif',
    weight: 700,
    tracking: '-0.035em',
    name: 'DM Sans',
    vibe: 'Industry standard for modern agencies. Clean, balanced, hard to get wrong.',
  },
  {
    key: 'sora',
    family: '"Sora", sans-serif',
    weight: 700,
    tracking: '-0.04em',
    name: 'Sora',
    vibe: 'Geometric with a tech edge. Reads as growth/infrastructure brand. Slightly futurist.',
    scale: 0.95,
  },
  {
    key: 'outfit',
    family: '"Outfit", sans-serif',
    weight: 700,
    tracking: '-0.03em',
    name: 'Outfit',
    vibe: 'Clean geometric, the no-fuss pro choice. Works at any size without drawing attention.',
    scale: 0.97,
  },
  {
    key: 'space',
    family: '"Space Grotesk", sans-serif',
    weight: 600,
    tracking: '-0.03em',
    name: 'Space Grotesk',
    vibe: 'Technical, distinctive, slightly retro-future. For when you want to stand out.',
    scale: 0.97,
  },
];

/* Wordmark — sized so it's clearly bigger than the mark */
function Wordmark({
  font,
  color = '#F6F6F8',
  size = 86,
  tagSize = 12,
  showTag = true,
}: {
  font: FontDef;
  color?: string;
  size?: number;
  tagSize?: number;
  showTag?: boolean;
}) {
  const s = size * (font.scale ?? 1);
  return (
    <div>
      <div
        style={{
          fontFamily: font.family,
          fontWeight: font.weight,
          fontSize: s,
          lineHeight: 0.95,
          color,
          letterSpacing: font.tracking,
        }}
      >
        spark
      </div>
      {showTag && (
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: tagSize,
            letterSpacing: '0.36em',
            color,
            opacity: 0.55,
            marginTop: s * 0.08,
            textTransform: 'uppercase',
          }}
        >
          digital agency
        </div>
      )}
    </div>
  );
}

function NavSim({ logo, accent = GOLD }: { logo: React.ReactNode; accent?: string }) {
  return (
    <div
      style={{
        background: '#0a0a0b',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        height: 76,
        gap: 36,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>{logo}</div>
      <div style={{ flexGrow: 1 }} />
      {['Services', 'Work', 'Process', 'Contact'].map((l) => (
        <span key={l} style={{ fontSize: 13, color: '#5c5c68' }}>
          {l}
        </span>
      ))}
      <div
        style={{
          background: accent,
          borderRadius: 999,
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 500,
          color: '#070708',
          flexShrink: 0,
          marginLeft: 6,
        }}
      >
        Book a call
      </div>
    </div>
  );
}

export default function LogoLabPage() {
  const [treatment, setTreatment] = useState<'A' | 'B'>('B');
  const [pickedFont, setPickedFont] = useState<string>('bricolage');

  const renderMark = (size: number) =>
    treatment === 'A' ? <SparkMark size={size} color={GOLD} /> : <SparkMark size={size} color={GOLD} glow />;

  const selected = FONTS.find((f) => f.key === pickedFont) ?? FONTS[0];

  return (
    <div style={{ background: '#070708', minHeight: '100vh', color: '#e6e6ec', fontFamily: 'Inter, sans-serif' }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=DM+Sans:wght@500;700&family=Manrope:wght@500;700;800&family=Outfit:wght@500;700&family=Plus+Jakarta+Sans:wght@500;700;800&family=Sora:wght@500;700&family=Space+Grotesk:wght@500;600;700&family=Instrument+Serif&family=JetBrains+Mono:wght@400;500&display=swap"
      />

      {/* sticky control bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: 'rgba(7,7,8,0.85)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '18px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD }}>
          Spark
        </span>
        <span style={{ color: '#26262d' }}>/</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#3a3a44', letterSpacing: '0.1em' }}>
          Logo Lab · v5
        </span>

        <div style={{ flexGrow: 1 }} />

        {/* treatment toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#5c5c68', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Treatment
          </span>
          {(['A', 'B'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTreatment(k)}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: `1.5px solid ${treatment === k ? GOLD : 'rgba(255,255,255,0.1)'}`,
                background: treatment === k ? 'rgba(248,211,71,0.08)' : 'transparent',
                color: treatment === k ? GOLD : '#8a8a96',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
            >
              {k === 'A' ? 'A · Pure' : 'B · Glow'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px 100px' }}>
        {/* header */}
        <header style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            Treatment {treatment} · pick a typeface
          </p>
          <h1
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 46,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: '#F6F6F8',
              marginBottom: 14,
            }}
          >
            Eight pro typefaces.
          </h1>
          <p style={{ fontSize: 15, color: '#8a8a96', maxWidth: 580, lineHeight: 1.7 }}>
            Same mark — your exact isologo with the {treatment === 'A' ? 'flat' : 'soft glow'} treatment — paired against eight serious typeface options. Wordmark is now scaled large so you can see the letterforms properly. Click a card to set it as the selected pairing.
          </p>
        </header>

        {/* HERO LIVE PREVIEW */}
        <section
          style={{
            background: '#0a0a0b',
            border: `1px solid ${GOLD}33`,
            borderRadius: 18,
            padding: '64px 56px',
            marginBottom: 64,
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: GOLD, letterSpacing: '0.28em', textTransform: 'uppercase' }}>
            Live preview — {selected.name} × Treatment {treatment}
          </p>

          {/* big lockup */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {renderMark(120)}
            <Wordmark font={selected} size={108} tagSize={14} />
          </div>

          {/* nav scale */}
          <div style={{ marginTop: 12 }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#3a3a44', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
              How it sits in the nav
            </p>
            <NavSim
              logo={
                <>
                  {renderMark(36)}
                  <Wordmark font={selected} size={36} tagSize={8} />
                </>
              }
            />
          </div>
        </section>

        {/* font grid */}
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#5c5c68', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>
          Click a typeface to preview it above
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {FONTS.map((f) => {
            const active = f.key === pickedFont;
            return (
              <button
                key={f.key}
                onClick={() => setPickedFont(f.key)}
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: `1.5px solid ${active ? GOLD : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: active ? 'rgba(248,211,71,0.025)' : 'rgba(255,255,255,0.012)',
                  padding: 0,
                  color: 'inherit',
                  fontFamily: 'inherit',
                  transition: 'all 0.18s',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
                  {/* label column */}
                  <div
                    style={{
                      padding: '28px 24px',
                      borderRight: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      background: active ? 'rgba(248,211,71,0.04)' : 'transparent',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 9,
                        color: active ? GOLD : '#3a3a44',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {active ? '● Selected' : `Option ${FONTS.indexOf(f) + 1}`}
                    </span>
                    <h3 style={{ fontSize: 17, color: '#F6F6F8', fontWeight: 500 }}>{f.name}</h3>
                    <p style={{ fontSize: 12, color: '#8a8a96', lineHeight: 1.55 }}>{f.vibe}</p>
                  </div>

                  {/* lockup preview */}
                  <div style={{ padding: '40px 36px', display: 'flex', alignItems: 'center', gap: 24, minHeight: 180 }}>
                    {renderMark(82)}
                    <Wordmark font={f} size={72} tagSize={11} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* decision */}
        <section style={{ marginTop: 56, padding: '28px 32px', borderRadius: 16, border: `1px solid ${GOLD}26`, background: 'rgba(248,211,71,0.03)' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            Your call
          </p>
          <p style={{ fontSize: 15, color: '#8a8a96', lineHeight: 1.7 }}>
            Currently selected: <strong style={{ color: '#e6e6ec' }}>Treatment {treatment} + {selected.name}</strong>. Try a few combinations above. When one feels right, tell me <strong style={{ color: '#e6e6ec' }}>"go with X + Y"</strong> and I'll wire it into Nav + Footer and move to the hero visual.
          </p>
          <p style={{ fontSize: 13, color: '#5c5c68', lineHeight: 1.7, marginTop: 12 }}>
            <strong style={{ color: '#8a8a96' }}>My pick:</strong> Treatment B (Glow) + Bricolage Grotesque or Manrope. Bricolage if you want distinctive/editorial agency feel; Manrope if you want clean/SaaS-pro.
          </p>
        </section>
      </div>
    </div>
  );
}
