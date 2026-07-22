"use client"
import BestSellerSection from "@/src/features/home/components/best-seller/best-seller-section";
import FeaturesSection from "@/src/features/home/components/features-section/features-section";
import BannerHomePage from "@/src/features/home/components/hero-section/banner-section/banner-section";
import OccasionsSection from "@/src/features/home/components/hero-section/occasions-section/occasions-section";
import MostPopularSection from "@/src/features/home/components/most-popular/most-popular-section";
import ThemeToggle from "@/src/shared/components/theme-toggle";
import { Button } from "@/src/shared/components/ui/button";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";


type Props = {
  params: Promise<{ locale: string }>;
};

export default function Page({ params }: Props) {
  const { locale } = use(params);
  return (
    <div >
      <ThemeToggle />

      <div className="max-w-11/12 mx-auto">
        <BannerHomePage />
        <OccasionsSection />
        <FeaturesSection />
      </div>
      {/* <BestSellerSection /> */}
      {/* <MostPopularSection /> */}
    </div>
  )
}
