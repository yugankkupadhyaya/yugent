import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ChevronDown, ChevronUp, Clock, Play } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

function difficultyVariant(difficulty) {
  switch ((difficulty || '').toLowerCase()) {
    case 'easy':
      return 'default';
    case 'medium':
      return 'secondary';
    case 'hard':
      return 'destructive';
    default:
      return 'outline';
  }
}

export function ModuleCard({ mod, index }) {
  const [open, setOpen] = useState(false);

  const title = mod?.title || `Module ${index + 1}`;
  const hasYoutube = Boolean(mod?.youtube);
  const hasArticle = Boolean(mod?.article);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.3 }}
    >
      <div className="surface-card overflow-hidden rounded-[var(--radius-xl)]">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center gap-3 p-4 text-left sm:p-5"
          aria-expanded={open}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-accent/60 text-sm font-semibold text-foreground">
            {index + 1}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{title}</p>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              <span>{mod?.duration || '—'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={difficultyVariant(mod?.difficulty)}>{mod?.difficulty || '—'}</Badge>
            {open ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </div>
        </button>

        {open && (
          <div className="border-t border-border/70 px-4 pb-4 pt-4 sm:px-5">
            <p className="text-sm leading-6 text-muted-foreground">{mod?.description}</p>

            {(hasYoutube || hasArticle) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {hasYoutube && (
                  <a
                    href={mod.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/20 dark:text-red-400"
                  >
                    <Play className="size-3.5" /> Watch tutorial
                  </a>
                )}
                {hasArticle && (
                  <a
                    href={mod.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <BookOpen className="size-3.5" /> Read article
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ModuleCard;
