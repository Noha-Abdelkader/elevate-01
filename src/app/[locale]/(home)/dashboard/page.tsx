import QuizzesList from "./_components/quizzes-list";

import { Suspense } from "react";
import QuizzesPlaceholder from "./_components/quizzes-placeholder";
import UserCard from "./_components/user-card";
import Placeholder from "../_components/placeholder";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

// searchParams,
// }: {
// searchParams?: { query?: string };
const Page = async ({
}) => {
  const session = await getServerSession(authOptions);

  return (
    <section className="space-y-4">
      {/* user card */}
      {session?.user.role == "user" && (
        <Suspense fallback={<Placeholder />}>
          <UserCard />
        </Suspense>
      )}

      {/* quizzes */}
      <div className="card-wrapper px-5 min-h-[420px]">
        <div className="text-main-100 flex items-center justify-between mb-4">
          <h2 className="text-main-100 text-base font-semibold capitalize flex items-center ">
            Quizzes
          </h2>
          {/* <Button variant={"ghost"}>View All</Button> */}
        </div>

        <Suspense fallback={<QuizzesPlaceholder />}>
          <QuizzesList />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
