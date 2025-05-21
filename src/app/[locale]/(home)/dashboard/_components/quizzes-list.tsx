"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import QuizzesPlaceholder from "./quizzes-placeholder";
import FormError from "@/components/common/form-error";
import useQuizzesList from "../_hooks/use-quizzes-list";
import { useSearch } from "@/components/providers/context/search-context";

const QuizzesList = () => {
  const { query } = useSearch();

  // Hook
  const {
    error,
    data,
    isError,
    isPending,
    fetchNextPage,
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

  const allQuizess = data?.pages
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
    return( <div className="bg-custom-main-50 min-h-[200px] rounded-lg p-5">
    <p className="text-custom-main-100">No quizzes match search, please try to search another quiz... </p>
  </div> )}


  // case show data
  return (
    <>
      <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {previewQuizess.map((quiz: Quiz) => {
          return (
            <li
              key={quiz?._id}
              className="col-span-1 relative  w-full *:duration-500 *:transition-all *:ease-linear"
            >
              <Link href={`/dashboard/quizzes/${quiz._id}`}>
                <Image
                  src={quiz.icon}
                  width="300"
                  height="200"
                  alt={quiz?.name}
                  className="w-full"
                />
                <div className="bg-custom-main-100/60  text-white rounded-md p-2 absolute inset-x-3 bottom-3  hover:inset-0 flex items-center justify-center hover:*:scale-125 *:duration-500 *:transition-all *:ease-linear hover:*:before:w-full ">
                  <h2 className="relative before:content-'' before:absolute before:bottom-0 before:left-0 before:bg-white before:h-0.5 before:w-0">{quiz.name}</h2>
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
