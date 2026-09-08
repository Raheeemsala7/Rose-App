export interface CartItem {
    quantity: number;
    product: IProduct;
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
    cartItem: CartItem;
}

export interface GetCartPayload {
    cartItems: ApiCartItem[];
}