import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils/tailwaind-utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

function checkDirction(locale: string) {
  switch (locale) {
    case "en":
      return "ltr";
    case "ar":
      return "rtl";
    default:
      return "ltr";
  }
}



export default async  function LocaleLayout({
  children,
  params: { locale },
}: LayoutProps) {
  // const { locale } = await params; << next 15

  // Ensure that the incoming `locale` is valid
  // or local not found
  if (!hasLocale(routing.locales, locale)) {
    return notFound();
  }



  return (
    <html
      lang={locale}
      dir={checkDirction(locale)}
      className={`${cn(inter.variable)}  bg-[#FBF9F9] `}
    >
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
