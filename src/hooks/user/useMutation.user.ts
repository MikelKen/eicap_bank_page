import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiError } from "#/lib/get-api-error";
import userService from "#/services/user/user.services";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "#/services/user/user.type";
import { useDialog } from "#/stores/dialog.store";
import { useLoader } from "#/stores/loader.store";
import { QUERY_KEYS } from "../query-keys";

export const useUserCreateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => userService.create(data),
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

export const useUserUpdateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) =>
      userService.update(id, data),
    onMutate: () => {
      useLoader.getState().show("Actualizando usuario...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LISTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.ME });
      toast.success("Usuario actualizado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al actualizar usuario"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};

export const useUserDeleteMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onMutate: () => {
      useLoader.getState().show("Eliminando usuario...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LISTS });
      toast.success("Usuario eliminado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al eliminar usuario"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};
