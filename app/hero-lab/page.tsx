'use client';

/* Hero Lab — preview the three hero backdrop options live.
   localhost:3000/hero-lab  (not linked from nav) */

import { useState } from 'react';
import { Hero, type HeroVariant } from '@/components/Hero';

const OPTIONS: { key: HeroVariant; name: string; desc: string }[] = [
  { key: 'flow',           name: 'A · Abstract flow-field', desc: 'Hundreds of particles flowing along an invisible field, leaving trails of gold light — like ink in water. Mouse adds parallax. The impressive, ownable option.' },
  { key: 'sparkles',       name: 'B · Image + sparkles',    desc: 'B&W MacBook photo with gold sparkles drifting up and twinkling over it. On-brand “sparks flying”, human + premium.' },
  { key: 'sparkles-earth', name: 'C · Earth + sparkles',    desc: 'B&W Earth-at-night with the same flying sparkles. Systemic and atmospheric.' },
];

export default function HeroLabPage() {
  const [variant, setVariant] = useState<HeroVariant>('flow');

  return (
    <div style={{ background: '#070708', minHeight: '100vh' }}>
      {/* Picker bar */}
      <div
        style={{
          position: 'sticky', top: 0, zIndex: 60,
          background: 'rgba(7,7,8,0.85)', backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#F8D347' }}>
          Hero Lab
        </span>
        <div style={{ flexGrow: 1 }} />
        {OPTIONS.map((o) => (
          <button
            key={o.key}
            onClick={() => setVariant(o.key)}
            style={{
              padding: '8px 14px', borderRadius: 8,
              border: `1.5px solid ${variant === o.key ? '#F8D347' : 'rgba(255,255,255,0.1)'}`,
              background: variant === o.key ? 'rgba(248,211,71,0.08)' : 'transparent',
              color: variant === o.key ? '#F8D347' : '#8a8a96',
              fontSize: 12, fontWeight: 500, cursor: 'pointer',
            }}
          >
            {o.name}
          </button>
        ))}
      </div>

      {/* description */}
      <div style={{ padding: '14px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: 13, color: '#8a8a96', fontFamily: 'Inter, sans-serif' }}>
          {OPTIONS.find((o) => o.key === variant)?.desc}{' '}
          <span style={{ color: '#5c5c68' }}>
            — tell me “go with hero {variant === 'flow' ? 'A' : variant === 'sparkles' ? 'B' : 'C'}” and I’ll set it as the homepage hero.
          </span>
        </p>
      </div>

      {/* Live hero render */}
      <div key={variant}>
        <Hero variant={variant} />
      </div>
    </div>
  );
}
