'use client';

/**
 * HeroFlowField — premium abstract: a curl-noise flow field with light trails.
 *
 * Hundreds of particles drift along an invisible flowing vector field, leaving
 * fading gold trails that accumulate into streams of light — like ink in water.
 * A handful of brighter "lead" particles glow stronger. Mouse adds parallax.
 *
 * Single canvas, one rAF loop, GPU-light. Pauses off-tab. Reduced-motion → a
 * quiet static field.
 */

import { useEffect, useRef } from 'react';

const GOLD = '248,211,71';

export function HeroFlowField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
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
      ctx.fillStyle = '#070708';
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    // mouse parallax
    let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      tmx = (e.clientX - rect.left) / rect.width;
      tmy = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('mousemove', onMove);

    // Pseudo-curl noise via layered trig — cheap, smooth, flowing.
    const SCALE = 0.0016;
    const field = (x: number, y: number, t: number) => {
      const n =
        Math.sin(x * SCALE * 1.7 + t * 0.6) * Math.cos(y * SCALE * 1.3 - t * 0.4) +
        Math.sin((x + y) * SCALE * 0.9 + t * 0.5) * 0.7 +
        Math.cos(x * SCALE * 0.5 - y * SCALE * 1.1 + t * 0.3) * 0.5;
      return n * Math.PI * 1.5; // angle
    };

    const COUNT = Math.min(420, Math.floor((w * h) / 2600));
    type P = { x: number; y: number; vx: number; vy: number; lead: boolean; life: number };
    const reset = (p: P) => {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      p.vx = 0; p.vy = 0;
      p.life = 60 + Math.random() * 200;
    };
    const particles: P[] = Array.from({ length: COUNT }, () => {
      const p: P = { x: 0, y: 0, vx: 0, vy: 0, lead: Math.random() < 0.08, life: 0 };
      reset(p);
      return p;
    });

    let t = 0;
    let raf = 0;
    let running = true;
    const onVis = () => { running = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const step = () => {
      t += 0.0024;
      // mouse easing
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;
      const ppx = (mx - 0.5) * 26;
      const ppy = (my - 0.5) * 26;

      // Stronger fade so trails stay short + gold, no gray web accumulation
      ctx.fillStyle = 'rgba(7,7,8,0.22)';
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        const a = field(p.x, p.y, t);
        p.vx += Math.cos(a) * 0.10;
        p.vy += Math.sin(a) * 0.10;
        p.vx *= 0.92; p.vy *= 0.92;
        p.x += p.vx; p.y += p.vy;
        p.life -= 1;

        if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20 || p.life <= 0) {
          reset(p);
          continue;
        }

        const dx = p.x + ppx * (p.lead ? 1.5 : 1);
        const dy = p.y + ppy * (p.lead ? 1.5 : 1);

        if (p.lead) {
          ctx.fillStyle = `rgba(${GOLD},0.9)`;
          ctx.shadowColor = `rgba(${GOLD},0.9)`;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(dx, dy, 1.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${GOLD},0.32)`;
          ctx.shadowBlur = 0;
          ctx.fillRect(dx, dy, 1.1, 1.1);
        }
      }
      ctx.shadowBlur = 0;
    };

    if (reduce) {
      // a few static frames to lay down a quiet field, then stop
      for (let i = 0; i < 40; i++) step();
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
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
