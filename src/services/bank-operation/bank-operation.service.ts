import {
  type BankOperationFilter,
  type FindAllResponse,
  BankOperationListPaginatedSchema,
} from "./bank-operation.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";

class BankOperationService {
  async findByClient(
    clientId: string,
    filter: BankOperationFilter,
  ): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.BANK_OPERATIONS.BY_CLIENT(clientId), {
        params: filter,
      }),
      BankOperationListPaginatedSchema,
    );
    return result;
  }
}

const bankOperationService = new BankOperationService();
export default bankOperationService;
