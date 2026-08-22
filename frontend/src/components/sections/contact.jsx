import { ArrowUpRight, Mail, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    icon: <Mail className="h-4 w-4" />,
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
    icon: '𝕏',
    href: 'https://x.com/yugankupadhyaya',
  },
];

export function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-background/55">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact</p>

          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            Let&apos;s build something meaningful.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Have a question, want to collaborate, or simply want to talk about technology and
            careers? Reach out through any of the channels below.
          </p>
        </div>

        <div className="mt-16 border-y border-border">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.name === 'Email' ? undefined : '_blank'}
              rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
              className="group flex min-w-0 items-center justify-between gap-6 border-b border-border px-2 py-5 transition-colors last:border-b-0 hover:bg-muted/40 sm:px-4 sm:py-6"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-200 group-hover:border-primary/30 group-hover:bg-accent group-hover:text-primary">
                  {link.icon}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {link.name}
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-base">
                    {link.value}
                  </p>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary">
              <MapPin className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Based in
              </p>

              <p className="mt-1 text-sm font-medium text-foreground">
                Ghaziabad, Uttar Pradesh, India
              </p>
            </div>
          </div>

          <Button asChild variant="outline" size="lg" className="btn-burst rounded-full px-6">
            <a href="mailto:yugankkupadhyaya@gmail.com" className="inline-flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Send a direct message
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
