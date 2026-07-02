'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from './ui/Container';
import { Magnetic } from './ui/Magnetic';
import { HeroFlowField } from './HeroFlowField';
import { HeroSparkles } from './HeroSparkles';
import { useLang } from '@/lib/LanguageContext';

const HERO_CLIENTS = ['Leo Burnett', 'JWT', 'Global Mind', 'Mataojo'];

/* ──────────────────────────────────────────────────────────────
   HERO BACKDROP — pick the variant here:
     'flow'           — impressive abstract flow-field of light (default)
     'sparkles'       — B&W MacBook photo + flying gold sparkles
     'sparkles-earth' — B&W Earth-at-night photo + flying gold sparkles
   Preview them live at /hero-lab.
   ────────────────────────────────────────────────────────────── */
export type HeroVariant = 'flow' | 'sparkles' | 'sparkles-earth';
const HERO_VARIANT: HeroVariant = 'flow';

const IMG_MACBOOK =
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2400&q=85';
const IMG_EARTH =
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85';

export function HeroBackdrop({ variant }: { variant: HeroVariant }) {
  if (variant === 'flow') {
    return (
      <div className="absolute inset-0 z-0" aria-hidden>
        <HeroFlowField className="h-full w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_35%,rgba(7,7,8,0.55)_92%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-ink-950 to-transparent" />
      </div>
    );
  }

  const src = variant === 'sparkles' ? IMG_MACBOOK : IMG_EARTH;
  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.38] [filter:grayscale(1)_contrast(1.05)]"
      />
      {/* flying sparkles over the photo */}
      <HeroSparkles className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_30%,rgba(7,7,8,0.65)_88%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}

export function Hero({ variant = HERO_VARIANT }: { variant?: HeroVariant }) {
  const { t, lang } = useLang();

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink-950 pt-32 md:pt-40">
      <HeroBackdrop variant={variant} />

      <Container className="relative z-10">
        <h1 key={`h1-${lang}`} className="max-w-5xl font-display text-display-xl font-normal text-ink-50">
          <motion.span
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {t('hero.title1')}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative block italic text-ember"
          >
            {t('hero.title2')}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-2 left-0 right-[10%] h-[2px] origin-left bg-gradient-to-r from-ember via-ember-soft to-transparent"
            />
          </motion.span>
        </h1>

        <motion.p
          key={`sub-${lang}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-12 max-w-xl text-lg leading-relaxed text-ink-200 md:text-xl"
        >
          {t('hero.sub')}{' '}
          <span className="text-ink-50">{t('hero.subBold')}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.25}>
            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ember px-6 py-4 text-sm font-medium text-ink-950 transition-all duration-300 hover:shadow-[0_0_60px_-8px_rgba(248,211,71,0.7)] md:px-7"
            >
              <span className="relative z-10">{t('hero.ctaPrimary')}</span>
              <svg className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-ink-100 transition-all hover:border-white/40 hover:bg-white/5 md:px-7"
            >
              {t('hero.ctaSecondary')}
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-24 md:mt-32"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-400">
            {t('hero.trustedBy')}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-12">
            {HERO_CLIENTS.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.08, duration: 0.5 }}
                className="font-display text-xl tracking-tighter text-ink-200 md:text-3xl"
              >
                {c}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
