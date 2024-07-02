import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address.",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;
