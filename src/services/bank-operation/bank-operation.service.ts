import {
  type BankOperationFilter,
  type CreateBankOperation,
  type FindAllResponse,
  BankOperationListPaginatedSchema,
} from "./bank-operation.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";
import { z } from "zod";

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

  async findByActiveSession(
    filter: BankOperationFilter,
  ): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.BANK_OPERATIONS.ACTIVE_SESSION, { params: filter }),
      BankOperationListPaginatedSchema,
    );
    return result;
  }

  async create(input: CreateBankOperation) {
    console.log("Datos de la transaccion: ", input);
    const result = await parseResponse(
      api.post(ENDPOINTS.BANK_OPERATIONS.BASE, input),
      z.null(),
    );
    return result;
  }
}

const bankOperationService = new BankOperationService();
export default bankOperationService;
