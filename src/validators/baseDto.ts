import { z, ZodObject, ZodRawShape } from "zod";

type ValidationResult<T> =
  | { errors: string[]; value: null }
  | { errors: null; value: T };

class BaseDto {
  static schema: ZodObject<ZodRawShape> = z.object({});

  static validate<T>(this: { schema: z.ZodSchema<T> }, data: unknown): ValidationResult<T> {
    const result = this.schema.safeParse(data);

    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message);
      return { errors, value: null };
    }

    return { errors: null, value: result.data };
  }
}

export default BaseDto;
