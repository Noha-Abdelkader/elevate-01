import getQuestionsAction from "@/app/[locale]/(home)/dashboard/quizzes/[id]/_actions/get-questions.action";
import { AuthHeader } from "../utils/auth-info";
import catchError from "../utils/catche-error";

async function getHistory() {
  const reposne = await fetch(`${process.env.BASEURL}/questions/history`, {
    method: "GET",
    cache:"no-store",
    headers: {
      ...(await AuthHeader()),
    },
  });

  const payload: APIResponse<UserHistory> = await reposne.json();

  return payload;
}

export default async function getUserHistory() {
  const [userData] = await catchError(getHistory());

  if (!userData) return null;
  const examId = userData?.history?.QID?.exam;

  if (!examId) return null;
  const [examData] = await catchError(getQuestionsAction(examId));

  return {
    userData,
    examData,
  };
}
