export type OrderState = "pending" | "processing" | "delivered" | "cancelled";

export type OrderPaymentType = "cash" | "card" | "credit-card";

export type OrderProduct = {
  _id: string;
  title?: string;
  imgCover?: string;
  rateAvg?: number;
  rateCount?: number;
};

export type OrderItem = {
  _id?: string;
  product: OrderProduct;
  quantity?: number;
  price?: number;
};

export type Order = {
  _id: string;
  orderNumber?: string;
  createdAt?: string;
  totalPrice?: number;
  isPaid?: boolean;
  isDelivered?: boolean;
  state: OrderState | string;
  paymentType?: OrderPaymentType | string;
  orderItems?: OrderItem[];
};