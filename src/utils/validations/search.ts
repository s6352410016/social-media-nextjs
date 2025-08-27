import { z } from "zod";

export type SearchPeopleSchema = z.infer<typeof searchPeopleSchema>;

export const searchPeopleSchema = z.object({
  search: z.string().trim().min(1, "Search is required"),
});