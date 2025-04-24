import { z } from "zod";

export const QuestionsSchema = z.object({
  
  answers: z.array(
    z.object({
      questionId: z.string({ required_error: "question is requires" }),
      correct: z.string({ required_error: "correct is requires" }),
    })
  ),

  // time: z.number(),
  time : z.string()
});

export type QuestionsFields = z.infer<typeof QuestionsSchema>;
