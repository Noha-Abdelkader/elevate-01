"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <html>
      // as i remove tags from layout to use locale
      <body>
        <main className="flex flex-col gap-8 min-h-screen items-center justify-center">
          {/* Headline */}
          <h1 className="text-red-500 font-bold text-5xl">404</h1>

          {/* Description */}
          <p>Something error </p>

          {/* Action */}
          <Button variant="secondary" onClick={reset}>
            Try again
          </Button>
        </main>
      </body>
    </html>
  );
}
