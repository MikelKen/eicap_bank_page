import { z } from "zod";
import { Temporal } from "temporal-polyfill";
import { type OkResponse, PaginatedResponse } from "../type";
import { PaginationSchema } from "../pagination/pagination.type";

const TypeAccountSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  updated_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  deleted_at: z.iso
    .datetime({ offset: true })
    .nullish()
    .transform((v) => (v ? Temporal.Instant.from(v) : null)),
});

type TypeAccount = z.infer<typeof TypeAccountSchema>;

const TypeAccountFilterSchema = PaginationSchema.extend({
  name: z.string().optional(),
});

type TypeAccountFilter = z.infer<typeof TypeAccountFilterSchema>;

const CreateTypeAccountSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
});

type CreateTypeAccount = z.infer<typeof CreateTypeAccountSchema>;

type CreateTypeAccountInput = CreateTypeAccount;

const UpdateTypeAccountSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
});

type UpdateTypeAccount = z.infer<typeof UpdateTypeAccountSchema>;

type UpdateTypeAccountInput = UpdateTypeAccount;

const TypeAccountListPaginatedSchema = PaginatedResponse(TypeAccountSchema);

type CreateTypeAccountResponse = z.infer<
  ReturnType<typeof OkResponse<z.ZodNull>>
>;

type FindAllResponse = z.infer<
  ReturnType<typeof OkResponse<typeof TypeAccountListPaginatedSchema>>
>;

type FindByIDResponse = z.infer<
  ReturnType<typeof OkResponse<typeof TypeAccountSchema>>
>;

export {
  CreateTypeAccountSchema,
  UpdateTypeAccountSchema,
  TypeAccountSchema,
  TypeAccountFilterSchema,
  TypeAccountListPaginatedSchema,
};

export type {
  TypeAccount,
  CreateTypeAccount,
  CreateTypeAccountResponse,
  CreateTypeAccountInput,
  UpdateTypeAccount,
  UpdateTypeAccountInput,
  TypeAccountFilter,
  FindAllResponse,
  FindByIDResponse,
};
