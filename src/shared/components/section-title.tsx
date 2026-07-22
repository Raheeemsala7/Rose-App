import { useLocale } from 'next-intl';

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="relative w-fit">
      <h2 className="relative z-10 text-4xl font-bold text-ds-text-primary">{title}</h2>

      <div
        className={`absolute -bottom-1 -z-10 h-4.5 w-3/4 bg-soft-pink-100 dark:bg-ds-bg-plain ${isRTL ? 'right-0 rounded-l-full' : 'left-0 rounded-r-full'}`}
      >
        <div
          className={`absolute bottom-0 h-1 w-1/3 bg-soft-pink-600 ${isRTL ? 'right-0' : 'left-0'}`}
        />
      </div>
    </div>
  );
}
