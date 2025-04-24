"use server";

import { AuthHeader } from "@/lib/utils/auth-info";

export async function changePasswordAction(data: ChangePassword) {
  const response = await fetch(`${process.env.BASEURL}/auth/changePassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...await AuthHeader()
    },
    body: JSON.stringify({
      oldPassword: data.oldPassword,
      password: data.password,
      rePassword: data.rePassword,
    }),
  });
  const payload: APIResponse<{ token: string }> = await response.json();
  return payload;
}
