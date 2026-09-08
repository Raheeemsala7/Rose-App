export interface CartItem {
    quantity: number;
    product: IProduct;
    cartId: string | undefined;
}

export interface ApiCartItem {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    product: IProduct;
}

export interface AddToCartPayload {
    productId: string;
    quantity: number;
}

export interface GuestCartMergePayload {
    productId: string;
    quantity: number;
}

export interface GetCartPayload {
    cartItems: ApiCartItem[];
}