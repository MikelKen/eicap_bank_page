import type { ClientFilter } from "#/services/client/client.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import clientService from "#/services/client/client.service";

export const useClientListQuery = (filter: ClientFilter) => {
  return useQuery({
    queryKey: QUERY_KEYS.CLIENTS.LIST(filter),
    queryFn: () => clientService.findAll(filter),
  });
};

export const useClientMineListQuery = (filter: ClientFilter) => {
  return useQuery({
    queryKey: QUERY_KEYS.CLIENTS.LIST(filter),
    queryFn: () => clientService.findAllMine(filter),
  });
};

export const useClientDetailQuery = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.CLIENTS.DETAIL(id),
    queryFn: () => clientService.findById(id),
    enabled: !!id,
  });
};
