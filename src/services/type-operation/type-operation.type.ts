import { z } from "zod";
import { Temporal } from "temporal-polyfill";
import { type OkResponse, PaginatedResponse } from "../type";
import { PaginationSchema } from "../pagination/pagination.type";

const TypeOperationSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  created_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  updated_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  deleted_at: z.iso
    .datetime({ offset: true })
    .nullish()
    .transform((v) => (v ? Temporal.Instant.from(v) : null)),
});

type TypeOperation = z.infer<typeof TypeOperationSchema>;

const TypeOperationFilterSchema = PaginationSchema.extend({
  name: z.string().optional(),
  code: z.string().optional(),
});

type TypeOperationFilter = z.infer<typeof TypeOperationFilterSchema>;

const CreateTypeOperationSchema = z.object({
  code: z.string().min(1, "Código es requerido"),
  name: z.string().min(1, "Nombre es requerido"),
});

type CreateTypeOperation = z.infer<typeof CreateTypeOperationSchema>;

type CreateTypeOperationInput = CreateTypeOperation;

const UpdateTypeOperationSchema = z.object({
  code: z.string().min(1, "Código es requerido"),
  name: z.string().min(1, "Nombre es requerido"),
});

type UpdateTypeOperation = z.infer<typeof UpdateTypeOperationSchema>;

type UpdateTypeOperationInput = UpdateTypeOperation;

const TypeOperationListPaginatedSchema = PaginatedResponse(TypeOperationSchema);

type CreateTypeOperationResponse = z.infer<
  ReturnType<typeof OkResponse<z.ZodNull>>
>;

type FindAllResponse = z.infer<
  ReturnType<typeof OkResponse<typeof TypeOperationListPaginatedSchema>>
>;

type FindByIDResponse = z.infer<
  ReturnType<typeof OkResponse<typeof TypeOperationSchema>>
>;

export {
  CreateTypeOperationSchema,
  UpdateTypeOperationSchema,
  TypeOperationSchema,
  TypeOperationFilterSchema,
  TypeOperationListPaginatedSchema,
};

export type {
  TypeOperation,
  CreateTypeOperation,
  CreateTypeOperationResponse,
  CreateTypeOperationInput,
  UpdateTypeOperationInput,
  UpdateTypeOperation,
  TypeOperationFilter,
  FindAllResponse,
  FindByIDResponse,
};
