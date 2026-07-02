'use client';

import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal } from './ui/Reveal';
import { useLang } from '@/lib/LanguageContext';

const STEPS = ['s1', 's2', 's3', 's4'] as const;

export function Process() {
  const { t } = useLang();

  return (
    <section id="process" className="relative py-20 md:py-28">
      <Container>
        <Reveal>
          <Eyebrow>{t('process.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mt-6 max-w-3xl text-display font-display font-normal text-ink-50">
            {t('process.title1')}{' '}
            <span className="italic text-ember">{t('process.title2')}</span>.
          </h2>
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-12 hidden h-px w-full origin-left bg-gradient-to-r from-ember via-ember/40 to-transparent md:block"
          />

          <div className="grid gap-12 md:grid-cols-4 md:gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative"
              >
                <div className="relative mb-8 hidden h-6 md:block">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2">
                    <span className="relative inline-block h-3 w-3 rounded-full bg-ember shadow-[0_0_16px_4px_rgba(248,211,71,0.5)]" />
                  </span>
                </div>

                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                  {`0${i + 1}`}
                </span>
                <h3 className="mt-3 font-display text-3xl tracking-tighter text-ink-50">
                  {t(`process.steps.${s}.title`)}
                </h3>
                <p className="mt-3 text-sm text-ink-300">{t(`process.steps.${s}.body`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
