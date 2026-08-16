import type { TypeAccountFilter } from "#/services/type-account/type-account.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import typeAccountService from "#/services/type-account/type-account.service";

export const useTypeAccountListQuery = (filter: TypeAccountFilter) => {
  return useQuery({
    queryKey: QUERY_KEYS.TYPE_ACCOUNTS.LIST(filter),
    queryFn: () => typeAccountService.findAll(filter),
  });
};
