"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { BiSolidCommentError } from "react-icons/bi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  // no html & body tag as layout for local handle it

  return (
    <main className="flex flex-col gap-8 min-h-screen items-center justify-center bg-red-50 ">
        <BiSolidCommentError className="text-red-500 size-24" />
      {/* Headline */}
      <h1 className="text-red-500 font-bold text-5xl ">
        <span>Page not found</span>
      </h1>

      {/* Description */}
      <p> {t("error-message")}</p>

      {/* Action */}
      <Button
        variant="destructive"
        onClick={() => (window.location.href = "/dashboard")}
      >
        Back to dashboard
      </Button>
    </main>
  );
}
