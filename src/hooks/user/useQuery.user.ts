import type { UserFilter } from "#/services/user/user.type";
import { QUERY_KEYS } from "../query-keys";
import userService from "#/services/user/user.services";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "#/stores/auth.store";

export const useUserListQuery = (filter: UserFilter) => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS.LIST(filter),
    queryFn: () => userService.findAll(filter),
  });
};

export const useMeQuery = () => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: QUERY_KEYS.USERS.ME,
    queryFn: () => userService.findMe(),
    enabled: !!token,
  });
};
