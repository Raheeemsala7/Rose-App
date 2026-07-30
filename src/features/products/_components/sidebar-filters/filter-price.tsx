"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

const PRICE_FLOOR = 0;
const PRICE_CEILING = 1000000;

interface FilterPriceProps {
    minPrice?: number;
    maxPrice?: number;
}

export default function FilterPrice({
    minPrice,
    maxPrice,
}: FilterPriceProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updatePrice = (
        key: "minPrice" | "maxPrice",
        value: string
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    const resetPrice = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("minPrice");
        params.delete("maxPrice");
        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="fp-section">
            <div className="fp-header">
                <span className="fp-title">Price</span>

                {(minPrice) && (
                    <button className="fp-reset" onClick={resetPrice}>
                        <X size={12} /> Reset
                    </button>
                )}
            </div>

            <div className="fp-price-row">
                <div className="fp-price-field">
                    <label>From</label>

                    <input
                        type="number"
                        placeholder={String(PRICE_FLOOR)}
                        defaultValue={minPrice}
                        onBlur={(e) => updatePrice("minPrice", e.target.value)}
                    />
                </div>

                <div className="fp-price-field">
                    <label>To</label>

                    <input
                        type="number"
                        placeholder={String(PRICE_CEILING)}
                        defaultValue={maxPrice}
                        onBlur={(e) => updatePrice("maxPrice", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}