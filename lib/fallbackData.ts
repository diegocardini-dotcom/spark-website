/**
 * Real Spark portfolio, sourced from sparkdigital.agency.
 *
 * Project descriptions, partners, and primary mockup screenshots come from
 * the original case study pages. Where the original page lacks copy depth,
 * we've written richer (but honest) editorial copy describing what was built.
 *
 * Gallery / atmospheric photography is Unsplash-sourced ONLY where it
 * complements the real project mockups, never as a substitute for them.
 */
export type FallbackProject = {
  _id: string;
  slug: string;
  title: string;
  client: string;
  partners?: string;
  summary: { en: string; es: string };
  services: string[];
  coverUrl: string;
  heroImage: string;
  gallery?: string[];
  year?: number;
  externalUrl?: string;
  challenge?: { en: string; es: string };
  approach?: { en: string; es: string };
  outcome?: { en: string; es: string };
  facts?: { value: string; label: { en: string; es: string } }[];
};

export const FALLBACK_PROJECTS: FallbackProject[] = [
  {
    _id: 'f-ford',
    slug: 'go-further-ford',
    title: 'Go Further',
    client: 'Ford',
    partners: 'JWT',
    summary: {
      en: 'A casual web-based videogame supporting Ford\'s Latin American "Go Further" campaign, built with JWT, inspired by the Rally model.',
      es: 'Un videojuego casual web para la campaña "Go Further" de Ford en Latinoamérica, junto a JWT, inspirado en el modelo Rally.',
    },
    services: ['sites', 'apps'],
    coverUrl: '/projects/ford-cover.jpg',
    heroImage: '/projects/ford-hero.jpg',
    gallery: [
      '/projects/ford-hero.jpg',
      '/projects/ford-2.png',
    ],
    year: 2018,
    externalUrl: 'https://sparkdigital.agency/project/go-further-ford/',
    challenge: {
      en: 'Translate the energy of the Ford Rally model into a digital campaign people would actively play with, not just see. Built across desktop and mobile, on a regional Latin American footprint.',
      es: 'Trasladar la energía del modelo Rally de Ford a una campaña digital que la gente quisiera jugar, no sólo ver. Pensada para desktop y mobile, con alcance regional en Latinoamérica.',
    },
    approach: {
      en: 'In partnership with JWT, Spark engineered a high-quality casual web game inspired by the Rally driving experience. Smooth controls, branded visuals, shareable score loop.',
      es: 'En sociedad con JWT, Spark desarrolló un casual web game inspirado en la experiencia de manejo del Rally. Controles fluidos, identidad visual de marca, loop de score compartible.',
    },
    outcome: {
      en: 'A campaign asset that doubled as an interactive product, driving session time and brand engagement that a banner ad could never deliver.',
      es: 'Un asset de campaña que funcionó como producto interactivo, generando tiempo de sesión y engagement de marca imposibles para un banner.',
    },
    facts: [
      { value: 'JWT',     label: { en: 'Creative partner',  es: 'Partner creativo' } },
      { value: 'HTML5',   label: { en: 'Cross-platform',    es: 'Multiplataforma'  } },
      { value: 'LATAM',   label: { en: 'Regional reach',    es: 'Alcance regional' } },
    ],
  },
  {
    _id: 'f-arcor',
    slug: 'la-jarra-arcor',
    title: 'La Jarra',
    client: 'Arcor',
    partners: 'Leo Burnett',
    summary: {
      en: 'A cross-platform casual game launching Arcor\'s new juice line, web, iOS, and Android, built with Leo Burnett.',
      es: 'Un juego casual multiplataforma para el lanzamiento de los jugos Arcor, web, iOS y Android, junto a Leo Burnett.',
    },
    services: ['sites', 'apps', 'funnels'],
    coverUrl: '/projects/jarra-cover.jpg',
    heroImage: '/projects/jarra-hero.png',
    gallery: [
      '/projects/jarra-hero.png',
      '/projects/jarra-2.png',
    ],
    year: 2018,
    externalUrl: 'https://sparkdigital.agency/project/la-jarra-arcor/',
    challenge: {
      en: 'Launch a new family-line product with an experience that worked across age groups: playful enough for kids, frictionless enough for parents, all from one codebase.',
      es: 'Lanzar una nueva línea familiar con una experiencia que funcionara entre edades: lúdica para chicos, sin fricción para los padres, todo desde el mismo código.',
    },
    approach: {
      en: 'In collaboration with Leo Burnett, we shipped a single game in three contexts: a responsive web build, plus native iOS and Android applications tuned for tap-and-go play.',
      es: 'En sociedad con Leo Burnett, entregamos un mismo juego en tres contextos: build web responsive, más apps nativas iOS y Android optimizadas para juego inmediato.',
    },
    outcome: {
      en: 'A campaign that lived everywhere the family was, on the home browser, the school-pickup phone, the post-dinner tablet.',
      es: 'Una campaña presente donde estaba la familia, en el navegador del living, el teléfono de la salida del colegio, la tablet después de cenar.',
    },
    facts: [
      { value: 'Leo Burnett', label: { en: 'Creative partner', es: 'Partner creativo' } },
      { value: '3 platforms', label: { en: 'Web · iOS · Android', es: 'Web · iOS · Android' } },
    ],
  },
  {
    _id: 'f-garbarino',
    slug: 'el-rulero-garbarino',
    title: 'El Rulero',
    client: 'Garbarino',
    summary: {
      en: 'A social game riffing on the classic "El Rulero," launched alongside Garbarino\'s "Save the Rustics" campaign, web, iOS, and Android with Facebook play.',
      es: 'Un juego social basado en el clásico "El Rulero", junto a la campaña "Save the Rustics" de Garbarino, web, iOS y Android con juego vía Facebook.',
    },
    services: ['sites', 'apps', 'visibility'],
    coverUrl: '/projects/rulero-cover.jpg',
    heroImage: '/projects/rulero-hero.png',
    gallery: [
      '/projects/rulero-hero.png',
      '/projects/rulero-2.png',
    ],
    year: 2018,
    externalUrl: 'https://sparkdigital.agency/project/el-rulero-garbarino/',
    challenge: {
      en: 'Make a national retail campaign social. Not in the marketing-jargon sense, actually, demonstrably social: friends inviting friends, scores shared, mechanic that compounded with each round.',
      es: 'Hacer social una campaña retail nacional. No en el sentido de la jerga de marketing, social de verdad: amigos invitando amigos, scores compartidos, mecánica que se compone en cada ronda.',
    },
    approach: {
      en: 'We built the game with Facebook authentication so every play roped in someone new, then mirrored the experience natively on iOS and Android so nobody got stuck on the wrong platform.',
      es: 'Construimos el juego con autenticación de Facebook para que cada partida sumara alguien nuevo, y replicamos la experiencia nativamente en iOS y Android para que nadie quedara afuera por la plataforma.',
    },
    facts: [
      { value: 'Facebook', label: { en: 'Social mechanic', es: 'Mecánica social' } },
      { value: '3 platforms', label: { en: 'Web · iOS · Android', es: 'Web · iOS · Android' } },
    ],
  },
  {
    _id: 'f-rocklets',
    slug: 'rocklets',
    title: 'Toca Rocklets',
    client: 'Arcor',
    partners: 'Leo Burnett',
    summary: {
      en: 'An interactive web game for the TocaRocklets campaign, promo-code entry, instant reward chances, HTML5 across desktop and mobile.',
      es: 'Un juego web interactivo para la campaña TocaRocklets, códigos del packaging, premios instantáneos, HTML5 en desktop y mobile.',
    },
    services: ['sites', 'apps'],
    coverUrl: '/projects/rocklets-cover.jpg',
    heroImage: '/projects/rocklets-hero.png',
    gallery: [
      '/projects/rocklets-hero.png',
      '/projects/rocklets-2.png',
    ],
    year: 2018,
    externalUrl: 'https://sparkdigital.agency/project/rocklets/',
    challenge: {
      en: 'Connect the physical packaging back to a digital reward in seconds. Any friction kills the impulse, the loop had to feel instant.',
      es: 'Conectar el packaging físico con una recompensa digital en segundos. Cualquier fricción mata el impulso, el loop tenía que sentirse instantáneo.',
    },
    approach: {
      en: 'A clean HTML5 + JavaScript build, served identically on desktop and mobile so the kid scanning a code on a phone got the same experience as one playing on the family laptop.',
      es: 'Build limpio HTML5 + JavaScript, servido idéntico en desktop y mobile para que el chico que escanea el código en el teléfono tenga la misma experiencia que el que juega en la laptop familiar.',
    },
    facts: [
      { value: 'Leo Burnett', label: { en: 'Creative partner', es: 'Partner creativo' } },
      { value: 'HTML5',       label: { en: 'Instant-play',     es: 'Juego instantáneo' } },
    ],
  },
  {
    _id: 'f-peru',
    slug: 'taxi-to-peru',
    title: 'Taxi To Peru',
    client: 'Peru Travel',
    partners: 'Mataojo',
    summary: {
      en: 'A responsive web app and dedicated tablet build for an experiential travel campaign, theatre tickets, private chef dinners, grand prize: Peru.',
      es: 'Una web app responsive y un build para tablet de una campaña experiencial de viaje, entradas de teatro, cenas con chef privado, gran premio: Perú.',
    },
    services: ['sites', 'apps', 'funnels', 'visibility'],
    coverUrl: '/projects/peru-cover.jpg',
    heroImage: '/projects/peru-hero.png',
    gallery: [
      '/projects/peru-hero.png',
      '/projects/peru-2.png',
      '/projects/peru-3.png',
    ],
    year: 2018,
    externalUrl: 'https://sparkdigital.agency/project/taxi-to-peru/',
    challenge: {
      en: 'A travel brand campaign with serious stakes, luxury experiences as entries, a flagship Peru trip as the grand prize. The product had to feel as premium as the prizes.',
      es: 'Una campaña de viajes con apuestas serias, experiencias premium como tickets de entrada, un viaje a Perú como gran premio. El producto tenía que sentirse tan premium como los premios.',
    },
    approach: {
      en: 'Built with the team at Mataojo, we shipped a fully responsive web app plus a dedicated tablet build for in-venue activations. Registration, experience selection, and entry mechanic all engineered as one product.',
      es: 'Junto al equipo de Mataojo, entregamos una web app totalmente responsive más un build dedicado para tablet en activaciones físicas. Registro, selección de experiencia y mecánica de entrada como un solo producto.',
    },
    outcome: {
      en: 'A campaign people remembered. Tablet activations doubled as registration kiosks; the web app caught the moment someone got home and finished signing up.',
      es: 'Una campaña que la gente recordó. Las activaciones en tablet funcionaron como kioscos de registro; la web app capturaba el momento en que llegaban a casa y terminaban de registrarse.',
    },
    facts: [
      { value: 'Mataojo', label: { en: 'Build partner', es: 'Partner de desarrollo' } },
      { value: 'Web + tablet', label: { en: 'Multi-surface', es: 'Multi-superficie' } },
    ],
  },
  {
    _id: 'f-tml',
    slug: 'the-musician-lab',
    title: 'The Musician Lab',
    client: 'The Musician Lab',
    summary: {
      en: 'A full business launch for an online music education brand, identity, custom site, and a complete SEO program from keyword research to on-page.',
      es: 'Lanzamiento integral para una marca de educación musical online, identidad, sitio a medida, y un programa de SEO completo desde keyword research hasta on-page.',
    },
    services: ['sites', 'visibility', 'apps'],
    coverUrl: '/projects/tml-cover.jpg',
    heroImage: '/projects/tml-hero.jpg',
    gallery: [
      '/projects/tml-hero.jpg',
      '/projects/tml-2.png',
    ],
    year: 2019,
    externalUrl: 'https://sparkdigital.agency/project/the-musician-lab/',
    challenge: {
      en: 'A founder with deep musical content and zero distribution. The site needed to convert curious learners into subscribers, and the SEO had to compound monthly without paid backing.',
      es: 'Un fundador con contenido musical profundo y cero distribución. El sitio tenía que convertir curiosos en suscriptores, y el SEO tenía que componerse mes a mes sin paid atrás.',
    },
    approach: {
      en: 'We built the brand and the product as one engagement. Custom site, conversion-aware page architecture, full SEO program: keyword research, on-page optimisation, ongoing content production.',
      es: 'Construimos marca y producto como un solo proyecto. Sitio a medida, arquitectura de páginas pensada para convertir, programa SEO completo: keyword research, optimización on-page, producción continua de contenido.',
    },
    facts: [
      { value: 'Brand + Web + SEO', label: { en: 'Full-stack launch', es: 'Lanzamiento integral' } },
    ],
  },
  {
    _id: 'f-afb',
    slug: 'astronomy-for-beginners',
    title: 'Astronomy For Beginners',
    client: 'AstronomyForBeginners.com',
    summary: {
      en: 'A modernisation of a legacy astronomy site, new identity, responsive rebuild, and a full SEO audit driving organic visibility.',
      es: 'Modernización de un sitio legacy de astronomía, nueva identidad, rebuild responsive, y auditoría SEO completa para impulsar visibilidad orgánica.',
    },
    services: ['sites', 'visibility'],
    coverUrl: '/projects/afb-cover.jpg',
    heroImage: '/projects/afb-hero.jpg',
    gallery: [
      '/projects/afb-hero.jpg',
      '/projects/afb-2.png',
    ],
    year: 2018,
    externalUrl: 'https://sparkdigital.agency/project/astronomy-for-beginners/',
    challenge: {
      en: 'A content-rich educational site stuck on old infrastructure: not mobile, not findable, not selling its own depth.',
      es: 'Un sitio educativo con contenido rico atrapado en infraestructura vieja: no era mobile, no se encontraba, no vendía su propia profundidad.',
    },
    approach: {
      en: 'New logo, full responsive redesign, mobile-first navigation, then a complete SEO audit, keyword research, on-page fixes, fresh content production aligned with what people were actually searching for.',
      es: 'Logo nuevo, redesign responsive completo, navegación mobile-first, y auditoría SEO integral, keyword research, fixes on-page, producción de contenido fresco alineada con lo que la gente realmente buscaba.',
    },
    facts: [
      { value: 'Rebrand + SEO', label: { en: 'Full modernisation', es: 'Modernización integral' } },
    ],
  },
  {
    _id: 'f-as',
    slug: 'angelillo-simon-architects',
    title: 'A&S Architects',
    client: 'Carlos Angelillo & Christian Simon',
    summary: {
      en: 'A rebrand and responsive portfolio site for a renowned Argentine architecture studio.',
      es: 'Rebrand y sitio portafolio responsive para un reconocido estudio de arquitectura argentino.',
    },
    services: ['sites', 'funnels'],
    coverUrl: '/projects/arch-cover.jpg',
    heroImage: '/projects/arch-hero.png',
    gallery: [
      '/projects/arch-hero.png',
      '/projects/arch-2.png',
    ],
    year: 2018,
    externalUrl: 'https://sparkdigital.agency/project/angelillo-simon-architects/',
    challenge: {
      en: 'A serious architectural practice with a serious portfolio, and a digital presence that read as neither.',
      es: 'Un estudio de arquitectura serio con un portafolio serio, y una presencia digital que no comunicaba ni una ni la otra.',
    },
    approach: {
      en: 'Logo redesign and a fully responsive site, restraint as the design system. Every page exists to let the work breathe.',
      es: 'Rediseño de logo y sitio totalmente responsive, restraint como sistema de diseño. Cada página existe para que el trabajo respire.',
    },
    facts: [
      { value: 'Rebrand', label: { en: 'Identity refresh', es: 'Refresh de identidad' } },
    ],
  },
  {
    _id: 'f-pedalea',
    slug: 'pedalea-seguro',
    title: 'Pedalea Seguro',
    client: 'Buenos Aires Ciudad',
    summary: {
      en: 'A multi-platform casual game for the Buenos Aires city government, 12 mini-games teaching bicycle safety, across desktop, smartphone, and tablet.',
      es: 'Un juego casual multiplataforma para el Gobierno de la Ciudad de Buenos Aires, 12 mini-juegos para enseñar seguridad en bicicleta, en desktop, smartphone y tablet.',
    },
    services: ['sites', 'apps', 'visibility'],
    coverUrl: '/projects/pedale-cover.jpg',
    heroImage: '/projects/pedale-hero.png',
    gallery: [
      '/projects/pedale-hero.png',
      '/projects/pedale-2.png',
    ],
    year: 2018,
    externalUrl: 'https://sparkdigital.agency/project/pedalea-seguro/',
    challenge: {
      en: 'Civic education without civic-education energy. A safety message that needed to land with kids on the way to school, not a pamphlet they ignore.',
      es: 'Educación cívica sin la energía de la educación cívica. Un mensaje de seguridad para que llegue a los chicos camino al colegio, no un panfleto que ignoran.',
    },
    approach: {
      en: '12 distinct mini-games, each teaching a different safety habit, all stitched into one experience that ran on the device the kid actually had in their hand.',
      es: '12 mini-juegos distintos, cada uno enseñando un hábito de seguridad diferente, todos integrados en una experiencia que corría en el dispositivo que el chico realmente tenía en la mano.',
    },
    facts: [
      { value: '12', label: { en: 'Mini-games', es: 'Mini-juegos' } },
      { value: 'Civic',  label: { en: 'GovTech',    es: 'GovTech' } },
    ],
  },
];

/* Legacy bitmap logos (kept for any old references). Replaced by SVG components. */
export const CLIENT_LOGOS = [
  { name: 'Arcor',        src: 'https://picsum.photos/seed/arcor/200/100' },
  { name: 'Garbarino',    src: 'https://picsum.photos/seed/garb/200/100' },
  { name: 'Leo Burnett',  src: 'https://picsum.photos/seed/leo/200/100' },
  { name: 'JWT',          src: 'https://picsum.photos/seed/jwt/200/100' },
];

export const SPARK_LOGO_URL =
  '/logo.png';
