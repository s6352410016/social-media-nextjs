import { z } from "zod";

export type RegisterSchema = z.infer<typeof registerSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export type OtpSchema = z.infer<typeof otpSchema>;

export const registerSchema = z.object({
  fullname: z.string().trim().min(1, "Fullname is required"),
  username: z.string().trim().min(1, "Username is required"),
  email: z.email("Invalid email address").trim(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export const loginSchema = registerSchema
  .omit({
    fullname: true,
    email: true,
    password: true,
  })
  .extend({
    password: z.string().trim().min(1, "Password is required"),
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address").trim(),
});

export const otpSchema = z.object({
  otp: z
    .array(z.string().min(1), { message: "Pin is required" })
    .length(6, { message: "Otp must be 6 digits long" }),
})