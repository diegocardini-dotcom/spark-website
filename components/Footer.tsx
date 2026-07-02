'use client';

import { Container } from './ui/Container';
import { Logo } from './ui/Logo';
import { useLang } from '@/lib/LanguageContext';

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-white/10 py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Logo size={24} variant="full" glow={false} />
            <span className="hidden text-sm text-ink-400 md:inline">, {t('footer.tagline')}</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-300">
            <a href="/#services" className="hover:text-ink-50">{t('nav.services')}</a>
            <a href="/#work"     className="hover:text-ink-50">{t('nav.work')}</a>
            <a href="/#process"  className="hover:text-ink-50">{t('nav.process')}</a>
            <a href="/#contact"  className="hover:text-ink-50">{t('nav.contact')}</a>
          </nav>
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Spark. {t('footer.copyright')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
