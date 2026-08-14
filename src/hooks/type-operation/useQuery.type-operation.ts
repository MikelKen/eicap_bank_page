import type { TypeOperationFilter } from "#/services/type-operation/type-operation.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import typeOperationService from "#/services/type-operation/type-operation.service";

export const useTypeOperationListQuery = (filter: TypeOperationFilter) => {
  return useQuery({
    queryKey: QUERY_KEYS.TYPE_OPERATIONS.LIST(filter),
    queryFn: () => typeOperationService.findAll(filter),
  });
};
