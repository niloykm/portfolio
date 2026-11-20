// Restrained, GPU-composited micro-interaction tokens (150ms–200ms)
// Strictly animates transform & opacity; never layout properties (width/height/top/left/margin).

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

export const MICRO_TRANSITION = {
  duration: 0.16,
  ease: EASE_OUT_EXPO,
};

export const TAB_LAYOUT_TRANSITION = {
  duration: 0.2,
  ease: EASE_OUT_EXPO,
};

export const MODAL_TRANSITION = {
  duration: 0.18,
  ease: EASE_OUT_EXPO,
};

export const ICON_SWAP_TRANSITION = {
  duration: 0.14,
  ease: EASE_OUT_EXPO,
};
