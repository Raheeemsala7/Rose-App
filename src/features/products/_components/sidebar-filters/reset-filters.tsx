"use client";

import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ResetAllFilters({}) {
    /** Translations */
    const t = useTranslations("filters")
    /** Hooks */
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const anyActive =
        searchParams.has("categoryId") ||
        searchParams.has("occasionId") ||
        searchParams.has("minRating") ||
        searchParams.has("minPrice") ||
        searchParams.has("maxPrice");

    const resetAll = () => {
        const params = new URLSearchParams(searchParams.toString());

        [
            "categoryId",
            "occasionId",
            "minRating",
            "minPrice",
            "maxPrice",
        ].forEach((key) => params.delete(key));

        params.set("page", "1");

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <button
            className="cursor-pointer flex items-center justify-center gap-2 bg-maroon-50 dark:bg-zinc-700 w-full mt-6 px-3 py-2 text-center dark:text-soft-pink-200 rounded-xl"
            onClick={resetAll}
            disabled={!anyActive}
        >
            <RotateCcw size={14} />
            {t("resetAll")}
        </button>
    );
}