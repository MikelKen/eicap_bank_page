import type { BankOperationFilter } from "#/services/bank-operation/bank-operation.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import bankOperationService from "#/services/bank-operation/bank-operation.service";

export const useBankOperationsByClientQuery = (
  clientId: string,
  filter: BankOperationFilter,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.BANK_OPERATIONS.BY_CLIENT(clientId, filter),
    queryFn: () => bankOperationService.findByClient(clientId, filter),
    enabled: !!clientId,
  });
};

export const useBankOperationsByActiveSessionQuery = (
  filter: BankOperationFilter,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.BANK_OPERATIONS.ACTIVE_SESSION.LIST(filter),
    queryFn: () => bankOperationService.findByActiveSession(filter),
    enabled,
  });
};
