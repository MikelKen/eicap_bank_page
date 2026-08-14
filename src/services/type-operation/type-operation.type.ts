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

const TypeOperationListPaginatedSchema = PaginatedResponse(TypeOperationSchema);

type FindAllResponse = z.infer<
  ReturnType<typeof OkResponse<typeof TypeOperationListPaginatedSchema>>
>;

export {
  TypeOperationSchema,
  TypeOperationFilterSchema,
  TypeOperationListPaginatedSchema,
};

export type { TypeOperation, TypeOperationFilter, FindAllResponse };
