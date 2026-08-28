import { Link } from 'react-router-dom';
import { ArrowRight, FileText, LoaderCircle, Target } from 'lucide-react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

function getScore(resume) {
  const score = typeof resume?.score === 'number' ? resume.score : 0;
  return Math.max(0, Math.min(100, score));
}

export function DashboardResumeCard() {
  const resume = useSelector((state) => state.resume.analysis);
  const status = useSelector((state) => state.resume.status);
  const hasFetched = useSelector((state) => state.resume.hasFetched);
  const isLoading = !resume && !hasFetched && (status === 'idle' || status === 'loading');
  const score = getScore(resume);

  return (
    <section aria-label="Resume analysis">
      <Link
        to="/resume"
        className="group block rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] transition-colors duration-200 hover:border-primary/30 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Resume analysis
            </p>
            <h2 className="mt-2 truncate text-lg font-semibold tracking-tight text-foreground">
              {resume?.suggestedRole || resume?.name || 'Resume scorer'}
            </h2>
          </div>

          <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
            {isLoading ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            ) : resume ? (
              <Target className="size-4" aria-hidden="true" />
            ) : (
              <FileText className="size-4" aria-hidden="true" />
            )}
          </span>
        </div>

        {resume ? (
          <div className="mt-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-semibold leading-none tracking-[-0.055em] tabular-nums">
                  {score}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Resume score</p>
              </div>

              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>

            <Progress value={score} className="mt-5" />

            <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {resume.summary || 'Review your previous resume analysis and recommendations.'}
            </p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-lg text-sm leading-6 text-muted-foreground">
              {isLoading
                ? 'Loading your saved resume analysis.'
                : 'Upload a resume to see your score and improvement plan here.'}
            </p>

            <Button asChild size="sm" className="w-fit" tabIndex={-1}>
              <span>
                Analyze resume
                <ArrowRight className="size-4" />
              </span>
            </Button>
          </div>
        )}
      </Link>
    </section>
  );
}

export default DashboardResumeCard;
