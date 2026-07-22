export interface Product {
    id: string;
    title: string;
    description: string;
    rating: number;
    ratings: number;
    stock: number;
    price: string;
    discountType: string;
    discountValue: string;
    cover: string;
    gallery: string[];
    categoryId: string;
    subCategoryId: string;
    immutable: boolean;
    deletedAt: null;
    createdAt: string;
    updatedAt: string;
    category: {
        id: string;
        title: string;
    };
    subCategory: {
        id: string;
        title: string;
    };
    occasions: [];
    _count: {
        reviews: number;
        cartItems: number;
        wishlistItems: number;
    };
}

export  interface ParamsProducts {
    page?: number;
    limit?: number;
    categoryId?: string;
    subCategoryId?: string;
    occasionId?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: SortBy;
    sortOrder?: SortOrder;

    // Not found on real api 
    search?:string;
}