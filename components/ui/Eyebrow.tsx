import clsx from 'clsx';

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        'flex items-center text-eyebrow uppercase text-ink-300 font-medium',
        className,
      )}
    >
      <span className="spark-line" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
