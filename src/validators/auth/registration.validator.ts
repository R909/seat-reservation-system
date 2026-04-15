import { z } from "zod";
import BaseDto from "../baseDto.js";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(
      /(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter and one digit"
    ),
});

export type RegisterInput = z.infer<typeof registerSchema>;

class RegisterDto extends BaseDto {
  static schema = registerSchema;
}

export default RegisterDto;
