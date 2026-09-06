"use client";

import { useGetProductsQuery } from "@/src/features/products/hooks/products.hook";
import { Search, Star, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SearchResultSkeleton } from "./search-skeleton";
import { cn } from "../lib/utils";
import Link from "next/link";
import { useDebounce } from "../lib/use-debounced";

export const SearchBox = () => {
  const t = useTranslations("header");

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetProductsQuery({
    search: debouncedQuery,
    limit: 5,
  });

  /* Close on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasResults = (data?.payload.data?.length ?? 0) > 0;

  return (
    <div ref={containerRef} className="relative w-full">

      {/* ── Input ── */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors",
          /* light */
          "bg-cream-50 border-cream-400 text-burgundy-900",
          /* dark */
          "dark:bg-burgundy-900 dark:border-burgundy-700 dark:text-cream-100",
          /* focus ring */
          searchOpen && "border-burgundy-500 dark:border-blush-600 ring-2 ring-burgundy-200 dark:ring-blush-900",
        )}
      >
        <Search
          size={15}
          className={cn(
            "flex-shrink-0 transition-colors",
            query
              ? "text-burgundy-700 dark:text-blush-300"
              : "text-burgundy-400 dark:text-burgundy-500",
          )}
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchOpen(true)}
          placeholder={t("searchPlaceholder")}
          className={cn(
            "w-full bg-transparent text-sm outline-none min-w-0",
            "text-burgundy-900 dark:text-cream-100",
            "placeholder:text-burgundy-400 dark:placeholder:text-burgundy-500",
          )}
        />

        {query && (
          <button
            onClick={() => { setQuery(""); }}
            aria-label="Clear search"
            className="flex-shrink-0 text-burgundy-400 hover:text-burgundy-700 dark:text-burgundy-500 dark:hover:text-cream-200 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {searchOpen && (
        <div
          className={cn(
            "absolute inset-x-0 top-[calc(100%+6px)] z-50",
            "rounded-2xl border shadow-xl overflow-hidden",
            /* light */
            "bg-cream-50 border-cream-300",
            /* dark */
            "dark:bg-burgundy-900 dark:border-burgundy-700",
          )}
        >
          {/* Default hint when no query */}
          {!query && (
            <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-widest text-burgundy-400 dark:text-burgundy-500">
              {t("searchDefault")}
            </div>
          )}

          {/* Loading skeleton */}
          {isLoading && (
            <div className="px-4 py-3">
              <SearchResultSkeleton />
            </div>
          )}

          {/* Results list */}
          {!isLoading && hasResults && (
            <ul className="flex flex-col divide-y divide-cream-200 dark:divide-burgundy-800 max-h-[420px] overflow-y-auto">
              {data!.payload.data.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    onClick={() => setSearchOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 no-underline",
                      "hover:bg-cream-100 dark:hover:bg-burgundy-800 transition-colors",
                    )}
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-cream-200 dark:bg-burgundy-800">
                      <Image
                        src={product.cover}
                        alt={product.title}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-burgundy-900 dark:text-cream-100 line-clamp-1">
                        {product.title}
                      </p>

                      {/* Price */}
                      <p className="mt-0.5 text-sm font-bold text-burgundy-700 dark:text-blush-300">
                        {product.price}{" "}
                        <span className="text-xs font-medium text-burgundy-400 dark:text-burgundy-500">
                          EGP
                        </span>
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex-shrink-0 flex items-center gap-1 text-xs text-burgundy-500 dark:text-burgundy-400">
                      <Star size={13} className="fill-gold-500 text-gold-500" />
                      <span>{String(product.rating).slice(0, 3)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Empty state */}
          {query && !isLoading && !hasResults && (
            <div className="flex flex-col items-center justify-center gap-2 py-8 px-4">
              <Search size={28} className="text-burgundy-300 dark:text-burgundy-600" />
              <p className="text-sm text-burgundy-500 dark:text-burgundy-400 text-center">
                {t("noResults")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
