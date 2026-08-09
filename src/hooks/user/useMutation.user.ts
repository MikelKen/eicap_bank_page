import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiError } from "#/lib/get-api-error";
import userService from "#/services/user/user.services";
import type { CreateUserInput } from "#/services/user/user.type";
import { useDialog } from "#/stores/dialog.store";
import { useLoader } from "#/stores/loader.store";
import { QUERY_KEYS } from "../query-keys";

export const useUserCreateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, avatar }: CreateUserInput) =>
      userService.create(data, avatar),
    onMutate: () => {
      useLoader.getState().show("Creando usuario...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LISTS });
      toast.success("Usuario creado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al crear usuario"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};
