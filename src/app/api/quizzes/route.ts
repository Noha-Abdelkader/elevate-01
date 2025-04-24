import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, currentPage: number) {
  const accessToken = await getToken({ req });
  const response = await fetch(
    `${process.env.BASEURL}/subjects?limit=3&page=${currentPage}`,
    {
      method: "GET",
      headers: {
        token: accessToken?.token ?? "",
      },
    }
  );
  const payload: APIResponse<PaginatedData<{ exams: QuizDetails[] }>> = await response.json();
  return NextResponse.json({...payload});
}
