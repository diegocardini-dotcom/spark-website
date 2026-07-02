'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Container } from './ui/Container';
import { LanguageToggle } from './ui/LanguageToggle';
import { Logo } from './ui/Logo';
import { useLang } from '@/lib/LanguageContext';

export function Nav() {
  const { t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Anchor links only resolve on the homepage. Anywhere else, prefix with "/". */
  const onHome = pathname === '/' || pathname === '/en' || pathname === '/es';
  const homePrefix = onHome ? '' : '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { href: `${homePrefix}#services`, label: t('nav.services'), idx: '01' },
    { href: `${homePrefix}#work`,     label: t('nav.work'),     idx: '02' },
    { href: `${homePrefix}#process`,  label: t('nav.process'),  idx: '03' },
    { href: `${homePrefix}#contact`,  label: t('nav.contact'),  idx: '04' },
  ];

  const homeHref = onHome ? '#top' : '/';
  const ctaHref  = `${homePrefix}#contact`;

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Link
          href={homeHref}
          aria-label="Spark — home"
          className="group flex items-center"
          onClick={() => setOpen(false)}
        >
          <Logo size={24} variant="compact" glow={false} />
        </Link>

        {/* Desktop nav — numbered, refined hover with sliding spark */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-ink-300 transition-colors duration-300 hover:text-ink-50"
            >
              <span className="font-mono text-[9px] text-ink-500 transition-colors duration-300 group-hover:text-ember">
                {l.idx}
              </span>
              <span>{l.label}</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-ember via-ember-soft to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />

          {/* CTA — refined gold button with shimmer + spark dot */}
          <Link
            href={ctaHref}
            className="group relative hidden items-center gap-2.5 overflow-hidden rounded-full bg-ember pl-4 pr-4 py-2 text-sm font-medium text-ink-950 transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(248,211,71,0.7)] md:inline-flex"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-pulseDot rounded-full bg-ink-950" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-ink-950" />
            </span>
            <span className="relative z-10">{t('nav.cta')}</span>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full"
            />
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md transition-colors hover:border-white/25 md:hidden"
          >
            <span
              className={clsx(
                'block h-px w-4 bg-ink-100 transition-all duration-300',
                open ? 'translate-y-[3px] rotate-45' : '-translate-y-1',
              )}
            />
            <span
              className={clsx(
                'absolute block h-px w-4 bg-ink-100 transition-all duration-300',
                open ? 'translate-y-0 -rotate-45' : 'translate-y-1',
              )}
            />
          </button>
        </div>
      </Container>

      {/* Mobile sheet — full-page, editorial */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-40 bg-ink-950/95 backdrop-blur-2xl md:hidden"
          >
            <Container className="flex h-full flex-col pt-8 pb-12">
              <nav className="flex flex-col">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-baseline justify-between border-b border-white/[0.06] py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-ember">{l.idx}</span>
                      <span className="font-display text-4xl tracking-tighter text-ink-50">
                        {l.label}
                      </span>
                    </span>
                    <svg className="h-4 w-4 -translate-x-1 text-ink-400 transition-all duration-500 group-hover:translate-x-0 group-hover:text-ember" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + links.length * 0.06, duration: 0.5 }}
                className="mt-auto flex flex-col gap-4 pt-10"
              >
                <Link
                  href={ctaHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-4 text-sm font-medium text-ink-950"
                >
                  {t('nav.cta')}
                  <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-ink-500">
                  hello@spark.agency
                </p>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
