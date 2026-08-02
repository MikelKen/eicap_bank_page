import { z } from "zod";

const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  per_page: z.coerce.number().int().positive().optional().default(20),
  sort: z.string().optional().default("created_at"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});

type Pagination = z.infer<typeof PaginationSchema>;

function defaultPagination(): Pagination {
  return {
    page: 1,
    per_page: 20,
    sort: "created_at",
    order: "desc",
  };
}

export { PaginationSchema, defaultPagination };
export type { Pagination };
