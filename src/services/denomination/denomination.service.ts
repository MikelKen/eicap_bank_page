import {
  type DenominationFilter,
  type FindAllResponse,
  DenominationListPaginatedSchema,
} from "./denomination.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";

class DenominationService {
  async findAll(filter: DenominationFilter): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.DENOMINATIONS.BASE, { params: filter }),
      DenominationListPaginatedSchema,
    );
    return result;
  }
}

const denominationService = new DenominationService();
export default denominationService;
