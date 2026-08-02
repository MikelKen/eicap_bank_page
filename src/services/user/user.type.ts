import { z } from "zod";
import { Temporal } from "temporal-polyfill";
import { type OkResponse, PaginatedResponse } from "../type";
import { PaginationSchema } from "../pagination/pagination.type";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string(),
  role: z.string(),

  token: z.string().optional(),

  created_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  updated_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  deleted_at: z.iso
    .datetime({ offset: true })
    .nullish()
    .transform((v) => (v ? Temporal.Instant.from(v) : null)),
});

type User = z.infer<typeof UserSchema>;

const UserFilterSchema = PaginationSchema.extend({
  name: z.string().optional(),
  roles: z.string().optional(),
});

type UserFilter = z.infer<typeof UserFilterSchema>;

const CreateUserSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña es requerida"),
  role: z.enum(["admin", "strudent"], "Rol inválido"),
});

type CreateUser = z.infer<typeof CreateUserSchema>;

type CreateUserInput = { data: CreateUser };

const UserListPaginatedSchema = PaginatedResponse(UserSchema);

type CreateUserResponse = z.infer<ReturnType<typeof OkResponse<z.ZodNull>>>;

type FindAllResponse = z.infer<
  ReturnType<typeof OkResponse<typeof UserListPaginatedSchema>>
>;

type FindByIDResponse = z.infer<
  ReturnType<typeof OkResponse<typeof UserSchema>>
>;

export {
  CreateUserSchema,
  UserSchema,
  UserFilterSchema,
  UserListPaginatedSchema,
};

export type {
  User,
  CreateUser,
  CreateUserResponse,
  CreateUserInput,
  UserFilter,
  FindAllResponse,
  FindByIDResponse,
};
