import { ArrowUpRight, Mail, MapPin, MessageSquare } from 'lucide-react';

import { SectionHeader } from '@/components/layout/section-header';
import { SectionShell } from '@/components/layout/section-shell';
import { PremiumButton } from '@/components/premium/premium-button';
import { Stagger, StaggerItem } from '@/components/motion/stagger';

const contactLinks = [
  {
    name: 'GitHub',
    value: 'yugankkkupadhyaya',
    icon: 'GH',
    href: 'https://github.com/yugankkupadhyaya',
  },
  {
    name: 'Email',
    value: 'yugankkupadhyaya@gmail.com',
    icon: <Mail className="size-4" />,
    href: 'mailto:yugankkupadhyaya@gmail.com',
  },
  {
    name: 'LinkedIn',
    value: 'Yugank Upadhyaya',
    icon: 'in',
    href: 'https://www.linkedin.com/in/yugank-upadhyaya-188786248/',
  },
  {
    name: 'X',
    value: '@yugankupadhyaya',
    icon: 'X',
    href: 'https://x.com/yugankupadhyaya',
  },
];

export function ContactSection() {
  return (
    <SectionShell id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Let's build something meaningful."
        description="Have a question, want to collaborate, or simply want to talk about technology and careers? Reach out through any of the channels below."
        className="max-w-2xl"
      />

      <Stagger className="mt-16 border-y border-border/70" staggerChildren={0.08}>
        {contactLinks.map((link) => (
          <StaggerItem key={link.name}>
            <a
              href={link.href}
              target={link.name === 'Email' ? undefined : '_blank'}
              rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
              className="group flex min-w-0 items-center justify-between gap-6 border-b border-border/70 px-2 py-5 transition-colors last:border-b-0 hover:bg-muted/40 sm:px-4 sm:py-6"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-card text-muted-foreground transition-all duration-200 group-hover:border-primary/25 group-hover:bg-accent/70 group-hover:text-primary">
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{link.name}</p>
                  <p className="mt-1 truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-base">
                    {link.value}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
            </a>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-12 flex flex-col gap-8 border-t border-border/70 pt-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-card text-primary">
            <MapPin className="size-4" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Based in</p>
            <p className="mt-1 text-sm font-medium text-foreground">Ghaziabad, Uttar Pradesh, India</p>
          </div>
        </div>

        <PremiumButton asChild magnetic className="w-full justify-center md:w-auto">
          <a href="mailto:yugankkupadhyaya@gmail.com">
            <MessageSquare className="size-4" />
            Send a direct message
          </a>
        </PremiumButton>
      </div>
    </SectionShell>
  );
}
