import { Navbar } from '@/components/layout/navbar';
import { About } from '../about';
import { Contact } from '../contact';
import { Features } from '../features';
import { FinalCta } from '../final-cta';
import { Hero } from '../hero';
import { HowItWorks } from '../how-it-works';
import { Vision } from '../vision';
import Waves from '@/components/ui/Waves/Waves';

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Waves
        lineColor="#5227FF"
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Vision />
        <Contact />
        <FinalCta />
      </div>
    </div>
  );
}
