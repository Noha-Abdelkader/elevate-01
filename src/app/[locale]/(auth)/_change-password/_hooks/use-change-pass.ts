import { useMutation } from "@tanstack/react-query";
import { changePasswordAction } from "../_actions/change-pass.action";
import catchError from "@/lib/utils/catche-error";
import { toast } from "sonner";

export function useChangePassword() {

  // Mutation
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async (fields: ChangePassword) => {
      const [data] = await catchError(changePasswordAction(fields));
      return data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 1000);
    },
  });
  return { mutate, isError, error, isPending };
}
