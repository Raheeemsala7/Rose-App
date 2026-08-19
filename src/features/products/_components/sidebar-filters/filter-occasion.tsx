"use client"
import { Occasion } from '@/src/features/occasions/types/occasions';
import { usePathname, useRouter } from '@/src/i18n/navigation';
import { cn } from '@/src/shared/lib/utils';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';


export function FilterOccasion({ occasions, occasionId }: { occasions: Occasion[], occasionId: string }) {
    /** Translations */
    const t = useTranslations("filters")
    /** Hooks */
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSelect = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (occasionId === id) {
            params.delete("occasionId");
        } else {
            params.set("occasionId", id);
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    const resetFilter = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("occasionId");
        params.set("page", "1"); // اختياري

        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <span className="text-xl dark:text-white font-semibold">{t("occasion")}</span>
                {occasionId && (
                    <button className="flex gap-0.5 items-center text-red-600 dark:text-red-500 cursor-pointer" onClick={() => resetFilter()}>
                        <X size={15} /> {t("reset")}
                    </button>
                )}
            </div>
            <div className="h-56 overflow-y-auto grid grid-cols-2 gap-2.5">
                {
                    occasions.map((occasion) => {
                        const active = occasionId === occasion.id;
                        return (
                            <div
                                key={occasion.id}
                                className={cn(`h-19 rounded-lg relative`)}
                                onClick={() => handleSelect(occasion.id)}
                            >
                                <div className='absolute inset-0 size-full bg-black/45 flex justify-center items-center text-white'>
                                    {occasion.title}
                                </div>
                                <Image className='size-full object-cover object-center rounded-lg' src={occasion.image} height={76} width={100} alt={occasion.title} />
                            </div>
                        );
                    })
                }
            </div>
        </div >
    )
}
