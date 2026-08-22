import { CountUp } from '@/components/motion/count-up';
import { DashboardCard } from '@/components/dashboard/dashboard-card';

export function MetricTile({ label, value, suffix = '' }) {
  return (
    <DashboardCard>
      <div className="p-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          {typeof value === 'number' ? <CountUp to={value} suffix={suffix} /> : value}
        </p>
      </div>
    </DashboardCard>
  );
}
