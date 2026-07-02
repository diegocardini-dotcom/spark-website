'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { tr, type Lang } from './i18n';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // Hydrate from localStorage + browser locale on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined'
      ? (localStorage.getItem('spark-lang') as Lang | null)
      : null;
    if (stored === 'en' || stored === 'es') {
      setLangState(stored);
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es')) {
      setLangState('es');
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('spark-lang', l);
    if (typeof document !== 'undefined') document.documentElement.lang = l;
  };

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: (path) => tr(lang, path) }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
