import { type ZodType, z } from "zod";
import { AxiosError } from "axios";

const OkResponse = <T extends z.ZodType>(schema: T) =>
  z.object({
    message: z.string(),
    data: schema,
  });

const ErrorSchema = z.object({
  error: z.string(),
  details: z.record(z.string(), z.string()).optional(),
});

type Error = z.infer<typeof ErrorSchema>;

async function parseResponse<T>(
  request: Promise<{ data: unknown }>,
  schema: ZodType<T>,
) {
  try {
    const { data } = await request;
    console.log("[API] Raw response:", data);
    const parsed = OkResponse(schema).safeParse(data);

    if (!parsed.success) {
      throw parsed.error;
    }

    return parsed.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw ErrorSchema.parse(error.response.data);
    }
    throw error;
  }
}

const PaginatedResponse = <T extends z.ZodType>(schema: T) =>
  z.object({
    items: z.array(schema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    per_page: z.number().int().nonnegative(),
  });

export { OkResponse, ErrorSchema, parseResponse, PaginatedResponse };
export type { Error };
