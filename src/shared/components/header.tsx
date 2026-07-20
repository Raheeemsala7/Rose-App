'use client';
import {
  Badge,
  BellIcon,
  ClipboardList,
  GiftIcon,
  Globe,
  Headset,
  Heart,
  HomeIcon,
  Info,
  PartyPopper,
  Search,
  ShoppingCart,
  Star,
  User,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import  { useState } from 'react';
import LanguageSwitcher from './language-switcher';
import Image from 'next/image';
import { cn } from '../lib/utils';
import { Link, usePathname } from '@/src/i18n/navigation';
import {  useSession } from 'next-auth/react';
import RoseIcon from '@/public/icons/rose-icon';


const navItems = [
  { key: 'Home', href: '/', icon: HomeIcon },
  { key: 'Products', href: '/products', icon: GiftIcon },
  { key: 'Categories', href: '/categories', icon: ClipboardList },
  { key: 'Occasions', href: '/occasions', icon: PartyPopper },
  { key: 'Contact', href: '/contact', icon: Headset },
  { key: 'About', href: '/about', icon: Info },
];

const Header = () => {
  const { status } = useSession();
  const t = useTranslations('header');
  const pathname = usePathname();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleFocus = () => {
    setSearchOpen(true);
  };

  const handleBlur = () => {
    setSearchOpen(false);
  };

  return (
    <div className="w-full font-sans">
      <header className="sticky top-0 z-50 w-full shadow-md">
        <div className="flex items-center justify-between gap-4 bg-white dark:bg-zinc-800 px-6 py-2.5">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-1.5 no-underline"
          >
            <RoseIcon />
          </Link>

          {/* Search */}
          <div className={`relative flex-1 transition-all`}>
            <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 px-3.5 py-2">
              <Search size={16} className="text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="clear"
                  className="flex text-[var(--color-nav-muted)]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {searchOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-100 bg-white dark:bg-zinc-800 max-h-[420px] overflow-y-auto rounded-xl  p-4 shadow-2xl">
                <div className="mb-2.5 text-base  font-semibold text-maroon-700">
                  {t('searchDefault')}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div>
                      <Image
                        src={'/search-image.png'}
                        alt="TEST"
                        height={80}
                        width={80}
                      />
                    </div>
                    <div className="flex-1 flex justify-between items-start text-black dark:text-background">
                      <div className="space-y-1">
                        <div className="text-base font-semibold ">
                          Dreamy White Roses Bouquet
                        </div>
                        <div>
                          <span className="text-xl font-bold">140</span>{' '}
                          <span className="text-sm">EGP</span>
                        </div>
                      </div>

                      <div>
                        <p className="flex gap-1.5">
                          <Star
                            className="fill-yellow-400 stroke-yellow-400"
                            size={24}
                          />
                          <span>Rating: 4.5/5</span>
                          <span className="text-blue-600">(8 ratings)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right cluster */}
          <div className="flex flex-shrink-0 items-center gap-4">
            {status === 'unauthenticated' ? (
              <Link
                href={'/auth/login'}
                className="flex items-center gap-1.5 px-4 py-1.5 text-base text-zinc-700 dark:text-zinc-50 border-e border-zinc-200 dark:border-zinc-700"
              >
                <User size={20} />
                {t('login')}
              </Link>
            ) : (
              <p>user</p>
            )}

            <div className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-50">
              <Heart size={24} />
              <ShoppingCart size={24} />
              <BellIcon size={24} />
            </div>

            <LanguageSwitcher>{t('langToggle')}</LanguageSwitcher>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-8 bg-ds-primary-saturated dark:bg-soft-pink-200 px-6 ">
          {navItems.map((item) => {
            const isActive = item.href === pathname;
            return (
              <Link
                className={cn(
                  'flex items-center gap-1.5 text-base font-medium text-white dark:text-black no-underline py-2.5',
                  isActive &&
                    'text-soft-pink-200 border-b-2 border-soft-pink-200 dark:text-maroon-800 dark:border-maroon-800'
                )}
                key={item.key}
                href={item.href}
              >
                <item.icon size={20} />
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>
      </header>
    </div>
  );
};

export default Header;
// {/* Login prompt modal (guest gate) */}
// {loginPrompt && (
//     <div
//         className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
//         onClick={() => setLoginPrompt(false)}
//     >
//         <div onClick={(e) => e.stopPropagation()} className="w-80 rounded-xl bg-[var(--color-surface)] p-7 text-center">
//             <div className="mb-2 text-3xl">🔒</div>
//             <div className="mb-1.5 text-base font-bold text-[var(--color-text-primary)]">{t.loginPromptTitle}</div>
//             <div className="mb-5 text-[13px] text-[var(--color-text-secondary)]">{t.loginPromptBody}</div>
//             <div className="flex justify-center gap-2.5">
//                 <button
//                     onClick={() => setLoginPrompt(false)}
//                     className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[13px]"
//                 >
//                     {t.cancel}
//                 </button>
//                 <button
//                     onClick={() => setLoginPrompt(false)}
//                     className="rounded-md bg-[var(--color-brand)] px-4 py-2 text-[13px] font-semibold text-[var(--color-surface)]"
//                 >
//                     {t.loginPromptCta}
//                 </button>
//             </div>
//         </div>
//     </div>
// )}

// {/* Toast for product navigation (demo feedback) */}
// {toastMsg && (
//     <div className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-lg bg-[var(--color-nav-bg)] px-4.5 py-2.5 text-[13px] text-[var(--color-surface)]">
//         {toastMsg}
//     </div>
// )}

// {/* Page filler so sticky behavior is visible when scrolling */}
// <div className="min-h-[900px] bg-[var(--color-surface-muted)] p-10">
//     <p className="text-[13px] text-[var(--color-nav-muted)]">
//         {isRTL ? "محتوى الصفحة هنا لاختبار التمرير والسلوك الثابت للهيدر." : "Page content goes here — scroll to test sticky Header behavior."}
//     </p>
// </div>
