'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from './ui/Container';
import { Magnetic } from './ui/Magnetic';
import { useLang } from '@/lib/LanguageContext';

export function LightUp() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* radial warmth */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(248,211,71,0.12), transparent 70%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />

      {/* floating sparks */}
      {[
        { x: '15%', y: '30%', d: 0,   s: 1 },
        { x: '80%', y: '25%', d: 1.2, s: 0.6 },
        { x: '70%', y: '70%', d: 2.4, s: 0.8 },
        { x: '20%', y: '75%', d: 0.6, s: 0.5 },
      ].map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 3, delay: p.d, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute rounded-full bg-ember"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.s * 6}px`,
            height: `${p.s * 6}px`,
            boxShadow: `0 0 ${p.s * 30}px ${p.s * 6}px rgba(248,211,71,0.5)`,
          }}
        />
      ))}

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember"
          >
            ✦ {t('lightUp.eyebrow')}
          </motion.p>

          <h2 className="mt-6 font-display text-display-xl font-normal leading-[0.95] text-ink-50">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {t('lightUp.title1')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-ember"
            >
              {t('lightUp.title2')}.
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink-200 md:text-lg"
          >
            {t('lightUp.sub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-10 flex justify-center"
          >
            <Magnetic strength={0.3}>
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ember px-8 py-5 text-base font-medium text-ink-950 transition-all duration-300 hover:shadow-[0_0_80px_-10px_rgba(248,211,71,0.9)]"
              >
                <span className="relative z-10">{t('lightUp.cta')}</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
