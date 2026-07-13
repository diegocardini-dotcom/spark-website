'use client';

import Image from 'next/image';
import { Container } from './ui/Container';
import { CountUp } from './ui/CountUp';
import { useLang } from '@/lib/LanguageContext';

/* Real client logos — knocked out from their white backgrounds and tinted to
   uniform light monochrome (processed into /public/clients). They read as
   premium grayscale on the dark canvas; brighten on hover. */
const CLIENTS = [
  { name: 'Leo Burnett',  src: '/clients/leoburnett.png', w: 150 },
  { name: 'Global Mind',  src: '/clients/globalmind.png', w: 140 },
  { name: 'Vamos BA',     src: '/clients/vamosba.png',    w: 70  },
  { name: 'J. Walter Thompson', src: '/clients/jwt.png',  w: 170 },
  { name: 'Mataojo',      src: '/clients/mataojo.png',    w: 140 },
  { name: 'Garbarino',    src: '/clients/garbarino.png',  w: 150 },
  { name: 'Arcor',        src: '/clients/arcor.png',      w: 80  },
  { name: 'Selailú',      src: '/clients/selailu.png',    w: 150 },
];

export function Clients() {
  const { t } = useLang();

  const metrics = [
    { v: 50,  suffix: '+',                          label: t('metrics.label1') },
    { v: 200, suffix: '+',                         label: t('metrics.label2') },
    { v: 8,   suffix: ' ' + t('metrics.suffix3'),   label: t('metrics.label3') },
    { v: 100, suffix: '%',                          label: t('metrics.label4') },
  ];

  return (
    <section className="relative border-y border-white/10 bg-ink-950 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(248,211,71,0.5), transparent)' }}
      />

      <Container>
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-12">
          {metrics.map((m) => (
            <div key={m.label} className="group">
              <p className="font-display text-5xl tracking-tighter text-ember md:text-6xl">
                <CountUp to={m.v} suffix={m.suffix} />
              </p>
              <p className="mt-3 max-w-[12rem] text-xs uppercase tracking-[0.18em] text-ink-300 md:text-sm">
                {m.label}
              </p>
              <span className="mt-4 block h-px w-12 origin-left scale-x-50 bg-gradient-to-r from-ember/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        <div className="mt-20 hairline" />

        {/* Clients */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
              {t('metrics.selectedClients')}
            </p>
            <h3 className="mt-4 font-display text-2xl leading-tight tracking-tighter text-ink-50 md:text-3xl">
              {t('metrics.clientsTagline')}
            </h3>
          </div>

          <div className="md:col-span-9">
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />

              <div className="flex items-center gap-16 whitespace-nowrap [animation:scroll_18s_linear_infinite] hover:[animation-play-state:paused] md:gap-24 md:[animation-duration:30s]">
                {[...CLIENTS, ...CLIENTS].map((logo, i) => (
                  <div
                    key={`${logo.name}-${i}`}
                    title={logo.name}
                    className="group relative flex h-10 flex-none items-center justify-center opacity-55 transition-opacity duration-500 hover:opacity-100 md:h-12"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.w}
                      height={48}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
