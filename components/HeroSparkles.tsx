'use client';

/**
 * HeroSparkles — drifting gold sparkles over a B&W photographic backdrop.
 *
 * Particles rise slowly with gentle horizontal sway, twinkle (scale + opacity),
 * and a few render as 4-point spark glints rather than dots — on-brand "sparks
 * flying". Single canvas, rAF, pauses off-tab, calm static field on reduced-motion.
 */

import { useEffect, useRef } from 'react';

const GOLD = '248,211,71';

export function HeroSparkles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    type S = {
      x: number; y: number; r: number; vy: number; sway: number; swaySpeed: number;
      phase: number; twinkle: number; star: boolean; baseAlpha: number;
    };
    const COUNT = Math.min(70, Math.floor((w * h) / 16000));
    const mk = (initial = false): S => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 20,
      r: 0.8 + Math.random() * 2.2,
      vy: 0.15 + Math.random() * 0.5,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.005 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.012 + Math.random() * 0.02,
      star: Math.random() < 0.22,
      baseAlpha: 0.3 + Math.random() * 0.5,
    });
    const sparks: S[] = Array.from({ length: COUNT }, () => mk(true));

    const drawStar = (x: number, y: number, r: number, a: number) => {
      // 4-point glint
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(${GOLD},${a})`;
      ctx.shadowColor = `rgba(${GOLD},${a})`;
      ctx.shadowBlur = r * 4;
      ctx.beginPath();
      const long = r * 2.4, thin = r * 0.5;
      ctx.moveTo(0, -long); ctx.quadraticCurveTo(thin, -thin, long, 0);
      ctx.quadraticCurveTo(thin, thin, 0, long);
      ctx.quadraticCurveTo(-thin, thin, -long, 0);
      ctx.quadraticCurveTo(-thin, -thin, 0, -long);
      ctx.fill();
      ctx.restore();
    };

    let raf = 0, running = true;
    const onVis = () => { running = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.y -= s.vy;
        s.sway += s.swaySpeed;
        s.phase += s.twinkle;
        const x = s.x + Math.sin(s.sway) * 14;
        const tw = 0.45 + 0.55 * (Math.sin(s.phase) * 0.5 + 0.5);
        const a = s.baseAlpha * tw;

        if (s.y < -20) { sparks[i] = mk(false); continue; }

        if (s.star) {
          drawStar(x, s.y, s.r, a);
        } else {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${GOLD},${a})`;
          ctx.shadowColor = `rgba(${GOLD},${a})`;
          ctx.shadowBlur = s.r * 3;
          ctx.arc(x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
    };

    if (reduce) {
      step();
    } else {
      const loop = () => {
        if (running) step();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
