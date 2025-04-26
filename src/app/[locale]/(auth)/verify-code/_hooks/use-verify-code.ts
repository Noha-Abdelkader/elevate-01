import { useMutation } from "@tanstack/react-query";
import { VerifyCodeSchemaFields } from "@/lib/schemes/auth.schema";
import catchError from "@/lib/utils/catche-error";
import { verifyCodeAction } from "../_actions/verify-code.action";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

export function useVerifyCode() {

  //   Navigation
  const router = useRouter();

  // Mutation
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async (value: VerifyCodeSchemaFields) => {
      const [payload] = await catchError(verifyCodeAction(value));
      return payload;
    },

    onSuccess: () => {
      toast.success("Verification code is correct, please reset your password");
      // navigate to reset  password page
      setTimeout(() => {
        router.push("/reset-password");
      }, 1000);
    },
  });
  return { mutate, isError, error, isPending };
}
