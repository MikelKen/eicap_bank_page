import {
  type CashCountInput,
  type CashSession,
  type CashSessionFilter,
  type FindAllResponse,
  CashSessionListPaginatedSchema,
  CashSessionSchema,
} from "./cash-session.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";
import { z } from "zod";

class CashSessionService {
  async findAll(filter: CashSessionFilter): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.CASH_SESSIONS.LIST, { params: filter }),
      CashSessionListPaginatedSchema,
    );
    return result;
  }

  async findMyOpen(): Promise<CashSession | null> {
    try {
      const result = await parseResponse(
        api.get(ENDPOINTS.CASH_SESSIONS.MINE_OPEN),
        CashSessionSchema,
      );
      return result.data;
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        (error as { status?: number }).status === 404
      ) {
        return null;
      }
      throw error;
    }
  }

  async open(counts: CashCountInput[]) {
    const result = await parseResponse(
      api.post(ENDPOINTS.CASH_SESSIONS.OPEN, { counts }),
      z.null(),
    );
    return result;
  }

  async close(sessionId: string, counts: CashCountInput[]) {
    const result = await parseResponse(
      api.put(ENDPOINTS.CASH_SESSIONS.CLOSE(sessionId), { counts }),
      z.null(),
    );
    return result;
  }
}

const cashSessionService = new CashSessionService();
export default cashSessionService;
