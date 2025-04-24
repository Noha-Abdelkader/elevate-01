import { useMutation } from "@tanstack/react-query";
import catchError from "@/lib/utils/catche-error";
import { EditProfileSchemaFields } from "@/lib/schemes/auth.schema";
import { editProfileAction } from "../_actions/edit-profile.action";
import { toast } from "sonner";

export default function useEditProfile() {
  // Mutation
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: async (values: EditProfileSchemaFields) => {
      const [payload] = await catchError(editProfileAction(values));
      return payload;
    },
    onSuccess(data) {
      toast.success("Data updated successfully");
      return data;
    },
  });
  return { mutate, isError, error, isPending };
}
