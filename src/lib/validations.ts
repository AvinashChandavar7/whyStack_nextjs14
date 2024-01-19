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


export const ProfileSchema = z.object({
  bio: z.string().min(10).max(150),
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  location: z.string().min(2).max(50),
  portfolioWebsite: z.string().url(),
})