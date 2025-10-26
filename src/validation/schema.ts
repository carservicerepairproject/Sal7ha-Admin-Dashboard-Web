// validation/validationSchema.ts
import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Please enter an email.")
  .regex(
    /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
    "Please enter a valid email address."
  );

export const passwordSchema = z
  .string()
  .min(12, "Must be at least 12 characters.")
  .regex(/[a-z]/, "Include at least one lowercase letter.")
  .regex(/[A-Z]/, "Include at least one uppercase letter.")
  .regex(/\d/, "Include at least one number.")
  .regex(/[^A-Za-z0-9]/, "Include at least one symbol.");

export const isTextOnlySchema = (allowSpaces: boolean = true) => {
  if (allowSpaces) {
    return z.string().regex(/^[A-Za-z\s]+$/, {
      message: "Must contain only letters and spaces",
    });
  }

  return z.string().regex(/^[A-Za-z]+$/, {
    message: "Must contain only letters",
  });
};

export const isNumericOnlySchema = z
  .string()
  .regex(/^[0-9]+$/, "Pls Enter a Number");

// Schema specifically for sign-in form
export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

// Schema for other forms that need text/numeric validation
export const fullAuthSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
  isTextOnly: isTextOnlySchema(),
  isNumericOnly: isNumericOnlySchema,
});

export type AuthSchema = z.infer<typeof authSchema>;
export type FullAuthSchema = z.infer<typeof fullAuthSchema>;
