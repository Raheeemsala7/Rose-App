"use client";

import { useProductsQuery } from "@/src/features/products/hooks/products.hook";
import { Search, Star, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchResultSkeleton } from "./search-skeleton";

export const SearchBox = () => {
    const t = useTranslations("header");

    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const { data, isLoading } = useProductsQuery(
        {
            search: debouncedQuery,
            limit: 5,
        },
    );
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);




    return (
        <div className="relative flex-1">
            <div className="flex items-center gap-2 rounded-lg border px-3.5 py-2">
                <Search size={16} />

                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    placeholder={t("searchPlaceholder")}
                    className="w-full bg-transparent outline-none"
                />

                {query && (
                    <button onClick={() => setQuery("")}>
                        <X size={14} />
                    </button>
                )}
            </div>

            {searchOpen && (
                <div className="absolute inset-x-0 top-full mt-2 bg-white dark:bg-zinc-800 max-h-105 overflow-y-auto rounded-xl  py-2 px-4 shadow-2xl ">

                    {!query && (
                        <div className="mb-2.5 text-base  font-semibold text-maroon-700">
                            {t('searchDefault')}
                        </div>
                    )}
                    {isLoading && <SearchResultSkeleton />}
                    <div className="flex flex-col gap-4 z-100">
                        {data?.payload.data.map((product) => (
                            <div className="flex items-start gap-4">
                                <div className="size-20 rounded-lg">
                                    <Image
                                        src={product.cover}
                                        alt={product.title}
                                        height={80}
                                        width={80}
                                        className="size-full rounded-md"
                                    />
                                </div>
                                <div className="flex-1 flex justify-between items-start text-black dark:text-background">
                                    <div className="space-y-1">
                                        <div className="text-base font-semibold ">
                                            {product.title}
                                        </div>
                                        <div>
                                            <span className="text-xl font-bold">{product.price}</span>{' '}
                                            <span className="text-sm">EGP</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="flex gap-1.5">
                                            <Star
                                                className="fill-yellow-400 stroke-yellow-400"
                                                size={24}
                                            />
                                            <span>{t("Rating")}: {String(product.rating).slice(0, 3)}/5</span>
                                            <span className="text-blue-600">(8 {t("ratings")})</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {query && !isLoading && data?.payload.data?.length === 0 && (
                        <p>لا توجد نتائج.</p>
                    )}
                </div>
            )}
        </div>
    );
};