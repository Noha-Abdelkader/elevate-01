import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const publicPages = [
  "/signin",
  "/forget-password",
  "/verify-code",
  "/reset-password",
  "/signup",
];

// middleware transllation
const handleI18nRouting = createMiddleware(routing);

// middleware authontications
const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.

  // check if token => if auth. fire tr anslation
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      // redirect to sign in
      signIn: "/signin",
    },
  }
);

// global regex
function routeRegex(routes: string[]) {
  return RegExp(
    `^(/(${routing.locales.join("|")}))?(${routes
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
}

export default async function middleware(req: NextRequest) {
  // public
  const publicPathnameRegex = routeRegex(publicPages);
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // redirect to link
  //incase start project or try to navigate any link non logic
  const locale = req.nextUrl.locale || routing.defaultLocale;
  const redirectURL = new URL(`/${locale}/dashboard`, req.nextUrl.origin);

  if (req.nextUrl.pathname == "/" || req.nextUrl.pathname == `/${locale}`) {
    return NextResponse.redirect(redirectURL);
  }

  // in case logged in
  const accessToken = await getToken({ req });

  if (accessToken) {
    const response = NextResponse.next();
    response.cookies.set("user_role", accessToken.user.role ?? "");
    return response;
  }

  // if public fire translate
  if (isPublicPage) {
    // if try to navigate to on of public page while user logged in will redirect
    if (accessToken) {
      return NextResponse.redirect(redirectURL);
    }

    return handleI18nRouting(req);
  } else {
    return (authMiddleware as any)(req);
    
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
