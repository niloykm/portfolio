// Restrained, tactile GPU-composited motion tokens (220ms–280ms + physical filter springs)
// Strictly animates transform & opacity; never layout properties (width/height/top/left/margin).

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

export const MICRO_TRANSITION = {
  duration: 0.22,
  ease: EASE_OUT_EXPO,
};

export const FILTER_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 30,
};

export const TAB_LAYOUT_TRANSITION = FILTER_SPRING;

export const MODAL_TRANSITION = {
  duration: 0.25,
  ease: EASE_OUT_EXPO,
};

export const ICON_SWAP_TRANSITION = {
  duration: 0.18,
  ease: EASE_OUT_EXPO,
};
