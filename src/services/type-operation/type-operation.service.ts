import {
  type CreateTypeOperation,
  type UpdateTypeOperation,
  type TypeOperationFilter,
  type FindAllResponse,
  TypeOperationListPaginatedSchema,
} from "./type-operation.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";
import { z } from "zod";

class TypeOperationService {
  async findAll(filter: TypeOperationFilter): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.TYPE_OPERATIONS.BASE, { params: filter }),
      TypeOperationListPaginatedSchema,
    );
    return result;
  }

  async create(input: CreateTypeOperation) {
    const result = await parseResponse(
      api.post(ENDPOINTS.TYPE_OPERATIONS.BASE, input),
      z.null(),
    );
    return result;
  }

  async update(id: string, input: UpdateTypeOperation) {
    const result = await parseResponse(
      api.put(ENDPOINTS.TYPE_OPERATIONS.DETAIL(id), input),
      z.null(),
    );
    return result;
  }

  async delete(id: string) {
    const result = await parseResponse(
      api.delete(ENDPOINTS.TYPE_OPERATIONS.DETAIL(id)),
      z.null(),
    );
    return result;
  }
}

const typeOperationService = new TypeOperationService();
export default typeOperationService;
