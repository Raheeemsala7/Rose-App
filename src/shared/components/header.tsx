'use client';

import {
  BellIcon,
  ClipboardList,
  GiftIcon,
  Headset,
  Heart,
  HomeIcon,
  Info,
  Menu,
  PartyPopper,
  ShoppingCart,
  User,
  X,
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
import { useState, useEffect } from 'react';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Close drawer whenever the route changes */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  /* Prevent body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <div className="w-full font-ds-sans">
      {/* ── Announcement bar (not sticky — scrolls away) ── */}
      <AnnounceBar />

      <header className="sticky top-0 z-50 w-full shadow-ds-soft">

        {/* ════════════════════════════════════
            TOP ROW  –  logo / search / actions
            ════════════════════════════════════ */}
        <div className="flex items-center justify-betwee lg:justify-center gap-3 bg-cream-100 dark:bg-burgundy-950 border-b border-cream-300 dark:border-burgundy-800 px-4 sm:px-6 py-2.5">


          {/* Hamburger — below lg */}
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-1.5 rounded-full text-burgundy-700 dark:text-blush-200 hover:bg-burgundy-50 dark:hover:bg-burgundy-800 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>


          {/* Logo */}
          <Link href="/" className="flex-1 lg:flex-shrink-0 flex justify-center items-center no-underline">
            <RoseIcon className="h-9 sm:h-10 w-auto" />
          </Link>

          {/* Search – always visible, takes available space between logo and actions */}
          <div className="flex-1 min-w-0 hidden lg:flex">
            <SearchBox />
          </div>

          {/* Right actions */}
          <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2 ms-auto">

            {/* Cart — always visible on mobile for quick access */}
            <button
              aria-label="Cart"
              className="p-1.5 rounded-full text-burgundy-700 dark:text-blush-200 hover:bg-burgundy-50 dark:hover:bg-burgundy-800 transition-colors cursor-pointer"
            >
              <ShoppingCart size={20} />
            </button>

            {/* Wishlist + Notifications — visible sm+ */}
            <div className="flex items-center gap-0.5 text-burgundy-700 dark:text-blush-200">
              <button aria-label="Wishlist" className="p-1.5 rounded-full hover:bg-burgundy-50 dark:hover:bg-burgundy-800 transition-colors cursor-pointer"><Heart size={20} /></button>
              <button aria-label="Notifications" className="hidden sm:flex p-1.5 rounded-full hover:bg-burgundy-50 dark:hover:bg-burgundy-800 transition-colors cursor-pointer"><BellIcon size={20} /></button>
            </div>

            {/* Auth */}
            {status === 'unauthenticated' && (
              <Link
                href="/login"
                className={cn(
                  'flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 rounded-full text-sm font-medium transition-colors',
                  'text-burgundy-700 dark:text-blush-200',
                  'hover:bg-burgundy-50 dark:hover:bg-burgundy-800',
                  'sm:border sm:border-burgundy-300 sm:dark:border-burgundy-600',
                )}
              >
                <User size={20} />
                <span className="hidden sm:inline">{t('login')}</span>
              </Link>
            )}
            {status === 'loading' && (
              <div className="h-8 w-8 rounded-full bg-cream-300 dark:bg-burgundy-800 animate-pulse" />
            )}
            {status === 'authenticated' && data?.user && (
              <UserDropMenu
                name={`${data.user.firstName} ${data.user.lastName}`}
                firstName={data.user.firstName}
              />
            )}

            {/* Theme + Lang — desktop only */}
            <div className="hidden sm:flex items-center">
              <ThemeToggle />
              <LanguageSwitcher>{t('langToggle')}</LanguageSwitcher>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 lg:hidden px-6">
          <SearchBox />
        </div>

        {/* ════════════════════════════════════
            DESKTOP NAV ROW  (lg+)
            ════════════════════════════════════ */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center justify-center gap-1 bg-burgundy-800 dark:bg-burgundy-950 px-6"
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'relative flex items-center gap-1.5 text-sm font-medium no-underline py-3 px-4',
                'text-cream-100 dark:text-cream-200 transition-colors',
                'hover:text-blush-200 dark:hover:text-blush-300',
                isActive(item.href) && [
                  'text-blush-300 dark:text-blush-200',
                  'after:absolute after:bottom-0 after:inset-x-0',
                  'after:h-0.5 after:bg-blush-300 dark:after:bg-blush-200',
                  'after:rounded-t-full',
                ]
              )}
            >
              <item.icon size={16} aria-hidden />
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
      </header>

      {/* ════════════════════════════════════
          MOBILE DRAWER  (below lg)
          ════════════════════════════════════ */}

      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      {/* Drawer panel */}
      <aside
        id="mobile-nav"
        aria-label="Mobile navigation"
        className={cn(
          'fixed top-0 z-50 h-full w-72 max-w-[85vw]',
          'bg-cream-100 dark:bg-burgundy-950',
          'shadow-2xl transition-transform duration-300 ease-in-out lg:hidden',
          'flex flex-col',
          /* RTL-aware slide direction */
          'start-0 rtl:start-auto rtl:end-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-300 dark:border-burgundy-800">
          <RoseIcon className="h-9 w-auto" />
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-full text-burgundy-700 dark:text-blush-200 hover:bg-burgundy-50 dark:hover:bg-burgundy-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-5 py-3.5 text-base font-medium no-underline transition-colors',
                'text-burgundy-800 dark:text-cream-100',
                'hover:bg-burgundy-50 dark:hover:bg-burgundy-800',
                isActive(item.href) && 'bg-burgundy-100 dark:bg-burgundy-800 text-burgundy-900 dark:text-blush-200 font-semibold'
              )}
            >
              <item.icon size={18} aria-hidden />
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Drawer footer – theme & lang */}
        <div className="border-t border-cream-300 dark:border-burgundy-800 px-5 py-4 flex items-center justify-between gap-3">
          {/* Auth */}
          {status === 'unauthenticated' && (
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-burgundy-700 dark:text-blush-200 no-underline"
            >
              <User size={17} />
              {t('login')}
            </Link>
          )}
          {status === 'authenticated' && data?.user && (
            <span className="text-sm font-medium text-burgundy-800 dark:text-cream-100 truncate">
              {data.user.firstName}
            </span>
          )}

          <div className="flex items-center gap-2 ms-auto text-burgundy-700 dark:text-blush-200">
            <button aria-label="Wishlist" className="p-1.5 rounded-full hover:bg-burgundy-50 dark:hover:bg-burgundy-800 cursor-pointer"><Heart size={19} /></button>
            <button aria-label="Cart" className="p-1.5 rounded-full hover:bg-burgundy-50 dark:hover:bg-burgundy-800 cursor-pointer"><ShoppingCart size={19} /></button>
            <ThemeToggle />
            <LanguageSwitcher>{t('langToggle')}</LanguageSwitcher>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Header;
