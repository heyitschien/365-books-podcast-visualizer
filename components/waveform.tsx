"use client";

import { memo } from "react";

export const Waveform = memo(function Waveform({
  levels,
}: {
  levels: number[];
}) {
  const normalized = levels.length
    ? levels
    : Array.from({ length: 48 }, () => 0.2);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
      <div className="flex h-16 w-full max-w-5xl items-end gap-1 px-6 opacity-70">
        {normalized.map((value, index) => (
          <span
            key={index}
            className="flex-1 rounded-full bg-gradient-to-t from-white/10 via-white/30 to-white/60"
            style={{
              height: `${Math.max(10, value * 100)}%`,
              opacity: 0.4 + value * 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
});
