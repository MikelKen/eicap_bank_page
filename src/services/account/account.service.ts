import {
  type AccountFilter,
  type CreateAccount,
  type FindAllResponse,
  AccountListPaginatedSchema,
} from "./account.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";
import { z } from "zod";

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

  async create(input: CreateAccount) {
    const result = await parseResponse(
      api.post(ENDPOINTS.ACCOUNTS.BASE, input),
      z.null(),
    );
    return result;
  }
}

const accountService = new AccountService();
export default accountService;
