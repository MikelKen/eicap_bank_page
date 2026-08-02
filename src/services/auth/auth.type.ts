import { z } from "zod";
import type { OkResponse } from "../type";
import type { UserSchema } from "../user/user.type";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

type Login = z.infer<typeof LoginSchema>;

type LoginResponse = z.infer<ReturnType<typeof OkResponse<typeof UserSchema>>>;

export { LoginSchema };
export type { Login, LoginResponse };
