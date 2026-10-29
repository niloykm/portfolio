'use client';

import { useEffect, useState } from 'react';

type LocalClockProps = {
  timeZone?: string;
  className?: string;
};

export function LocalClock({
  timeZone = 'Asia/Dhaka',
  className = '',
}: LocalClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const update = () => {
      try {
        setTime(formatter.format(new Date()));
      } catch {
        setTime('--:--');
      }
    };

    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span
      className={`inline-block min-w-[5ch] font-mono tabular-nums ${className}`}
      aria-label={time ? `Local time ${time} (${timeZone})` : 'Local time'}
    >
      {time ?? '\u00A0\u00A0:\u00A0\u00A0'}
    </span>
  );
}
