import type { AccountFilter } from "#/services/account/account.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import accountService from "#/services/account/account.service";

export const useAccountsByClientQuery = (
  clientId: string,
  filter: AccountFilter,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ACCOUNTS.BY_CLIENT(clientId, filter),
    queryFn: () => accountService.findByClient(clientId, filter),
    enabled: !!clientId,
  });
};
