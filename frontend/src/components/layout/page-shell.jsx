import Waves from '@/components/ui/Waves/Waves';
import { cn } from '@/lib/utils';

export function PageShell({ children, className }) {
  return (
    <div className={cn('relative isolate min-h-screen overflow-x-clip', className)}>
      <Waves
        className="pointer-events-none absolute inset-0 z-0 opacity-65"
        lineColor="hsl(var(--primary) / 0.22)"
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={32}
        waveAmpY={14}
        friction={0.92}
        tension={0.009}
        maxCursorMove={110}
        xGap={14}
        yGap={34}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
