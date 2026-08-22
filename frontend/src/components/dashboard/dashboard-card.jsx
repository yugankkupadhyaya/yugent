import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function DashboardCard({ className, children }) {
  return <Card className={cn('rounded-[var(--radius-xl)]', className)}>{children}</Card>;
}
