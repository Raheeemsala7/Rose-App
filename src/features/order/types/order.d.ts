export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type OrderPaymentMethod =
  | "CASH_ON_DELIVERY"
  | "CREDIT_CARD";

export type OrderPaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

export type CouponType =
  | "PERCENT"
  | "FIXED";

export type OrderAddress = {
  id: string;
  userId: string;
  title: string;
  isPrimary: boolean;
  city: string;
  // أضف باقي الـ fields الموجودة في address
};

export type OrderCoupon = {
  id: string;
  code: string;
  type: CouponType;
  value: string;
  minPurchase: string;
  // أضف باقي الـ fields الموجودة في coupon
};

export type OrderUser = {
  id: string;
  username: string;
  email: string;
};

export type OrderProduct = {
  id: string;
  title: string;
  cover: string;
};

export type OrderItem = {
  id: string;
  product: OrderProduct;
  productId: string;
  quantity: number;
  price: string;
};

export type Order = {
  id: string;
  userId: string;

  addressId: string;
  address?: OrderAddress;

  couponId: string | null;
  coupon?: OrderCoupon | null;

  status: OrderStatus;

  paymentMethod: OrderPaymentMethod;
  paymentStatus: OrderPaymentStatus;

  stripePaymentIntentId: string | null;
  stripeCheckoutSessionId: string | null;

  subtotal: string;
  discount: string;
  shipping: string;
  total: string;

  trackingNumber: string | null;
  notes: string | null;

  createdAt: string;
  updatedAt: string;

  orderItems: OrderItem[];

  user?: OrderUser;
};