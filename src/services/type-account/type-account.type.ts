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

const TypeAccountListPaginatedSchema = PaginatedResponse(TypeAccountSchema);

type FindAllResponse = z.infer<
  ReturnType<typeof OkResponse<typeof TypeAccountListPaginatedSchema>>
>;

export {
  TypeAccountSchema,
  TypeAccountFilterSchema,
  TypeAccountListPaginatedSchema,
};

export type { TypeAccount, TypeAccountFilter, FindAllResponse };
