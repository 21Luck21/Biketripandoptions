'use client';
import { useEffect, useState } from 'react';

export function ProgressRail() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - window.innerHeight;
      setP(total > 0 ? Math.max(0, Math.min(1, window.scrollY / total)) : 0);
    };
    f();
    window.addEventListener('scroll', f, { passive: true });
    window.addEventListener('resize', f);
    return () => {
      window.removeEventListener('scroll', f);
      window.removeEventListener('resize', f);
    };
  }, []);
  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0"
      style={{ height: 2, zIndex: 100 }}
    >
      <div style={{ height: '100%', width: `${p * 100}%`, background: 'var(--clay)', transition: 'width .08s linear' }} />
    </div>
  );
}

export function NavDots() {
  const [active, setActive] = useState('top');
  useEffect(() => {
    const f = () => {
      const sections = ['top', 'berlin', 'rugen'];
      let cur = 'top';
      for (const id of sections) {
        const el = id === 'top' ? document.body : document.getElementById(id);
        if (!el) continue;
        const r = id === 'top' ? { top: -window.scrollY } : el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.4) cur = id;
      }
      setActive(cur);
    };
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  const items = [
    { id: 'top', label: 'Cover' },
    { id: 'berlin', label: 'Brandenburg' },
    { id: 'rugen', label: 'Rügen' },
  ];
  return (
    <nav
      className="fixed flex flex-col gap-3.5"
      style={{ right: '2.5vw', top: '50%', transform: 'translateY(-50%)', zIndex: 50 }}
    >
      {items.map(it => {
        const on = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            onClick={e => {
              if (it.id === 'top') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="mono"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: on ? 'var(--clay-deep)' : 'var(--ink-mute)',
              textDecoration: 'none',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              opacity: on ? 1 : 0.6,
              transition: 'opacity .2s, color .2s',
            }}
          >
            <span style={{ width: on ? 28 : 14, height: 1, background: 'currentColor', transition: 'width .25s' }} />
            <span>{it.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--rule)] bg-paper-2" style={{ padding: '10vh 7vw 6vh' }}>
      <div className="grid items-start" style={{ gridTemplateColumns: '1.4fr 1fr 1fr', gap: '5vw' }}>
        <div>
          <h3
            style={{
              margin: '0 0 18px',
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 0.95,
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              fontVariationSettings: '"opsz" 144',
            }}
          >
            Bring a thermos.
          </h3>
          <p className="m-0 max-w-[480px] text-[17px] leading-[1.5] text-ink-soft">
            All four routes are on quiet bike paths or unpaved forest tracks. Bring a patch kit, a
            paper map (signal is moody out east), and a layer for the wind.
          </p>
        </div>
        <div>
          <div className="mono mb-3 text-[10px] uppercase tracking-[0.2em] text-ink-mute">Bike on train</div>
          <ul className="m-0 list-none p-0 text-sm leading-[1.7] text-ink-soft">
            <li>RE & RB — bike spot included</li>
            <li>IC to Rügen — reserve in advance</li>
            <li>Local SPNV — €6 day add-on</li>
          </ul>
        </div>
        <div>
          <div className="mono mb-3 text-[10px] uppercase tracking-[0.2em] text-ink-mute">Best season</div>
          <ul className="m-0 list-none p-0 text-sm leading-[1.7] text-ink-soft">
            <li>May → early July (long days)</li>
            <li>September (warm seas, no crowds)</li>
            <li>Avoid August on Rügen</li>
          </ul>
        </div>
      </div>
      <div className="mt-[60px] flex items-center justify-between border-t border-[var(--rule)] pt-6">
        <div className="mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
          Field Notes № 04 · Berlin–Rügen · 26
        </div>
        <div className="hand text-[22px] text-clay-deep">— ride well —</div>
        <div className="mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">Page 12 of 12</div>
      </div>
    </footer>
  );
}
