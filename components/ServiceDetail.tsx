'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { useLang } from '@/lib/LanguageContext';
import { SERVICES_DETAIL, type ServiceDetail as SD } from '@/lib/servicesData';

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServiceDetail({ service }: { service: SD }) {
  const { t, lang } = useLang();
  const L = (b: { en: string; es: string }) => b[lang];

  const others = SERVICES_DETAIL.filter((s) => s.slug !== service.slug);
  const nextIdx = SERVICES_DETAIL.findIndex((s) => s.slug === service.slug) + 1;
  const next = SERVICES_DETAIL[nextIdx % SERVICES_DETAIL.length];

  return (
    <article>
      {/* ─── HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 pt-28 md:pt-36">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_50%_-10%,rgba(248,211,71,0.14),transparent_60%)]" />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>

        <Container className="relative z-10 pb-20 md:pb-24">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-10"
          >
            <Link
              href="/#services"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-300 transition-colors hover:text-ember"
            >
              <svg className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1m5-5L1 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {lang === 'en' ? 'All services' : 'Todos los servicios'}
            </Link>
          </motion.div>

          {/* Number + kicker */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.24em] text-ember">
              {service.num}<span className="mx-1 text-ink-700">/</span><span className="text-ink-500">08</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-400">
              {L(service.kicker)}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-8 font-display text-display-xl font-normal leading-[0.95] text-ink-50"
          >
            {L(service.name)}
          </motion.h1>

          {/* Lead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-8 max-w-3xl text-xl leading-snug text-ink-100 md:text-3xl"
          >
            {L(service.lead)}
          </motion.p>

          {/* Intro paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-ink-300 md:text-lg"
          >
            {L(service.intro)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-ink-950 transition-all hover:shadow-[0_0_50px_-8px_rgba(248,211,71,0.7)]"
            >
              {lang === 'en' ? 'Start a conversation' : 'Empezá una conversación'}
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-ink-100 transition-all hover:border-white/40 hover:bg-white/5"
            >
              {lang === 'en' ? 'See our work' : 'Ver proyectos'}
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ─── WHAT'S INCLUDED ─────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-ink-900 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
                {lang === 'en' ? "What's included" : 'Qué incluye'}
              </p>
              <span className="mt-3 block h-px w-12 bg-ember/40" />
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tighter text-ink-50 md:text-5xl">
                {lang === 'en' ? 'Every deliverable, named.' : 'Cada entregable, nombrado.'}
              </h2>
              <p className="mt-4 text-ink-300">
                {lang === 'en'
                  ? 'No mystery scope. You know exactly what lands in your business.'
                  : 'Sin alcance misterioso. Sabés exactamente qué llega a tu negocio.'}
              </p>
            </div>
            <ul className="md:col-span-8">
              {service.includes[lang as 'en' | 'es'].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="group flex items-start gap-4 border-t border-white/[0.06] py-5 first:border-t-0"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-ember/70 transition-all group-hover:bg-ember group-hover:shadow-[0_0_12px_rgba(248,211,71,0.6)]"
                  />
                  <p className="text-lg leading-relaxed text-ink-100 md:text-xl">{item}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ─── HOW WE DELIVER (PROCESS) ────────────────────── */}
      <section className="border-t border-white/[0.06] bg-ink-950 py-20 md:py-28">
        <Container>
          <div className="mb-14 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
              {lang === 'en' ? 'How we deliver' : 'Cómo lo entregamos' }
            </p>
            <span className="mt-3 block h-px w-12 bg-ember/40" />
            <h2 className="mt-6 font-display text-4xl leading-tight tracking-tighter text-ink-50 md:text-5xl">
              {lang === 'en' ? 'A predictable path.' : 'Un camino predecible.'}
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="group relative bg-ink-900 p-7 transition-colors hover:bg-ink-800/80"
              >
                <span className="font-mono text-[10px] tracking-[0.24em] text-ember">
                  {String(i + 1).padStart(2, '0')}
                  <span className="mx-1 text-ink-700">/</span>
                  <span className="text-ink-500">{String(service.process.length).padStart(2, '0')}</span>
                </span>
                <h3 className="mt-5 font-display text-2xl tracking-tighter text-ink-50">
                  {L(step.title)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">{L(step.body)}</p>
              </motion.li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ─── OUTCOMES + GOOD FOR ─────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-ink-900 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            {/* Outcomes */}
            <div className="md:col-span-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
                {lang === 'en' ? 'What changes' : 'Qué cambia'}
              </p>
              <span className="mt-3 block h-px w-12 bg-ember/40" />
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tighter text-ink-50 md:text-5xl">
                {lang === 'en' ? 'Concrete outcomes.' : 'Resultados concretos.'}
              </h2>
              <ul className="mt-10 space-y-6">
                {service.outcomes.map((o, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-2 h-px w-6 bg-ember/60" aria-hidden />
                    <p className="text-lg leading-relaxed text-ink-100 md:text-xl">{L(o)}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Good for */}
            <div className="md:col-span-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
                {lang === 'en' ? "Who it's for" : 'Para quién'}
              </p>
              <span className="mt-3 block h-px w-12 bg-ember/40" />
              <p className="mt-6 text-xl leading-relaxed text-ink-100 md:text-2xl">
                {L(service.goodFor)}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      {service.faq.length > 0 && (
        <section className="border-t border-white/[0.06] bg-ink-950 py-20 md:py-28">
          <Container>
            <div className="mb-12 max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
                {lang === 'en' ? 'Common questions' : 'Preguntas frecuentes'}
              </p>
              <span className="mt-3 block h-px w-12 bg-ember/40" />
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tighter text-ink-50 md:text-5xl">
                FAQ
              </h2>
            </div>
            <div className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {service.faq.map((f, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group py-6"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                    <span className="text-lg font-medium text-ink-50 md:text-xl">{L(f.q)}</span>
                    <span className="mt-1 shrink-0 font-mono text-ember transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-ink-300">{L(f.a)}</p>
                </motion.details>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ─── CTA + NEXT SERVICE ──────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-ink-900 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 items-end gap-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2 className="font-display text-4xl leading-tight tracking-tighter text-ink-50 md:text-6xl">
                {lang === 'en' ? 'Ready to build?' : '¿Listo para construirlo?'}
              </h2>
              <p className="mt-4 max-w-xl text-ink-300">
                {lang === 'en'
                  ? 'A 30-minute call. We map your setup live and show you exactly where this service would move the number first.'
                  : 'Una llamada de 30 minutos. Mapeamos tu setup en vivo y te mostramos exactamente dónde este servicio movería el número primero.'}
              </p>
              <Link
                href="/#contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-ink-950 transition-all hover:shadow-[0_0_50px_-8px_rgba(248,211,71,0.7)]"
              >
                {lang === 'en' ? 'Book a call' : 'Agendá una llamada'}
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Next service */}
            <Link href={`/services/${next.slug}`} className="group md:col-span-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
                {lang === 'en' ? 'Next service' : 'Siguiente servicio'} →
              </p>
              <p className="mt-3 font-display text-3xl leading-tight tracking-tighter text-ink-50 transition-colors duration-500 group-hover:text-ember md:text-4xl">
                {L(next.name)}
              </p>
              <p className="mt-2 text-sm text-ink-400">{L(next.kicker)}</p>
            </Link>
          </div>

          {/* All-services strip */}
          <div className="mt-16 flex flex-wrap gap-2 border-t border-white/[0.06] pt-8">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-300 transition-colors hover:border-ember/40 hover:text-ember"
              >
                {L(s.name)}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
