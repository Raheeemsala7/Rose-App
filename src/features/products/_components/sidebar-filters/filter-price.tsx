"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useDebounce } from "@/src/shared/lib/use-debounced";
import { useTranslations } from "next-intl";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";


const PRICE_FLOOR = 0;
const PRICE_CEILING = 1_000_000;

interface FilterPriceProps {
    minPrice?: number;
    maxPrice?: number;
}

export default function FilterPrice({
    minPrice,
    maxPrice,
}: FilterPriceProps) {
    /** Translations */
    const t = useTranslations("filters")
    // Navigation
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Variables
    const [fromPrice, setFromPrice] = useState(minPrice?.toString() ?? "");
    const [toPrice, setToPrice] = useState(maxPrice?.toString() ?? "");

    const debouncedFromPrice = useDebounce(fromPrice, 500);
    const debouncedToPrice = useDebounce(toPrice, 500);

    // Sync inputs when URL changes
    useEffect(() => {
        setFromPrice(minPrice?.toString() ?? "");
        setToPrice(maxPrice?.toString() ?? "");
    }, [minPrice, maxPrice]);

    // Update URL after debounce
useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    debouncedFromPrice
        ? params.set("minPrice", debouncedFromPrice)
        : params.delete("minPrice");

    debouncedToPrice
        ? params.set("maxPrice", debouncedToPrice)
        : params.delete("maxPrice");

    params.set("page", "1");

    const newSearch = params.toString();

    if (newSearch !== searchParams.toString()) {
        router.replace(`${pathname}?${newSearch}`);
    }
}, [debouncedFromPrice, debouncedToPrice]);

    // Functions
    const resetPrice = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("minPrice");
        params.delete("maxPrice");
        params.set("page", "1");

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="w-full ">
            <div className="flex justify-between items-center mb-3">
                <span className="text-xl dark:text-white font-semibold">{t("price")}</span>

                {(minPrice !== undefined || maxPrice !== undefined) && (
                    <button className="flex gap-0.5 items-center text-red-600 dark:text-red-500 cursor-pointer" onClick={resetPrice}>
                        <X size={12} /> {t("reset")}
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2">
                <div>
                    <Label className="mb-2 text-base dark:text-white">{t("from")}</Label>

                    <Input
                        type="number"
                        placeholder={String(PRICE_FLOOR)}
                        value={fromPrice}
                        onChange={(e) => setFromPrice(e.target.value)}
                        className="border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
                        />
                </div>

                <div>
                    <Label className="mb-2 text-base dark:text-white">{t("to")}</Label>
                    <Input
                        type="number"
                        placeholder={String(PRICE_CEILING)}
                        value={toPrice}
                        onChange={(e) => setToPrice(e.target.value)}
                        className="border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
                    />
                </div>
            </div>
        </div>
    );
}