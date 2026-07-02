'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import clsx from 'clsx';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal } from './ui/Reveal';
import { urlFor, type Project } from '@/lib/sanity';
import { FALLBACK_PROJECTS, type FallbackProject } from '@/lib/fallbackData';
import { useLang } from '@/lib/LanguageContext';

const FILTER_KEYS = ['all', 'sites', 'funnels', 'apps', 'autopilot', 'visibility', 'agent', 'voice', 'pipeline'] as const;

type AnyProject =
  | (Project & { __source: 'sanity' })
  | (FallbackProject & { __source: 'fallback' });

export function Work({ projects }: { projects: Project[] }) {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<string>('all');

  const merged: AnyProject[] = useMemo(() => {
    if (projects.length > 0) {
      return projects.map((p) => ({ ...p, __source: 'sanity' as const }));
    }
    return FALLBACK_PROJECTS.map((p) => ({ ...p, __source: 'fallback' as const }));
  }, [projects]);

  const filtered = useMemo(
    () => (filter === 'all' ? merged : merged.filter((p) => p.services?.includes(filter))),
    [filter, merged],
  );

  return (
    <section id="work" className="relative py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow>{t('work.eyebrow')}</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 className="mt-6 max-w-2xl text-display font-display font-normal text-ink-50">
                {t('work.title1')}{' '}
                <span className="italic text-ember">{t('work.title2')}</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal i={2}>
            <p className="max-w-sm text-ink-300">{t('work.sub')}</p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {FILTER_KEYS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  'rounded-full border px-4 py-1.5 text-sm transition-all duration-300',
                  active
                    ? 'border-ember bg-ember text-ink-950 shadow-[0_0_30px_-6px_rgba(248,211,71,0.6)]'
                    : 'border-white/15 text-ink-200 hover:border-white/40 hover:text-ink-50',
                )}
              >
                {t(`work.filters.${f}`)}
              </button>
            );
          })}
        </div>

        <LayoutGroup>
          <motion.ul layout className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.li
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="col-span-full rounded-2xl border border-dashed border-white/15 p-12 text-center text-ink-300"
                >
                  {t('work.empty')} <span className="text-ink-50">{t(`work.filters.${filter}`)}</span>.
                </motion.li>
              ) : (
                filtered.map((p, i) => {
                  const cover = p.__source === 'sanity'
                    ? urlFor(p.cover).width(900).height(675).quality(85).url()
                    : p.coverUrl;

                  const summary = p.__source === 'sanity'
                    ? p.summary
                    : (typeof p.summary === 'string' ? p.summary : p.summary[lang]);

                  return (
                    <motion.li
                      layout
                      key={p._id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.55, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/40 transition-all duration-500 hover:-translate-y-1 hover:border-ember/30 hover:shadow-[0_30px_60px_-30px_rgba(248,211,71,0.4)]"
                    >
                      <Link
                        href={`/work/${p.__source === 'sanity' ? p.slug.current : p.slug}`}
                        className="block"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-ink-700">
                          <Image
                            src={cover}
                            alt={p.title}
                            fill
                            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            unoptimized={p.__source === 'fallback'}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ember/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                          <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/70 backdrop-blur-sm transition-all duration-300 group-hover:bg-ember">
                            <svg className="h-3.5 w-3.5 text-ink-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ink-950" viewBox="0 0 14 14" fill="none">
                              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono uppercase tracking-[0.16em] text-ember">
                              {p.client}
                            </span>
                            {p.year && <span className="font-mono text-ink-400">{p.year}</span>}
                          </div>
                          <h3 className="mt-3 font-display text-2xl tracking-tighter text-ink-50">
                            {p.title}
                          </h3>
                          <p className="mt-2 text-sm text-ink-300">{summary}</p>
                          {p.services?.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {p.services.map((s) => (
                                <span
                                  key={s}
                                  className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-300"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.li>
                  );
                })
              )}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </Container>
    </section>
  );
}
