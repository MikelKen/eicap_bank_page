import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import cashSessionService from "#/services/cash-session/cash-session.service";

export const useMyOpenCashSessionQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CASH_SESSIONS.MINE_OPEN,
    queryFn: () => cashSessionService.findMyOpen(),
    retry: false,
  });
};
