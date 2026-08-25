import { BarChart3, CheckCircle2, MessageSquare, Target } from 'lucide-react';

import { DashboardStatCard } from './DashboardStatCard';

function hasNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function formatNumber(value) {
  return hasNumber(value) ? new Intl.NumberFormat().format(value) : '—';
}

export function DashboardStats({ stats }) {
  const hasStats = Boolean(stats);
  const totalInterviews = stats?.totalInterviews;
  const totalQuestions = stats?.totalQuestions;
  const completed = stats?.completed;
  const averageScore = stats?.averageScore;

  return (
    <section aria-label="Interview statistics">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          icon={BarChart3}
          label="Total interviews"
          value={formatNumber(totalInterviews)}
          highlight={hasStats ? 'All time' : 'No data yet'}
          description="Interviews created"
        />
        <DashboardStatCard
          icon={MessageSquare}
          label="Questions solved"
          value={formatNumber(totalQuestions)}
          highlight={hasStats ? 'Answered' : 'No data yet'}
          description="Across all interviews"
        />
        <DashboardStatCard
          icon={CheckCircle2}
          label="Completed"
          value={formatNumber(completed)}
          highlight={hasNumber(totalInterviews) ? `${formatNumber(totalInterviews)} total` : 'No data yet'}
          description="Interviews finished"
        />
        <DashboardStatCard
          icon={Target}
          label="Average score"
          value={hasNumber(averageScore) ? `${Math.round(averageScore)}/100` : '—'}
          highlight={hasStats ? 'Completed only' : 'No data yet'}
          description="Average performance"
        />
      </div>
    </section>
  );
}
