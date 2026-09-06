// import { CheckoutButton } from '@/features/cart/order-summary/components/checkout-button';
// import { CouponSection } from '@/features/cart/order-summary/components/coupon-section';
// import { OrderSummary } from '@/features/cart/order-summary/components/order-summary';
// import { SubTotalPrice } from '@/features/cart/order-summary/components/subtotal-price';
// import { TotalPrice } from '@/features/cart/order-summary/components/total-price';
// import { CouponProvider } from '@/features/cart/order-summary/context/coupon-context';
// import { getYouMayLikeProducts } from '@/features/products/apis/product-you-may-like.api';
// import ProductYouMayLikeCarouselSlot from '@/features/products/components/product-you-may-like/product-you-may-like-carousel-slot';

// interface CartLayoutProps {
//   children: React.ReactNode;
// }

// export default async function CartLayout({ children }: CartLayoutProps) {
//   const products = await getYouMayLikeProducts();
//   return (
//     <>
//       <div className="grid h-screen grid-cols-3 gap-4">
//         <section className="col-span-2">{children}</section>

//         <CouponProvider>
//           <section className="col-span-1">
//             <OrderSummary
//               couponForm={<CouponSection />}
//               totalPrice={<TotalPrice currency="EGP" />}
//               subtotal={<SubTotalPrice currency="EGP" />}
//               checkoutButton={<CheckoutButton />}
//             />
//           </section>
//         </CouponProvider>
//       </div>

//       {/* Product You May Like */}
//       <section className="mx-10 my-20">
//         <ProductYouMayLikeCarouselSlot products={products} />
//       </section>
//     </>
//   );
// }


export default function CartLayout() {
  return (
    <div>
      <h1>CartLayout</h1>
    </div>
  );
}
