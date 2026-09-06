"use client"
import { Category } from '@/src/features/categories/types/categories';
import { usePathname, useRouter } from '@/src/i18n/navigation';
import { cn } from '@/src/shared/lib/utils';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { id } from 'zod/v4/locales';


export function FilterCategory({ categories, categoryId }: { categories: Category[], categoryId: string }) {
    /** Translations */
    const t = useTranslations("filters")
    /** Hooks */
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSelect = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (categoryId === id) {
            params.delete("categoryId");
        } else {
            params.set("categoryId", id);
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    const resetFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("categoryId");
        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <span className="text-xl dark:text-white font-semibold">{t("category")}</span>
                {categoryId && (
                    <button className="flex gap-0.5 items-center text-red-600 dark:text-red-500 cursor-pointer" onClick={() => resetFilter()}>
                        <X size={15} /> {t("reset")}
                    </button>
                )}
            </div>
            <div className="h-56 overflow-y-auto space-y-2.5">
                {
                    categories.map((category) => {
                        const active = categoryId === category.id;
                        return (
                            <div
                                key={category.id}
                                className={cn(`bg-cream-200 dark:bg-burgundy-800 text-burgundy-900 dark:text-cream-100 flex gap-2 items-center rounded-sm cursor-pointer
                                     hover:bg-burgundy-50 dark:hover:bg-burgundy-700 group` , active && "bg-burgundy-50 dark:bg-burgundy-700")}
                                onClick={() => handleSelect(category.id)}
                            >
                                <div className={cn("px-2.5 py-1 h-10 bg-burgundy-400 dark:bg-burgundy-600 rounded-sm group-hover:bg-burgundy-700 dark:group-hover:bg-burgundy-500",
                                    active && "bg-burgundy-700 dark:bg-burgundy-500"
                                )}>
                                    <Image className='object-center object-cover' src={category.image} height={25} width={25} alt={category.title} />
                                </div>
                                <span className="fp-cat-label">{category.title}</span>
                            </div>
                        );
                    })
                }
            </div>
        </div >
    )
}
