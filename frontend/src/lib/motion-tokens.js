export const durations = {
  fast: 0.18,
  base: 0.26,
  slow: 0.4,
  reveal: 0.6,
};

export const easings = {
  standard: [0.22, 1, 0.36, 1],
  emphasized: [0.16, 1, 0.3, 1],
};

export const springs = {
  gentle: {
    type: 'spring',
    stiffness: 150,
    damping: 20,
    mass: 0.8,
  },
  soft: {
    type: 'spring',
    stiffness: 220,
    damping: 24,
    mass: 0.9,
  },
  snappy: {
    type: 'spring',
    stiffness: 320,
    damping: 24,
    mass: 0.7,
  },
};
