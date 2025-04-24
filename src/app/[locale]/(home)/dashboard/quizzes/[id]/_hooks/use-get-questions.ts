import catchError from "@/lib/utils/catche-error";
import { useQuery } from "@tanstack/react-query";
import getQuestionsAction from "../_actions/get-questions.action";

export default function (id: string) {
  const {
    isPending,
    isError,
    error,
    data: questions,
    refetch,
  } = useQuery({
    queryKey: ["questions", `${id}`],
    queryFn: async () => {
      const [payload] = await catchError(getQuestionsAction(id));
      return payload;
    },
    enabled: false,
  });

  return {
    isPending,
    isError,
    error,
    questions,
    refetch,
  };
}
