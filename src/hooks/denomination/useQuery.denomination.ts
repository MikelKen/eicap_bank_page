import type { DenominationFilter } from "#/services/denomination/denomination.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import denominationService from "#/services/denomination/denomination.service";

export const useDenominationListQuery = (filter: DenominationFilter) => {
  return useQuery({
    queryKey: QUERY_KEYS.DENOMINATIONS.LIST(filter),
    queryFn: () => denominationService.findAll(filter),
  });
};
