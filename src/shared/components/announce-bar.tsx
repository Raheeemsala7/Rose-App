'use client';

import { useMessages } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

export default function AnnounceBar() {
  const messages = useMessages();
  // Safely read the announce items array from the message tree
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: string[] = ((messages as any)?.announce?.items ?? []) as string[];

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof window.setTimeout> | undefined>(undefined);

  const advance = () => {
    if (items.length === 0) return;
    setVisible(false);
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % items.length);
      setVisible(true);
    }, 400);
  };

  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(advance, 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div
      role="marquee"
      aria-live="polite"
      aria-atomic="true"
      className="w-full bg-ds-announce text-ds-text-announce text-xs sm:text-sm font-medium text-center py-2 px-4 select-none overflow-hidden"
    >
      <span
        className={cn(
          'inline-block transition-all duration-300',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
        )}
      >
        {items[current]}
      </span>
    </div>
  );
}
