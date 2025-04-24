import catchError from "@/lib/utils/catche-error";
import { useInfiniteQuery } from "@tanstack/react-query";
import getQuizzesListAction from "../_actions/quizzes-list.action";

export default function useQuizzesList() {
  const { error, data, isError, isPending , fetchNextPage , isFetching  , hasNextPage , isFetchingNextPage , isLoading} = useInfiniteQuery({
    queryKey: ["list"],
    queryFn: async ({pageParam}) => {

      const [payload] = await catchError(getQuizzesListAction(pageParam));
      return payload;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.metadata.currentPage === lastPage?.metadata.numberOfPages)
        return undefined;
      return lastPageParam + 1;
    },
  });
  return {
    error,
    data,
    isError,
    isPending,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  };
}
