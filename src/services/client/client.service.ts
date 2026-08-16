import {
  type CreateClient,
  type FindAllResponse,
  type UpdateClient,
  type ClientFilter,
  type Client,
  ClientListPaginatedSchema,
  ClientSchema,
} from "./client.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";
import { z } from "zod";

class ClientService {
  async findAll(filter: ClientFilter): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.CLIENTS.BASE, { params: filter }),
      ClientListPaginatedSchema,
    );
    return result;
  }
  async findAllMine(filter: ClientFilter): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.CLIENTS.MINE, { params: filter }),
      ClientListPaginatedSchema,
    );
    return result;
  }

  async findById(id: string): Promise<Client> {
    const result = await parseResponse(
      api.get(ENDPOINTS.CLIENTS.DETAIL(id)),
      ClientSchema,
    );
    return result.data;
  }

  async create(input: CreateClient) {
    const result = await parseResponse(
      api.post(ENDPOINTS.CLIENTS.BASE, input),
      z.null(),
    );
    return result;
  }

  async update(id: string, input: UpdateClient) {
    const result = await parseResponse(
      api.put(ENDPOINTS.CLIENTS.DETAIL(id), input),
      z.null(),
    );
    return result;
  }

  async delete(id: string) {
    const result = await parseResponse(
      api.delete(ENDPOINTS.CLIENTS.DETAIL(id)),
      z.null(),
    );
    return result;
  }
}

const clientService = new ClientService();
export default clientService;
