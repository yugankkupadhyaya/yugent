import { Stagger, StaggerItem } from '@/components/motion/stagger';

export function HeroReveal({ badge, title, description, actions, meta }) {
  return (
    <Stagger className="max-w-2xl" staggerChildren={0.12}>
      <StaggerItem>{badge}</StaggerItem>
      <StaggerItem>
        <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
          {title}
        </h1>
      </StaggerItem>
      <StaggerItem>
        <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      </StaggerItem>
      <StaggerItem>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>
      </StaggerItem>
      {meta ? <StaggerItem><div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">{meta}</div></StaggerItem> : null}
    </Stagger>
  );
}
