import { z } from "zod";

export type CreateContentSchema = z.infer<typeof createContentSchema>;

export const createContentSchema = z.object({
  message: z.string().trim().max(255).optional(),
});