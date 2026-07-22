'use client';

import { useTranslations, useLocale } from 'next-intl';

import { createContext, useContext, useEffect, useState } from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';
import { cn } from '@/src/shared/lib/utils';
import { Link } from '@/src/i18n/navigation';
import { Occasion } from '@/src/features/occasions/types/occasions';

interface MostPopularSharedTabsContextValue {
  activeId: string | null;
  setActiveId: (id: string) => void;
}

const MostPopularSharedTabsContext = createContext<MostPopularSharedTabsContextValue | null>(null);

function useMostPopularSharedTabs() {
  const context = useContext(MostPopularSharedTabsContext);
  if (!context) {
    throw new Error('Most popular tabs must be used within MostPopularSharedTabsProvider');
  }
  return context;
}

export function MostPopularSharedTabsProvider({ children }: { children: React.ReactNode }) {
  // State
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <MostPopularSharedTabsContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </MostPopularSharedTabsContext.Provider>
  );
}

export function DefaultActiveTabSync({ defaultActiveId }: { defaultActiveId: string }) {
  // State
  const { activeId, setActiveId } = useMostPopularSharedTabs();

  useEffect(() => {
    if (activeId === null && defaultActiveId) {
      setActiveId(defaultActiveId);
    }
  }, [activeId, defaultActiveId, setActiveId]);

  return null;
}

interface MostPopularTabListProps {
  occasions: Occasion[];
}

export function MostPopularTabList({ occasions }: MostPopularTabListProps) {
  // State
  const { activeId, setActiveId } = useMostPopularSharedTabs();

  return (
    <div className="flex items-center gap-6">
      {occasions.map((occasion) => (
        <button
          key={occasion.id}
          type="button"
          onClick={() => setActiveId(occasion.id)}
          className={cn(
            'cursor-pointer text-base font-medium transition-colors',
            activeId === occasion.id
              ? 'text-ds-text-primary'
              : 'text-ds-text-muted hover:text-ds-text-primary'
          )}
        >
          {occasion.title}
        </button>
      ))}
    </div>
  );
}

interface MostPopularTabPanelProps {
  occasionId: string;
  children: React.ReactNode;
}

export function MostPopularTabPanel({ occasionId, children }: MostPopularTabPanelProps) {
  // State
  const { activeId } = useMostPopularSharedTabs();

  if (activeId !== occasionId) {
    return null;
  }

  return <div className="mt-10">{children}</div>;
}

export function ViewMoreLink() {
  // State
  const { activeId } = useMostPopularSharedTabs();
  // Translation
  const t = useTranslations('home');
  // Variables
  const locale = useLocale();
  const isRTL = locale === 'ar';
  // Functions
  const href = activeId ? `/products?occasion=${activeId}` : '/products';

  return (
    <div className="flex justify-end mt-6">
      <Link
        href={href}
        className="text-ds-text-primary flex items-center gap-2.5 transition-colors text-base font-medium"
      >
        {t('viewMore')}{' '}
        {isRTL ? <MoveLeft className="w-5 h-5" /> : <MoveRight className="w-5 h-5" />}
      </Link>
    </div>
  );
}
