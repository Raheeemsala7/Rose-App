"use client";

import SectionTitle from "@/src/shared/components/section-title";
import { useTranslations } from "next-intl";

export default function OccasionsPageHeader() {
  const t = useTranslations("occasionsPage");

  return (
    <header className="flex flex-col items-center gap-2 text-center">
      <SectionTitle title={t("title")} />
      <SectionTitle  title={t("subtitle")} />
    </header>
  );
}