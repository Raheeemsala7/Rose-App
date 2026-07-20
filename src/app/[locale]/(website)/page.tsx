"use client"
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
    </div>
  )
}
