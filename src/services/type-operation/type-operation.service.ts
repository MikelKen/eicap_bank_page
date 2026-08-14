import {
  type TypeOperationFilter,
  type FindAllResponse,
  TypeOperationListPaginatedSchema,
} from "./type-operation.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";

class TypeOperationService {
  async findAll(filter: TypeOperationFilter): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.TYPE_OPERATIONS.BASE, { params: filter }),
      TypeOperationListPaginatedSchema,
    );
    return result;
  }
}

const typeOperationService = new TypeOperationService();
export default typeOperationService;
