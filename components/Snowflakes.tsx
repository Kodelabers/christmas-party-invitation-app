'use client';

import { useMemo } from 'react';

type SnowflakeConfig = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
};

export default function Snowflakes() {
  const flakes = useMemo<SnowflakeConfig[]>(() => {
    const count = 24;
    return Array.from({ length: count }, (_, id) => ({
      id,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${12 + Math.random() * 18}s`,
      size: `${12 + Math.random() * 28}px`,
      opacity: 0.25 + Math.random() * 0.35,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {flakes.map(({ id, left, delay, duration, size, opacity }) => (
        <span
          key={id}
          className="snowflake"
          style={{ left, animationDelay: delay, animationDuration: duration, fontSize: size, opacity }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}

