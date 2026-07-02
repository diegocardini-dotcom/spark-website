'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import clsx from 'clsx';

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={clsx(
        'relative inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 backdrop-blur-sm',
        className,
      )}
      role="group"
      aria-label="Language selection"
    >
      {(['en', 'es'] as const).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            aria-label={l === 'en' ? 'English' : 'Español'}
            className={clsx(
              'relative z-10 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300',
              active ? 'text-ink-950' : 'text-ink-300 hover:text-ink-100',
            )}
          >
            {l}
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-ember"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
