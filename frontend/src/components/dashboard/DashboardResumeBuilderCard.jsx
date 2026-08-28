import { Link } from 'react-router-dom';
import { ArrowRight, FilePenLine } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function DashboardResumeBuilderCard() {
  return (
    <section aria-label="Resume builder">
      <Link
        to="/resume-builder"
        className="group block h-full rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] transition-colors duration-200 hover:border-primary/30 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Resume builder
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
              Create a PDF resume
            </h2>
          </div>

          <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
            <FilePenLine className="size-4" aria-hidden="true" />
          </span>
        </div>

        <p className="mt-6 max-w-lg text-sm leading-6 text-muted-foreground">
          Fill a guided resume form, preview the document, and export it as a clean PDF.
        </p>

        <Button asChild size="sm" className="mt-5 w-fit" tabIndex={-1}>
          <span>
            Open builder
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Button>
      </Link>
    </section>
  );
}

export default DashboardResumeBuilderCard;
