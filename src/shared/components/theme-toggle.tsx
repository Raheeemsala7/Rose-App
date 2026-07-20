'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('theme');
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      className='text-red-500'
      onClick={toggleTheme}
      aria-label={t('toggle')}
      disabled={!mounted}
    >
      {mounted && resolvedTheme === 'dark' ? t('light') : t('dark')}
    </button>
  );
}
