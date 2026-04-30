'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bike, Compass, Cottage, Factory, Forest, Lake, Palace, Star,
} from './sketch-icons';
import { IndustrialScene, PalaceScene, StarScene } from './placeholders';

function useScrollProgress(ref: React.RefObject<HTMLElement>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const seen = vh - r.top;
      setP(Math.max(0, Math.min(1, seen / total)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
  return p;
}

type Opt = {
  n: string;
  kicker: string;
  title: string;
  distance: string;
  difficulty: string;
  duration: string;
  blurb: string;
  pull: string;
  Scene: React.ComponentType<{ label?: string }>;
  icons: React.ComponentType<{ size?: number }>[];
  waypoints: string[];
  tags: string[];
};

const OPTIONS: Opt[] = [
  {
    n: '01',
    kicker: 'Lakes & palaces',
    title: 'Potsdam to Caputh',
    distance: '46 km',
    difficulty: 'Easy',
    duration: '4–5 hrs',
    blurb:
      "A loop of glassy lakes through Sanssouci's ornamental gardens, around the Havel inlets to Caputh, where Einstein's summerhouse waits between the pines.",
    pull: '"Like riding through a watercolour."',
    Scene: ({ label }) => <PalaceScene label={label} />,
    icons: [Palace, Lake, Bike],
    waypoints: ['Wannsee', 'Sanssouci', 'Templiner', 'Caputh', 'Einstein'],
    tags: ['palace gardens', 'three lake crossings', 'ferry hop'],
  },
  {
    n: '02',
    kicker: 'Forest & dark sky',
    title: 'Westhavelland & the Stars',
    distance: '72 km',
    difficulty: 'Moderate',
    duration: '2 days',
    blurb:
      "Out past Rathenow into Germany's first international Dark Sky Reserve. Reed beds, kettle lakes, and the kind of night you forget exists when you live in a city.",
    pull: '"The Milky Way as a horizon, not a rumour."',
    Scene: ({ label }) => <StarScene label={label} />,
    icons: [Star, Forest, Lake],
    waypoints: ['Rathenow', 'Gülpe', 'Reserve', 'Bivouac', 'Sunrise'],
    tags: ['Bortle 2 sky', 'silent miles', 'no traffic'],
  },
  {
    n: '03',
    kicker: 'Industrial heritage & Spreewald',
    title: 'Lausitz Loop',
    distance: '95 km',
    difficulty: 'Spirited',
    duration: '2 days',
    blurb:
      'Brick smokestacks of the Lausitz turn into willow-draped Spreewald canals. Punt boats glide past gherkin stalls; rust-coloured mining lakes glow at dusk.',
    pull: '"Where heavy industry softens into water gardens."',
    Scene: ({ label }) => <IndustrialScene label={label} />,
    icons: [Factory, Cottage, Bike],
    waypoints: ['Cottbus', 'F60', 'Lübbenau', 'Canals', 'Lehde'],
    tags: ['F60 "Liegender Eiffelturm"', 'canal punt', 'pickled gherkins'],
  },
];

function MapSketch({ waypoints, color = '#243321' }: { waypoints: string[]; color?: string }) {
  const points = useMemo(() => {
    const n = waypoints.length;
    return waypoints.map((w, i) => {
      const t = i / (n - 1);
      const x = 30 + t * 340;
      const y = 80 + Math.sin(i * 1.3) * 32 + (i % 2 === 0 ? -8 : 8);
      return { x, y, w };
    });
  }, [waypoints]);

  const d = useMemo(() => {
    let s = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const cx = (p0.x + p1.x) / 2;
      s += ` Q ${cx} ${p0.y - 12} ${p1.x} ${p1.y}`;
    }
    return s;
  }, [points]);

  return (
    <div className="relative rounded-sm border border-[var(--rule)] bg-paper-2 px-[18px] pb-5 pt-3.5">
      <div className="mono mb-2 text-[9px] uppercase tracking-[0.18em] text-ink-mute">
        Sketch route · not to scale
      </div>
      <svg viewBox="0 0 400 160" className="block h-[140px] w-full">
        <g transform="translate(370 22)">
          <path d="M0 -10 L4 6 L0 2 L-4 6 Z" fill={color} />
          <text x="0" y="20" fontFamily="JetBrains Mono" fontSize="7" fill={color} textAnchor="middle">N</text>
        </g>
        <g opacity=".25">
          {[...Array(40)].map((_, i) => {
            const x = (i % 10) * 40 + 20;
            const yy = Math.floor(i / 10) * 40 + 20;
            return <circle key={i} cx={x} cy={yy} r="0.6" fill={color} />;
          })}
        </g>
        <path d={d} stroke={color} strokeWidth="1.4" fill="none" strokeDasharray="3 3" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="var(--paper)" stroke={color} strokeWidth="1.4" />
            <circle cx={p.x} cy={p.y} r="1.4" fill={color} />
            <text x={p.x} y={p.y - 10} fontFamily="JetBrains Mono" fontSize="7" fill={color} textAnchor="middle" style={{ textTransform: 'uppercase', letterSpacing: '.06em' }}>
              {p.w}
            </text>
          </g>
        ))}
        <text x={points[0].x} y={points[0].y + 14} fontFamily="JetBrains Mono" fontSize="6" fill={color} textAnchor="middle">START</text>
        <text x={points[points.length - 1].x} y={points[points.length - 1].y + 14} fontFamily="JetBrains Mono" fontSize="6" fill={color} textAnchor="middle">END</text>
      </svg>
    </div>
  );
}

function OptionCard({ opt, index }: { opt: Opt; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref);
  const scale = 1.18 - p * 0.18;
  const yShift = (0.5 - p) * 60;
  const flip = index % 2 === 1;

  return (
    <article ref={ref} className="relative border-t border-[var(--rule)]" style={{ padding: '14vh 7vw' }}>
      <div
        className="grid"
        style={{
          gap: '40px 5vw',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)',
          direction: flip ? 'rtl' : 'ltr',
        }}
      >
        <div style={{ direction: 'ltr', position: 'relative' }}>
          <div
            className="relative overflow-hidden rounded-sm border border-[var(--rule)]"
            style={{ height: 'min(560px, 70vh)', boxShadow: '0 30px 60px -30px rgba(31,36,24,.4)' }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `scale(${scale}) translateY(${yShift * 0.2}px)`,
                transformOrigin: 'center',
                transition: 'transform .1s linear',
              }}
            >
              <opt.Scene label={`${opt.n} · ${opt.title.toUpperCase()}`} />
            </div>
            <div className="mono absolute left-2.5 top-2.5 text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(243,239,231,.85)', mixBlendMode: 'difference' }}>
              field plate {opt.n}
            </div>
            <div className="mono absolute right-2.5 top-2.5 text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(243,239,231,.85)', mixBlendMode: 'difference' }}>
              {opt.distance}
            </div>
          </div>
          <div className="mono mt-2.5 flex justify-between text-[10px] uppercase tracking-[0.15em] text-ink-mute">
            <span>fig. {opt.n} — {opt.kicker}</span>
            <span>↳ ai placeholder, swap with photograph</span>
          </div>
        </div>

        <div style={{ direction: 'ltr', transform: `translateY(${yShift * 0.1}px)` }}>
          <div className="mb-[18px] flex items-center gap-4">
            <div
              style={{
                fontFamily: 'var(--font-fraunces), Fraunces, serif',
                fontSize: 84,
                fontStyle: 'italic',
                color: 'var(--clay)',
                lineHeight: 1,
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
              }}
            >
              {opt.n}
            </div>
            <div className="h-px flex-1 bg-[var(--rule)]" />
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
              option {opt.n} of 03
            </div>
          </div>

          <div className="hand mb-1.5 text-[24px] text-clay-deep">{opt.kicker}</div>
          <h2
            style={{
              margin: '0 0 32px',
              fontSize: 'clamp(40px, 5.4vw, 76px)',
              lineHeight: 1.05,
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {opt.title}
          </h2>

          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { l: 'Distance', v: opt.distance },
              { l: 'Effort', v: opt.difficulty },
              { l: 'Time', v: opt.duration },
            ].map(c => (
              <div
                key={c.l}
                className="flex items-baseline gap-2 rounded-full border border-[var(--rule)] bg-paper-2"
                style={{ padding: '7px 12px' }}
              >
                <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-mute">{c.l}</span>
                <span className="text-sm font-medium text-ink">{c.v}</span>
              </div>
            ))}
          </div>

          <p className="mb-6 max-w-[560px] text-[21px] leading-[1.5] text-ink-soft">{opt.blurb}</p>

          <div className="mb-[30px] flex items-start gap-6 text-moss-deep">
            {opt.icons.map((Ic, i) => (<Ic key={i} size={48} />))}
          </div>

          <div
            className="hand mb-7 max-w-[480px]"
            style={{
              fontSize: 28,
              color: 'var(--clay-deep)',
              lineHeight: 1.2,
              paddingLeft: 18,
              borderLeft: '2px solid var(--clay)',
            }}
          >
            {opt.pull}
          </div>

          <div className="mb-7 flex flex-wrap gap-x-3.5 gap-y-1">
            {opt.tags.map(t => (
              <span key={t} className="mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
                · {t}
              </span>
            ))}
          </div>

          <MapSketch waypoints={opt.waypoints} />
        </div>
      </div>
    </article>
  );
}

export default function BerlinOptions() {
  return (
    <section id="berlin" className="relative bg-paper">
      <div className="border-b border-[var(--rule)]" style={{ padding: '14vh 7vw 6vh' }}>
        <div className="mono mb-6 text-[11px] uppercase tracking-[0.25em] text-clay-deep">
          Part one — Three weekend escapes
        </div>
        <div className="grid items-end gap-[5vw]" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(56px, 9vw, 140px)',
              lineHeight: 0.9,
              fontWeight: 300,
              letterSpacing: '-0.03em',
              fontStyle: 'italic',
              color: 'var(--ink)',
              fontVariationSettings: '"opsz" 144, "SOFT" 60',
            }}
          >
            Out of Berlin,
            <br />
            <span style={{ color: 'var(--moss-deep)' }}>into Brandenburg.</span>
          </h2>
          <div>
            <p className="m-0 max-w-[420px] text-[17px] leading-[1.5] text-ink-soft">
              The countryside around the capital is flat, forested, and stitched with the kind of
              small lakes you find by accident. Three options, ranked roughly by ambition.
            </p>
            <div className="mt-6 flex gap-[30px] text-moss-deep">
              <Compass size={42} />
              <Bike size={42} />
              <Forest size={42} />
            </div>
          </div>
        </div>
      </div>

      {OPTIONS.map((opt, i) => (
        <OptionCard key={opt.n} opt={opt} index={i} />
      ))}
    </section>
  );
}
