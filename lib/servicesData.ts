/**
 * Service detail content.
 *
 * One entry per service, drives /services/[slug] pages. All copy is EN/ES.
 * To edit or add a service, edit this file, no code changes needed.
 */

export type ServiceSlug =
  | 'pipeline' | 'autopilot' | 'agent' | 'voice'
  | 'funnels'  | 'sites'     | 'apps'  | 'visibility';

export type Bi = { en: string; es: string };

export type ServiceDetail = {
  slug: ServiceSlug;
  num: string;
  name: Bi;
  kicker: Bi;
  /** One-sentence promise, used as the hero lead */
  lead: Bi;
  /** Long-form intro paragraph */
  intro: Bi;
  /** 3, 6 items, what's included in the engagement */
  includes: { en: string[]; es: string[] };
  /** How we deliver, ordered steps */
  process: {
    title: Bi;
    body: Bi;
  }[];
  /** Concrete outcomes the client experiences */
  outcomes: Bi[];
  /** Who this is for, plain language */
  goodFor: Bi;
  /** Frequently asked, keeps SEO + reduces sales friction */
  faq: { q: Bi; a: Bi }[];
};

export const SERVICES_DETAIL: ServiceDetail[] = [
  {
    slug: 'pipeline',
    num: '01',
    name:   { en: 'Pipeline',            es: 'Pipeline' },
    kicker: { en: 'CRM + GoHighLevel',   es: 'CRM + GoHighLevel' },
    lead: {
      en: 'One source of truth for every lead, every conversation, every deal.',
      es: 'Una sola fuente de verdad para cada lead, conversación y deal.',
    },
    intro: {
      en: 'Most sales teams do not have a lead leak problem. They have a lead visibility problem. We build a GoHighLevel CRM that captures every touchpoint, routes work to the right person, and shows you where the money is stuck.',
      es: 'La mayoría de los equipos de ventas no tienen un problema de fuga de leads. Tienen un problema de visibilidad. Construimos un CRM en GoHighLevel que captura cada punto de contacto, distribuye el trabajo a la persona correcta y te muestra dónde está trabada la plata.',
    },
    includes: {
      en: [
        'GoHighLevel CRM setup, fully configured for your business',
        'Custom pipeline stages that match how you actually sell',
        'Lead routing rules, ownership and hand-offs defined',
        'Custom fields, tags, and segments for reporting',
        'Data migration from your existing tools',
        'Team onboarding, training, and playbooks',
      ],
      es: [
        'Setup completo de GoHighLevel para tu negocio',
        'Etapas de pipeline a medida de cómo vendés',
        'Reglas de routing, propiedad y hand-offs definidos',
        'Custom fields, tags y segmentos para reportes',
        'Migración de datos desde tus herramientas actuales',
        'Onboarding, entrenamiento y playbooks del equipo',
      ],
    },
    process: [
      {
        title: { en: 'Audit',     es: 'Auditoría' },
        body: {
          en: 'We map every place a lead currently touches your business, forms, calls, ads, referrals, and find where visibility drops.',
          es: 'Mapeamos cada lugar donde un lead toca tu negocio hoy: formularios, llamadas, ads, referidos, y encontramos dónde se pierde la visibilidad.',
        },
      },
      {
        title: { en: 'Design',    es: 'Diseño' },
        body: {
          en: 'Pipeline stages, routing rules, and reporting are designed around how your team actually works, not a generic template.',
          es: 'Las etapas del pipeline, las reglas de routing y los reportes se diseñan según cómo trabaja tu equipo, no según una plantilla genérica.',
        },
      },
      {
        title: { en: 'Build',     es: 'Build' },
        body: {
          en: 'We configure GoHighLevel end to end, import your data, wire up integrations, and stress-test with real leads.',
          es: 'Configuramos GoHighLevel de punta a punta, importamos tus datos, conectamos integraciones y probamos con leads reales.',
        },
      },
      {
        title: { en: 'Handoff',   es: 'Handoff' },
        body: {
          en: 'Your team gets trained, documented playbooks, and 30 days of hyper-care so adoption sticks.',
          es: 'Tu equipo recibe entrenamiento, playbooks documentados y 30 días de hyper-care para que la adopción funcione.',
        },
      },
    ],
    outcomes: [
      { en: 'Every lead in one place, no more spreadsheet chaos.', es: 'Cada lead en un solo lugar, se acabó el caos de las planillas.' },
      { en: 'Reps know exactly which deal to work on next.',       es: 'Cada vendedor sabe exactamente qué deal trabajar después.' },
      { en: 'Leadership sees pipeline health in real time.',       es: 'La gerencia ve el estado del pipeline en tiempo real.' },
    ],
    goodFor: {
      en: 'Teams closing between $50k and $1M/month who are still running sales on spreadsheets, memory, or a CRM nobody uses.',
      es: 'Equipos que facturan entre $50k y $1M/mes y siguen manejando ventas en planillas, memoria o un CRM que nadie usa.',
    },
    faq: [
      {
        q: { en: 'Why GoHighLevel and not HubSpot or Salesforce?', es: '¿Por qué GoHighLevel y no HubSpot o Salesforce?' },
        a: {
          en: 'GoHighLevel bundles CRM, automation, SMS, email, calendars, and funnels at a flat monthly cost. For growth-stage teams it is faster to ship and cheaper to own than stitching together three enterprise SaaS tools.',
          es: 'GoHighLevel combina CRM, automatización, SMS, email, calendarios y funnels a un costo mensual plano. Para equipos en crecimiento es más rápido de implementar y más barato que combinar tres SaaS enterprise.',
        },
      },
      {
        q: { en: 'How long does the build take?',                 es: '¿Cuánto lleva el build?' },
        a: {
          en: 'Standard pipeline builds ship in 3 to 5 weeks. Complex multi-team setups can run 6 to 8. We give you a fixed timeline before we start.',
          es: 'Un build estándar de pipeline se entrega en 3 a 5 semanas. Configuraciones complejas con varios equipos pueden llevar 6 a 8. Te damos una timeline fija antes de arrancar.',
        },
      },
    ],
  },
  {
    slug: 'autopilot',
    num: '02',
    name:   { en: 'Autopilot',       es: 'Autopilot' },
    kicker: { en: 'Automations',     es: 'Automatizaciones' },
    lead: {
      en: 'Follow-ups, hand-offs, reporting, all running while you sleep.',
      es: 'Seguimientos, transferencias, reportes, todo corriendo mientras dormís.',
    },
    intro: {
      en: 'Sales operations are 80% repeat work. We identify the repetitive tasks costing your team hours a day, then automate them cleanly. Not a Zapier spaghetti, real workflows built on your CRM.',
      es: 'Las operaciones de venta son 80% trabajo repetitivo. Identificamos las tareas que le cuestan horas al día a tu equipo y las automatizamos con prolijidad. No un enredo de Zaps, workflows reales sobre tu CRM.',
    },
    includes: {
      en: [
        'Follow-up sequences (email, SMS, WhatsApp) tied to lead behavior',
        'Automatic lead routing, notification, and hand-off logic',
        'Meeting reminders, no-show recovery, and re-engagement flows',
        'Daily and weekly operations reports emailed to leadership',
        'Integration with your calendar, telephony, and payment stack',
        'Monitoring dashboard so you can see every automation live',
      ],
      es: [
        'Secuencias de seguimiento (email, SMS, WhatsApp) según comportamiento',
        'Routing automático de leads, notificación y lógica de hand-off',
        'Recordatorios de reuniones, recuperación de no-shows y re-engagement',
        'Reportes diarios y semanales enviados a la gerencia',
        'Integración con tu calendario, telefonía y stack de pagos',
        'Dashboard de monitoreo para ver cada automatización en vivo',
      ],
    },
    process: [
      {
        title: { en: 'Time audit',   es: 'Auditoría de tiempo' },
        body: {
          en: 'We shadow your team for a week and quantify exactly where hours are lost to repetitive work.',
          es: 'Acompañamos a tu equipo por una semana y cuantificamos exactamente dónde se pierden horas en trabajo repetitivo.',
        },
      },
      {
        title: { en: 'Prioritize',   es: 'Priorizar' },
        body: {
          en: 'We pick the top three flows that recover the most hours per week, and build them first.',
          es: 'Elegimos los tres flujos que recuperan más horas por semana y esos son los que construimos primero.',
        },
      },
      {
        title: { en: 'Ship',         es: 'Entregar' },
        body: {
          en: 'Each workflow is built, tested with a canary batch of real leads, then rolled out to the full team.',
          es: 'Cada workflow se construye, se prueba con un lote canario de leads reales y luego se despliega al equipo completo.',
        },
      },
      {
        title: { en: 'Compound',     es: 'Componer' },
        body: {
          en: 'Every quarter we add three more flows. The system gets sharper, not messier.',
          es: 'Cada trimestre agregamos tres flujos más. El sistema mejora, no se ensucia.',
        },
      },
    ],
    outcomes: [
      { en: 'Reps stop chasing dead leads.',                        es: 'Los vendedores dejan de perseguir leads muertos.' },
      { en: 'No lead waits more than 5 minutes for a first reply.', es: 'Ningún lead espera más de 5 minutos por una primera respuesta.' },
      { en: 'Weekly reports arrive without anyone building them.',  es: 'Los reportes semanales llegan sin que nadie los arme.' },
    ],
    goodFor: {
      en: 'Businesses whose team is buried in follow-ups, admin, and status meetings instead of selling or building.',
      es: 'Negocios cuyo equipo está enterrado en seguimientos, admin y reuniones de status en lugar de vender o construir.',
    },
    faq: [
      {
        q: { en: 'Will this replace anyone on my team?', es: '¿Esto reemplaza a alguien de mi equipo?' },
        a: {
          en: 'No. It removes the repetitive work so your team can focus on high-value calls, closings, and strategy. Same headcount, more output.',
          es: 'No. Elimina el trabajo repetitivo para que tu equipo pueda enfocarse en llamadas de alto valor, cierres y estrategia. La misma gente, más output.',
        },
      },
    ],
  },
  {
    slug: 'agent',
    num: '03',
    name:   { en: 'The Agent',   es: 'El Agente' },
    kicker: { en: 'AI agents',   es: 'Agentes IA' },
    lead: {
      en: 'An on-site AI that qualifies, books, and answers, 24/7.',
      es: 'Una IA en tu sitio que califica, agenda y responde, 24/7.',
    },
    intro: {
      en: 'A live chat that actually knows your business. We train a custom AI agent on your services, pricing, and objections. It qualifies visitors, answers real questions, and books calls directly on your calendar, day or night.',
      es: 'Un chat en vivo que realmente conoce tu negocio. Entrenamos un agente de IA personalizado con tus servicios, precios y objeciones. Califica visitantes, responde preguntas reales y agenda llamadas directo en tu calendario, día y noche.',
    },
    includes: {
      en: [
        'Custom knowledge base trained on your services and FAQs',
        'Qualification logic that filters serious leads from tire-kickers',
        'Direct calendar booking via Cal.com or GoHighLevel',
        'Lead capture straight into your CRM with full conversation history',
        'Human handoff for complex questions',
        'Ongoing tuning based on real conversations',
      ],
      es: [
        'Base de conocimiento personalizada con tus servicios y FAQs',
        'Lógica de calificación que filtra leads serios de curiosos',
        'Agendamiento directo vía Cal.com o GoHighLevel',
        'Captura de leads directo en tu CRM con el historial completo',
        'Handoff humano para preguntas complejas',
        'Ajuste continuo basado en conversaciones reales',
      ],
    },
    process: [
      { title: { en: 'Train',   es: 'Entrenar' }, body: { en: 'We ingest your site, sales scripts, FAQs, and pricing to build the agent knowledge base.', es: 'Ingerimos tu sitio, scripts de venta, FAQs y precios para armar la base de conocimiento del agente.' } },
      { title: { en: 'Design',  es: 'Diseñar' }, body: { en: 'Qualification logic, tone, and escalation rules are defined for your business.',           es: 'La lógica de calificación, el tono y las reglas de escalamiento se definen para tu negocio.' } },
      { title: { en: 'Deploy',  es: 'Desplegar' }, body: { en: 'The agent goes live on your site and starts capturing leads within a day.',              es: 'El agente sale en vivo en tu sitio y empieza a capturar leads en un día.' } },
      { title: { en: 'Tune',    es: 'Ajustar' }, body: { en: 'Every month we review real transcripts and sharpen the responses.',                        es: 'Cada mes revisamos transcripciones reales y afinamos las respuestas.' } },
    ],
    outcomes: [
      { en: 'No lead form abandoned because someone had a question first.', es: 'Ningún formulario abandonado porque alguien tenía una pregunta primero.' },
      { en: 'Calls booked overnight, in every timezone.',                  es: 'Llamadas agendadas de noche, en cualquier huso horario.' },
      { en: 'Your team walks into a calendar full of qualified leads.',    es: 'Tu equipo entra a un calendario lleno de leads calificados.' },
    ],
    goodFor: {
      en: 'Websites that generate traffic but not enough calls, or teams that cannot staff live chat around the clock.',
      es: 'Sitios que generan tráfico pero no llamadas suficientes, o equipos que no pueden bancar chat en vivo 24/7.',
    },
    faq: [
      {
        q: { en: 'Which AI model does it use?', es: '¿Qué modelo de IA usa?' },
        a: {
          en: 'Latest frontier models (Claude, GPT), routed for cost and accuracy. You do not manage models, we do.',
          es: 'Los modelos frontier más recientes (Claude, GPT), ruteados por costo y precisión. Vos no gestionás modelos, nosotros sí.',
        },
      },
    ],
  },
  {
    slug: 'voice',
    num: '04',
    name:   { en: 'The Voice',   es: 'La Voz' },
    kicker: { en: 'AI calls',    es: 'Llamadas con IA' },
    lead: {
      en: 'Voice AI that picks up, calls back, never misses.',
      es: 'Voz con IA que atiende, devuelve llamadas y no se pierde una.',
    },
    intro: {
      en: 'Missed calls are missed revenue. We deploy voice AI that answers every inbound call, qualifies the caller, and either books a meeting or hands off to a human. Outbound flavors will call back missed numbers and re-engage cold leads on demand.',
      es: 'Las llamadas perdidas son plata perdida. Desplegamos voz IA que atiende cada llamada entrante, califica al que llama y agenda una reunión o pasa a un humano. Las variantes outbound devuelven llamadas perdidas y reactivan leads fríos on-demand.',
    },
    includes: {
      en: [
        'Inbound voice AI that answers within 2 rings',
        'Outbound call-back agent for missed calls',
        'Cold-call and reactivation campaigns',
        'Full transcripts logged to your CRM',
        'Local, natural voice quality in EN and ES',
        'Escalation to human on request',
      ],
      es: [
        'Voz IA entrante que atiende en 2 rings',
        'Agente outbound para devolver llamadas perdidas',
        'Campañas de cold-call y reactivación',
        'Transcripciones completas en tu CRM',
        'Voz local y natural en EN y ES',
        'Escalamiento a humano cuando lo piden',
      ],
    },
    process: [
      { title: { en: 'Script',  es: 'Script' },  body: { en: 'We write and iterate the call script with your sales lead.',        es: 'Escribimos e iteramos el script de llamada con tu líder de ventas.' } },
      { title: { en: 'Voice',   es: 'Voz' },     body: { en: 'We select and tune the voice, cadence, and personality.',          es: 'Seleccionamos y ajustamos la voz, cadencia y personalidad.' } },
      { title: { en: 'Route',   es: 'Rutear' },  body: { en: 'Numbers, hand-offs, and CRM logging are wired.',                   es: 'Números, hand-offs y logging en CRM quedan conectados.' } },
      { title: { en: 'Launch',  es: 'Lanzar' },  body: { en: 'We soft-launch with a subset of calls, then scale to full volume.', es: 'Salimos primero con un subset de llamadas y después escalamos.' } },
    ],
    outcomes: [
      { en: 'Zero missed inbound calls.',                                es: 'Cero llamadas entrantes perdidas.' },
      { en: 'Every missed call gets a callback within 60 seconds.',      es: 'Cada llamada perdida recibe callback en menos de 60 segundos.' },
      { en: 'Cold lists get worked without burning out reps.',           es: 'Las listas frías se trabajan sin quemar a los vendedores.' },
    ],
    goodFor: {
      en: 'Home services, medical, real estate, or any business where a missed call is a lost customer.',
      es: 'Servicios para el hogar, salud, real estate, o cualquier negocio donde una llamada perdida es un cliente perdido.',
    },
    faq: [
      {
        q: { en: 'Does it sound robotic?',                                es: '¿Suena robótico?' },
        a: { en: 'Not anymore. Modern voice AI sounds natural. Most callers do not realize it is not human.', es: 'Ya no. La voz IA moderna suena natural. La mayoría no se da cuenta que no es humano.' },
      },
    ],
  },
  {
    slug: 'funnels',
    num: '05',
    name:   { en: 'Funnels',            es: 'Embudos' },
    kicker: { en: 'Funnel creation',    es: 'Creación de embudos' },
    lead: {
      en: 'Single-purpose pages engineered to convert.',
      es: 'Páginas de un solo propósito, diseñadas para convertir.',
    },
    intro: {
      en: 'A funnel is not a landing page. It is one page, one offer, one action, wired to your CRM and your automation. We design, write, and build funnels that turn cold traffic into booked calls or paid customers.',
      es: 'Un embudo no es una landing. Es una página, una oferta, una acción, conectada a tu CRM y a tu automatización. Diseñamos, escribimos y construimos embudos que convierten tráfico frío en llamadas agendadas o clientes que pagan.',
    },
    includes: {
      en: [
        'Offer strategy and positioning',
        'Conversion copywriting (long-form or short-form)',
        'Custom design mapped to the offer',
        'A/B test framework, first two variants included',
        'Analytics, heatmaps, and conversion tracking',
        'CRM and automation integration',
      ],
      es: [
        'Estrategia de oferta y posicionamiento',
        'Copywriting de conversión (long-form o short-form)',
        'Diseño a medida según la oferta',
        'Framework de A/B testing, las dos primeras variantes incluidas',
        'Analytics, heatmaps y tracking de conversión',
        'Integración con CRM y automatizaciones',
      ],
    },
    process: [
      { title: { en: 'Offer',   es: 'Oferta' },  body: { en: 'We sharpen the offer until the page has only one job.',           es: 'Afinamos la oferta hasta que la página tenga un solo objetivo.' } },
      { title: { en: 'Write',   es: 'Escribir' },body: { en: 'Copy that names the problem and closes objections in order.',     es: 'Copy que nombra el problema y cierra objeciones en orden.' } },
      { title: { en: 'Design',  es: 'Diseñar' }, body: { en: 'Every visual choice serves the conversion path.',                 es: 'Cada elección visual sirve al camino de conversión.' } },
      { title: { en: 'Ship',    es: 'Entregar' },body: { en: 'Live in 2 weeks, tracked from day one.',                          es: 'En vivo en 2 semanas, con tracking desde el día uno.' } },
    ],
    outcomes: [
      { en: 'A page you can run paid traffic to without waste.',   es: 'Una página a la que podés mandar tráfico pago sin desperdicio.' },
      { en: 'Clear conversion rate, benchmarkable and improvable.', es: 'Tasa de conversión clara, medible y mejorable.' },
      { en: 'One clean lever to grow revenue.',                    es: 'Una palanca limpia para crecer la facturación.' },
    ],
    goodFor: {
      en: 'Anyone running (or about to run) paid ads. Course launches, service offers, event registrations, waitlists.',
      es: 'Cualquiera que corre (o está por correr) ads pagos. Lanzamientos de curso, ofertas de servicio, registros de evento, waitlists.',
    },
    faq: [
      {
        q: { en: 'How is a funnel different from a website?',       es: '¿En qué se diferencia un embudo de un sitio web?' },
        a: { en: 'A site tells your whole story. A funnel closes one deal. They serve different jobs.', es: 'Un sitio cuenta toda tu historia. Un embudo cierra un solo deal. Sirven trabajos distintos.' },
      },
    ],
  },
  {
    slug: 'sites',
    num: '06',
    name:   { en: 'Sites',    es: 'Sitios' },
    kicker: { en: 'Websites', es: 'Webs' },
    lead: {
      en: 'Fast, modern, conversion-aware websites you actually own.',
      es: 'Sitios web rápidos, modernos, pensados para convertir, que son tuyos.',
    },
    intro: {
      en: 'Your site is a growth surface, not a brochure. We design and build custom websites on modern stacks (Next.js, Sanity CMS) that load instantly, look premium, and convert visitors into leads. No template, no page-builder tax, you own the code.',
      es: 'Tu sitio es una superficie de crecimiento, no un catálogo. Diseñamos y construimos sitios personalizados en stacks modernos (Next.js, Sanity CMS) que cargan al instante, se ven premium y convierten visitantes en leads. Sin plantillas, sin page-builder impuesto, el código es tuyo.',
    },
    includes: {
      en: [
        'Custom design, mapped to your positioning',
        'Modern stack (Next.js on Vercel), sub-1s load times',
        'Headless CMS (Sanity), you edit content without a developer',
        'Conversion architecture (CTAs, capture forms, analytics)',
        'Full SEO foundations (sitemap, schema, metadata)',
        'Multi-language ready (EN, ES out of the box)',
      ],
      es: [
        'Diseño a medida, mapeado a tu posicionamiento',
        'Stack moderno (Next.js en Vercel), carga en menos de 1s',
        'CMS headless (Sanity), editás contenido sin desarrollador',
        'Arquitectura de conversión (CTAs, formularios, analytics)',
        'Fundaciones SEO completas (sitemap, schema, metadata)',
        'Multi-idioma listo (EN, ES por defecto)',
      ],
    },
    process: [
      { title: { en: 'Strategy', es: 'Estrategia' }, body: { en: 'Positioning, IA, and content strategy before pixels.',           es: 'Posicionamiento, IA y estrategia de contenido antes que píxeles.' } },
      { title: { en: 'Design',   es: 'Diseño' },     body: { en: 'Editorial-grade design, brand-forward, conversion-aware.',       es: 'Diseño de nivel editorial, forward con tu marca y pensado para convertir.' } },
      { title: { en: 'Build',    es: 'Build' },      body: { en: 'Custom code, deployed on Vercel, wired to Sanity.',              es: 'Código a medida, deployado en Vercel, conectado a Sanity.' } },
      { title: { en: 'Launch',   es: 'Launch' },     body: { en: 'Launch, then a 30-day polish window based on real analytics.',   es: 'Salida al aire, más una ventana de polish de 30 días basada en analytics.' } },
    ],
    outcomes: [
      { en: 'Lighthouse 90+ on every page, mobile and desktop.',    es: 'Lighthouse 90+ en cada página, mobile y desktop.' },
      { en: 'A site your team is proud to send.',                    es: 'Un sitio que a tu equipo le da orgullo mandar.' },
      { en: 'Editable content, no dev tickets for a headline change.', es: 'Contenido editable, sin ticket a desarrollo para cambiar un titular.' },
    ],
    goodFor: {
      en: 'Founders and marketing leads whose current site does not reflect the quality of the company behind it.',
      es: 'Founders y responsables de marketing cuyo sitio actual no refleja la calidad de la empresa detrás.',
    },
    faq: [
      {
        q: { en: 'Can we migrate from WordPress?',              es: '¿Podemos migrar desde WordPress?' },
        a: { en: 'Yes. We handle content and SEO migration so rankings do not slip.', es: 'Sí. Manejamos migración de contenido y SEO para que no caigan los rankings.' },
      },
    ],
  },
  {
    slug: 'apps',
    num: '07',
    name:   { en: 'Apps',      es: 'Apps' },
    kicker: { en: 'Web apps',  es: 'Aplicaciones web' },
    lead: {
      en: 'Portals, dashboards, internal tools. Working software, shipped.',
      es: 'Portales, dashboards, herramientas internas. Software real, entregado.',
    },
    intro: {
      en: 'Custom software without the enterprise-agency tax. Client portals, internal ops tools, admin dashboards, integration middleware. We ship in weeks, not quarters, and hand you the code.',
      es: 'Software a medida sin el costo de agencia enterprise. Portales de cliente, herramientas internas de ops, dashboards de admin, middleware de integración. Entregamos en semanas, no en trimestres, y te dejamos el código.',
    },
    includes: {
      en: [
        'Discovery, scope, and fixed timeline',
        'Product design (UX + UI) mapped to the actual workflow',
        'Modern stack (Next.js, TypeScript, Postgres, Vercel)',
        'Authentication, roles, and permissioning',
        'API integrations with your existing tools',
        'Documented handoff, or ongoing retainer',
      ],
      es: [
        'Discovery, alcance y timeline fija',
        'Diseño de producto (UX + UI) mapeado al flujo real',
        'Stack moderno (Next.js, TypeScript, Postgres, Vercel)',
        'Autenticación, roles y permisos',
        'Integraciones API con tus herramientas actuales',
        'Handoff documentado, o retainer continuo',
      ],
    },
    process: [
      { title: { en: 'Discovery', es: 'Discovery' }, body: { en: 'We map the real workflow, users, and job to be done.',             es: 'Mapeamos el flujo real, los usuarios y el trabajo a hacer.' } },
      { title: { en: 'Design',    es: 'Diseño' },    body: { en: 'Clickable prototype before writing a line of code.',                 es: 'Prototipo clickeable antes de escribir una línea de código.' } },
      { title: { en: 'Build',     es: 'Build' },     body: { en: 'Weekly ship cycles, working software in every review.',              es: 'Ciclos de entrega semanales, software funcionando en cada review.' } },
      { title: { en: 'Support',   es: 'Soporte' },   body: { en: 'Post-launch retainer available, or a clean documented handoff.',    es: 'Retainer post-lanzamiento disponible, o un handoff documentado prolijo.' } },
    ],
    outcomes: [
      { en: 'Software that fits how you actually work.',            es: 'Software que se ajusta a cómo realmente trabajás.' },
      { en: 'No SaaS dependency you cannot control.',                es: 'Sin dependencia de un SaaS que no podés controlar.' },
      { en: 'A codebase your future team can extend.',              es: 'Un codebase que tu equipo futuro puede extender.' },
    ],
    goodFor: {
      en: 'Ops-heavy businesses hitting the limits of spreadsheets, or teams whose SaaS stack cannot do what they need.',
      es: 'Negocios con mucha operación llegando al límite de las planillas, o equipos cuyo stack SaaS no hace lo que necesitan.',
    },
    faq: [
      {
        q: { en: 'Do we own the code?',   es: '¿El código es nuestro?' },
        a: { en: 'Yes, always. The repo is transferred to you at handoff.', es: 'Sí, siempre. El repo se transfiere a vos al momento del handoff.' },
      },
    ],
  },
  {
    slug: 'visibility',
    num: '08',
    name:   { en: 'Visibility', es: 'Visibilidad' },
    kicker: { en: 'SEO',        es: 'SEO' },
    lead: {
      en: 'Get found by people already looking. Traffic that compounds.',
      es: 'Que te encuentren los que ya están buscando. Tráfico que se acumula.',
    },
    intro: {
      en: 'Paid ads stop when the budget stops. SEO builds an asset that keeps sending traffic while you sleep. We run a technical audit, fix the foundations, then publish content that ranks and converts.',
      es: 'Los ads paran cuando para el presupuesto. El SEO construye un activo que sigue mandando tráfico mientras dormís. Corremos una auditoría técnica, arreglamos las fundaciones y publicamos contenido que rankea y convierte.',
    },
    includes: {
      en: [
        'Technical SEO audit (site speed, indexing, schema)',
        'Keyword research mapped to buyer intent',
        'On-page optimization across your money pages',
        'Content production, 4 to 12 pieces per month',
        'Internal linking and topical authority structure',
        'Monthly reporting on rankings, traffic, and conversions',
      ],
      es: [
        'Auditoría SEO técnica (velocidad, indexación, schema)',
        'Keyword research mapeado a intención de compra',
        'Optimización on-page en tus páginas comerciales',
        'Producción de contenido, 4 a 12 piezas por mes',
        'Interlinking y estructura de autoridad tópica',
        'Reporte mensual de rankings, tráfico y conversiones',
      ],
    },
    process: [
      { title: { en: 'Audit',    es: 'Auditoría' }, body: { en: 'Technical health check plus competitive landscape map.',                es: 'Chequeo técnico más mapa competitivo.' } },
      { title: { en: 'Strategy', es: 'Estrategia' },body: { en: 'A prioritized roadmap of pages to publish and fix, in order.',           es: 'Un roadmap priorizado de páginas a publicar y arreglar, en orden.' } },
      { title: { en: 'Execute',  es: 'Ejecutar' }, body: { en: 'Content shipped and optimized on a monthly cadence.',                    es: 'Contenido entregado y optimizado en cadencia mensual.' } },
      { title: { en: 'Compound', es: 'Componer' }, body: { en: 'Winners get expanded, losers get retired, the site gets sharper.',       es: 'Los que ganan se expanden, los que pierden se retiran, el sitio mejora.' } },
    ],
    outcomes: [
      { en: 'Rankings climb month over month, not week over week.',                    es: 'Los rankings suben mes a mes, no semana a semana.' },
      { en: 'Organic traffic becomes a real percentage of your pipeline.',             es: 'El tráfico orgánico se vuelve un porcentaje real de tu pipeline.' },
      { en: 'An asset that outlasts any paid channel.',                                es: 'Un activo que dura más que cualquier canal pago.' },
    ],
    goodFor: {
      en: 'Businesses with something to say, whose customers are already searching for it, but who are invisible in Google today.',
      es: 'Negocios con algo para decir, cuyos clientes ya lo están buscando, pero que hoy son invisibles en Google.',
    },
    faq: [
      {
        q: { en: 'How long until we see results?',                                    es: '¿Cuánto tarda en verse resultado?' },
        a: { en: 'First movement in 60 to 90 days, meaningful traffic gain in 4 to 6 months. Anyone promising faster is misleading you.', es: 'Primer movimiento en 60 a 90 días, ganancia real de tráfico en 4 a 6 meses. Cualquiera que prometa más rápido te está mintiendo.' },
      },
    ],
  },
];

export function getService(slug: string): ServiceDetail | undefined {
  return SERVICES_DETAIL.find((s) => s.slug === slug);
}
