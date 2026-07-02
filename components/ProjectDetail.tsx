'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { useLang } from '@/lib/LanguageContext';
import type { FallbackProject } from '@/lib/fallbackData';

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectDetail({
  project,
  next,
}: {
  project: FallbackProject;
  next: FallbackProject;
}) {
  const { t, lang } = useLang();
  const L = (b: { en: string; es: string } | undefined) => (b ? b[lang] : '');

  // Gallery shouldn't repeat the framed hero mockup
  const galleryImages = (project.gallery ?? []).filter((src) => src !== project.heroImage);

  return (
    <article>
      {/* ─── HERO — gradient backdrop + the real project mockup, framed ──── */}
      <section className="relative overflow-hidden bg-ink-950 pt-28 md:pt-36">
        {/* Clean gradient backdrop — no stock photo, so it never mismatches */}
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_at_50%_-10%,rgba(248,211,71,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>

        <Container className="relative z-10 pb-16 md:pb-24">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-10"
          >
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-300 transition-colors hover:text-ember"
            >
              <svg className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1m5-5L1 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('work.detail.back')}
            </Link>
          </motion.div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {[
              { k: t('work.detail.client'),   v: project.client },
              { k: t('work.detail.year'),     v: project.year ? String(project.year) : '—' },
              {
                k: t('work.detail.services'),
                v: project.services.map((s) => t(`work.filters.${s}`)).join(' · '),
              },
            ].map((m) => (
              <motion.div
                key={m.k}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-ember">{m.k}</p>
                <p className="mt-2 text-sm text-ink-100 md:text-base">{m.v}</p>
              </motion.div>
            ))}
          </div>

          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="mt-16 max-w-4xl"
          >
            <h1 className="font-display text-display-xl font-normal text-ink-50">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200 md:text-xl">
              {L(project.summary)}
            </p>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ember transition-colors hover:text-ember-soft"
              >
                {t('work.detail.external')}
              </a>
            )}
          </motion.div>

          {/* Framed hero mockup — the real project, presented cleanly */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
            className="mt-16 md:mt-20"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-ink-800/80 to-ink-900 p-6 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(248,211,71,0.10),transparent_60%)]" />
              <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl">
                <Image
                  src={project.heroImage}
                  alt={`${project.title} — ${project.client}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ─── CHALLENGE / APPROACH / OUTCOME ─────────── */}
      <section className="border-t border-white/[0.06] bg-ink-900 py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-20 md:gap-28">
            {project.challenge && (
              <Block eyebrow={t('work.detail.challenge')} body={L(project.challenge)} />
            )}
            {project.approach && (
              <Block eyebrow={t('work.detail.approach')} body={L(project.approach)} />
            )}
            {project.outcome && (
              <Block eyebrow={t('work.detail.outcome')} body={L(project.outcome)} />
            )}

            {/* Project facts — partners, platforms, scope */}
            {project.facts && project.facts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="grid grid-cols-1 gap-8 border-t border-white/[0.06] pt-12 md:grid-cols-3"
              >
                {project.facts.map((m) => (
                  <div key={m.value}>
                    <p className="font-display text-5xl tracking-tighter text-ember md:text-6xl">
                      {m.value}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-ink-300 md:text-sm">
                      {L(m.label)}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </Container>
      </section>

      {/* ─── GALLERY — full-color, the actual work ────── */}
      {galleryImages.length > 0 && (
        <section className="border-t border-white/[0.06] bg-ink-950 py-20 md:py-28">
          <Container>
            <div className="mb-14 flex items-baseline justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
                {t('work.detail.gallery')}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                {galleryImages.length} {galleryImages.length === 1 ? 'asset' : 'assets'}
              </p>
            </div>

            <div className="flex flex-col gap-10 md:gap-16">
              {galleryImages.map((src, i) => (
                <motion.figure
                  key={src}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-ink-800 to-ink-900"
                >
                  <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 1100px"
                      className="object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                      unoptimized
                    />
                  </div>
                  <figcaption className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.24em] text-ink-400">
                    {String(i + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ─── NEXT PROJECT ───────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-ink-900 py-20 md:py-28">
        <Container>
          <Link
            href={`/work/${next.slug}`}
            className="group block"
            aria-label={`${t('work.detail.next')}: ${next.title}`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
              {t('work.detail.next')} →
            </p>
            <div className="mt-6 grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-7">
                <h2 className="font-display text-5xl tracking-tighter text-ink-50 transition-colors duration-500 group-hover:text-ember md:text-7xl">
                  {next.title}
                </h2>
                <p className="mt-4 text-ink-300">{next.client}</p>
              </div>
              <div className="md:col-span-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-ink-800/80 to-ink-900 p-5">
                  <Image
                    src={next.heroImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </section>
    </article>
  );
}

function Block({ eyebrow, body }: { eyebrow: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12"
    >
      <div className="md:col-span-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">{eyebrow}</p>
        <span className="mt-3 block h-px w-12 bg-ember/40" />
      </div>
      <div className="md:col-span-8">
        <p className="text-xl leading-relaxed text-ink-100 md:text-2xl">{body}</p>
      </div>
    </motion.div>
  );
}
