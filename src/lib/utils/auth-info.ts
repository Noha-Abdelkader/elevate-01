// "use client";
// import { useSession } from "next-auth/react";

// export default  function Session() {
//     const session = useSession();
//     if (session.status == "authenticated") return session.data.user;
//     return null;
// }
import "server-only";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function Session() {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}

export async function AuthHeader() {
  const token = cookies().get("next-auth.session-token")?.value;
  const jwt = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: token,
  });
  return {
    token: jwt?.token ?? "",
  };
}
