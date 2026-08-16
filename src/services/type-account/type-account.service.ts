import {
  type TypeAccountFilter,
  type FindAllResponse,
  TypeAccountListPaginatedSchema,
} from "./type-account.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";

class TypeAccountService {
  async findAll(filter: TypeAccountFilter): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.TYPE_ACCOUNTS.BASE, { params: filter }),
      TypeAccountListPaginatedSchema,
    );
    return result;
  }
}

const typeAccountService = new TypeAccountService();
export default typeAccountService;
