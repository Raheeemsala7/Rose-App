"use client";
import FeaturesSection  from "@/src/features/home/components/features-section/features-section";
import BannerHomePage   from "@/src/features/home/components/hero-section/banner-section/banner-section";
import OccasionsSection from "@/src/features/home/components/hero-section/occasions-section/occasions-section";
import { use } from "react";

type Props = { params: Promise<{ locale: string }> };

export default function Page({ params }: Props) {
  // locale is available if needed by child server components
  const { locale } = use(params);
  void locale;

  return (
    /*
      Full-width cream background is set on <main> in layout.tsx.
      This container constrains the content width and adds consistent
      horizontal padding that scales with viewport.
    */
    <div className="w-full max-w-screen-2xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-10">
      <BannerHomePage />
      <OccasionsSection />
      <FeaturesSection />
    </div>
  );
}
