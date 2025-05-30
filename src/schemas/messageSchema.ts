import { z } from "zod";
export const messagesSchema = z.object({
  content: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(300, "Message must be at most 300 characters long"),
});
