'use client';

/**
 * HeroSystemGraph — abstract kinetic visualization of Spark's pipeline.
 *
 * Four nodes laid out in an S-curve (Capture → Qualify → Nurture → Close).
 * Particles spawn at Capture and flow along a bezier path through each node,
 * brightening as they progress (more lead value), fading out past Close.
 *
 * - Reduced-motion: renders static graph (path + nodes, no particles).
 * - GPU-friendly: direct SVG DOM manipulation in a single rAF loop.
 * - viewBox 100×80, scales to container.
 */

import { useEffect, useRef } from 'react';
import { useLang } from '@/lib/LanguageContext';

const GOLD = '#F8D347';

// S-curve layout in viewBox units (100 × 80)
const NODES = [
  { id: 'capture', x: 12, y: 22, tKey: 'hero.pipeline.capture' as const },
  { id: 'qualify', x: 38, y: 52, tKey: 'hero.pipeline.qualify' as const },
  { id: 'nurture', x: 64, y: 28, tKey: 'hero.pipeline.nurture' as const },
  { id: 'close',   x: 88, y: 58, tKey: 'hero.pipeline.close' as const },
];

// Smooth cubic bezier connecting all four nodes, with mid-control points
const PATH_D = (() => {
  const [n0, n1, n2, n3] = NODES;
  const seg = (a: typeof n0, b: typeof n0) => {
    const dx = (b.x - a.x) * 0.55;
    return `C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
  };
  return `M ${n0.x} ${n0.y} ${seg(n0, n1)} ${seg(n1, n2)} ${seg(n2, n3)}`;
})();

type LiveParticle = {
  el: SVGCircleElement;
  prog: number;
  speed: number;
};

export function HeroSystemGraph({ className }: { className?: string }) {
  const { t } = useLang();
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const particleLayerRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const path = pathRef.current;
    const layer = particleLayerRef.current;
    if (!path || !layer) return;

    const totalLen = path.getTotalLength();
    const particles: LiveParticle[] = [];
    let lastSpawn = performance.now();
    let lastTick = performance.now();
    let raf = 0;
    let running = true;

    // Pause animation when tab not visible (saves battery)
    const onVis = () => { running = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const spawn = () => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('r', '0.9');
      c.setAttribute('fill', GOLD);
      c.setAttribute('filter', 'url(#hsg-particle-glow)');
      c.setAttribute('cx', String(NODES[0].x));
      c.setAttribute('cy', String(NODES[0].y));
      layer.appendChild(c);
      particles.push({
        el: c,
        prog: 0,
        // Slight speed variation so particles don't stay equidistant
        speed: 0.00018 + Math.random() * 0.00009,
      });
    };

    // Seed with one mid-path particle so it doesn't start empty
    spawn();
    particles[0].prog = 0.4;

    const tick = (t: number) => {
      const dt = t - lastTick;
      lastTick = t;

      if (running) {
        // Spawn cadence: ~1 every 1.4s
        if (t - lastSpawn > 1400) {
          spawn();
          lastSpawn = t;
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.prog += p.speed * dt;
          if (p.prog >= 1) {
            p.el.remove();
            particles.splice(i, 1);
            continue;
          }
          const pt = path.getPointAtLength(p.prog * totalLen);
          p.el.setAttribute('cx', pt.x.toFixed(2));
          p.el.setAttribute('cy', pt.y.toFixed(2));

          // brightness curve: dim entry, bright mid, fade out at close
          const a =
            p.prog < 0.08 ? p.prog / 0.08 :
            p.prog > 0.92 ? Math.max(0, (1 - p.prog) / 0.08) :
            1;
          p.el.setAttribute('opacity', a.toFixed(3));

          // size scales subtly as particle progresses (more weight = more value)
          const r = 0.7 + p.prog * 0.6;
          p.el.setAttribute('r', r.toFixed(2));
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      particles.forEach((p) => p.el.remove());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        {/* Soft glow for nodes and particles */}
        <filter id="hsg-node-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hsg-particle-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="0.9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Path stroke gradient — fades at the ends */}
        <linearGradient id="hsg-path-grad" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor={GOLD} stopOpacity="0.05" />
          <stop offset="20%" stopColor={GOLD} stopOpacity="0.35" />
          <stop offset="80%" stopColor={GOLD} stopOpacity="0.35" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0.05" />
        </linearGradient>

        {/* Pulse animation for node outer rings */}
        <style>{`
          @keyframes hsgPulse {
            0%, 100% { opacity: 0.35; transform: scale(1); }
            50%      { opacity: 0.85; transform: scale(1.15); }
          }
          .hsg-pulse { transform-box: fill-box; transform-origin: center; animation: hsgPulse 3.4s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .hsg-pulse { animation: none; opacity: 0.4; } }
        `}</style>
      </defs>

      {/* Connecting path */}
      <path
        ref={pathRef}
        d={PATH_D}
        stroke="url(#hsg-path-grad)"
        strokeWidth="0.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Dashed echo line for technical-system feel */}
      <path
        d={PATH_D}
        stroke={GOLD}
        strokeOpacity="0.15"
        strokeWidth="0.25"
        strokeDasharray="0.6 1.2"
        fill="none"
      />

      {/* Particle layer (populated by rAF loop) */}
      <g ref={particleLayerRef} />

      {/* Nodes */}
      {NODES.map((n, i) => (
        <g key={n.id} style={{ animationDelay: `${i * 0.85}s` }}>
          {/* Outer ring (pulses) */}
          <circle
            cx={n.x}
            cy={n.y}
            r="3.4"
            fill="none"
            stroke={GOLD}
            strokeOpacity="0.45"
            strokeWidth="0.35"
            className="hsg-pulse"
            style={{ animationDelay: `${i * 0.85}s` }}
          />
          {/* Inner ring */}
          <circle
            cx={n.x}
            cy={n.y}
            r="1.6"
            fill="none"
            stroke={GOLD}
            strokeOpacity="0.9"
            strokeWidth="0.35"
          />
          {/* Core */}
          <circle
            cx={n.x}
            cy={n.y}
            r="0.8"
            fill={GOLD}
            filter="url(#hsg-node-glow)"
          />

          {/* Label — alternates above/below to avoid path collision */}
          <g transform={`translate(${n.x} ${n.y + (i % 2 === 0 ? -7 : 8)})`}>
            <text
              textAnchor="middle"
              fontFamily="'JetBrains Mono', ui-monospace, monospace"
              fontSize="1.9"
              fill="#b8b8c2"
              letterSpacing="0.18em"
              style={{ textTransform: 'uppercase' }}
            >
              {String(t(n.tKey)).toUpperCase()}
            </text>
            <text
              textAnchor="middle"
              y="2.6"
              fontFamily="'JetBrains Mono', ui-monospace, monospace"
              fontSize="1.4"
              fill="#5c5c68"
              letterSpacing="0.05em"
            >
              0{i + 1}
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}
