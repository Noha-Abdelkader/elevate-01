import FormError from "@/components/common/form-error";
import catchError from "@/lib/utils/catche-error";
import React from "react";
import { PiExam } from "react-icons/pi";
import QuestionsDialog from "./questions-dialog";
import { Link } from "@/i18n/navigation";
import { AuthHeader } from "@/lib/utils/auth-info";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const ExamList = async ({ id }: { id: string }) => {
  // session
  const session = await getServerSession(authOptions);

  // fetch
  async function getExams() {
    const response = await fetch(`${process.env.BASEURL}/exams?subject=${id}`, {
      method: "GET",
      headers: {
        ...(await AuthHeader()),
      },
    });
    const payload: APIResponse<PaginatedData<{ exams: QuizDetails[] }>> =
      await response.json();
    return payload;
  }
  const [quizzes, error] = await catchError(getExams());
  // const {
  //   isPending,
  //   isError,
  //   error,
  //   data: quizzes,
  // } = useQuery({
  //   queryKey: ["quizzes", `${id}`],
  //   queryFn: async () => {
  //     const [payload] = await catchError(getExams());
  //     return payload;
  //   },
  // });

  if (error)
    return (
      <div className="card-wrapper min-h-[150px] px-4">
        <FormError>{error.message}</FormError>;
      </div>
    );

  return (
    <div>
      {quizzes && quizzes.exams.length ? (
        <ul>
          {quizzes.exams.map((quiz: QuizDetails) => (
            <li
              key={quiz._id}
              className="flex items-center justify-between card-wrapper bg-white px-5 min-h-[80px]"
            >
              <div className="flex items-center gap-2">
                <PiExam className="text-4xl text-main-100" />
                <div>
                  <h4 className="text-sm font-medium capitalize">
                    {quiz.title}
                  </h4>
                  <span className="text-border text-xs">
                    {quiz.numberOfQuestions}
                    {quiz.numberOfQuestions && quiz.numberOfQuestions < 1
                      ? " Question"
                      : " Questions"}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium flex flex-col items-center gap-2">
                  {quiz.duration} Minutes
                </span>
                {session?.user.role == "user" && (
                  <QuestionsDialog id={quiz._id} time={quiz.duration} />
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card-wrapper min-h-[180px] p-5  ">
          <FormError>No quizzes yet... !!!</FormError>`
          <Link
            className="my-10 inline-block text-main-100 underline capitalize"
            href="/dashboard"
          >
            back to quizzes list
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExamList;
