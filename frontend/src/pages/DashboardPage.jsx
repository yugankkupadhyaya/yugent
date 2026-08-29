import { useEffect, useState } from 'react';

import api from '@/utils/axios';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardPerformance } from '@/components/dashboard/DashboardPerformance';
import { DashboardResumeBuilderCard } from '@/components/dashboard/DashboardResumeBuilderCard';
import { DashboardResumeCard } from '@/components/dashboard/DashboardResumeCard';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

export function DashboardPage({ user }) {
  const [stats, setStats] = useState(undefined);

  useEffect(() => {
    let active = true;
    api
      .get('/api/interview/all')
      .then(({ data }) => {
        if (active && data?.success) setStats(data.stats);
      })
      .catch(() => {
        /* Dashboard stats are non-critical; keep cards empty on failure. */
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardLayout user={user}>
      <div className="space-y-11 sm:space-y-14">
        <DashboardStats stats={stats} />
        <div className="grid gap-4 lg:grid-cols-2">
          <DashboardResumeCard />
          <DashboardResumeBuilderCard />
        </div>
        <DashboardPerformance />
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
