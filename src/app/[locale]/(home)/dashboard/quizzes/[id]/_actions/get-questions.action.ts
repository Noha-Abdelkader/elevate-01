"use server";

import { AuthHeader } from "@/lib/utils/auth-info";

export default async function getQuestionsAction(id: string) {
  const response = await fetch(`${process.env.BASEURL}/questions?exam=${id}`, {
    method: "GET",
    cache:"no-store",
    headers: {
      ...(await AuthHeader()),
    },
  });
  const payload: APIResponse<{ questions: Question[] }> = await response.json();
  return payload;
}
