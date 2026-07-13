'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

/* ─── Data ─────────────────────────────────────────────────── */
const SPECS = [
  { v: '5,95', unit: 'm', label: 'Eslora' },
  { v: '150',  unit: 'HP', label: 'Potencia' },
  { v: '55',   unit: 'km/h', label: 'Velocidad' },
  { v: '6',    unit: 'pax', label: 'Capacidad' },
  { v: '100',  unit: 'L', label: 'Combustible' },
  { v: '850',  unit: 'kg', label: 'Peso' },
];

const GALLERY_ITEMS = [
  { src: '/preview/bermuda-g1.jpg',     span: 'col-span-2 row-span-2', label: 'En acción' },
  { src: '/preview/bermuda-aerial.jpg', span: 'col-span-1 row-span-1', label: 'Vista aérea' },
  { src: '/preview/bermuda-water.jpg',  span: 'col-span-1 row-span-1', label: 'En el agua' },
  { src: '/preview/bermuda-front.jpg',  span: 'col-span-1 row-span-1', label: 'Proa' },
  { src: '/preview/bermuda-interior.jpg',span:'col-span-1 row-span-1', label: 'Interior' },
  { src: '/preview/bermuda-dock.jpg',   span: 'col-span-2 row-span-1', label: 'En puerto' },
];

/* ─── 360 Stage ─────────────────────────────────────────────── */
function Stage360() {
  const stageRef = useRef<HTMLDivElement>(null);
  const animRef   = useRef<number | null>(null);
  const velRef    = useRef(0);
  const dragging  = useRef(false);
  const startX    = useRef(0);
  const startRot  = useRef(0);
  const lastX     = useRef(0);
  const lastT     = useRef(0);

  const [rot,     setRot]     = useState(0);
  const [lifted,  setLifted]  = useState(false);
  const [hinted,  setHinted]  = useState(false);
  const [mode,    setMode]    = useState<'studio'|'video'>('studio');
  const [cursor,  setCursor]  = useState({ x: 0.5, y: 0.5 });

  // Intro pan
  useEffect(() => {
    let raf: number;
    let angle = 0;
    const run = () => {
      angle += 0.25;
      setRot(angle);
      if (angle < 40) raf = requestAnimationFrame(run);
      else setRot(0);
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(run); }, 500);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, []);

  const stopInertia = () => { if (animRef.current) cancelAnimationFrame(animRef.current); };

  const startInertia = () => {
    let v = velRef.current;
    const tick = () => {
      v *= 0.92;
      if (Math.abs(v) < 0.04) return;
      setRot(r => r + v);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const onPD = (e: React.PointerEvent) => {
    stopInertia();
    dragging.current = true;
    setLifted(true);
    setHinted(true);
    startX.current   = e.clientX;
    startRot.current = rot;
    lastX.current    = e.clientX;
    lastT.current    = performance.now();
    velRef.current   = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPM = (e: React.PointerEvent) => {
    // Track cursor for specular
    if (stageRef.current) {
      const r = stageRef.current.getBoundingClientRect();
      setCursor({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    }
    if (!dragging.current) return;
    const now = performance.now();
    const dt  = now - lastT.current;
    if (dt > 0) velRef.current = (e.clientX - lastX.current) / dt * 16;
    lastX.current = e.clientX;
    lastT.current = now;
    setRot(startRot.current + (e.clientX - startX.current) * 0.5);
  };

  const onPU = () => {
    dragging.current = false;
    setLifted(false);
    startInertia();
  };

  const norm = ((rot % 360) + 360) % 360;

  // 3D perspective values
  const rotY      = Math.sin((norm * Math.PI) / 180) * 22;
  const scaleX    = 1 - Math.abs(Math.sin((norm * Math.PI) / 180)) * 0.06;
  // Specular highlight: moves opposite cursor
  const specX     = cursor.x * 100;
  const specY     = cursor.y * 100;
  // Lighting: changes with angle
  const lightAngle= (norm * Math.PI) / 180;
  const brightness= 0.92 + Math.cos(lightAngle - 0.5) * 0.18;
  const contrast  = 1 + Math.abs(Math.sin(lightAngle)) * 0.08;

  return (
    <div className="relative flex flex-col items-center">
      {/* Mode toggle */}
      <div className="absolute top-6 right-6 z-10 flex gap-1 rounded-full border border-white/10 bg-black/40 p-0.5 backdrop-blur-sm">
        {(['studio','video'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-medium transition-all ${
              mode === m ? 'bg-white text-black' : 'text-white/40 hover:text-white/80'
            }`}
          >
            {m === 'studio' ? 'Studio' : 'En movimiento'}
          </button>
        ))}
      </div>

      {/* Degree chip */}
      <div className="absolute top-6 left-6 z-10 font-mono text-[11px] tabular-nums text-white/20 bg-white/5 backdrop-blur-sm rounded px-2.5 py-1 border border-white/5">
        {Math.round(norm)}°
      </div>

      {mode === 'video' ? (
        /* ── Video mode ── */
        <div className="w-full aspect-video rounded-none overflow-hidden">
          <iframe
            src="https://www.youtube-nocookie.com/embed/R4e8xw8kHVs?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&loop=1&playlist=R4e8xw8kHVs"
            title="Bermuda 595 Cuddy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      ) : (
        /* ── Studio mode ── */
        <div
          ref={stageRef}
          className="relative w-full cursor-grab active:cursor-grabbing overflow-hidden"
          style={{ touchAction: 'none', minHeight: '420px' }}
          onPointerDown={onPD}
          onPointerMove={onPM}
          onPointerUp={onPU}
          onPointerCancel={onPU}
          onPointerLeave={() => { if (!dragging.current) setLifted(false); }}
        >
          {/* Stage ambient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${specX}% ${specY}%, rgba(200,220,255,0.06) 0%, transparent 55%),
                           radial-gradient(ellipse at 50% 80%, rgba(30,60,140,0.35) 0%, transparent 60%)`,
            }}
          />

          {/* Boat */}
          <div
            className="relative z-10 px-8 py-12 md:py-16 flex items-center justify-center"
            style={{
              transform: `perspective(1600px) rotateY(${rotY}deg) scaleX(${scaleX})`,
              filter: `brightness(${brightness}) contrast(${contrast}) drop-shadow(0 40px 80px rgba(0,10,40,0.8))`,
              transition: dragging.current ? 'none' : 'transform 0.06s ease-out, filter 0.06s ease-out',
              willChange: 'transform',
            }}
          >
            {/* Specular glint */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(ellipse at ${specX}% ${40 + specY * 0.3}%, rgba(255,255,255,0.08) 0%, transparent 40%)`,
                mixBlendMode: 'screen',
              }}
            />
            <Image
              src="/preview/bermuda-595.png"
              alt="Bermuda 595 Cuddy"
              width={960}
              height={460}
              className="w-full max-w-3xl h-auto object-contain select-none"
              draggable={false}
              priority
            />
          </div>

          {/* Water reflection */}
          <div
            className="pointer-events-none relative z-10 mx-auto"
            style={{
              width: '65%',
              marginTop: '-4rem',
              height: '80px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url('/preview/bermuda-595.png')`,
                backgroundSize: '100% auto',
                backgroundPosition: 'center top',
                transform: 'scaleY(-1)',
                filter: `brightness(0.2) blur(4px) saturate(0.5) rotateY(${rotY}deg) scaleX(${scaleX})`,
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)',
                opacity: 0.7,
              }}
            />
          </div>

          {/* Floor line */}
          <div className="pointer-events-none absolute bottom-24 inset-x-0 flex justify-center">
            <div
              className="h-px"
              style={{
                width: '60%',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
              }}
            />
          </div>
        </div>
      )}

      {/* Drag hint + scrubber */}
      {mode === 'studio' && (
        <div className="flex flex-col items-center gap-4 pb-8">
          <div className={`flex items-center gap-2.5 text-white/30 text-xs uppercase tracking-widest transition-opacity duration-500 ${hinted ? 'opacity-0' : 'opacity-100'}`}>
            <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
              <path d="M1 6h30M4 2L1 6l3 4M28 2l3 4-3 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Arrastrá para rotar
          </div>

          {/* Scrubber track */}
          <div className="flex items-center gap-3 w-56">
            <span className="text-white/15 font-mono text-[10px]">0°</span>
            <input
              type="range" min={0} max={360} value={norm}
              onChange={e => { stopInertia(); setRot(+e.target.value); setHinted(true); }}
              className="flex-1 accent-white opacity-25 hover:opacity-60 transition-opacity cursor-pointer h-px"
            />
            <span className="text-white/15 font-mono text-[10px]">360°</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function Bermuda595Page() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <main className="bg-[#080808] text-white overflow-x-hidden" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* ── Nav ── */}
      <nav
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-5">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Modelos', 'Astillero'].map(l => (
              <a key={l} href="#" className="text-xs uppercase tracking-[0.2em] text-white/45 hover:text-white transition-colors">{l}</a>
            ))}
          </div>

          {/* Logo */}
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
            <Image
              src="/preview/logo-bermuda.png"
              alt="Bermuda"
              width={130}
              height={44}
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Right links */}
          <div className="hidden md:flex items-center gap-10">
            {['Concesionarios', 'Novedades', 'Contacto'].map(l => (
              <a key={l} href="#" className="text-xs uppercase tracking-[0.2em] text-white/45 hover:text-white transition-colors">{l}</a>
            ))}
          </div>

          {/* Mobile logo only */}
          <div className="md:hidden" />
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-end overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0">
          <iframe
            src="https://www.youtube-nocookie.com/embed/R4e8xw8kHVs?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=R4e8xw8kHVs&showinfo=0&start=5"
            title="Bermuda hero"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] border-0 pointer-events-none"
            style={{ opacity: 0.55 }}
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 30%, transparent 50%, rgba(8,8,8,0.7) 80%, rgba(8,8,8,1) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.4) 0%, transparent 50%, rgba(8,8,8,0.2) 100%)' }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full px-8 pb-20 md:px-16 md:pb-28 max-w-7xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/35 mb-6">
            Serie Cuddy · Modelo 2025
          </p>
          <h1 className="font-black leading-none tracking-tighter"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
            595<br />
            <span style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.35)',
              color: 'transparent',
            }}>CUDDY</span>
          </h1>
          <p className="mt-6 text-white/45 text-base max-w-xs leading-relaxed">
            Performance, confort y diseño en cada travesía.
          </p>

          {/* Scroll cue */}
          <div className="mt-16 flex items-center gap-4">
            <div className="flex flex-col items-center gap-1 opacity-30">
              <div className="w-px h-12 bg-white/60 origin-top animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.3em] rotate-0">Scroll</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tagline ── */}
      <section className="px-8 py-20 md:py-28 max-w-7xl mx-auto md:px-16">
        <div className="max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25 mb-8">Bermuda · 1961</p>
          <h2 className="font-black leading-tight tracking-tighter text-white/95"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Desde Tigre al mundo.
            <br />
            <span className="text-white/30">Más de 10.000 embarcaciones
            <br />entregadas.</span>
          </h2>
        </div>
      </section>

      {/* ── 360 Stage ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #080808 0%, #0a0f1e 50%, #080808 100%)' }}>
        {/* Section header */}
        <div className="px-8 pt-16 pb-0 md:px-16 max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25 mb-3">Vista interactiva</p>
            <h3 className="font-black tracking-tighter text-3xl md:text-5xl">595 Cuddy</h3>
          </div>
          <p className="hidden md:block text-right text-white/25 text-sm max-w-48">
            Girá el modelo o miralo en acción
          </p>
        </div>

        <Stage360 />
      </section>

      {/* ── Specs ── */}
      <section className="px-8 py-24 md:py-36 md:px-16 max-w-7xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25 mb-16">Especificaciones</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
          {SPECS.map(s => (
            <div key={s.label} className="bg-[#080808] p-8 md:p-12 group hover:bg-[#0d0d0d] transition-colors">
              <p className="font-black tracking-tighter leading-none"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                {s.v}
                <span className="text-white/20 ml-1" style={{ fontSize: '0.4em' }}>{s.unit}</span>
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/30">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="px-8 pb-24 md:pb-36 md:px-16 max-w-7xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25 mb-10">Galería</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[220px] md:auto-rows-[260px]">
          {GALLERY_ITEMS.map((item, i) => (
            <button
              key={item.src}
              onClick={() => setLightbox(item.src)}
              className={`relative overflow-hidden group ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Features strip ── */}
      <section className="border-y border-white/5 py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          {[
            { n: 'Cabina Cuddy', d: 'Espacio interior privado para travesías largas' },
            { n: 'Casco en V profundo', d: 'Máxima estabilidad en cualquier condición' },
            { n: 'Consola central', d: 'Ergonomía y control total de la navegación' },
            { n: 'Toldo Bimini', d: 'Protección UV incluida de fábrica' },
          ].map(f => (
            <div key={f.n}>
              <div className="w-8 h-px bg-white/20 mb-6" />
              <p className="font-semibold text-sm mb-2">{f.n}</p>
              <p className="text-white/35 text-sm leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact / CTA ── */}
      <section className="px-8 py-28 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25 mb-6">Contacto</p>
          <h2 className="font-black tracking-tighter leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            Tu próxima<br />lancha.
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="text-white/35 max-w-xs leading-relaxed text-sm md:text-right">
            Encontrá tu concesionario más cercano o cotizá tu Bermuda 595 Cuddy.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#"
              className="px-8 py-3.5 bg-white text-black font-semibold text-sm tracking-wide hover:bg-white/90 transition-colors">
              Cotizá ahora
            </a>
            <a href="#"
              className="px-8 py-3.5 border border-white/20 text-white/70 font-semibold text-sm tracking-wide hover:border-white/60 hover:text-white transition-colors">
              Concesionarios
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-8 py-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">© 2025 Bermuda Lanchas. Todos los derechos reservados.</p>
          <p className="text-white/20 text-xs">
            Diseñado por{' '}
            <a href="https://sparkdigital.agency" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors">
              Spark Digital Agency
            </a>
          </p>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="relative max-w-6xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <Image
              src={lightbox}
              alt="Bermuda 595 Cuddy"
              width={1400}
              height={900}
              className="w-full h-auto object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </main>
  );
}
