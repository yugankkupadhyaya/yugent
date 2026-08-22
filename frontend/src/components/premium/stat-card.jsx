import { Card } from '@/components/ui/card';
import { CountUp } from '@/components/motion/count-up';

export function StatCard({ label, value, suffix = '', className, accentClassName = 'text-white' }) {
  return (
    <Card className={className}>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">{label}</p>
        <p className={`mt-2 text-lg font-semibold sm:text-xl ${accentClassName}`}>
          {typeof value === 'number' ? <CountUp to={value} suffix={suffix} /> : value}
        </p>
      </div>
    </Card>
  );
}
