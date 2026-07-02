'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal } from './ui/Reveal';
import { useLang } from '@/lib/LanguageContext';

export function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr,1.1fr]">
          <div>
            <Reveal>
              <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 className="mt-6 text-display font-display font-normal text-ink-50">
                {t('contact.title')}
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="mt-6 max-w-md text-ink-300">{t('contact.sub')}</p>
            </Reveal>

            <Reveal i={3}>
              <div className="mt-10 space-y-4">
                <a
                  href="https://cal.com/spark/intro"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-ink-100 transition-all hover:border-ember/50 hover:bg-ember/5"
                >
                  {t('contact.bookCta')}
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <p className="text-sm text-ink-400">
                  {t('contact.emailLabel')}{' '}
                  <a
                    href="mailto:hello@sparkdigital.agency"
                    className="text-ink-100 underline underline-offset-4 hover:text-ember"
                  >
                    hello@sparkdigital.agency
                  </a>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal i={2}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/10 bg-ink-800/40 p-6 backdrop-blur-sm md:p-10"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label={t('contact.form.name')}    name="name"    required />
                <Field label={t('contact.form.company')} name="company" />
                <Field label={t('contact.form.email')}   name="email"   type="email" required />
                <Field label={t('contact.form.revenue')} name="revenue" placeholder={t('contact.form.revenuePh')} />
              </div>
              <div className="mt-5">
                <Field label={t('contact.form.message')} name="message" textarea required />
              </div>

              <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-xs text-ink-400">{t('contact.form.reply')}</p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-medium text-ink-950 transition-all hover:bg-ember-soft hover:shadow-[0_0_40px_-8px_rgba(248,211,71,0.6)] disabled:opacity-60"
                >
                  {status === 'sending'
                    ? t('contact.form.sending')
                    : status === 'sent'
                      ? t('contact.form.sent')
                      : t('contact.form.submit')}
                </button>
              </div>

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-xs text-red-400"
                >
                  {t('contact.form.error')}
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label, name, type = 'text', required, placeholder, textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}) {
  const base =
    'w-full rounded-lg border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-400 transition-colors focus:border-ember focus:outline-none';
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-300">
        {label}
        {required && <span className="ml-1 text-ember">*</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={5} className={base + ' resize-none'} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={base} />
      )}
    </label>
  );
}
