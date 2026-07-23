"use client"
import { getPageNumbers } from "@/src/shared/lib/pagaination.utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type PageButtonProps = {
    children: ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    ariaLabel?: string;
};

function PageButton({
    children,
    active = false,
    disabled = false,
    onClick,
    ariaLabel,
}: PageButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-current={active ? "page" : undefined}
            className={[
                "inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600",
                disabled
                    ? "cursor-not-allowed opacity-40 border-gray-200 text-gray-400"
                    : active
                        ? "bg-red-700 border-red-700 text-white shadow-sm"
                        : "border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300",
            ].join(" ")}
        >
            {children}
        </button>
    );
}

type PaginationProps = {
    page: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
};

export default function PaginationProducts({
    page,
    totalPages = 10,
    onPageChange,
}: PaginationProps) {
      const router = useRouter();
  const searchParams = useSearchParams();
    const goTo = (p: number) => {
        const clamped = Math.min(Math.max(p, 1), totalPages);

        const params = new URLSearchParams(searchParams.toString());

        params.set("page", clamped.toString());

        router.push(`?${params.toString()}`);
    };

    const pages = getPageNumbers({ current: page, total: totalPages });

    return (
        <div dir="ltr" className="flex items-center justify-center gap-1.5 p-6">
            <PageButton
                ariaLabel="First page"
                disabled={page === 1}
                onClick={() => goTo(1)}
            >
                <ChevronsLeft size={16} />
            </PageButton>

            <PageButton
                ariaLabel="Previous page"
                disabled={page === 1}
                onClick={() => goTo(page - 1)}
            >
                <ChevronLeft size={16} />
            </PageButton>

            {pages.map((p, idx) =>
                typeof p === "number" ? (
                    <PageButton key={p} active={p === page} onClick={() => goTo(p)}>
                        {p}
                    </PageButton>
                ) : (
                    <span
                        key={p + idx}
                        className="inline-flex h-9 w-9 items-center justify-center text-sm text-gray-400 select-none"
                    >
                        …
                    </span>
                )
            )}

            <PageButton
                ariaLabel="Next page"
                disabled={page === totalPages}
                onClick={() => goTo(page + 1)}
            >
                <ChevronRight size={16} />
            </PageButton>

            <PageButton
                ariaLabel="Last page"
                disabled={page === totalPages}
                onClick={() => goTo(totalPages)}
            >
                <ChevronsRight size={16} />
            </PageButton>
        </div>
    );
}
