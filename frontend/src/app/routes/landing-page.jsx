import { Navbar } from '@/components/layout/navbar';
import { PageShell } from '@/components/layout/page-shell';
import { AboutSection } from '@/components/marketing/about/about-section';
import { ContactSection } from '@/components/marketing/contact/contact-section';
import { FeaturesSection } from '@/components/marketing/features/features-section';
import { FinalCtaSection } from '@/components/marketing/final-cta/final-cta-section';
import { HeroSection } from '@/components/marketing/hero/hero-section';
import { HowItWorksSection } from '@/components/marketing/how-it-works/how-it-works-section';
import { VisionSection } from '@/components/marketing/vision/vision-section';
import { PageTransition } from '@/components/motion/page-transition';

export function LandingPage() {
  return (
    <PageTransition>
      <PageShell>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
        <VisionSection />
        <ContactSection />
        <FinalCtaSection />
      </PageShell>
    </PageTransition>
  );
}
