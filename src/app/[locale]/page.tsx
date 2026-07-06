import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";


type Props = {
  params: Promise<{ locale: string }>;
};

export default function Page({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale); // ✅ ضروري في كل page
  const t =  useTranslations("HomePage");
  return (
    <div >
      <h1>{t('title')}</h1>
    </div>
  )
}
