'use client';

import { motion, type Variants } from 'framer-motion';

const v: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Reveal({
  children,
  i = 0,
  as = 'div',
  className,
}: {
  children: React.ReactNode;
  i?: number;
  as?: 'div' | 'section' | 'span' | 'li' | 'h1' | 'h2' | 'p';
  className?: string;
}) {
  const Comp = motion[as] as any;
  return (
    <Comp
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      custom={i}
      className={className}
    >
      {children}
    </Comp>
  );
}
