import {
  type CreateTypeAccount,
  type UpdateTypeAccount,
  type TypeAccountFilter,
  type FindAllResponse,
  TypeAccountListPaginatedSchema,
} from "./type-account.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";
import { z } from "zod";

class TypeAccountService {
  async findAll(filter: TypeAccountFilter): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.TYPE_ACCOUNTS.BASE, { params: filter }),
      TypeAccountListPaginatedSchema,
    );
    return result;
  }

  async create(input: CreateTypeAccount) {
    const result = await parseResponse(
      api.post(ENDPOINTS.TYPE_ACCOUNTS.BASE, input),
      z.null(),
    );
    return result;
  }

  async update(id: string, input: UpdateTypeAccount) {
    const result = await parseResponse(
      api.put(ENDPOINTS.TYPE_ACCOUNTS.DETAIL(id), input),
      z.null(),
    );
    return result;
  }

  async delete(id: string) {
    const result = await parseResponse(
      api.delete(ENDPOINTS.TYPE_ACCOUNTS.DETAIL(id)),
      z.null(),
    );
    return result;
  }
}

const typeAccountService = new TypeAccountService();
export default typeAccountService;
