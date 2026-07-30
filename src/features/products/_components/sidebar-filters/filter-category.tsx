"use client"
import { Category } from '@/src/features/categories/types/categories';
import { usePathname, useRouter } from '@/src/i18n/navigation';
import { X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { id } from 'zod/v4/locales';


export function FilterCategory({ categories, categoryId }: { categories: Category[], categoryId: string }) {
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
        params.set("page", "1"); // اختياري

        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <div className="fp-section" >
            <div className="fp-header">
                <span className="fp-title">Category</span>
                {categoryId && (
                    <button className="fp-reset" onClick={() => resetFilter()}>
                        <X size={12} /> Reset
                    </button>
                )}
            </div>
            {
                categories.map((category) => {
                    const active = categoryId === category.id;
                    return (
                        <div
                            key={category.id}
                            className={`fp-cat-row${active ? " active" : ""}`}
                            onClick={() => handleSelect(category.id)}
                        >
                            <div className="fp-cat-icon">
                                {/* <Icon size={17} /> */}
                            </div>
                            <span className="fp-cat-label">{category.title}</span>
                        </div>
                    );
                })
            }
        </div >
    )
}
