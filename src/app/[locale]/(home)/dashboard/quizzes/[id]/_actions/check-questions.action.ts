"use server";

import { AuthHeader } from "@/lib/utils/auth-info";

export default async function  CheckQuestionsActions  (fields: {
  answers: {questionId: string; correct: string}[];
  time: string;
}) {
  const response = await fetch(process.env.BASEURL + "/questions/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await AuthHeader()),
    },
    body: JSON.stringify({ ...fields }),
  });
  const payload: APIResponse<CheckQuestionsResponse> = await response.json();

  return payload;
};
