import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  href: string;
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
  className?: string;
};

export function Button({ href, variant = 'primary', children, className }: Props) {
  const base =
    'group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300';
  const variants = {
    primary:
      'bg-ember text-ink-950 hover:bg-ember-soft hover:shadow-[0_0_40px_-8px_rgba(248,211,71,0.6)]',
    ghost:
      'border border-white/15 text-ink-100 hover:border-white/40 hover:bg-white/5',
  };
  return (
    <Link href={href} className={clsx(base, variants[variant], className)}>
      {children}
      <svg
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
      >
        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
