import { z } from "zod";
import { Temporal } from "temporal-polyfill";

const CashCountSchema = z.object({
  id: z.string(),
  type: z.string(),
  quantity: z.number().int(),
  subtotal: z.string(),
  denomination_id: z.string(),
  denomination_name: z.string().optional(),
  denomination_value: z.string().optional(),
});

type CashCount = z.infer<typeof CashCountSchema>;

const CashSessionSchema = z.object({
  id: z.string(),
  state: z.string(),
  opening_date: z.iso
    .datetime({ offset: true })
    .transform(Temporal.Instant.from),
  opening_amount: z.string(),
  closing_date: z.iso
    .datetime({ offset: true })
    .nullish()
    .transform((v) => (v ? Temporal.Instant.from(v) : null)),
  closing_amount: z.string().nullish(),
  expected_amount: z.string().nullish(),
  difference_amount: z.string().nullish(),
  user_id: z.string(),
  user_name: z.string().optional(),
  counts: z.array(CashCountSchema).optional(),
  created_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  updated_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  deleted_at: z.iso
    .datetime({ offset: true })
    .nullish()
    .transform((v) => (v ? Temporal.Instant.from(v) : null)),
});

type CashSession = z.infer<typeof CashSessionSchema>;

const CashCountInputSchema = z.object({
  denomination_id: z.string(),
  quantity: z.number().int().positive(),
});

type CashCountInput = z.infer<typeof CashCountInputSchema>;

export { CashCountSchema, CashSessionSchema, CashCountInputSchema };

export type { CashCount, CashSession, CashCountInput };
