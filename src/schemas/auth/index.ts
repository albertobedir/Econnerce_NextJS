import * as zod from "zod";

export const AuthSchemas = zod.object({
  email: zod.string().email({ message: "Invalid email format." }),
  password: zod
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(60, { message: "Password must not exceed 80 characters." }),
});
