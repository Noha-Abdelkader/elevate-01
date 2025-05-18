import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const authPages = ["/signin", "/signup", "/forget-password", "/verify-code", "/reset-password"];
const publicPages = ["/", ...authPages];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  (req) => {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const authPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${authPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);

  if (isAuthPage && token) {
    const redirectUrl = new URL("/dashboard", req.nextUrl.origin);
    Object.entries(req.nextUrl.searchParams).forEach(([key, value]) =>
      redirectUrl.searchParams.set(key, value)
    );
    return NextResponse.redirect(redirectUrl);
  }

  if (isPublicPage) {
    return handleI18nRouting(req);
  }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (authMiddleware as any)(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
