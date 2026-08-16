import {
  type AccountFilter,
  type FindAllResponse,
  AccountListPaginatedSchema,
} from "./account.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";

class AccountService {
  async findByClient(
    clientId: string,
    filter: AccountFilter,
  ): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.ACCOUNTS.BY_CLIENT(clientId), { params: filter }),
      AccountListPaginatedSchema,
    );
    return result;
  }
}

const accountService = new AccountService();
export default accountService;
