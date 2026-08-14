import { z } from "zod";
import { Temporal } from "temporal-polyfill";
import { type OkResponse, PaginatedResponse } from "../type";
import { PaginationSchema } from "../pagination/pagination.type";

const DenominationSchema = z.object({
  id: z.string(),
  type: z.string(),
  value: z.string(),
  name: z.string(),
  created_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  updated_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  deleted_at: z.iso
    .datetime({ offset: true })
    .nullish()
    .transform((v) => (v ? Temporal.Instant.from(v) : null)),
});

type Denomination = z.infer<typeof DenominationSchema>;

const DenominationFilterSchema = PaginationSchema.extend({
  type: z.string().optional(),
});

type DenominationFilter = z.infer<typeof DenominationFilterSchema>;

const DenominationListPaginatedSchema = PaginatedResponse(DenominationSchema);

type FindAllResponse = z.infer<
  ReturnType<typeof OkResponse<typeof DenominationListPaginatedSchema>>
>;

export {
  DenominationSchema,
  DenominationFilterSchema,
  DenominationListPaginatedSchema,
};

export type { Denomination, DenominationFilter, FindAllResponse };
