import { useLocale } from 'next-intl';
import { cn } from '../lib/utils';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  className?: string;
}

export default function SectionTitle({ subtitle, title, className }: SectionTitleProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className={cn('flex flex-col gap-2', isRTL ? 'items-end text-right' : 'items-start text-left', className)}>
      {subtitle && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-blush-600 dark:text-blush-400">
          <span className="block h-px w-6 bg-blush-400 dark:bg-blush-500 rounded-full" aria-hidden />
          {subtitle}
          <span className="block h-px w-6 bg-blush-400 dark:bg-blush-500 rounded-full" aria-hidden />
        </span>
      )}
      <h2 className="relative text-3xl sm:text-4xl font-bold text-burgundy-800 dark:text-cream-100">
        {title}
        {/* Underline accent */}
        <span
          className={cn(
            'absolute -bottom-1.5 h-1 w-2/3 rounded-full',
            'bg-gradient-to-r from-blush-400 to-blush-200 dark:from-blush-600 dark:to-blush-800',
            isRTL ? 'right-0' : 'left-0'
          )}
          aria-hidden
        />
      </h2>
    </div>
  );
}
