"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function AnimatedCounter({
  value,
   fallbackValue = 50,
  duration = 1.2,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const parsedTarget =
    typeof value === "number" && !Number.isNaN(value) && value > 0
      ? value
      : typeof value === "string" && parseInt(value, 10) > 0
      ? parseInt(value, 10)
      : fallbackValue;

  const shouldReduceMotion = useReducedMotion();
  // Initialize with parsedTarget so SSR and first client render NEVER show 0+
  const [displayValue, setDisplayValue] = useState(parsedTarget);
  const previousValueRef = useRef(parsedTarget);

  useEffect(() => {
    const prevValue = previousValueRef.current;
    const endValue = parsedTarget;

    if (shouldReduceMotion || prevValue === endValue) {
      setDisplayValue(endValue);
      previousValueRef.current = endValue;
      return;
    }

    let animationFrameId = null;
    let startTimestamp = null;
    const startValue = prevValue > 0 ? prevValue : endValue;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeProgress * (endValue - startValue) + startValue);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
        previousValueRef.current = endValue;
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [parsedTarget, duration, shouldReduceMotion]);

  return (
    <span
      className={`inline-block tabular-nums ${className}`}
      style={{ fontVariantNumeric: "tabular-nums" }}
      aria-label={`${prefix}${parsedTarget}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </span>
    </span>
  );
}
