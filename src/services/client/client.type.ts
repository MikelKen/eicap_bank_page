import { z } from "zod";
import { Temporal } from "temporal-polyfill";
import { type OkResponse, PaginatedResponse } from "../type";
import { PaginationSchema } from "../pagination/pagination.type";

const ClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  ci: z.string(),
  sex: z.string(),
  birth_date: z.iso.date().transform((v) => Temporal.PlainDate.from(v)),
  created_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  updated_at: z.iso.datetime({ offset: true }).transform(Temporal.Instant.from),
  deleted_at: z.iso
    .datetime({ offset: true })
    .nullish()
    .transform((v) => (v ? Temporal.Instant.from(v) : null)),
});

type Client = z.infer<typeof ClientSchema>;

const ClientFilterSchema = PaginationSchema.extend({
  search: z.string().optional(),
});

type ClientFilter = z.infer<typeof ClientFilterSchema>;

const CreateClientSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  ci: z.string().min(1, "Cédula es requerida"),
  sex: z.string().min(1, "Género es requerido"),
  birth_date: z.string().min(1, "Fecha de nacimiento es requerida"),
});

type CreateClient = z.infer<typeof CreateClientSchema>;

type CreateClientInput = CreateClient;

const UpdateClientSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  ci: z.string().min(1, "Cédula es requerida"),
  sex: z.string().min(1, "Género es requerido"),
  birth_date: z.string().min(1, "Fecha de nacimiento es requerida"),
});

type UpdateClient = z.infer<typeof UpdateClientSchema>;

type UpdateClientInput = UpdateClient;

const ClientListPaginatedSchema = PaginatedResponse(ClientSchema);

type CreateClientResponse = z.infer<ReturnType<typeof OkResponse<z.ZodNull>>>;

type FindAllResponse = z.infer<
  ReturnType<typeof OkResponse<typeof ClientListPaginatedSchema>>
>;

type FindByIDResponse = z.infer<
  ReturnType<typeof OkResponse<typeof ClientSchema>>
>;

export {
  CreateClientSchema,
  UpdateClientSchema,
  ClientSchema,
  ClientFilterSchema,
  ClientListPaginatedSchema,
};

export type {
  Client,
  CreateClient,
  CreateClientResponse,
  CreateClientInput,
  UpdateClient,
  UpdateClientInput,
  ClientFilter,
  FindAllResponse,
  FindByIDResponse,
};
