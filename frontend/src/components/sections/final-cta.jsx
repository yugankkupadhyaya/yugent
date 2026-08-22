import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinalCta() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden border-t border-border bg-primary text-primary-foreground"
    >
      {/* Subtle decorative structure */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-primary-foreground/10"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-48 -right-32 h-[32rem] w-[32rem] rounded-full border border-primary-foreground/10"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Your next move starts here
          </div>

          <h2 className="mt-7 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
            Build the career you&apos;ve always wanted.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-primary-foreground/75 sm:text-lg sm:leading-8">
            Stop wondering what to do next. Get the clarity, preparation, and direction to move
            forward with confidence.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="responsive-button btn-burst group h-12 rounded-full px-7"
              type="button"
            >
              <>
                Login
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="responsive-button h-12 rounded-full px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <a href="#features">Explore Yugent</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
