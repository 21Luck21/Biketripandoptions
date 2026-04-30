import BerlinOptions from '@/components/BerlinOptions';
import { Footer, NavDots, ProgressRail } from '@/components/Chrome';
import Hero from '@/components/Hero';
import RugenRoute from '@/components/RugenRoute';
import ScrollFX from '@/components/ScrollFX';

export default function Page() {
  return (
    <>
      <ProgressRail />
      <NavDots />
      <ScrollFX />
      <Hero />
      <BerlinOptions />
      <RugenRoute />
      <Footer />
    </>
  );
}
