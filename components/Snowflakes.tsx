'use client';

import { useEffect, useState } from 'react';

export default function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    const count = 50;
    const flakes = Array.from({ length: count }, (_, i) => i);
    setSnowflakes(flakes);
  }, []);

  return (
    <>
      {snowflakes.map((flake) => (
        <div
          key={flake}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${10 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${10 + Math.random() * 20}px`,
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
}

