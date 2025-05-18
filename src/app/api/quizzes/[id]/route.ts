import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const accessToken = await getToken({ req });

  const response = await fetch(
    `${process.env.BASEURL}/exams?subject=${params.id}`,
    {
      method: "GET",
      headers: {
        token: accessToken?.token ?? ''
      },
    }
  );
  const payload:APIResponse<PaginatedData<{ exams: QuizDetails[] }>> = await response.json();
  return NextResponse.json(payload);
}
