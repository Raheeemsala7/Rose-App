import React from "react";

export default function CartLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="grid h-screen grid-cols-3 gap-4 w-full max-w-screen-2xl mx-auto px- py-6 xs:px-5 sm:px-6 lg:px-10">

      <section className="col-span-2">{children}</section>

        <section className="col-span-1">
          {/* <OrderSummary
            couponForm={<CouponSection />}
            totalPrice={<TotalPrice currency="EGP" />}
            subtotal={<SubTotalPrice currency="EGP" />}
            checkoutButton={<CheckoutButton />}
          /> */}
        </section>
    </div>
  );
}
