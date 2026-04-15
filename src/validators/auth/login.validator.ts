import { z } from "zod";
import BaseDto from "../baseDto.js";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

class LoginDto extends BaseDto {
  static schema = loginSchema;
}

export default LoginDto;
