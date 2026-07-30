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
import { useState } from 'react';
import LanguageSwitcher from './language-switcher';
import Image from 'next/image';
import { cn } from '../lib/utils';
import { Link, usePathname } from '@/src/i18n/navigation';
import { useSession } from 'next-auth/react';
import RoseIcon from '@/public/icons/rose-icon';
import UserDropMenu from './user-dropmenu';
import { SearchBox } from './search-box';


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
          <SearchBox />

          {/* Right cluster */}
          <div className="flex flex-shrink-0 items-center gap-4">
            {status === 'unauthenticated' ? (
              <Link
                href={'/login'}
                className="flex items-center gap-1.5 px-4 py-1.5 text-base text-zinc-700 dark:text-zinc-50 border-e border-zinc-200 dark:border-zinc-700"
              >
                <User size={20} />
                {t('login')}
              </Link>
            ) : status === "loading" ? (
              <p>loading...</p>
            ) : status === "authenticated" && data.user ? (
              <UserDropMenu name={`${data?.user.firstName} ${data?.user.lastName}`} firstName={data?.user.firstName} />
            ) :
              <Link
                href={'/login'}
                className="flex items-center gap-1.5 px-4 py-1.5 text-base text-zinc-700 dark:text-zinc-50 border-e border-zinc-200 dark:border-zinc-700"
              >
                <User size={20} />
                {t('login')}
              </Link>
            }

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