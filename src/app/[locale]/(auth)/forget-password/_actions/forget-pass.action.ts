"use server";

import { AuthHeader } from "@/lib/utils/auth-info";
import { ForgetPassSchemaFields } from "@/lib/schemes/auth.schema";
import { JSON_HEADER } from "@/lib/constants/api.constants";

export default async function forgetPassAction(values: ForgetPassSchemaFields) {
  const response = await fetch(`${process.env.BASEURL}/auth/forgotPassword`, {
    method: "POST",
    headers: {
     ...JSON_HEADER,
      ...await AuthHeader()
    },
    body: JSON.stringify({
      email: values.email,
    }),
  });
  const payload: APIResponse<{ info: string }> = await response.json();
  return payload;
}
