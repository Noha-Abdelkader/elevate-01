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
  let jwt

  try {
    jwt = await decode({
        secret: process.env.NEXTAUTH_SECRET!,
        token: token,
      });
  } catch (error) {
    void error
  }

  return {
    token: jwt?.token ?? "",
  };
}
