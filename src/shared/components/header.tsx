'use client';

import {
  BellIcon,
  ClipboardList,
  GiftIcon,
  Headset,
  Heart,
  HomeIcon,
  Info,
  PartyPopper,
  ShoppingCart,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './language-switcher';
import { cn } from '../lib/utils';
import { Link, usePathname } from '@/src/i18n/navigation';
import { useSession } from 'next-auth/react';
import RoseIcon from '@/public/icons/rose-icon';
import UserDropMenu from './user-dropmenu';
import { SearchBox } from './search-box';
import AnnounceBar from './announce-bar';
import ThemeToggle from './theme-toggle';

const navItems = [
  { key: 'Home', href: '/', icon: HomeIcon },
  { key: 'Products', href: '/products', icon: GiftIcon },
  { key: 'Categories', href: '/categories', icon: ClipboardList },
  { key: 'Occasions', href: '/occasions', icon: PartyPopper },
  { key: 'Contact', href: '/contact', icon: Headset },
  { key: 'About', href: '/about', icon: Info },
];

const Header = () => {
  const { status, data } = useSession();
  const t = useTranslations('header');
  const pathname = usePathname();

  return (
    <div className="w-full font-ds-sans">
      {/* ── Announcement bar ── */}
      <AnnounceBar />

      <header className="sticky top-0 z-50 w-full shadow-ds-soft">
        {/* ── Top row: logo · search · actions ── */}
        <div className="flex items-center justify-between gap-4 bg-cream-100 dark:bg-burgundy-950 border-b border-cream-300 dark:border-burgundy-800 px-6 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-1.5 no-underline"
          >
            <RoseIcon className="h-10 w-auto" />
          </Link>

          {/* Search — grows to fill space */}
          <div className="flex-1 w-full">
            <SearchBox />
          </div>

          {/* Right cluster */}
          <div className="flex flex-shrink-0 items-center gap-3">
            {/* Auth */}
            {status === 'unauthenticated' && (
              <Link
                href="/login"
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                  'text-burgundy-700 dark:text-blush-200',
                  'border border-burgundy-300 dark:border-burgundy-600',
                  'hover:bg-burgundy-50 dark:hover:bg-burgundy-800 transition-colors'
                )}
              >
                <User size={18} />
                {t('login')}
              </Link>
            )}
            {status === 'loading' && (
              <div className="h-8 w-20 rounded-full bg-cream-300 dark:bg-burgundy-800 animate-pulse" />
            )}
            {status === 'authenticated' && data?.user && (
              <UserDropMenu
                name={`${data.user.firstName} ${data.user.lastName}`}
                firstName={data.user.firstName}
              />
            )}

            {/* Icon cluster */}
            <div className="flex items-center gap-2 text-burgundy-700 dark:text-blush-200">
              <button
                aria-label="Wishlist"
                className="p-1.5 rounded-full hover:bg-burgundy-50 dark:hover:bg-burgundy-800 transition-colors cursor-pointer"
              >
                <Heart size={22} />
              </button>
              <button
                aria-label="Cart"
                className="p-1.5 rounded-full hover:bg-burgundy-50 dark:hover:bg-burgundy-800 transition-colors cursor-pointer"
              >
                <ShoppingCart size={22} />
              </button>
              <button
                aria-label="Notifications"
                className="p-1.5 rounded-full hover:bg-burgundy-50 dark:hover:bg-burgundy-800 transition-colors cursor-pointer"
              >
                <BellIcon size={22} />
              </button>
            </div>

            <ThemeToggle />

            <LanguageSwitcher>{t('langToggle')}</LanguageSwitcher>
          </div>
        </div>

        {/* ── Bottom nav row ── */}
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap justify-center gap-1 sm:gap-4 bg-burgundy-800 dark:bg-burgundy-950 px-6"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'relative flex items-center gap-1.5 text-sm font-medium no-underline py-3 px-3',
                  'text-cream-100 dark:text-cream-200 transition-colors',
                  'hover:text-blush-200 dark:hover:text-blush-300',
                  isActive && [
                    'text-blush-300 dark:text-blush-200',
                    'after:absolute after:bottom-0 after:inset-x-0',
                    'after:h-0.5 after:bg-blush-300 dark:after:bg-blush-200',
                    'after:rounded-t-full',
                  ]
                )}
              >
                <item.icon size={17} aria-hidden />
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
