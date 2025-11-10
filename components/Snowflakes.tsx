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
    return Array.from({ length: count }, (_, id) => {
      // All flakes start with minimal or no delay for immediate visibility
      // Stagger them slightly (0-0.8s) for natural effect
      const delay = Math.random() * 0.8;
      const duration = 12 + Math.random() * 18;
      
      // For immediate visibility: use negative delay to start animation partway through
      // This makes flakes appear immediately at different positions
      const negativeDelay = id < 12 ? -(Math.random() * duration * 0.3) : 0;
      const finalDelay = delay + negativeDelay;
      
      return {
        id,
        left: `${Math.random() * 100}%`,
        delay: `${finalDelay}s`,
        duration: `${duration}s`,
        size: `${12 + Math.random() * 28}px`,
        opacity: 0.15 + Math.random() * 0.2,
      };
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10 opacity-30">
      {flakes.map(({ id, left, delay, duration, size, opacity }) => (
        <span
          key={id}
          className="snowflake"
          style={{
            left,
            animationDelay: delay,
            animationDuration: duration,
            fontSize: size,
            opacity,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}

