'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal } from './ui/Reveal';
import { useLang } from '@/lib/LanguageContext';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   Service glyphs — clean, single-purpose icons.
   Each icon visually represents what the service IS, not abstract motion.
   Animation lives in hover (scale, rotation, color) — not constant loops.
   ============================================================ */

type GlyphProps = { className?: string };

/* Each glyph carries a subtle always-on micro-animation (CSS keyframes defined
   once in the section). Animations are GPU-friendly (opacity / transform) and
   disabled under prefers-reduced-motion. */

function GlyphPipeline({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={4 + i * 9}
          y={10}
          width={6}
          height={20}
          rx={1}
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          className="svc-blink"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
    </svg>
  );
}

function GlyphAutopilot({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        id="ap-path"
        d="M4 28 C 10 28, 12 12, 20 12 S 30 28, 36 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <circle cx="4" cy="28" r="1.8" fill="currentColor">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M0 0 C 6 0, 8 -16, 16 -16 S 26 0, 32 0" />
      </circle>
      <circle cx="20" cy="12" r="1.6" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function GlyphAgent({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="6" y="10" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 28 L11 24 H 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="13" cy="17" r="1.2" fill="currentColor" className="svc-type" style={{ animationDelay: '0s' }} />
      <circle cx="16.5" cy="17" r="1.2" fill="currentColor" className="svc-type" style={{ animationDelay: '0.2s' }} />
      <circle cx="20" cy="17" r="1.2" fill="currentColor" className="svc-type" style={{ animationDelay: '0.4s' }} />
      <path d="M28 14 v12 M32 18 v4 M36 14 v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function GlyphVoice({ className }: GlyphProps) {
  const bars = [
    { x: 8,  d: '0s'    }, { x: 14, d: '0.15s' }, { x: 18, d: '0.3s' },
    { x: 22, d: '0.45s' }, { x: 26, d: '0.6s' }, { x: 30, d: '0.3s' }, { x: 34, d: '0.1s' },
  ];
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {bars.map((b, i) => (
        <line
          key={i}
          x1={b.x} y1={20} x2={b.x} y2={20}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="svc-eq"
          style={{ animationDelay: b.d, ['--h' as any]: `${4 + (i % 3) * 5}` }}
        />
      ))}
    </svg>
  );
}

function GlyphFunnels({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path d="M6 8 H 34 L 24 22 V 34 H 16 V 22 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="20" cy="22" r="1.3" fill="currentColor" className="svc-drip" />
    </svg>
  );
}

function GlyphSites({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="5" y="9" width="30" height="22" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <line x1="5" y1="15" x2="35" y2="15" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9"  cy="12" r="0.8" fill="currentColor" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      <rect x="10" y="19" width="14" height="2" rx="0.5" fill="currentColor" className="svc-shimmer" />
      <rect x="10" y="23" width="8"  height="2" rx="0.5" fill="currentColor" className="svc-shimmer" style={{ animationDelay: '0.4s' }} />
    </svg>
  );
}

function GlyphApps({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="6"  y="9"  width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" opacity="0.45" className="svc-float" />
      <rect x="12" y="15" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <line x1="12" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function GlyphVisibility({ className }: GlyphProps) {
  const pts = [[6,30],[14,22],[20,26],[28,14],[34,18]];
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path d="M6 30 L 14 22 L 20 26 L 28 14 L 34 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.4" fill="currentColor" className="svc-rise" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
    </svg>
  );
}

const GLYPH_KEYFRAMES = `
  @keyframes svcBlink   { 0%,100%{opacity:.35} 50%{opacity:1} }
  @keyframes svcType    { 0%,60%,100%{opacity:.25} 30%{opacity:1} }
  @keyframes svcEq      { 0%,100%{transform:scaleY(.4)} 50%{transform:scaleY(1.6)} }
  @keyframes svcDrip    { 0%{transform:translateY(0);opacity:1} 70%{opacity:1} 100%{transform:translateY(11px);opacity:0} }
  @keyframes svcShimmer { 0%,100%{opacity:.3} 50%{opacity:.8} }
  @keyframes svcFloat   { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-1px,-1px)} }
  @keyframes svcRise    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
  .svc-blink   { animation: svcBlink 2.4s ease-in-out infinite; }
  .svc-type    { animation: svcType 1.6s ease-in-out infinite; }
  .svc-eq      { animation: svcEq 1.1s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
  .svc-drip    { animation: svcDrip 2.2s ease-in infinite; }
  .svc-shimmer { animation: svcShimmer 2.6s ease-in-out infinite; }
  .svc-float   { animation: svcFloat 3.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .svc-rise    { animation: svcRise 2.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  @media (prefers-reduced-motion: reduce) {
    .svc-blink,.svc-type,.svc-eq,.svc-drip,.svc-shimmer,.svc-float,.svc-rise { animation: none; }
  }
`;

/* ============================================================
   Service definitions — clear offering, included scope.
   ============================================================ */

type ServiceDef = {
  id: 'pipeline' | 'autopilot' | 'agent' | 'voice' | 'funnels' | 'sites' | 'apps' | 'visibility';
  num: string;
  Glyph: (p: GlyphProps) => JSX.Element;
  /** What's actually included — 3 short concrete deliverables in EN/ES */
  includes: { en: string[]; es: string[] };
};

const SERVICES: ServiceDef[] = [
  {
    id: 'pipeline',
    num: '01',
    Glyph: GlyphPipeline,
    includes: {
      en: ['GoHighLevel CRM setup', 'Stage architecture & routing', 'Team onboarding'],
      es: ['Setup CRM GoHighLevel', 'Arquitectura de stages', 'Onboarding del equipo'],
    },
  },
  {
    id: 'autopilot',
    num: '02',
    Glyph: GlyphAutopilot,
    includes: {
      en: ['Follow-up sequences', 'Lead routing & hand-offs', 'Daily ops reporting'],
      es: ['Secuencias de seguimiento', 'Routing y hand-offs', 'Reportes diarios'],
    },
  },
  {
    id: 'agent',
    num: '03',
    Glyph: GlyphAgent,
    includes: {
      en: ['On-site chat agent', 'Qualification logic', 'Calendar booking'],
      es: ['Agente de chat on-site', 'Lógica de calificación', 'Agendamiento'],
    },
  },
  {
    id: 'voice',
    num: '04',
    Glyph: GlyphVoice,
    includes: {
      en: ['Inbound voice AI', 'Outbound call-back agent', 'CRM logging'],
      es: ['Voz IA entrante', 'Agente de devolución', 'Logging en CRM'],
    },
  },
  {
    id: 'funnels',
    num: '05',
    Glyph: GlyphFunnels,
    includes: {
      en: ['Landing page design', 'Conversion copy', 'A/B test framework'],
      es: ['Diseño de landing', 'Copy de conversión', 'Framework de A/B'],
    },
  },
  {
    id: 'sites',
    num: '06',
    Glyph: GlyphSites,
    includes: {
      en: ['Custom design & build', 'CMS + content ops', 'Conversion architecture'],
      es: ['Diseño y build a medida', 'CMS + content ops', 'Arquitectura de conversión'],
    },
  },
  {
    id: 'apps',
    num: '07',
    Glyph: GlyphApps,
    includes: {
      en: ['Internal tools & portals', 'Customer dashboards', 'API integrations'],
      es: ['Herramientas internas', 'Dashboards de clientes', 'Integraciones API'],
    },
  },
  {
    id: 'visibility',
    num: '08',
    Glyph: GlyphVisibility,
    includes: {
      en: ['Technical SEO audit', 'Content production', 'Backlink strategy'],
      es: ['Auditoría SEO técnica', 'Producción de contenido', 'Estrategia de backlinks'],
    },
  },
];

export function Services() {
  const { t, lang } = useLang();

  return (
    <section id="services" className="relative py-20 md:py-28">
      <style>{GLYPH_KEYFRAMES}</style>
      <Container>
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow>{t('services.eyebrow')}</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 className="mt-6 max-w-2xl text-display font-display font-normal text-ink-50">
                {t('services.title1')}{' '}
                <span className="italic text-ember">{t('services.title2')}</span>
                {t('services.title3')}
              </h2>
            </Reveal>
          </div>
          <Reveal i={2}>
            <p className="max-w-sm text-ink-300">{t('services.sub')}</p>
          </Reveal>
        </div>

        {/* Uniform 2/4 grid — same size every card, no bento variance */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const { Glyph } = s;
            const name   = t(`services.items.${s.id}.name`);
            const kicker = t(`services.items.${s.id}.kicker`);
            const blurb  = t(`services.items.${s.id}.blurb`);
            const includes = s.includes[lang as 'en' | 'es'];

            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: EASE }}
                className="group relative flex h-full min-h-[20rem] flex-col bg-ink-900 transition-colors duration-500 hover:bg-ink-800/80"
              >
                <Link
                  href={`/services/${s.id}`}
                  className="flex h-full flex-col p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
                  aria-label={`${name}: ${blurb}`}
                >
                  {/* Top row: number + kicker */}
                  <div className="mb-8 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-ember">
                      {s.num}
                      <span className="mx-1 text-ink-700">/</span>
                      <span className="text-ink-500">08</span>
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-400">
                      {kicker}
                    </span>
                  </div>

                  {/* Glyph */}
                  <div className="mb-8 text-ember/85 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:text-ember">
                    <Glyph className="h-16 w-16 md:h-20 md:w-20" />
                  </div>

                  {/* Title + blurb */}
                  <h3 className="font-display text-3xl leading-[0.96] tracking-tighter text-ink-50">
                    {name}
                  </h3>
                  <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-ink-300">{blurb}</p>

                  {/* Included items */}
                  <div className="mt-auto pt-6">
                    <span aria-hidden className="block h-px w-8 bg-ember/35 transition-all duration-500 group-hover:w-16" />
                    <ul className="mt-4 space-y-1.5 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                      {includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[11px] text-ink-300">
                          <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-ember/70" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 transition-colors group-hover:text-ember">
                      {lang === 'en' ? 'Learn more' : 'Ver más'}
                      <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
