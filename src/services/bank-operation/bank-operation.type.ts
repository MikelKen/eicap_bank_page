import { z } from "zod";
import { Temporal } from "temporal-polyfill";
import { type OkResponse, PaginatedResponse } from "../type";
import { PaginationSchema } from "../pagination/pagination.type";

const OperationInformationSchema = z.object({
  id: z.string(),
  origin: z.string(),
  reason: z.string(),
  destination: z.string(),
  details: z.string(),
});

const BankOperationSchema = z.object({
  id: z.string(),
  code: z.string(),
  date: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  previous_balance: z.string(),
  import: z.string(),
  end_balance: z.string(),
  type_operation_id: z.string(),
  type_operation_code: z.string(),
  account_id: z.string().optional(),
  account_number: z.string().optional(),
  cash_session_id: z.string().optional(),
  info: OperationInformationSchema.nullish(),
  created_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
});

type BankOperation = z.infer<typeof BankOperationSchema>;

const BankOperationFilterSchema = PaginationSchema.extend({
  account_id: z.string().optional(),
  type_operation_code: z.string().optional(),
});

type BankOperationFilter = z.infer<typeof BankOperationFilterSchema>;

const BankOperationListPaginatedSchema = PaginatedResponse(BankOperationSchema);

const CreateOperationInformationSchema = z.object({
  origin: z.string().optional(),
  reason: z.string().optional(),
  destination: z.string().optional(),
  details: z.string().optional(),
});

const CreateBankOperationSchema = z.object({
  type_operation_code: z.string(),
  account_id: z.string().optional(),
  amount: z.number(),
  info: CreateOperationInformationSchema.optional(),
});

type CreateBankOperation = z.infer<typeof CreateBankOperationSchema>;
type CreateBankOperationInput = CreateBankOperation;

type FindAllResponse = z.infer<
  ReturnType<typeof OkResponse<typeof BankOperationListPaginatedSchema>>
>;

export {
  BankOperationSchema,
  BankOperationFilterSchema,
  BankOperationListPaginatedSchema,
  CreateOperationInformationSchema,
  CreateBankOperationSchema,
};

export type {
  BankOperation,
  BankOperationFilter,
  CreateBankOperation,
  CreateBankOperationInput,
  FindAllResponse,
};
