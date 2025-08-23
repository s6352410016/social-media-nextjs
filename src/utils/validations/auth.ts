import { z } from "zod";

export type RegisterSchema = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  fullname: z.string().trim().min(1, "Fullname is required"),
  username: z.string().trim().min(1, "Username is required"),
  email: z.email("Invalid email address").trim(),
  password: z.string().trim().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
});