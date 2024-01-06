import * as z from "zod"


export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130, { message: "title must be at least 5 characters.", }),
  explanation: z.string().min(100),
  tags: z.array(
    z.string().min(1).max(15)
  ).min(1).max(2),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});