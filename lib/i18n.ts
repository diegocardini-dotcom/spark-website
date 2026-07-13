/**
 * All site copy lives here, in two languages.
 * To edit text, just edit the strings below — no code changes needed.
 */
export type Lang = 'en' | 'es';

export const TRANSLATIONS = {
  /* ─────────── NAV ─────────── */
  nav: {
    services: { en: 'Services',  es: 'Servicios' },
    work:     { en: 'Work',      es: 'Trabajos' },
    process:  { en: 'Process',   es: 'Proceso' },
    contact:  { en: 'Contact',   es: 'Contacto' },
    cta:      { en: 'Book a call', es: 'Agendá una llamada' },
  },

  /* ─────────── HERO ─────────── */
  hero: {
    badge:    { en: 'Now booking · Q4 cohort', es: 'Reservando · Cohorte Q4' },
    title1:   { en: 'More attention.',         es: 'Más atención.' },
    title2:   { en: 'More customers.',         es: 'Más clientes.' },
    sub: {
      en: 'We build the CRM, automation, and AI systems that scale your business,',
      es: 'Construimos los sistemas de CRM, automatización e IA que escalan tu negocio,',
    },
    subBold: {
      en: 'without scaling your headcount.',
      es: 'sin escalar tu equipo.',
    },
    ctaPrimary:   { en: 'Book a free strategy call', es: 'Agendá una llamada gratis' },
    ctaSecondary: { en: 'See our work',              es: 'Ver proyectos' },
    trustedBy:    { en: 'Trusted by teams at',       es: 'La confianza de equipos en' },
    pipeline: {
      label:   { en: 'Live system', es: 'Sistema en vivo' },
      capture: { en: 'Capture',  es: 'Captar' },
      qualify: { en: 'Qualify',  es: 'Calificar' },
      nurture: { en: 'Nurture',  es: 'Nutrir' },
      close:   { en: 'Close',    es: 'Cerrar' },
    },
  },

  /* ─────────── METRICS ─────────── */
  metrics: {
    label1: { en: 'Brands served',       es: 'Marcas atendidas' },
    label2: { en: 'Systems shipped',      es: 'Sistemas entregados' },
    label3: { en: 'Building systems',    es: 'Construyendo sistemas' },
    label4: { en: 'Owned by clients',    es: 'Propiedad del cliente' },
    suffix3:{ en: 'yr',                  es: 'años' },
    selectedClients: { en: 'Selected clients', es: 'Clientes seleccionados' },
    clientsTagline: { en: 'From global brands to founder-led teams.', es: 'De marcas globales a equipos fundadores.' },
  },

  /* ─────────── SERVICES ─────────── */
  services: {
    eyebrow: { en: 'What we build',     es: 'Lo que construimos' },
    title1:  { en: 'Eight services.',    es: 'Ocho servicios.' },
    title2:  { en: 'One system',         es: 'Un sistema' },
    title3:  { en: '.',                  es: '.' },
    sub:     {
      en: 'Each piece sharp on its own. Wired together, they compound.',
      es: 'Cada pieza afilada por sí sola. Juntas, multiplican resultados.',
    },
    items: {
      pipeline:  {
        name:   { en: 'Pipeline',         es: 'Pipeline' },
        kicker: { en: 'Spark CRM', es: 'Spark CRM' },
        blurb:  { en: 'One source of truth. Every lead, every conversation, every deal.',
                  es: 'Una sola fuente de verdad. Cada lead, conversación y deal.' },
      },
      autopilot: {
        name:   { en: 'Autopilot',        es: 'Autopilot' },
        kicker: { en: 'Automations',       es: 'Automatizaciones' },
        blurb:  { en: 'Follow-ups, hand-offs, reporting, running while you sleep.',
                  es: 'Seguimientos, transferencias, reportes, funcionando mientras dormís.' },
      },
      agent: {
        name:   { en: 'The Agent',         es: 'El Agente' },
        kicker: { en: 'AI agents',         es: 'Agentes IA' },
        blurb:  { en: 'On-site AI that qualifies, books, and answers, 24/7.',
                  es: 'IA en tu sitio que califica, agenda y responde, 24/7.' },
      },
      voice: {
        name:   { en: 'The Voice',         es: 'La Voz' },
        kicker: { en: 'AI calls',          es: 'Llamadas con IA' },
        blurb:  { en: 'Voice AI that picks up, calls back, never misses.',
                  es: 'Voz con IA que atiende, devuelve llamadas y no se pierde una.' },
      },
      funnels: {
        name:   { en: 'Funnels',           es: 'Embudos' },
        kicker: { en: 'Funnel creation',   es: 'Creación de embudos' },
        blurb:  { en: 'Single-purpose pages engineered to convert.',
                  es: 'Páginas de un solo propósito, diseñadas para convertir.' },
      },
      sites: {
        name:   { en: 'Sites',             es: 'Sitios' },
        kicker: { en: 'Websites',          es: 'Webs' },
        blurb:  { en: 'Fast, modern, conversion-aware sites you actually own.',
                  es: 'Webs rápidas, modernas y pensadas para convertir, tuyas.' },
      },
      apps: {
        name:   { en: 'Apps',              es: 'Apps' },
        kicker: { en: 'Web apps',          es: 'Aplicaciones web' },
        blurb:  { en: 'Portals, dashboards, internal tools. Working software, shipped.',
                  es: 'Portales, dashboards, herramientas internas. Software real, entregado.' },
      },
      visibility: {
        name:   { en: 'Visibility',        es: 'Visibilidad' },
        kicker: { en: 'SEO',               es: 'SEO' },
        blurb:  { en: 'Get found by people already looking. Traffic that compounds.',
                  es: 'Hacé que te encuentren quienes ya buscan. Tráfico que se acumula.' },
      },
    },
  },

  /* ─────────── WORK ─────────── */
  work: {
    eyebrow: { en: 'Selected work',     es: 'Trabajos destacados' },
    title1:  { en: 'Systems shipped.',  es: 'Sistemas entregados.' },
    title2:  { en: 'Outcomes earned',   es: 'Resultados ganados' },
    sub: {
      en: 'Filter by the parts of the system that did the heavy lifting.',
      es: 'Filtrá por las partes del sistema que hicieron el trabajo pesado.',
    },
    filters: {
      all:        { en: 'All',         es: 'Todos' },
      sites:      { en: 'Sites',       es: 'Sitios' },
      funnels:    { en: 'Funnels',     es: 'Embudos' },
      apps:       { en: 'Apps',        es: 'Apps' },
      autopilot:  { en: 'Autopilot',   es: 'Autopilot' },
      visibility: { en: 'SEO',         es: 'SEO' },
      agent:      { en: 'AI Agents',   es: 'Agentes IA' },
      voice:      { en: 'AI Voice',    es: 'Voz IA' },
      pipeline:   { en: 'CRM',         es: 'CRM' },
    },
    empty:   { en: 'No projects under',  es: 'No hay proyectos en' },
    viewCase:{ en: 'View case study',    es: 'Ver caso de estudio' },
    detail: {
      back:        { en: 'All work',             es: 'Todos los trabajos' },
      challenge:   { en: 'The challenge',        es: 'El desafío' },
      approach:    { en: 'What we built',        es: 'Lo que construimos' },
      outcome:     { en: 'The outcome',          es: 'El resultado' },
      gallery:     { en: 'Gallery',              es: 'Galería' },
      next:        { en: 'Next project',         es: 'Siguiente proyecto' },
      client:      { en: 'Client',               es: 'Cliente' },
      year:        { en: 'Year',                 es: 'Año' },
      services:    { en: 'Services',             es: 'Servicios' },
      external:    { en: 'Visit live →',         es: 'Ver en vivo →' },
    },
  },

  /* ─────────── PROCESS ─────────── */
  process: {
    eyebrow: { en: 'How we work',     es: 'Cómo trabajamos' },
    title1:  { en: 'Four steps.',     es: 'Cuatro pasos.' },
    title2:  { en: 'No theatre',      es: 'Sin teatro' },
    steps: {
      s1: {
        title: { en: 'Diagnose', es: 'Diagnosticamos' },
        body:  { en: 'We map your funnel. Find where leads die.',
                 es: 'Mapeamos tu embudo. Encontramos dónde se pierden los leads.' },
      },
      s2: {
        title: { en: 'Design',   es: 'Diseñamos' },
        body:  { en: 'Pipelines, automations, agents, built around the diagnosis.',
                 es: 'Pipelines, automatizaciones, agentes, construidos según el diagnóstico.' },
      },
      s3: {
        title: { en: 'Build',    es: 'Construimos' },
        body:  { en: 'Weekly ship cycles. Working software, not Figma frames.',
                 es: 'Ciclos semanales. Software real, no pantallas de Figma.' },
      },
      s4: {
        title: { en: 'Compound', es: 'Componemos' },
        body:  { en: "Tune what works. Retire what doesn't. The system sharpens.",
                 es: 'Afinamos lo que funciona. Retiramos lo que no. El sistema mejora.' },
      },
    },
  },

  /* ─────────── LIGHT-UP CTA ─────────── */
  lightUp: {
    eyebrow: { en: 'Ready when you are', es: 'Cuando estés listo' },
    title1:  { en: "Let's light up",     es: 'Encendamos' },
    title2:  { en: 'your business',      es: 'tu negocio' },
    sub: {
      en: 'A 30-minute call. We map your pipeline live and show you exactly which part of the system would move the number first. No deck, no pitch.',
      es: 'Una llamada de 30 minutos. Mapeamos tu pipeline en vivo y te mostramos exactamente qué parte del sistema movería los números primero. Sin presentaciones, sin sales pitch.',
    },
    cta: { en: 'Book your call', es: 'Agendá tu llamada' },
  },

  /* ─────────── CONTACT ─────────── */
  contact: {
    eyebrow: { en: 'Start a conversation', es: 'Conversemos' },
    title:   { en: 'Tell us where your funnel leaks.',
               es: 'Contanos por dónde se filtra tu embudo.' },
    sub: {
      en: "Drop a note. We'll come back within one business day.",
      es: 'Escribinos. Te respondemos en un día hábil.',
    },
    bookCta: { en: 'Or book a 30-min call', es: 'O agendá una llamada de 30 min' },
    emailLabel: { en: 'Or email', es: 'O escribinos a' },
    form: {
      name:    { en: 'Name',                  es: 'Nombre' },
      company: { en: 'Company',               es: 'Empresa' },
      email:   { en: 'Email',                 es: 'Email' },
      revenue: { en: 'Monthly revenue (USD)', es: 'Facturación mensual (USD)' },
      revenuePh: { en: 'e.g. 50k to 100k',    es: 'ej. 50k a 100k' },
      message: { en: 'What are you trying to fix?',
                 es: '¿Qué querés resolver?' },
      submit:  { en: 'Send message',          es: 'Enviar mensaje' },
      sending: { en: 'Sending…',              es: 'Enviando…' },
      sent:    { en: 'Sent ✓',                es: 'Enviado ✓' },
      reply:   { en: 'We reply within one business day.',
                 es: 'Respondemos en un día hábil.' },
      error:   { en: 'Something went wrong. Email us directly at hello@sparkdigital.agency.',
                 es: 'Algo salió mal. Escribinos directo a hello@sparkdigital.agency.' },
    },
  },

  /* ─────────── FOOTER ─────────── */
  footer: {
    tagline:  { en: 'Growth infrastructure', es: 'Infraestructura de crecimiento' },
    copyright:{ en: 'Systems that compound.', es: 'Sistemas que se componen.' },
  },
} as const;

/* ───────── Helper: t('hero.title1') ───────── */
export function tr(lang: Lang, path: string): string {
  const parts = path.split('.');
  let cur: any = TRANSLATIONS;
  for (const p of parts) {
    if (cur == null) return path;
    cur = cur[p];
  }
  if (cur && typeof cur === 'object' && (lang in cur)) return cur[lang];
  return typeof cur === 'string' ? cur : path;
}
