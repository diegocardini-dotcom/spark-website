'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

const SPECS = [
  { label: 'Eslora total', value: '5,95 m' },
  { label: 'Manga', value: '2,35 m' },
  { label: 'Puntal', value: '0,95 m' },
  { label: 'Peso', value: '850 kg' },
  { label: 'Motor max', value: '150 HP' },
  { label: 'Capacidad', value: '6 personas' },
  { label: 'Combustible', value: '100 L' },
  { label: 'Velocidad max', value: '55 km/h' },
];

const FEATURES = [
  {
    icon: '⚓',
    title: 'Cabina Cuddy',
    desc: 'Espacio interior privado con capacidad para descanso en travesías largas.',
  },
  {
    icon: '🛡️',
    title: 'Casco en V profundo',
    desc: 'Diseño de alto rendimiento que garantiza estabilidad en cualquier condición.',
  },
  {
    icon: '🧭',
    title: 'Consola central',
    desc: 'Panel de instrumentos ergonómico con toda la información de navegación.',
  },
  {
    icon: '☀️',
    title: 'Toldo incorporado',
    desc: 'Bimini top resistente a los rayos UV, incluido de fábrica.',
  },
];

const GALLERY = [
  '/preview/bermuda-g1.jpg',
  '/preview/bermuda-g2.jpg',
  '/preview/bermuda-g3.jpg',
  '/preview/bermuda-g4.jpg',
  '/preview/bermuda-g5.jpg',
];

const COLORS = [
  { name: 'Azul Pacífico', hex: '#1a4fa8', ring: '#2a6ad8' },
  { name: 'Rojo Fuego',    hex: '#9b1c1c', ring: '#c82828' },
  { name: 'Blanco Náutico',hex: '#dce8f0', ring: '#b0c8dc' },
  { name: 'Gris Titanio',  hex: '#4a5568', ring: '#6a7d94' },
  { name: 'Negro Midnight', hex: '#1a1f2e', ring: '#2a3040' },
];

/* ─── 360 Viewer ─────────────────────────────────────────── */
function Viewer360() {
  const animRef = useRef<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const startXRef = useRef(0);
  const startRotRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velRef = useRef(0);

  // Gentle auto-pan on mount
  useEffect(() => {
    let frame: number;
    let t = 0;
    const spin = () => {
      t += 0.4;
      setRotation(t);
      if (t < 60) frame = requestAnimationFrame(spin);
    };
    frame = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(frame);
  }, []);

  const stopInertia = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
  };

  const startInertia = () => {
    let vel = velRef.current;
    const tick = () => {
      vel *= 0.93;
      if (Math.abs(vel) < 0.05) return;
      setRotation(r => r + vel);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    stopInertia();
    setDragging(true);
    setHintVisible(false);
    startXRef.current = e.clientX;
    startRotRef.current = rotation;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) velRef.current = (e.clientX - lastXRef.current) / dt * 16;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
    setRotation(startRotRef.current + (e.clientX - startXRef.current) * 0.45);
  };

  const onPointerUp = () => {
    setDragging(false);
    startInertia();
  };

  const norm = ((rotation % 360) + 360) % 360;
  const rotY = Math.sin((norm * Math.PI) / 180) * 20;
  const scaleX = 1 - Math.abs(Math.sin((norm * Math.PI) / 180)) * 0.05;
  const brightness = 1 + Math.sin(((norm + 40) * Math.PI) / 180) * 0.18;
  const shadowShift = Math.sin((norm * Math.PI) / 180) * 50;

  return (
    <div className="relative flex flex-col items-center select-none">
      <div
        className="relative w-full max-w-3xl cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Blue glow behind boat */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(26,79,168,0.45) 0%, transparent 65%)',
            transform: `translateX(${shadowShift * 0.25}px)`,
          }}
        />

        {/* Boat */}
        <div
          style={{
            transform: `perspective(1400px) rotateY(${rotY}deg) scaleX(${scaleX})`,
            filter: `brightness(${brightness}) drop-shadow(0 30px 60px rgba(0,20,80,0.5))`,
            transition: dragging ? 'none' : 'transform 0.04s, filter 0.04s',
            willChange: 'transform',
          }}
        >
          <Image
            src="/preview/bermuda-595.png"
            alt="Bermuda 595 Cuddy"
            width={900}
            height={420}
            className="w-full h-auto object-contain"
            draggable={false}
            priority
          />
        </div>

        {/* Ground reflection */}
        <div
          className="pointer-events-none mx-auto"
          style={{
            marginTop: '-3rem',
            height: '2rem',
            width: `${55 + Math.abs(rotY) * 0.8}%`,
            background: 'radial-gradient(ellipse, rgba(10,20,60,0.7) 0%, transparent 70%)',
            filter: 'blur(8px)',
            transform: `translateX(${shadowShift * 0.12}px)`,
          }}
        />

        {/* Degree chip */}
        <div className="absolute top-3 right-3 font-mono text-[10px] tabular-nums text-white/25 bg-white/5 rounded px-2 py-0.5">
          {Math.round(norm)}°
        </div>
      </div>

      {/* Hint */}
      <div
        className="mt-3 flex items-center gap-2 text-white/35 text-sm transition-opacity duration-500"
        style={{ opacity: hintVisible ? 1 : 0 }}
      >
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
          <path d="M1 5h18M3 2L1 5l2 3M17 2l2 3-2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Arrastrá para girar
      </div>

      {/* Scrubber */}
      <input
        type="range" min={0} max={360} value={norm}
        onChange={e => { stopInertia(); setRotation(+e.target.value); setHintVisible(false); }}
        className="mt-5 w-56 accent-blue-500 opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
      />
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function Bermuda595Page() {
  const [tab, setTab] = useState<'specs' | 'features'>('specs');
  const [activeColor, setActiveColor] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#050c1b] text-white overflow-x-hidden">

      {/* Top ambient */}
      <div className="fixed inset-x-0 top-0 h-[50vh] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(26,79,168,0.3) 0%, transparent 65%)' }}
      />

      {/* ── Nav ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 md:px-14 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Image src="/preview/logo-bermuda.png" alt="Bermuda" width={120} height={40} className="h-8 w-auto object-contain" />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#modelos"  className="hover:text-white transition-colors">Modelos</a>
          <a href="#galeria"  className="hover:text-white transition-colors">Galería</a>
          <a href="#contacto" className="hover:text-white transition-colors">Concesionarios</a>
          <a href="#contacto"
            className="text-white bg-[#1a4fa8] px-5 py-1.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Cotizá tu Bermuda
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 px-6 pt-12 pb-4 md:px-14 md:pt-20">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <p className="text-[#4a9eff] text-xs font-mono uppercase tracking-[0.32em] mb-3">
                Serie Cuddy · Modelo 2025
              </p>
              <h1 className="font-black text-5xl md:text-7xl tracking-tight leading-[0.9]">
                Bermuda<br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(95deg,#4a9eff 0%,#ffffff 45%,#a8d4ff 100%)' }}>
                  595 Cuddy
                </span>
              </h1>
              <p className="mt-5 text-white/45 max-w-sm text-base leading-relaxed">
                La evolución perfecta para quien busca rendimiento, confort y diseño en cada travesía.
              </p>
            </div>

            {/* Key stats */}
            <div className="flex gap-8 md:gap-12 pb-1">
              {[['150', 'HP máx'], ['55', 'km/h'], ['6', 'personas']].map(([v, l]) => (
                <div key={l}>
                  <p className="text-4xl font-bold tabular-nums">{v}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-white/35">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Viewer card */}
          <div className="rounded-2xl overflow-hidden border border-white/6 relative"
            style={{ background: 'linear-gradient(180deg,rgba(26,79,168,0.1) 0%,rgba(5,12,27,0) 100%)' }}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(26,79,168,0.18)_0%,transparent_55%)]" />
            <div className="relative py-10 px-4 md:py-14">
              <Viewer360 />
            </div>
          </div>
        </div>
      </section>

      {/* ── Specs / Features ── */}
      <section id="modelos" className="relative z-10 px-6 py-20 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-1 bg-white/5 p-1 rounded-full w-fit mb-10">
            {(['specs','features'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === t
                    ? 'bg-[#1a4fa8] text-white shadow-lg shadow-blue-900/40'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {t === 'specs' ? 'Especificaciones' : 'Equipamiento'}
              </button>
            ))}
          </div>

          {tab === 'specs' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SPECS.map(s => (
                <div key={s.label}
                  className="rounded-xl border border-white/8 p-5 group hover:border-[#1a4fa8]/60 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.025)' }}>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">{s.label}</p>
                  <p className="text-2xl font-bold text-white group-hover:text-[#4a9eff] transition-colors">{s.value}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'features' && (
            <div className="grid md:grid-cols-2 gap-5">
              {FEATURES.map(f => (
                <div key={f.title}
                  className="flex gap-5 rounded-xl border border-white/8 p-6 hover:border-[#1a4fa8]/40 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.025)' }}>
                  <span className="text-3xl mt-0.5 flex-shrink-0">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-white mb-1">{f.title}</p>
                    <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Colors ── */}
      <section className="relative z-10 px-6 pb-16 md:px-14">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/25 mb-5">Colores disponibles</p>
          <div className="flex gap-3 flex-wrap">
            {COLORS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActiveColor(i)}
                className="flex items-center gap-2.5 rounded-full px-4 py-2 text-sm transition-all"
                style={{
                  border: `1px solid ${activeColor === i ? c.ring : c.ring + '40'}`,
                  background: activeColor === i ? c.hex + '30' : c.hex + '15',
                  color: activeColor === i ? '#fff' : 'rgba(255,255,255,0.5)',
                }}
              >
                <span className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                  style={{ background: c.hex, border: `1px solid ${c.ring}` }} />
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="galeria" className="relative z-10 px-6 pb-20 md:px-14">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/25 mb-6">Galería</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightboxImg(src)}
                className={`relative overflow-hidden rounded-xl border border-white/6 hover:border-[#1a4fa8]/50 transition-all group ${
                  i === 0 ? 'col-span-2 md:col-span-2 row-span-1' : ''
                }`}
                style={{ aspectRatio: i === 0 ? '16/9' : '4/3' }}
              >
                <Image
                  src={src}
                  alt={`Bermuda 595 Cuddy — foto ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contacto" className="relative z-10 px-6 pb-24 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{
              background: 'linear-gradient(135deg,rgba(26,79,168,0.25) 0%,rgba(5,12,27,0.85) 100%)',
              border: '1px solid rgba(26,79,168,0.3)',
            }}>
            <div>
              <h2 className="font-black text-3xl md:text-4xl tracking-tight mb-3">¿Listo para navegar?</h2>
              <p className="text-white/45 max-w-md leading-relaxed">
                Encontrá el concesionario más cercano o configurá tu Bermuda 595 Cuddy con los accesorios que necesitás.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <button className="px-8 py-3.5 rounded-full bg-[#1a4fa8] hover:bg-blue-600 font-semibold transition-colors shadow-lg shadow-blue-900/40">
                Cotizá ahora
              </button>
              <button className="px-8 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-white/75 hover:text-white font-semibold transition-colors">
                Ver concesionarios
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-7 md:px-14">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-white/20 text-xs">
          <p>© 2025 Bermuda Lanchas. Todos los derechos reservados.</p>
          <p>
            Sitio diseñado por{' '}
            <a href="https://sparkdigital.agency" target="_blank" rel="noopener noreferrer"
              className="text-[#F8D347] hover:text-yellow-300 transition-colors">
              Spark Digital Agency
            </a>
          </p>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white text-3xl leading-none"
            onClick={() => setLightboxImg(null)}
          >
            ×
          </button>
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <Image
              src={lightboxImg}
              alt="Bermuda 595 Cuddy"
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </main>
  );
}
