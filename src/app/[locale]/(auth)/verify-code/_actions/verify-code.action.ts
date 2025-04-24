"use server";

import { JSON_HEADER } from "@/lib/constants/api.constants";
import { AuthHeader } from "@/lib/utils/auth-info";

export async function verifyCodeAction(data: { resetCode: string }) {
  const response = await fetch(`${process.env.BASEURL}/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      ...(await AuthHeader()),
    },
    body: JSON.stringify({
      resetCode: data.resetCode,
    }),
  });
  const payload: APIResponse<{ status: string }> = await response.json();
  return payload;
}
