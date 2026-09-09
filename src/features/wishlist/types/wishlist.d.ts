import { Product } from '../../products/types/product';

export interface WishlistItem {
    wishlistId: string;
    product: Product;
}

export interface ApiWishlistItem {
    id: string;
    userId: string;
    productId: string;
    product: Product;
    createdAt: string;
}

export interface GetWishlistPayload {
    wishlistItems: ApiWishlistItem[];
}
