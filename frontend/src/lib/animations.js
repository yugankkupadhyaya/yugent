import { durations, easings, springs } from '@/lib/motion-tokens';

export const viewportOnce = { once: true, amount: 0.2 };

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.base,
      ease: easings.standard,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.reveal,
      ease: easings.emphasized,
    },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.reveal,
      ease: easings.emphasized,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.base,
      ease: easings.standard,
    },
  },
};

export function slideIn(direction = 'right') {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const offsetMap = {
    left: -28,
    right: 28,
    up: -24,
    down: 24,
  };

  return {
    hidden: { opacity: 0, [axis]: offsetMap[direction] ?? 28 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: durations.reveal,
        ease: easings.emphasized,
      },
    },
  };
}

export function staggerContainer({ staggerChildren = 0.1, delayChildren = 0 } = {}) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export const hoverLift = {
  rest: {
    y: 0,
    scale: 1,
    transition: { duration: durations.fast, ease: easings.standard },
  },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { duration: durations.fast, ease: easings.standard },
  },
};

export const tapScale = {
  scale: 0.985,
  transition: springs.snappy,
};

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.reveal, ease: easings.emphasized },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: durations.fast, ease: easings.standard },
  },
};

export const springsMap = springs;
