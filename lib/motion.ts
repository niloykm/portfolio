export const spring = {
  snappy: { type: 'spring', stiffness: 500, damping: 38, mass: 0.8 },
  soft:   { type: 'spring', stiffness: 260, damping: 30 },
} as const;

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const dur = { hover: 0.12, ui: 0.24, reveal: 0.6 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.reveal, ease: ease.out },
  },
};

export const stagger = (s = 0.05) => ({
  show: { transition: { staggerChildren: s } },
});
