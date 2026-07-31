"use client";

import { Star, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const MAX_RATING = 5;

const FilterRating = ({ minRating }: { minRating?: number }) => {
    /** Translations */
    const t = useTranslations("product")
    /** Hooks */
    const [hoverRating, setHoverRating] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleRating = (rating: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (minRating === rating) {
            params.delete("minRating");
        } else {
            params.set("minRating", rating.toString());
        }

        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    const resetRating = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("minRating");
        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div >
            <div className="flex justify-between items-center mb-3">
                <span className="text-xl dark:text-white font-semibold">{t("category")}</span>
                {minRating && (
                    <button className="flex gap-0.5 items-center text-red-600 dark:text-red-500 cursor-pointer" onClick={resetRating}>
                        <X size={12} /> Reset
                    </button>
                )}
            </div>

            <div
                className="flex items-center gap-2"
                onMouseLeave={() => setHoverRating(0)}
            >
                {Array.from({ length: MAX_RATING }).map((_, i) => {
                    const value = i + 1;
                    const filled = value <= (hoverRating || minRating || 0);

                    return (
                        <button
                            key={value}
                            className="fp-star-btn"
                            onMouseEnter={() => setHoverRating(value)}
                            onClick={() => handleRating(value)}
                            style={{
                                color: filled ? "#EAB308" : "none",
                            }}
                            aria-label={`${value} star${value > 1 ? "s" : ""} & up`}
                        >
                            <Star
                                size={25}
                                fill={filled ? "#EAB308" : "none"}
                                color={"#F59E0B"}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default FilterRating;