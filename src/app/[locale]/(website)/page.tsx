import BestSellerSection    from "@/src/features/home/components/best-seller/best-seller-section";
import FeaturesSection       from "@/src/features/home/components/features-section/features-section";
import BannerHomePage        from "@/src/features/home/components/hero-section/banner-section/banner-section";
import OccasionsSection      from "@/src/features/home/components/hero-section/occasions-section/occasions-section";
import MostPopularSection    from "@/src/features/home/components/most-popular/most-popular-section";

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const { tab } = await searchParams;

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-10">
      <BannerHomePage />
      <OccasionsSection />
      <FeaturesSection />
      <BestSellerSection />
      <MostPopularSection activeTabId={tab} />
    </div>
  );
}
