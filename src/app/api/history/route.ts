import { AuthHeader } from "@/lib/utils/auth-info";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = await getToken({ req });

  const reposne = await fetch(`${process.env.BASEURL}/questions/history`, {
    method: "GET",
    headers: {
      token: accessToken?.token ?? "",
    },
  });

  const payload: APIResponse<UserHistory> = await reposne.json();

  return NextResponse.json({ ...payload });
}
