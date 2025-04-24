import { useMutation } from "@tanstack/react-query";
import { ResetPassSchemaFields } from "@/lib/schemes/auth.schema";
import catchError from "@/lib/utils/catche-error";
import { toast } from "sonner";
import resetPassAction from "../_actions/reset-pass.action";

export function useResetPass() {
  // Mutation
  const { mutate, isError, error, isPending, data } = useMutation({
    mutationFn: async (value: ResetPassSchemaFields) => {
      const [payload] = await catchError(resetPassAction(value));
      return payload;
    },
    onSuccess: (response) => {
      toast.success("Password reset successfully !");
      // navigate to home page
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    },
  });
  return { mutate, isError, error, isPending };
}
