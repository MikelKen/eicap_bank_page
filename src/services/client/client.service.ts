import {
  type CreateClient,
  type FindAllResponse,
  type ClientFilter,
  ClientListPaginatedSchema,
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

  async create(input: CreateClient) {
    const result = await parseResponse(
      api.post(ENDPOINTS.CLIENTS.BASE, input),
      z.null(),
    );
    return result;
  }
}

const clientService = new ClientService();
export default clientService;
