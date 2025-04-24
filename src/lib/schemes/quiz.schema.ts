import { z } from "zod";

export const QuizSchema = z.object({
    name:z.string({required_error:"name is required"}).min(3 , {message : "name must be at least 3 characters"}),
    icon:z.any()
});

export type QuizSchemaFields = z.infer<typeof QuizSchema>;