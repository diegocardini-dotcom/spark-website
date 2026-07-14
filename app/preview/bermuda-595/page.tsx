'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

/* ─── Fonts ──────────────────────────────────────────────── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
    .font-display  { font-family: 'Cormorant Garamond', Georgia, serif; }
    .font-mono-b   { font-family: 'SF Mono', 'Fira Code', monospace; }
    html { scroll-behavior: smooth; }
    ::selection { background: rgba(255,255,255,0.12); }
    * { -webkit-font-smoothing: antialiased; }

    /* Scroll reveal */
    .reveal        { opacity: 0; transform: translateY(28px); filter: blur(4px);
                     transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                                 transform 0.9s cubic-bezier(0.22,1,0.36,1),
                                 filter 0.7s cubic-bezier(0.22,1,0.36,1); }
    .reveal.visible{ opacity: 1; transform: none; filter: none; }
    .reveal.d1     { transition-delay: 0.1s; }
    .reveal.d2     { transition-delay: 0.22s; }
    .reveal.d3     { transition-delay: 0.36s; }
    .reveal.d4     { transition-delay: 0.5s; }
    .reveal.d5     { transition-delay: 0.64s; }

    /* Cursor crosshair */
    .stage-cursor  { cursor: none; }

    /* Video letterbox */
    .hero-video    { position:absolute; inset:0; width:100%; height:100%;
                     object-fit:cover; object-position:center; }

    /* Scrubber */
    input[type=range].track {
      -webkit-appearance:none; appearance:none;
      background: rgba(255,255,255,0.08); height:1px; border-radius:0;
    }
    input[type=range].track::-webkit-slider-thumb {
      -webkit-appearance:none; width:10px; height:10px;
      border-radius:50%; background:#fff; cursor:pointer;
      box-shadow: 0 0 0 3px rgba(255,255,255,0.15);
    }

    /* Bento hover */
    .bento-cell    { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
    .bento-cell:hover { transform: scale(1.01); }

    /* Nav link underline */
    .nav-link      { position:relative; }
    .nav-link::after {
      content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px;
      background:rgba(255,255,255,0.5);
      transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .nav-link:hover::after { width:100%; }

    /* Grain overlay */
    .grain::before {
      content:''; position:fixed; inset:0; z-index:999; pointer-events:none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:180px; opacity:0.022; mix-blend-mode:overlay;
    }
  `}</style>
);

/* ─── Data ───────────────────────────────────────────────── */
const SPECS = [
  { v: '5,95', u: 'm',    l: 'Eslora total'  },
  { v: '150',  u: 'HP',   l: 'Potencia máx'  },
  { v: '55',   u: 'km/h', l: 'Velocidad'     },
  { v: '6',    u: 'pax',  l: 'Capacidad'     },
  { v: '100',  u: 'L',    l: 'Combustible'   },
  { v: '850',  u: 'kg',   l: 'Peso s/motor'  },
];

const GALLERY = [
  { src: '/preview/bermuda-g1.jpg',       span: 'md:col-span-4 md:row-span-2', label: 'En acción'   },
  { src: '/preview/bermuda-aerial.jpg',   span: 'md:col-span-3 md:row-span-1', label: 'Vista aérea' },
  { src: '/preview/bermuda-front.jpg',    span: 'md:col-span-3 md:row-span-1', label: 'Proa'        },
  { src: '/preview/bermuda-interior.jpg', span: 'md:col-span-3 md:row-span-1', label: 'Interior'    },
  { src: '/preview/bermuda-water.jpg',    span: 'md:col-span-3 md:row-span-1', label: 'Navegando'   },
  { src: '/preview/bermuda-dock.jpg',     span: 'md:col-span-7 md:row-span-1', label: 'En puerto'   },
];

/* ─── Scroll reveal hook ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); } }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Floating Nav ───────────────────────────────────────── */
function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = ['Modelos', 'Astillero', 'Concesionarios', 'Novedades', 'Contacto'];

  return (
    <>
      {/* Nav pill */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-center pt-5 px-4 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center gap-8 px-6 py-3 rounded-full"
          style={{
            background: scrolled ? 'rgba(6,6,6,0.88)' : 'rgba(6,6,6,0.55)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.07)',
            transition: 'background 0.4s cubic-bezier(0.22,1,0.36,1)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* Left links */}
          <div className="hidden md:flex items-center gap-7">
            {['Modelos', 'Astillero'].map(l => (
              <a key={l} href="#" className="nav-link text-[11px] uppercase tracking-[0.2em] text-white/45 hover:text-white/90 transition-colors duration-300">{l}</a>
            ))}
          </div>

          {/* Logo */}
          <Image src="/preview/logo-bermuda.png" alt="Bermuda" width={110} height={36} className="h-7 w-auto object-contain" />

          {/* Right links */}
          <div className="hidden md:flex items-center gap-7">
            {['Concesionarios', 'Contacto'].map(l => (
              <a key={l} href="#contacto" className="nav-link text-[11px] uppercase tracking-[0.2em] text-white/45 hover:text-white/90 transition-colors duration-300">{l}</a>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden relative w-6 h-4 flex flex-col justify-between"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className="block h-px bg-white/70 origin-center transition-all duration-400"
              style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
                       transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
            <span className="block h-px bg-white/70 transition-all duration-300"
              style={{ opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'none' }} />
            <span className="block h-px bg-white/70 origin-center transition-all duration-400"
              style={{ transform: open ? 'translateY(-9px) rotate(-45deg)' : 'none',
                       transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-30 md:hidden flex flex-col justify-center px-10 transition-all duration-500"
        style={{
          background: 'rgba(4,4,4,0.97)',
          backdropFilter: 'blur(24px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="flex flex-col gap-8">
          {links.map((l, i) => (
            <a
              key={l}
              href="#"
              onClick={() => setOpen(false)}
              className="font-display text-5xl text-white/80 hover:text-white transition-all duration-500"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(24px)',
                transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${0.07 * i}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.07 * i}s`,
                fontStyle: 'italic',
              }}
            >
              {l}
            </a>
          ))}
        </div>
        <p className="absolute bottom-12 left-10 text-[10px] uppercase tracking-[0.3em] text-white/20">
          Bermuda · desde 1961
        </p>
      </div>
    </>
  );
}

/* ─── 360 Stage ──────────────────────────────────────────── */
function Stage360() {
  const stageRef   = useRef<HTMLDivElement>(null);
  const animRef    = useRef<number | null>(null);
  const dragging   = useRef(false);
  const startX     = useRef(0);
  const startRot   = useRef(0);
  const lastX      = useRef(0);
  const lastT      = useRef(0);
  const velRef     = useRef(0);

  const [rot,   setRot]   = useState(0);
  const [mode,  setMode]  = useState<'studio'|'video'>('studio');
  const [hinted, setHinted] = useState(false);
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.45 });
  const [active, setActive] = useState(false);

  /* Intro pan */
  useEffect(() => {
    let raf: number;
    let a = 0;
    const run = () => { a += 0.3; setRot(a); if (a < 35) raf = requestAnimationFrame(run); };
    const t = setTimeout(() => { raf = requestAnimationFrame(run); }, 800);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, []);

  const stopInertia = () => { if (animRef.current) cancelAnimationFrame(animRef.current); };

  const launchInertia = () => {
    let v = velRef.current;
    const tick = () => { v *= 0.91; if (Math.abs(v) < 0.04) return; setRot(r => r + v); animRef.current = requestAnimationFrame(tick); };
    animRef.current = requestAnimationFrame(tick);
  };

  const onPD = (e: React.PointerEvent) => {
    stopInertia(); dragging.current = true; setActive(true); setHinted(true);
    startX.current = e.clientX; startRot.current = rot;
    lastX.current = e.clientX; lastT.current = performance.now(); velRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPM = (e: React.PointerEvent) => {
    if (stageRef.current) {
      const r = stageRef.current.getBoundingClientRect();
      setCursor({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    }
    if (!dragging.current) return;
    const now = performance.now(), dt = now - lastT.current;
    if (dt > 0) velRef.current = (e.clientX - lastX.current) / dt * 16;
    lastX.current = e.clientX; lastT.current = now;
    setRot(startRot.current + (e.clientX - startX.current) * 0.5);
  };
  const onPU = () => { dragging.current = false; setActive(false); launchInertia(); };

  const norm = ((rot % 360) + 360) % 360;
  const rotY = Math.sin((norm * Math.PI) / 180) * 22;
  const scaleX = 1 - Math.abs(Math.sin((norm * Math.PI) / 180)) * 0.065;
  const bright = 0.9 + Math.cos((norm * Math.PI) / 180 - 0.4) * 0.2;
  const specX = cursor.x * 100, specY = cursor.y * 100;
  const shadowW = 50 + Math.abs(Math.sin((norm * Math.PI) / 180)) * 12;

  return (
    <div className="flex flex-col items-center">
      {/* Mode toggle */}
      <div className="flex gap-px mb-10 rounded-full border border-white/8 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.03)' }}>
        {(['studio','video'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className="px-6 py-2 text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-400"
            style={{
              background: mode === m ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: mode === m ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
              transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
            }}>
            {m === 'studio' ? 'Estudio' : 'En movimiento'}
          </button>
        ))}
      </div>

      {mode === 'video' ? (
        /* ── Local video player ── */
        <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <video
            src="/preview/bermuda-595.mp4"
            controls
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block"
            style={{ maxHeight: '70vh', objectFit: 'contain', background: '#000' }}
          />
        </div>
      ) : (
        /* ── Studio 360 ── */
        <div
          ref={stageRef}
          className="relative w-full max-w-5xl mx-auto select-none"
          style={{ touchAction: 'none', cursor: active ? 'grabbing' : 'grab', minHeight: 420 }}
          onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU} onPointerCancel={onPU}
        >
          {/* Degree badge */}
          <div className="absolute top-4 left-4 z-10 font-mono-b text-[10px] tabular-nums text-white/20
            border border-white/6 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            {Math.round(norm)}°
          </div>

          {/* Stage ambient glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${specX}% ${specY}%, rgba(180,210,255,0.05) 0%, transparent 45%),
                           radial-gradient(ellipse at 50% 85%, rgba(20,50,140,0.28) 0%, transparent 55%)`,
            }}
          />

          {/* Ground grid lines */}
          <div className="absolute bottom-24 inset-x-0 pointer-events-none overflow-hidden" style={{ height: 120 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} className="absolute inset-x-0"
                style={{
                  bottom: i * 22,
                  height: 1,
                  background: `linear-gradient(to right, transparent, rgba(255,255,255,${0.025 - i * 0.004}), transparent)`,
                  transform: `perspective(600px) rotateX(70deg) translateY(${i * 8}px)`,
                }}
              />
            ))}
            {/* Vertical lines converging */}
            {[-3,-2,-1,0,1,2,3].map(j => (
              <div key={j} className="absolute bottom-0 pointer-events-none"
                style={{
                  left: `calc(50% + ${j * 14}%)`,
                  width: 1,
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(255,255,255,0.04), transparent)',
                  transformOrigin: 'bottom center',
                  transform: `perspective(600px) rotateX(70deg) skewX(${j * 2}deg)`,
                }}
              />
            ))}
          </div>

          {/* Boat */}
          <div className="relative z-10 pt-12 pb-6 px-8 flex items-center justify-center">
            {/* Specular overlay */}
            <div className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: `radial-gradient(ellipse at ${specX}% ${specY + 20}%, rgba(255,255,255,0.07) 0%, transparent 38%)`,
                mixBlendMode: 'screen',
              }}
            />
            <div
              style={{
                transform: `perspective(1800px) rotateY(${rotY}deg) scaleX(${scaleX})`,
                filter: `brightness(${bright}) contrast(1.04) drop-shadow(0 50px 90px rgba(0,5,30,0.9))`,
                transition: dragging.current ? 'none' : 'transform 0.05s cubic-bezier(0.22,1,0.36,1)',
                willChange: 'transform',
              }}
            >
              <Image
                src="/preview/bermuda-595.png"
                alt="Bermuda 595 Cuddy"
                width={960} height={460}
                className="w-full max-w-3xl h-auto object-contain"
                draggable={false} priority
              />
            </div>
          </div>

          {/* Ground shadow ellipse */}
          <div className="pointer-events-none flex justify-center" style={{ marginTop: '-3rem' }}>
            <div style={{
              width: `${shadowW}%`,
              height: 20,
              background: 'radial-gradient(ellipse, rgba(0,5,30,0.9) 0%, transparent 70%)',
              filter: 'blur(12px)',
              transform: `scaleX(${scaleX}) translateX(${rotY * 0.6}px)`,
              transition: dragging.current ? 'none' : 'all 0.05s',
            }} />
          </div>

          {/* Reflection */}
          <div className="pointer-events-none flex justify-center overflow-hidden" style={{ height: 60, marginTop: 8 }}>
            <div style={{
              width: '70%',
              height: '100%',
              backgroundImage: `url('/preview/bermuda-595.png')`,
              backgroundSize: '100% auto',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat',
              transform: `scaleY(-1) perspective(800px) rotateY(${rotY * 0.6}deg) scaleX(${scaleX})`,
              filter: 'brightness(0.15) blur(3px) saturate(0.3)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
            }} />
          </div>
        </div>
      )}

      {/* Controls */}
      {mode === 'studio' && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/25 transition-all duration-700 ${hinted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <svg width="28" height="10" viewBox="0 0 28 10" fill="none" className="animate-pulse">
              <path d="M0 5h28M3 2L0 5l3 3M25 2l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            Arrastrá para rotar
          </div>
          <div className="flex items-center gap-4 w-64">
            <span className="font-mono-b text-[9px] text-white/15">0°</span>
            <input type="range" min={0} max={360} value={norm} className="flex-1 track"
              onChange={e => { stopInertia(); setRot(+e.target.value); setHinted(true); }} />
            <span className="font-mono-b text-[9px] text-white/15">360°</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function Bermuda595Page() {
  const [lightbox, setLightbox] = useState<string|null>(null);
  useReveal();

  return (
    <div className="grain">
      <FontStyle />
      <main className="bg-[#060606] text-white overflow-x-hidden min-h-[100dvh]">

        <FloatingNav />

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
          {/* Local video — crisp, object-cover */}
          <video
            className="hero-video"
            src="/preview/bermuda-595.mp4"
            autoPlay muted loop playsInline
            style={{ opacity: 0.65 }}
          />

          {/* Cinematic overlays */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to bottom, rgba(6,6,6,0.45) 0%, rgba(6,6,6,0.0) 25%, rgba(6,6,6,0.0) 50%, rgba(6,6,6,0.65) 75%, rgba(6,6,6,1) 100%)'
          }}/>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to right, rgba(6,6,6,0.55) 0%, transparent 50%)'
          }}/>

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-32 md:px-14">
            <div className="max-w-2xl">
              <p className="reveal font-mono-b text-[10px] uppercase tracking-[0.45em] text-white/35 mb-7">
                Bermuda · Serie Cuddy · 2025
              </p>
              <h1 className="reveal d1 font-display leading-none"
                style={{ fontSize: 'clamp(5.5rem, 14vw, 12rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>
                595<br/>
                <em style={{ fontWeight: 300, color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                  Cuddy
                </em>
              </h1>
              <p className="reveal d2 mt-8 text-white/40 text-base leading-relaxed max-w-xs"
                style={{ fontWeight: 300 }}>
                Performance, confort y diseño. La lancha que redefine cada travesía.
              </p>

              {/* Hero stats strip */}
              <div className="reveal d3 mt-12 flex items-center gap-8 border-t border-white/8 pt-8">
                {[['150 HP','Potencia'],['55 km/h','Velocidad'],['6','Personas']].map(([v,l]) => (
                  <div key={l}>
                    <p className="font-display text-2xl text-white/90" style={{ fontWeight: 300 }}>{v}</p>
                    <p className="font-mono-b text-[9px] uppercase tracking-[0.25em] text-white/30 mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll cue */}
            <div className="absolute bottom-10 right-14 hidden md:flex items-center gap-3 opacity-30">
              <div className="w-px h-14 bg-white/50" style={{
                animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite'
              }} />
              <p className="font-mono-b text-[9px] uppercase tracking-[0.35em] -rotate-90 origin-left ml-5" style={{ width: 60 }}>Scroll</p>
            </div>
          </div>
        </section>

        {/* ── TAGLINE ────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-28 md:py-40 md:px-14">
          <div className="reveal md:grid md:grid-cols-12 md:gap-12 items-end">
            <div className="md:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-1 mb-8"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse" />
                <span className="font-mono-b text-[9px] uppercase tracking-[0.3em] text-white/35">Desde Tigre al mundo</span>
              </span>
              <h2 className="font-display leading-[0.95] text-white/90"
                style={{ fontSize: 'clamp(3rem,7vw,6.5rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>
                Más de 10.000<br/>
                <em style={{ color: 'rgba(255,255,255,0.28)', fontWeight: 300 }}>
                  embarcaciones<br/>entregadas.
                </em>
              </h2>
            </div>
            <div className="md:col-span-4 mt-8 md:mt-0 reveal d2">
              <p className="text-white/30 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                Fabricante argentino líder desde 1961. Casa central en Tigre, Buenos Aires. Distribuimos en todo el país a través de una red de concesionarios exclusivos.
              </p>
            </div>
          </div>
        </section>

        {/* ── STAGE 360 ────────────────────────────────────── */}
        <section className="relative overflow-hidden py-20 md:py-28"
          style={{ background: 'linear-gradient(180deg, #060606 0%, #08101e 50%, #060606 100%)' }}>

          <div className="max-w-7xl mx-auto px-6 md:px-14 mb-14">
            <div className="reveal flex items-end justify-between">
              <div>
                <span className="font-mono-b text-[10px] uppercase tracking-[0.35em] text-white/20">Vista interactiva</span>
                <h3 className="font-display mt-3 text-white/90"
                  style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>
                  595 Cuddy
                </h3>
              </div>
              <p className="reveal d2 hidden md:block text-right text-white/20 text-xs max-w-40 leading-relaxed" style={{ fontWeight: 300 }}>
                Girá el modelo 360° o miralo en movimiento
              </p>
            </div>
          </div>

          <div className="reveal d1 max-w-7xl mx-auto px-6 md:px-14">
            <Stage360 />
          </div>
        </section>

        {/* ── SPECS ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-28 md:py-40 md:px-14">
          <div className="reveal mb-16 flex items-center justify-between">
            <span className="font-mono-b text-[10px] uppercase tracking-[0.35em] text-white/20">Especificaciones técnicas</span>
            <div className="h-px flex-1 mx-8" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
          </div>

          {/* Outer shell (Double-Bezel) */}
          <div className="rounded-3xl p-0.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="rounded-[calc(1.5rem-2px)] overflow-hidden" style={{ background: '#090909' }}>
              <div className="grid grid-cols-2 md:grid-cols-3">
                {SPECS.map((s, i) => (
                  <div key={s.l}
                    className={`reveal d${(i % 3) + 1} p-8 md:p-12 group transition-colors duration-500 hover:bg-white/[0.025]`}
                    style={{
                      borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                    <p className="font-display leading-none text-white/90 group-hover:text-white transition-colors duration-500"
                      style={{ fontSize: 'clamp(2.8rem,5.5vw,5rem)', fontWeight: 300 }}>
                      {s.v}
                      <span className="text-white/20 ml-2" style={{ fontSize: '0.35em', letterSpacing: '0.1em' }}>{s.u}</span>
                    </p>
                    <p className="font-mono-b mt-4 text-[9px] uppercase tracking-[0.3em] text-white/25">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY BENTO ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pb-28 md:pb-40 md:px-14">
          <div className="reveal mb-12 flex items-center gap-6">
            <span className="font-mono-b text-[10px] uppercase tracking-[0.35em] text-white/20">Galería</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 auto-rows-[200px] md:auto-rows-[220px] gap-2 md:gap-2.5">
            {GALLERY.map((item, i) => (
              <button
                key={item.src}
                onClick={() => setLightbox(item.src)}
                className={`bento-cell reveal d${(i % 3) + 1} relative overflow-hidden group rounded-xl ${item.span}`}
                style={{ border: '1px solid rgba(255,255,255,0.04)' }}
              >
                <Image src={item.src} alt={item.label} fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                <div className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: 'rgba(0,0,0,0.25)', opacity: 1 }} />
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: 'rgba(0,0,0,0.0)' }} />
                <span className="absolute bottom-4 left-4 font-mono-b text-[9px] uppercase tracking-[0.25em] text-white/50
                  opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────── */}
        <section className="border-y border-white/[0.05] py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-14">
            <div className="grid md:grid-cols-4 gap-12 md:gap-8">
              {[
                ['Cabina Cuddy',      'Espacio interior privado para descanso en travesías largas.'],
                ['Casco en V profundo','Estabilidad y rendimiento en cualquier condición de agua.'],
                ['Consola central',   'Ergonomía y visibilidad total de la navegación.'],
                ['Toldo Bimini',      'Protección UV incluida de fábrica.'],
              ].map(([n, d], i) => (
                <div key={n} className={`reveal d${i + 1}`}>
                  <div className="w-6 h-px bg-white/20 mb-7" />
                  <p className="font-display text-lg text-white/80 mb-3" style={{ fontWeight: 400, letterSpacing: '-0.01em' }}>{n}</p>
                  <p className="text-white/30 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────────── */}
        <section id="contacto" className="max-w-7xl mx-auto px-6 py-28 md:py-40 md:px-14">
          <div className="reveal md:flex items-end justify-between gap-16">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-1 mb-10"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="font-mono-b text-[9px] uppercase tracking-[0.3em] text-white/30">Contacto</span>
              </span>
              <h2 className="font-display leading-[0.92]"
                style={{ fontSize: 'clamp(3.5rem,9vw,8rem)', fontWeight: 300, letterSpacing: '-0.03em' }}>
                Tu próxima<br/>
                <em style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 300 }}>lancha.</em>
              </h2>
            </div>

            <div className="reveal d2 mt-12 md:mt-0 flex flex-col items-start md:items-end gap-6">
              <p className="text-white/30 text-sm leading-relaxed md:text-right max-w-xs" style={{ fontWeight: 300 }}>
                Cotizá tu Bermuda 595 Cuddy o encontrá el concesionario más cercano.
              </p>
              <div className="flex items-center gap-3">
                {/* Primary — double-bezel button */}
                <a href="#"
                  className="group relative flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full transition-all duration-500"
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <span className="text-black text-sm font-medium tracking-wide">Cotizá ahora</span>
                  {/* Icon in button */}
                  <span className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ background: 'rgba(0,0,0,0.1)', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </a>
                {/* Secondary */}
                <a href="#"
                  className="nav-link text-white/40 hover:text-white/80 text-sm transition-colors duration-400 px-2"
                  style={{ fontWeight: 300 }}>
                  Concesionarios
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────── */}
        <footer className="border-t border-white/[0.05] px-6 py-8 md:px-14">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <Image src="/preview/logo-bermuda.png" alt="Bermuda" width={80} height={26} className="h-5 w-auto object-contain opacity-25" />
            <p className="font-mono-b text-[9px] text-white/15 text-center">
              © 2025 Bermuda Lanchas — Todos los derechos reservados
            </p>
            <p className="font-mono-b text-[9px] text-white/15">
              Diseñado por{' '}
              <a href="https://sparkdigital.agency" target="_blank" rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors duration-300">
                Spark Digital Agency
              </a>
            </p>
          </div>
        </footer>

        {/* ── LIGHTBOX ──────────────────────────────────────── */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(24px)', cursor: 'zoom-out' }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-7 right-7 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-white/40 hover:text-white transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              onClick={() => setLightbox(null)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="relative max-w-6xl w-full" onClick={e => e.stopPropagation()}>
              <Image src={lightbox} alt="Bermuda 595 Cuddy" width={1400} height={900}
                className="w-full h-auto object-contain max-h-[88vh] rounded-xl" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
