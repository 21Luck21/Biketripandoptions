'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollFX() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title fades / travels
      gsap.utils.toArray<HTMLElement>('h2, h3').forEach(el => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // Big "zoom and travel" between Brandenburg and Rügen
      const berlin = document.getElementById('berlin');
      const rugen = document.getElementById('rugen');
      if (berlin && rugen) {
        gsap.fromTo(
          rugen,
          { scale: 0.96, y: 60 },
          {
            scale: 1,
            y: 0,
            ease: 'power3.out',
            scrollTrigger: { trigger: rugen, start: 'top 80%', end: 'top 30%', scrub: 0.5 },
          },
        );
      }

      // Article cards: slight parallax on inner image stacks
      gsap.utils.toArray<HTMLElement>('article').forEach(el => {
        gsap.from(el, {
          opacity: 0.4,
          y: 20,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 50%', scrub: true },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
