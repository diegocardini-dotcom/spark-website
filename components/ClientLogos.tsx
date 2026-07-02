/**
 * ClientLogos — typographic SVG wordmarks for the trusted-by row.
 *
 * Each brand is rendered as inline SVG using `fill="currentColor"` so the
 * marquee can control color with `text-ink-300`, hover to `text-ember`, etc.
 * Letterforms are stylised in the spirit of each brand without being a
 * 1:1 logo trace — premium uniform feel, no copyright risk, perfectly crisp.
 */

const FAMILY_DISPLAY = '"Instrument Serif", Georgia, serif';
const FAMILY_SANS    = 'Outfit, Inter, system-ui, sans-serif';

type LogoProps = { width?: number };

function svgBase(viewW: number, viewH: number, children: React.ReactNode, w?: number) {
  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      width={w ?? viewW}
      height={(w ?? viewW) * (viewH / viewW)}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ overflow: 'visible' }}
    >
      {children}
    </svg>
  );
}

/* Ford — italic script wordmark (their classic script mark, abstracted) */
export function FordLogo({ width = 110 }: LogoProps) {
  return svgBase(220, 70,
    <text
      x="0"
      y="50"
      fontFamily={FAMILY_DISPLAY}
      fontStyle="italic"
      fontSize="58"
      letterSpacing="-2"
    >
      Ford
    </text>,
    width,
  );
}

/* Arcor — bold geometric uppercase */
export function ArcorLogo({ width = 130 }: LogoProps) {
  return svgBase(260, 70,
    <text
      x="0"
      y="50"
      fontFamily={FAMILY_SANS}
      fontWeight="800"
      fontSize="50"
      letterSpacing="2"
    >
      ARCOR
    </text>,
    width,
  );
}

/* Garbarino — sans, slightly italic */
export function GarbarinoLogo({ width = 160 }: LogoProps) {
  return svgBase(280, 60,
    <text
      x="0"
      y="44"
      fontFamily={FAMILY_SANS}
      fontWeight="700"
      fontStyle="italic"
      fontSize="42"
      letterSpacing="-0.5"
    >
      Garbarino
    </text>,
    width,
  );
}

/* Leo Burnett — serif (their actual mark is editorial serif) */
export function LeoBurnettLogo({ width = 140 }: LogoProps) {
  return svgBase(280, 60,
    <text
      x="0"
      y="44"
      fontFamily={FAMILY_DISPLAY}
      fontSize="40"
      letterSpacing="-0.5"
    >
      Leo Burnett
    </text>,
    width,
  );
}

/* J. Walter Thompson — italic script (the same one that already rendered correctly) */
export function JWTLogo({ width = 150 }: LogoProps) {
  return svgBase(280, 60,
    <text
      x="0"
      y="40"
      fontFamily={FAMILY_DISPLAY}
      fontStyle="italic"
      fontSize="34"
      letterSpacing="-1"
    >
      J. Walter Thompson
    </text>,
    width,
  );
}

/* Mataojo — modern serif italic */
export function MataojoLogo({ width = 120 }: LogoProps) {
  return svgBase(220, 60,
    <text
      x="0"
      y="44"
      fontFamily={FAMILY_DISPLAY}
      fontStyle="italic"
      fontSize="44"
      letterSpacing="-1"
    >
      Mataojo
    </text>,
    width,
  );
}

/* Vamos BA — bold sans (civic / GovTech feel) */
export function VamosBALogo({ width = 130 }: LogoProps) {
  return svgBase(260, 60,
    <text
      x="0"
      y="44"
      fontFamily={FAMILY_SANS}
      fontWeight="700"
      fontSize="40"
      letterSpacing="-0.5"
    >
      Vamos BA
    </text>,
    width,
  );
}

/* Global Mind — clean sans */
export function GlobalMindLogo({ width = 150 }: LogoProps) {
  return svgBase(280, 60,
    <text
      x="0"
      y="44"
      fontFamily={FAMILY_SANS}
      fontWeight="500"
      fontSize="38"
      letterSpacing="-0.4"
    >
      Global Mind
    </text>,
    width,
  );
}

export const CLIENT_LOGO_COMPONENTS = [
  { name: 'Ford',          Component: FordLogo,        width: 100 },
  { name: 'Arcor',         Component: ArcorLogo,       width: 130 },
  { name: 'Garbarino',     Component: GarbarinoLogo,   width: 160 },
  { name: 'Leo Burnett',   Component: LeoBurnettLogo,  width: 150 },
  { name: 'J. Walter Thompson', Component: JWTLogo,    width: 180 },
  { name: 'Mataojo',       Component: MataojoLogo,     width: 120 },
  { name: 'Vamos BA',      Component: VamosBALogo,     width: 130 },
  { name: 'Global Mind',   Component: GlobalMindLogo,  width: 140 },
];
