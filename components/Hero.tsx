'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Bike, Lake, Forest, Compass } from './sketch-icons';

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

export default function Hero() {
  const [y, setY] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const f = () => setY(window.scrollY);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  const opacity = Math.max(0, 1 - y / 600);
  const tType = `translateY(${y * -0.1}px)`;

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden border-b border-[var(--rule)] bg-paper"
      style={{ height: '100vh', minHeight: 680 }}
    >
      {/* sky wash backdrop, behind 3D */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #e8d9b8 0%, #dfe2cc 55%, #c8d2b4 100%)',
          transform: `translateY(${y * 0.15}px)`,
        }}
      />
      {/* 3D layer */}
      <div className="absolute inset-0">
        <Hero3D />
      </div>
      {/* type overlay */}
      <div
        className="relative z-10 flex h-full flex-col justify-between"
        style={{ padding: '48px 7vw', transform: tType, opacity }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            Field Notes № 04 · Spring &apos;26
          </div>
          <div className="mono text-right text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            52.5°N · 13.4°E
            <br />
            Berlin–Brandenburg
          </div>
        </div>

        <div>
          <div
            className="hand text-clay-deep"
            style={{ fontSize: 34, marginBottom: -14, marginLeft: 6 }}
          >
            two days, two wheels —
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(64px, 12vw, 200px)',
              lineHeight: 0.86,
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.04em',
              color: 'var(--ink)',
              fontVariationSettings: '"opsz" 144, "SOFT" 80',
            }}
          >
            <span style={{ display: 'block' }}>The Long</span>
            <span style={{ display: 'block', marginLeft: '14%' }}>
              Way <em style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>Round</em>
            </span>
          </h1>
          <div className="mt-5 flex max-w-3xl items-baseline gap-[5vw]">
            <p
              style={{
                margin: 0,
                fontSize: 18,
                lineHeight: 1.5,
                color: 'var(--ink-soft)',
                maxWidth: 520,
              }}
            >
              Three weekend rides out of Berlin and one slow island lap on Rügen. Routes for tired
              eyes, sore legs, and a thermos of coffee.
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="mono flex items-center gap-2.5 text-[11px] uppercase tracking-[0.15em] text-ink-soft">
            <ArrowDown size={18} /> Scroll to begin
          </div>
          <div className="flex items-center gap-6 text-moss-deep">
            <Bike size={36} />
            <Lake size={36} />
            <Forest size={36} />
            <Compass size={36} />
          </div>
        </div>
      </div>
    </section>
  );
}
