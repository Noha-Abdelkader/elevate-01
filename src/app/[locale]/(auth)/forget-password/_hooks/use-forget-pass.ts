import { useMutation } from "@tanstack/react-query";
import forgetPassAction from "../_actions/forget-pass.action";
import { ForgetPassSchemaFields } from "@/lib/schemes/auth.schema";
import catchError from "@/lib/utils/catche-error";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";

export function useForgetPass() {
  // Navigation
  const router = useRouter();

  // Mutation
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async (value: ForgetPassSchemaFields) => {
      const [payload] = await catchError(forgetPassAction(value));
      return payload;
    },

    onSuccess: (response) => {
      // show notifictaion message
      if (response?.info) {
        toast.success(response.info);
      }
      // navigate to verify code page
      setTimeout(() => {
        router.push("/verify-code");
      }, 1000);
    },
  });
  return { mutate, isError, error, isPending };
}
