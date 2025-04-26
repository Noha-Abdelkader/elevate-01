"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import QuizzesPlaceholder from "./quizzes-placeholder";
import FormError from "@/components/common/form-error";
import useQuizzesList from "../_hooks/use-quizzes-list";
import { useSearch } from "@/components/providers/context/searchContext";

const QuizzesList = () => {
  const { query } = useSearch();

  // Hook
  const {
    error,
    data,
    isError,
    isPending,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useQuizzesList();

  // case error
  if (isError)
    return (
      <div className="card-wrapper min-h-[150px]">
        <FormError>{error?.message}</FormError>
      </div>
    );

  // case load first time
  if (isPending) return <QuizzesPlaceholder />;

  // case no quizess
  if (!data?.pages.flatMap((el) => el?.subjects)?.length)
    return (
      <div className="card-wrapper min-h-[150px]">
        <h2>No Quizzes yet ..... </h2>
      </div>
    );

  // variable 
  //logic in case search 

  let previewQuizess = [];

  let allQuizess = data?.pages
    .flatMap((el) => el?.subjects)
    .filter((quiz): quiz is Quiz => quiz !== undefined);

  if (query) {
    previewQuizess = allQuizess.filter((quiz) =>
      quiz.name.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    previewQuizess = [...allQuizess];
  }

  if(query.length && !previewQuizess.length ){
    return( <div className="bg-main-50 min-h-[200px] rounded-lg p-5">
    <p className="text-main-100">No quizzes match search, please try to search another quiz... </p>
  </div> )}


  // case show data
  return (
    <>
      <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {previewQuizess.map((quiz: Quiz) => {
          return (
            <li key={quiz?._id} className="col-span-1 relative  w-full">
              <Link href={`/dashboard/quizzes/${quiz._id}`}>
                <Image
                  src={quiz.icon}
                  width="300"
                  height="200"
                  alt={quiz?.name}
                  className="w-full"
                />
                <div className="bg-main-100/60 rounded-md p-2 absolute inset-x-3 bottom-3">
                  <h2 className="text-white">{quiz.name}</h2>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="text-end mt-7">
        <Button
          isLoading={isLoading}
          variant={"main"}
          disabled={isFetchingNextPage || !hasNextPage || isLoading}
          onClick={() => {
            fetchNextPage();
          }}
        >
          {hasNextPage ? "See more" : "No more quizzes"}
        </Button>
      </div>
    </>
  );
};

export default QuizzesList;

// server
//   const [payload, error] = await catchError(getQuizzesListAction(
//   if (error) return <FormError>{error?.message}</FormError>;

//   if (!payload?.subjects.length)
//     return (
//       <div className="text-lg font-semibold text-main-100 h-full  flex items-center justify-center">
//         <p>No Quizzes yet ...</p>
//       </div>
//     );
//   return (
//     <>
//       <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//         {payload?.subjects.map((quiz: Quiz, index: number) => {
//           return (
//             <li key={quiz?._id} className="col-span-1 relative  w-full">
//               <Link href={`/dashboard/quizzes/${quiz._id}`}>
//                 <Image
//                   src={quiz.icon}
//                   width="300"
//                   height="200"
//                   alt={quiz?.name}
//                   className="w-full"
//                 />
//                 <div className="bg-main-100/60 rounded-md p-2 absolute inset-x-3 bottom-3">
//                   <h2 className="text-white">{quiz.name}</h2>
//                 </div>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//       <span>See more </span>
//     </>
//   );
