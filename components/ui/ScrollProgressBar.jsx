"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgressBar() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || shouldReduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-emerald-500 z-[100] origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
