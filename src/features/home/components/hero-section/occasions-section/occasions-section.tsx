import Image from 'next/image';
import OccasionsImage1 from '@/src/assets/images/banner-home-page/Hero-Section-Occasions-1.png';
import OccasionsImage2 from '@/src/assets/images/banner-home-page/Hero-Section-Occasions-2.png';
import OccasionsImage3 from '@/src/assets/images/banner-home-page/Hero-Section-Occasions-3.png';
import { useTranslations } from 'next-intl';

// Occasions Info
const occasionsInfo = [
  {
    id: 1,
    key: 'wedding',
    image: OccasionsImage1,
  },
  {
    id: 2,
    key: 'engagement',
    image: OccasionsImage2,
  },
  {
    id: 3,
    key: 'anniversary',
    image: OccasionsImage3,
  },
];

export default function OccasionsSection() {
  // Translations
  const t = useTranslations('home-page.hero-section.occasions');

  return (
    <>
      {/* Occasions Section */}
      <div className="occasions grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6.25">
        {/* Occasions Item */}
        {occasionsInfo.map((item) => (
          <div key={item.id} className="item h-67.75 w-full relative rounded-2xl overflow-hidden">
            {/* Occasions Overlay */}
            <div className="overlay absolute top-0 bottom-0 left-0 right-0 bg-black/20"></div>

            {/* Occasions Image */}
            <Image
              src={item.image}
              alt={t(`${item.key}.title` as Parameters<typeof t>[0])}
              placeholder="blur"
              width={410}
              height={271}
              className="w-full h-full object-cover"
            />

            {/* Occasion Info */}
            <div className="info absolute bottom-0 p-6">
              {/* Occasions Title */}
              <h3 className="w-fit font-medium text-xs leading-4 text-maroon-600 py-0.5 px-2 bg-maroon-50 rounded-full">
                {t(`${item.key}.title` as Parameters<typeof t>[0])}
              </h3>

              {/* Occasions Description*/}
              <h1 className="font-semibold text-2xl text-white mt-2.5">
                {t(`${item.key}.description` as Parameters<typeof t>[0])}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
