"use client";
import FeaturesSection from "@/src/features/home/components/features-section/features-section";
import BannerHomePage from "@/src/features/home/components/hero-section/banner-section/banner-section";
import OccasionsSection from "@/src/features/home/components/hero-section/occasions-section/occasions-section";
import { use } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Page({ params }: Props) {
  const { locale } = use(params);
  return (
    <div className="w-full">
      {/* Hero + Occasions */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <BannerHomePage />
        <OccasionsSection />
        <FeaturesSection />
      </div>
    </div>
  );
}
