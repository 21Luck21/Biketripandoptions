'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Beach, Cliff, Cottage, Factory, Forest, Lake, Lighthouse, Train,
} from './sketch-icons';
import { CapeScene, PierScene } from './placeholders';

type Stop = {
  time: string;
  place: string;
  detail: string;
  icon: React.ComponentType<{ size?: number }>;
};

type Day = {
  n: string;
  title: string;
  distance: string;
  elev: string;
  duration: string;
  blurb: string;
  stops: Stop[];
  Scene: React.ComponentType<{ label?: string }>;
  pull: string;
};

const RUGEN_DAYS: Day[] = [
  {
    n: 'Day 01',
    title: 'Putbus → Mönchgut',
    distance: '54 km',
    elev: '↗ 320 m',
    duration: '6 hrs riding',
    blurb:
      'Train into Putbus — Rügen\'s pastel-white "Rosenstadt." Roll the Rasender Roland steam line down to Sellin and its ornate seaside pier, then south into the wild Mönchgut peninsula: hidden coves, a tongue of land between two seas, and ferry-only fishing villages.',
    stops: [
      { time: '08:40', place: 'Berlin Hbf', detail: 'IC 2213, bikes booked', icon: Train },
      { time: '12:55', place: 'Putbus', detail: 'Rosenstadt — pastel circle', icon: Cottage },
      { time: '14:20', place: 'Sellin', detail: 'White pier + Strandkörbe', icon: Beach },
      { time: '16:30', place: 'Baabe → Lobbe', detail: 'Forest tracks, sand under tyres', icon: Forest },
      { time: '18:15', place: 'Mönchgut', detail: 'Sunset over Bodden', icon: Lake },
    ],
    Scene: ({ label }) => <PierScene label={label} />,
    pull: '"You can hear the pier creak between gull cries."',
  },
  {
    n: 'Day 02',
    title: 'Binz → Cape Arkona',
    distance: '68 km',
    elev: '↗ 480 m',
    duration: '7 hrs riding',
    blurb:
      'North through the Belle-Époque resort of Binz, past the long shadow of Prora, then into Jasmund National Park where ancient beech woods spill onto white chalk cliffs. Finish at the windswept tip — Cape Arkona, two lighthouses and the Baltic.',
    stops: [
      { time: '07:30', place: 'Binz', detail: 'Coffee on the promenade', icon: Beach },
      { time: '09:00', place: 'Prora', detail: '4.5 km of concrete ghost', icon: Factory },
      { time: '11:00', place: 'Jasmund N.P.', detail: 'Beech, chalk, cliff air', icon: Forest },
      { time: '13:30', place: 'Königsstuhl', detail: 'The famous chalk crown', icon: Cliff },
      { time: '17:00', place: 'Cape Arkona', detail: 'Two lighthouses, end of land', icon: Lighthouse },
    ],
    Scene: ({ label }) => <CapeScene label={label} />,
    pull: '"Land just stops, and the wind keeps going."',
  },
];

function DayCard({ day, index }: { day: Day; index: number }) {
  const ref = useRef<HTMLElement>(null);
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
  }, []);
  const scale = 1.22 - p * 0.22;
  const ty = (0.5 - p) * 50;

  return (
    <article ref={ref} className="relative border-t border-[var(--rule)]" style={{ padding: '12vh 7vw' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '4vh',
          right: '-3vw',
          pointerEvents: 'none',
          fontFamily: 'var(--font-fraunces), Fraunces, serif',
          fontWeight: 200,
          fontStyle: 'italic',
          fontSize: 'clamp(220px, 36vw, 520px)',
          lineHeight: 0.7,
          color: 'rgba(36,51,33,.06)',
          letterSpacing: '-0.06em',
          fontVariationSettings: '"opsz" 144, "SOFT" 60',
        }}
      >
        {index === 0 ? 'I' : 'II'}
      </div>

      <div className="relative grid items-start" style={{ gap: '40px 5vw', gridTemplateColumns: '1.1fr 1fr' }}>
        <div style={{ transform: `translateY(${ty * 0.1}px)` }}>
          <div className="mono mb-[18px] text-[11px] uppercase tracking-[0.25em] text-clay-deep">
            {day.n} · Of two
          </div>
          <h3
            style={{
              margin: '0 0 22px',
              fontSize: 'clamp(48px, 6.4vw, 96px)',
              lineHeight: 0.94,
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
              fontVariationSettings: '"opsz" 144, "SOFT" 60',
            }}
          >
            {day.title}
          </h3>

          <div className="mb-[26px] flex flex-wrap gap-6 border-b border-[var(--rule)] pb-[26px]">
            {[
              { l: 'Distance', v: day.distance },
              { l: 'Climb', v: day.elev },
              { l: 'Saddle time', v: day.duration },
            ].map(c => (
              <div key={c.l}>
                <div className="mono mb-1 text-[9px] uppercase tracking-[0.2em] text-ink-mute">{c.l}</div>
                <div style={{ fontSize: 22, color: 'var(--ink)', fontFamily: 'var(--font-fraunces), Fraunces, serif' }}>
                  {c.v}
                </div>
              </div>
            ))}
          </div>

          <p className="mb-[30px] max-w-[560px] text-[20px] leading-[1.55] text-ink-soft">{day.blurb}</p>

          <div className="relative">
            <div className="mono mb-3.5 text-[10px] uppercase tracking-[0.2em] text-ink-mute">Itinerary</div>
            <ol className="relative m-0 list-none p-0">
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 23,
                  top: 18,
                  bottom: 18,
                  width: 1,
                  borderLeft: '1px dashed var(--rule)',
                }}
              />
              {day.stops.map((s, i) => {
                const Ic = s.icon;
                return (
                  <li
                    key={i}
                    className="relative grid items-start"
                    style={{ gridTemplateColumns: '48px 70px 1fr', gap: 14, padding: '12px 0' }}
                  >
                    <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[var(--rule)] bg-paper-2 text-moss-deep">
                      <Ic size={24} />
                    </div>
                    <div className="mono pt-[13px] text-[13px] tracking-[0.08em] text-clay-deep">{s.time}</div>
                    <div className="pt-2">
                      <div style={{ fontSize: 19, color: 'var(--ink)', fontFamily: 'var(--font-fraunces), Fraunces, serif', fontWeight: 500, letterSpacing: '-0.01em' }}>
                        {s.place}
                      </div>
                      <div className="hand text-[18px] text-ink-mute" style={{ marginTop: -2 }}>{s.detail}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div
            className="hand mt-[30px] max-w-[480px]"
            style={{
              fontSize: 28,
              color: 'var(--clay-deep)',
              lineHeight: 1.2,
              paddingLeft: 18,
              borderLeft: '2px solid var(--clay)',
            }}
          >
            {day.pull}
          </div>
        </div>

        <div className="sticky" style={{ top: '10vh' }}>
          <div
            className="relative overflow-hidden rounded-sm border border-[var(--rule)]"
            style={{ height: 'min(640px, 78vh)', boxShadow: '0 30px 60px -30px rgba(31,36,24,.4)' }}
          >
            <div style={{ position: 'absolute', inset: 0, transform: `scale(${scale})`, transformOrigin: 'center', transition: 'transform .1s linear' }}>
              <day.Scene label={`RÜGEN · ${day.n.toUpperCase()}`} />
            </div>
            <div className="mono absolute left-3 top-3 text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(243,239,231,.85)', mixBlendMode: 'difference' }}>
              plate {index === 0 ? 'IV' : 'V'}
            </div>
            <div className="mono absolute bottom-3 right-3 text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(243,239,231,.85)', mixBlendMode: 'difference' }}>
              54.4°N · 13.4°E
            </div>
          </div>
          <div className="mono mt-2.5 text-[10px] uppercase tracking-[0.15em] text-ink-mute">
            ↳ ai placeholder, swap with field photo
          </div>
        </div>
      </div>
    </article>
  );
}

function RugenIslandMap() {
  return (
    <div style={{ padding: '0 7vw 8vh' }}>
      <div className="mono mb-3.5 text-[10px] uppercase tracking-[0.2em] text-ink-mute">
        The whole loop · sketched
      </div>
      <div className="relative border border-[var(--rule)] bg-paper-2" style={{ padding: '30px 24px' }}>
        <svg viewBox="0 0 800 400" className="block h-auto w-full">
          <defs>
            <pattern id="rg-water" patternUnits="userSpaceOnUse" width="6" height="6">
              <path d="M0 3 Q 1.5 1 3 3 T 6 3" stroke="rgba(91,125,122,.35)" fill="none" strokeWidth=".6" />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#rg-water)" />
          <path
            d="M180 240 C 130 200 140 150 200 130 C 240 110 280 130 320 110 C 360 95 400 100 430 80 C 470 60 510 70 520 90 C 540 70 580 70 600 95 C 615 75 640 90 645 110 C 670 110 685 130 670 150 C 690 170 680 200 650 210 C 660 240 620 270 580 260 C 560 290 510 295 480 270 C 460 295 410 300 380 280 C 360 305 310 305 280 285 C 250 305 200 290 180 240 Z"
            fill="#c8d2b4"
            stroke="#3d5942"
            strokeWidth="1.2"
          />
          <circle cx="430" cy="80" r="4" fill="var(--clay)" />
          <text x="438" y="76" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Cape Arkona</text>
          <circle cx="600" cy="130" r="4" fill="var(--clay)" />
          <text x="608" y="126" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Jasmund N.P.</text>
          <circle cx="540" cy="200" r="4" fill="var(--clay)" />
          <text x="548" y="204" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Binz · Prora</text>
          <circle cx="520" cy="240" r="4" fill="var(--clay)" />
          <text x="528" y="244" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Sellin</text>
          <circle cx="490" cy="280" r="4" fill="var(--clay)" />
          <text x="498" y="284" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Mönchgut</text>
          <circle cx="380" cy="260" r="4" fill="var(--clay)" />
          <text x="306" y="264" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Putbus ★</text>
          <path d="M380 260 C 420 260 470 250 520 240 C 510 250 500 270 490 280" stroke="#8a4a22" strokeWidth="2" fill="none" strokeDasharray="4 3" />
          <path d="M540 200 L580 170 C 600 145 600 130 600 130 C 580 110 480 90 430 80" stroke="#243321" strokeWidth="2" fill="none" strokeDasharray="6 4" />
          <path d="M40 280 L380 260" stroke="#7a7868" strokeWidth="1" fill="none" strokeDasharray="2 4" />
          <text x="50" y="276" fontFamily="JetBrains Mono" fontSize="9" fill="#7a7868">↘ from Berlin (IC)</text>
          <g transform="translate(40 340)">
            <line x1="0" y1="0" x2="30" y2="0" stroke="#8a4a22" strokeWidth="2" strokeDasharray="4 3" />
            <text x="36" y="3" fontFamily="JetBrains Mono" fontSize="9" fill="#1f2418">Day 1 — South</text>
            <line x1="160" y1="0" x2="190" y2="0" stroke="#243321" strokeWidth="2" strokeDasharray="6 4" />
            <text x="196" y="3" fontFamily="JetBrains Mono" fontSize="9" fill="#1f2418">Day 2 — North</text>
            <text x="320" y="3" fontFamily="JetBrains Mono" fontSize="9" fill="#7a7868">★ overnight</text>
          </g>
          <g transform="translate(740 60)">
            <circle r="22" fill="var(--paper)" stroke="#1f2418" strokeWidth=".8" />
            <path d="M0 -16 L4 4 L0 1 L-4 4 Z" fill="#1f2418" />
            <text x="0" y="-22" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" fill="#1f2418">N</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function RugenRoute() {
  return (
    <section id="rugen" className="relative bg-paper">
      <div className="border-y border-[var(--rule)] bg-paper-2" style={{ padding: '12vh 7vw 8vh' }}>
        <div className="mono mb-6 text-[11px] uppercase tracking-[0.25em] text-clay-deep">
          Part two — Two days, one island
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
              fontVariationSettings: '"opsz" 144, "SOFT" 80',
            }}
          >
            A weekend on
            <br />
            <span style={{ color: 'var(--moss-deep)' }}>Rügen.</span>
          </h2>
          <div>
            <p className="m-0 max-w-[420px] text-[17px] leading-[1.5] text-ink-soft">
              Germany&apos;s largest island, four hours north by train. Chalk cliffs, beech forest,
              white piers and a coast that ends in a lighthouse. Two days, roughly 120 km, one very
              satisfying ferry.
            </p>
            <div className="mt-6 flex gap-[30px] text-moss-deep">
              <Train size={42} />
              <Lighthouse size={42} />
              <Cliff size={42} />
            </div>
          </div>
        </div>
      </div>

      <RugenIslandMap />

      {RUGEN_DAYS.map((d, i) => (
        <DayCard key={d.n} day={d} index={i} />
      ))}
    </section>
  );
}
