"use server";

import { AuthHeader } from "@/lib/utils/auth-info";
import {
  ResetPassSchemaFields,
} from "@/lib/schemes/auth.schema";
import { JSON_HEADER } from "@/lib/constants/api.constants";

export default async function resetPassAction(values: ResetPassSchemaFields) {
  const response = await fetch(`${process.env.BASEURL}/auth/resetPassword`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
      ...(await AuthHeader()),
    },
    body: JSON.stringify({
      email: values.email,
      newPassword: values.newPassword,
    }),
  });
  const payload: APIResponse<{ token: string }> = await response.json();
  return payload;
}
