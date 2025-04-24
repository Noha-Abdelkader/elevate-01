"use server";

import { AuthHeader } from "@/lib/utils/auth-info";

export default async function getQuizzesListAction(currentPage?: number) {
  const response = await fetch(
    `${process.env.BASEURL}/subjects${
      currentPage ? "?limit=3&page=" + currentPage : ""
    }`,
    {
      method: "GET",
      headers: {
        ...(await AuthHeader()),
      },
    }
  );
  const payload: APIResponse<PaginatedData<{ subjects: Quiz[] }>> =
    await response.json();

  return payload;
}
