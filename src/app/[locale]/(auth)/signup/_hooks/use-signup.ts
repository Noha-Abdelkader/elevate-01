import { useMutation } from "@tanstack/react-query";
import { signupAction } from "../_actions/signup-action";
import catchError from "@/lib/utils/catche-error";
import { SignupSchemaFields } from "@/lib/schemes/auth.schema";

export default function useSignup() {
  
  // Mutation
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: async (signupFields: SignupSchemaFields) => {
      const [payload] = await catchError(signupAction(signupFields));
      return payload;
    },
    onSuccess(data) {
      // Navigation
      window.location.href = "/signin";
      return data;
    }
  });
  return { mutate, isError, error, isPending };
}
