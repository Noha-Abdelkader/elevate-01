import { SigninSchemaFields } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react"; // work only on client
import { toast } from "sonner";

export default function useSignIn() {

  
  // Mutation
  const { error, isError, isPending, mutateAsync  , data} = useMutation({
    mutationFn: async (values: SigninSchemaFields) => {
      const response = await signIn("credentials", {
        // callbackUrl: "/dashboard", //redirect as false so will not work
        redirect: false,
        email: values.email,
        password: values.password,
      });

      return response;
    },
    //check data and redirect url
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (data) => {
      toast.success("Sign in successfully");
      // console.log(data )
      setTimeout(() => {
        // window.location.href = data?.url ?? "/dashboard";
        window.location.href ="/dashboard";
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { error, isError, isPending, mutateAsync  , data};
}
