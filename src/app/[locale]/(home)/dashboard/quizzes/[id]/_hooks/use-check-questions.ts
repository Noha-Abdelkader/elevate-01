import { useMutation } from "@tanstack/react-query";
import catchError from "@/lib/utils/catche-error";
import CheckQuestionsActions from "../_actions/check-questions.action";

export default function useCheckQuestions() {
  const { isPending, isError, error, mutateAsync, data  } = useMutation({
    mutationFn: async (fields: {
      answers: { questionId: string; correct: string }[];
      time: string;
    }) => {
      const [payload] = await catchError(CheckQuestionsActions(fields));
      return payload;
    },
    onSuccess: (data) => {
      return data;

    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    isPending,
    isError,
    error,
    mutateAsync,
    data,
  };
}
