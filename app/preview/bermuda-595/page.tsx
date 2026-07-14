'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

/* ─── Data ─────────────────────────────────────────────── */
const SPECS = [
  { v: '5,95', u: 'm',    l: 'Eslora total'  },
  { v: '150',  u: 'HP',   l: 'Potencia máx'  },
  { v: '55',   u: 'km/h', l: 'Velocidad'     },
  { v: '6',    u: 'pax',  l: 'Capacidad'     },
  { v: '100',  u: 'L',    l: 'Combustible'   },
  { v: '850',  u: 'kg',   l: 'Peso s/motor'  },
];

const GALLERY = [
  { src: '/preview/ph4.jpg', span: 'md:col-span-4 md:row-span-2' },
  { src: '/preview/ph5.jpg', span: 'md:col-span-3 md:row-span-1' },
  { src: '/preview/ph3.jpg', span: 'md:col-span-3 md:row-span-1' },
  { src: '/preview/ph1.jpg', span: 'md:col-span-3 md:row-span-1' },
  { src: '/preview/ph2.png', span: 'md:col-span-3 md:row-span-1' },
  { src: '/preview/ph6.jpg', span: 'md:col-span-2 md:row-span-1' },
  { src: '/preview/ph7.jpg', span: 'md:col-span-2 md:row-span-1' },
  { src: '/preview/ph8.jpg', span: 'md:col-span-3 md:row-span-1' },
];

/* ─── Scroll reveal ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io  = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('in'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Floating Nav (kept from previous) ─────────────────── */
function FloatingNav() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const links = ['Modelos', 'Astillero', 'Concesionarios', 'Novedades', 'Contacto'];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 flex justify-center pt-5 px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-8 px-6 py-3 rounded-full"
          style={{
            background: scrolled ? 'rgba(6,6,6,0.9)' : 'rgba(6,6,6,0.55)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.07)',
            transition: 'background 0.4s ease',
            boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 40px rgba(0,0,0,0.4)',
          }}>
          {/* Left */}
          <div className="hidden md:flex items-center gap-7">
            {['Modelos','Astillero'].map(l => (
              <a key={l} href="#" className="text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300">{l}</a>
            ))}
          </div>

          <Image src="/preview/logo-bermuda.png" alt="Bermuda" width={110} height={36} className="h-7 w-auto object-contain" />

          {/* Right */}
          <div className="hidden md:flex items-center gap-7">
            {['Concesionarios','Contacto'].map(l => (
              <a key={l} href="#contacto" className="text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300">{l}</a>
            ))}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setOpen(v => !v)} className="md:hidden relative w-6 h-4 flex flex-col justify-between" aria-label="Menú">
            <span className="block h-px bg-white/70 origin-center transition-all duration-300"
              style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span className="block h-px bg-white/70 transition-all duration-200"
              style={{ opacity: open ? 0 : 1 }} />
            <span className="block h-px bg-white/70 origin-center transition-all duration-300"
              style={{ transform: open ? 'translateY(-9px) rotate(-45deg)' : 'none' }} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div className="fixed inset-0 z-30 md:hidden flex flex-col justify-center px-10 transition-all duration-500"
        style={{
          background: 'rgba(4,4,4,0.97)',
          backdropFilter: 'blur(24px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}>
        <div className="flex flex-col gap-8">
          {links.map((l, i) => (
            <a key={l} href="#" onClick={() => setOpen(false)}
              className="text-5xl font-black tracking-tighter text-white/80 hover:text-white transition-all duration-500"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${0.06 * i}s, transform 0.5s ease ${0.06 * i}s`,
              }}>
              {l}
            </a>
          ))}
        </div>
        <p className="absolute bottom-12 left-10 text-[10px] uppercase tracking-[0.3em] text-white/20">Bermuda · desde 1961</p>
      </div>
    </>
  );
}

/* ─── Product Viewer ────────────────────────────────────── */
function ProductViewer() {
  const [mode, setMode] = useState<'video' | 'rotate'>('video');

  /* 360 rotate state */
  const animRef  = useRef<number | null>(null);
  const dragging = useRef(false);
  const startX   = useRef(0);
  const startRot = useRef(0);
  const lastX    = useRef(0);
  const lastT    = useRef(0);
  const velRef   = useRef(0);
  const [rot,    setRot]    = useState(0);
  const [hinted, setHinted] = useState(false);
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 });
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== 'rotate') return;
    let raf: number, a = 0;
    const run = () => { a += 0.35; setRot(a); if (a < 40) raf = requestAnimationFrame(run); };
    const t = setTimeout(() => { raf = requestAnimationFrame(run); }, 400);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [mode]);

  const stopInertia = () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  const launchInertia = () => {
    let v = velRef.current;
    const tick = () => { v *= 0.91; if (Math.abs(v) < 0.04) return; setRot(r => r + v); animRef.current = requestAnimationFrame(tick); };
    animRef.current = requestAnimationFrame(tick);
  };

  const onPD = (e: React.PointerEvent) => {
    stopInertia(); dragging.current = true; setHinted(true);
    startX.current = e.clientX; startRot.current = rot;
    lastX.current  = e.clientX; lastT.current = performance.now(); velRef.current = 0;
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
  const onPU = () => { dragging.current = false; launchInertia(); };

  const norm   = ((rot % 360) + 360) % 360;
  const rotY   = Math.sin((norm * Math.PI) / 180) * 22;
  const scaleX = 1 - Math.abs(Math.sin((norm * Math.PI) / 180)) * 0.065;
  const bright = 0.9 + Math.cos((norm * Math.PI) / 180 - 0.4) * 0.2;

  return (
    <div>
      {/* Toggle */}
      <div className="flex gap-1 mb-10 rounded-full border border-white/8 w-fit overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.03)' }}>
        {([['video','En movimiento'],['rotate','Rotar 360°']] as const).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)}
            className="px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300"
            style={{
              background: mode === m ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: mode === m ? '#fff' : 'rgba(255,255,255,0.35)',
            }}>
            {label}
          </button>
        ))}
      </div>

      {mode === 'video' ? (
        /* ── Local studio video (white background) ── */
        <div className="w-full rounded-xl overflow-hidden"
          style={{ background: '#000', border: '1px solid rgba(255,255,255,0.06)' }}>
          <video
            src="/preview/bermuda-595.mp4"
            autoPlay muted loop playsInline controls
            className="w-full h-auto block"
            style={{ maxHeight: '72vh', objectFit: 'contain', background: '#000' }}
          />
        </div>
      ) : (
        /* ── 360 rotate ── */
        <div ref={stageRef}
          className="relative w-full select-none"
          style={{ touchAction: 'none', cursor: dragging.current ? 'grabbing' : 'grab', minHeight: 380 }}
          onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU} onPointerCancel={onPU}>

          {/* Degree chip */}
          <div className="absolute top-4 left-4 z-10 font-mono text-[10px] tabular-nums text-white/20 border border-white/6 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            {Math.round(norm)}°
          </div>

          {/* Ambient */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse at ${cursor.x*100}% ${cursor.y*100}%, rgba(180,210,255,0.05) 0%, transparent 45%),
                         radial-gradient(ellipse at 50% 85%, rgba(20,50,140,0.25) 0%, transparent 55%)`,
          }} />

          {/* Ground lines */}
          <div className="absolute bottom-16 inset-x-0 pointer-events-none" style={{ height: 100 }}>
            {[0,1,2,3].map(i => (
              <div key={i} className="absolute inset-x-0" style={{
                bottom: i * 24, height: 1,
                background: `linear-gradient(to right, transparent, rgba(255,255,255,${0.03 - i*0.005}), transparent)`,
              }} />
            ))}
          </div>

          {/* Boat */}
          <div className="relative z-10 pt-10 pb-4 px-6 flex items-center justify-center">
            <div style={{
              transform: `perspective(1800px) rotateY(${rotY}deg) scaleX(${scaleX})`,
              filter: `brightness(${bright}) drop-shadow(0 40px 80px rgba(0,5,30,0.9))`,
              transition: dragging.current ? 'none' : 'transform 0.05s ease',
              willChange: 'transform',
            }}>
              <Image src="/preview/bermuda-595.png" alt="Bermuda 595 Cuddy"
                width={900} height={440} className="w-full max-w-3xl h-auto object-contain"
                draggable={false} priority />
            </div>
          </div>

          {/* Shadow */}
          <div className="pointer-events-none flex justify-center" style={{ marginTop: '-3rem' }}>
            <div style={{
              width: `${48 + Math.abs(rotY) * 0.8}%`, height: 16,
              background: 'radial-gradient(ellipse, rgba(0,5,30,0.85) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }} />
          </div>
        </div>
      )}

      {/* Scrubber (rotate mode only) */}
      {mode === 'rotate' && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <p className={`text-[10px] uppercase tracking-[0.3em] text-white/25 transition-opacity duration-500 ${hinted ? 'opacity-0' : 'opacity-100'}`}>
            ← Arrastrá para rotar →
          </p>
          <div className="flex items-center gap-3 w-56">
            <span className="font-mono text-[9px] text-white/15">0°</span>
            <input type="range" min={0} max={360} value={norm}
              onChange={e => { stopInertia(); setRot(+e.target.value); setHinted(true); }}
              className="flex-1 accent-white opacity-30 hover:opacity-70 transition-opacity cursor-pointer" />
            <span className="font-mono text-[9px] text-white/15">360°</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function Bermuda595Page() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  useReveal();

  return (
    <>
      <style>{`
        .reveal { opacity:0; transform:translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .reveal.in { opacity:1; transform:none; }
        .reveal.d1 { transition-delay:0.1s; }
        .reveal.d2 { transition-delay:0.2s; }
        .reveal.d3 { transition-delay:0.32s; }
        .reveal.d4 { transition-delay:0.44s; }
        .hairline  { height:1px; background:rgba(255,255,255,0.06); }
      `}</style>

      <main className="bg-[#080808] text-white overflow-x-hidden" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        <FloatingNav />

        {/* ── HERO — YouTube, letterboxed ───────────────── */}
        <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">

          {/* Local 1080p video — object-cover, fills any screen */}
          <video
            className="absolute inset-0 w-full h-full border-0"
            src="/preview/bermuda-hero.mp4"
            autoPlay muted loop playsInline
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.75 }}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to bottom, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0) 15%, rgba(8,8,8,0) 50%, rgba(8,8,8,0.85) 82%, rgba(8,8,8,1) 100%)',
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to right, rgba(8,8,8,0.55) 0%, transparent 45%)',
          }} />
          {/* Bottom fade to page background — seamless transition */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
            height: '18vh',
            background: 'linear-gradient(to bottom, transparent, #080808)',
          }} />

          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-14 pb-20 md:pb-28">
            <p className="reveal font-mono text-[10px] uppercase tracking-[0.42em] text-white/35 mb-5">
              Bermuda · Serie Cuddy · 2025
            </p>
            <h1 className="reveal d1 font-black tracking-tighter leading-none"
              style={{ fontSize: 'clamp(5rem, 13vw, 11rem)' }}>
              595<br />
              <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.28)', color: 'transparent' }}>
                CUDDY
              </span>
            </h1>
            <p className="reveal d2 mt-6 text-white/40 max-w-xs text-base leading-relaxed">
              Performance, confort y diseño en cada travesía.
            </p>

            {/* Stats */}
            <div className="reveal d3 mt-10 flex items-center gap-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {[['150 HP','Potencia'],['55 km/h','Velocidad'],['6','Personas']].map(([v,l]) => (
                <div key={l}>
                  <p className="text-2xl font-black tracking-tighter">{v}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TAGLINE ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-14 py-14 md:py-20">
          <div className="reveal md:grid md:grid-cols-12 md:gap-12 items-center">
            <div className="md:col-span-7">
              <h2 className="font-black tracking-tighter leading-none text-white/90"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
                Desde Tigre<br />
                <span className="text-white/25">al mundo.</span>
              </h2>
            </div>
            <div className="md:col-span-5 mt-6 md:mt-0 reveal d2">
              <p className="text-white/35 leading-relaxed text-sm">
                Fabricante argentino líder desde 1961. Más de 10.000 embarcaciones entregadas a través de una red exclusiva de concesionarios en todo el país.
              </p>
            </div>
          </div>
        </section>

        {/* ── PRODUCT VIEWER ──────────────────────────────── */}
        <section className="py-16 md:py-24"
          style={{ background: 'linear-gradient(180deg, #080808 0%, #0a1020 50%, #080808 100%)' }}>
          <div className="max-w-7xl mx-auto px-6 md:px-14">
            <div className="reveal flex items-end justify-between mb-12">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-white/22 mb-2">Vista interactiva</p>
                <h3 className="font-black tracking-tighter text-3xl md:text-5xl">595 Cuddy</h3>
              </div>
            </div>
            <div className="reveal d1">
              <ProductViewer />
            </div>
          </div>
        </section>

        {/* ── SPECS ───────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-14 py-24 md:py-36">
          <div className="reveal flex items-center gap-6 mb-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-white/22 flex-shrink-0">Especificaciones</p>
            <div className="hairline flex-1" />
          </div>

          {/* Double-bezel container */}
          <div className="rounded-2xl p-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="rounded-[calc(1rem-1px)] overflow-hidden" style={{ background: '#0a0a0a' }}>
              <div className="grid grid-cols-2 md:grid-cols-3">
                {SPECS.map((s, i) => (
                  <div key={s.l}
                    className={`reveal d${(i % 3) + 1} p-8 md:p-12 group hover:bg-white/[0.02] transition-colors duration-500`}
                    style={{
                      borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      borderBottom: i < 3       ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                    <p className="font-black tracking-tighter leading-none group-hover:text-white transition-colors duration-400"
                      style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: 'rgba(255,255,255,0.88)' }}>
                      {s.v}
                      <span style={{ fontSize: '0.35em', marginLeft: '0.2em', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em' }}>{s.u}</span>
                    </p>
                    <p className="font-mono mt-3 text-[9px] uppercase tracking-[0.3em] text-white/25">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-14 pb-24 md:pb-36">
          <div className="reveal flex items-center gap-6 mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-white/22 flex-shrink-0">Galería</p>
            <div className="hairline flex-1" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 auto-rows-[180px] md:auto-rows-[210px] gap-2 md:gap-2.5">
            {GALLERY.map((item, i) => (
              <button
                key={item.src}
                onClick={() => setLightbox(item.src)}
                className={`reveal d${(i % 3) + 1} relative overflow-hidden rounded-xl group ${item.span}`}
                style={{ border: '1px solid rgba(255,255,255,0.04)' }}
              >
                <Image src={item.src} alt={`Bermuda ${i+1}`} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/0 transition-colors duration-500" />
              </button>
            ))}
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────── */}
        <section className="border-y border-white/[0.05] py-18">
          <div className="max-w-7xl mx-auto px-6 md:px-14 py-16">
            <div className="grid md:grid-cols-4 gap-10">
              {[
                ['Cabina Cuddy',       'Espacio interior privado para travesías largas.'],
                ['Casco en V profundo','Estabilidad en cualquier condición del agua.'],
                ['Consola central',    'Ergonomía y visibilidad total de la navegación.'],
                ['Toldo Bimini',       'Protección UV incluida de fábrica.'],
              ].map(([n, d], i) => (
                <div key={n} className={`reveal d${i+1}`}>
                  <div className="w-6 h-px bg-white/18 mb-6" />
                  <p className="font-bold tracking-tight text-white/80 mb-2">{n}</p>
                  <p className="text-white/30 text-sm leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section id="contacto" className="max-w-7xl mx-auto px-6 md:px-14 py-24 md:py-36">
          <div className="reveal md:flex items-end justify-between gap-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-white/22 mb-6">Contacto</p>
              <h2 className="font-black tracking-tighter leading-none"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)' }}>
                Tu próxima<br />
                <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.22)', color: 'transparent' }}>
                  lancha.
                </span>
              </h2>
            </div>
            <div className="reveal d2 mt-10 md:mt-0 flex flex-col md:items-end gap-5">
              <p className="text-white/30 text-sm leading-relaxed md:text-right max-w-xs">
                Cotizá tu Bermuda 595 Cuddy o encontrá el concesionario más cercano.
              </p>
              <div className="flex items-center gap-3">
                <a href="#"
                  className="group flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full bg-white hover:bg-white/90 transition-colors duration-300">
                  <span className="text-black text-sm font-semibold tracking-wide">Cotizá ahora</span>
                  <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </a>
                <a href="#" className="text-white/35 hover:text-white/70 text-sm transition-colors duration-300 px-2">
                  Ver concesionarios
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer className="border-t border-white/5 px-6 py-7 md:px-14">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <Image src="/preview/logo-bermuda.png" alt="Bermuda" width={80} height={26} className="h-5 w-auto object-contain opacity-20" />
            <p className="font-mono text-[9px] text-white/15">© 2025 Bermuda Lanchas. Todos los derechos reservados.</p>
            <p className="font-mono text-[9px] text-white/15">
              Diseñado por{' '}
              <a href="https://sparkdigital.agency" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">
                Spark Digital Agency
              </a>
            </p>
          </div>
        </footer>

        {/* ── LIGHTBOX ──────────────────────────────────────── */}
        {lightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', cursor: 'zoom-out' }}
            onClick={() => setLightbox(null)}>
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)' }}
              onClick={() => setLightbox(null)}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M12 1L1 12M1 1l11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="max-w-6xl w-full" onClick={e => e.stopPropagation()}>
              <Image src={lightbox} alt="" width={1400} height={900}
                className="w-full h-auto object-contain max-h-[88vh] rounded-xl" />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
