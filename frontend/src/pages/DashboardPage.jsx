import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardPerformance } from '@/components/dashboard/DashboardPerformance';
import { DashboardResumeBuilderCard } from '@/components/dashboard/DashboardResumeBuilderCard';
import { DashboardResumeCard } from '@/components/dashboard/DashboardResumeCard';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

/**
 * `stats` and `history` are deliberately passed through as route-level inputs.
 * The frontend currently exposes no dashboard API, so this keeps the eventual
 * API adapter isolated without presenting fabricated career data to a user.
 */
export function DashboardPage({ user, stats, history }) {
  return (
    <DashboardLayout user={user}>
      <div className="space-y-11 sm:space-y-14">
        <DashboardStats stats={stats} />
        <div className="grid gap-4 lg:grid-cols-2">
          <DashboardResumeCard />
          <DashboardResumeBuilderCard />
        </div>
        <DashboardPerformance history={history} />
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
