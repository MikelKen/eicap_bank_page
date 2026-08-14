import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import type { CashSessionFilter } from "#/services/cash-session/cash-session.type";
import cashSessionService from "#/services/cash-session/cash-session.service";

export const useCashSessionsQuery = (filter: CashSessionFilter) => {
  return useQuery({
    queryKey: QUERY_KEYS.CASH_SESSIONS.LIST(filter),
    queryFn: () => cashSessionService.findAll(filter),
  });
};

export const useMyOpenCashSessionQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CASH_SESSIONS.MINE_OPEN,
    queryFn: () => cashSessionService.findMyOpen(),
    retry: false,
  });
};
