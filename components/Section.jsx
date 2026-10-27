import React from "react";

export default function Section({
  id,
  label,
  children,
  className = "",
  containerClassName = "",
  ...props
}) {
  const labelledBy = label || `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-20 md:py-28 scroll-mt-24 relative overflow-hidden ${className}`}
      {...props}
    >
      <div className={`max-w-6xl mx-auto px-5 sm:px-8 relative z-10 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
