import { z } from "zod";
import { Temporal } from "temporal-polyfill";
import { type OkResponse, PaginatedResponse } from "../type";
import { PaginationSchema } from "../pagination/pagination.type";

const AccountSchema = z.object({
  id: z.string(),
  number: z.string(),
  interest: z.string(),
  balance: z.string(),
  status: z.string(),

  client_id: z.string(),
  client_name: z.string().optional(),
  type_account_id: z.string(),
  type_account_name: z.string().optional(),

  created_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  updated_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  deleted_at: z.iso
    .datetime({ offset: true })
    .nullish()
    .transform((v) => (v ? Temporal.Instant.from(v) : null)),
});

type Account = z.infer<typeof AccountSchema>;

const AccountFilterSchema = PaginationSchema.extend({
  client_id: z.string().optional(),
  search: z.string().optional(),
});

type AccountFilter = z.infer<typeof AccountFilterSchema>;

const CreateAccountSchema = z.object({
  client_id: z.string().min(1, "Cliente es requerido"),
  type_account_id: z.string().min(1, "Tipo de cuenta es requerido"),
  interest: z.string().optional(),
});

type CreateAccount = z.infer<typeof CreateAccountSchema>;

type CreateAccountInput = CreateAccount;

const AccountListPaginatedSchema = PaginatedResponse(AccountSchema);

type FindAllResponse = z.infer<
  ReturnType<typeof OkResponse<typeof AccountListPaginatedSchema>>
>;

export {
  AccountSchema,
  AccountFilterSchema,
  CreateAccountSchema,
  AccountListPaginatedSchema,
};

export type {
  Account,
  AccountFilter,
  CreateAccount,
  CreateAccountInput,
  FindAllResponse,
};
