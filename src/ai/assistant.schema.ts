import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z.string().trim().min(5).max(500),
});
