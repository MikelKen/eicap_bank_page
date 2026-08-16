import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateTypeAccountInput,
  UpdateTypeAccountInput,
} from "#/services/type-account/type-account.type";
import typeAccountService from "#/services/type-account/type-account.service";
import { useDialog } from "#/stores/dialog.store";
import { useLoader } from "#/stores/loader.store";
import { QUERY_KEYS } from "../query-keys";
import { toast } from "sonner";
import { getApiError } from "#/lib/get-api-error";

export const useTypeAccountCreateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTypeAccountInput) =>
      typeAccountService.create(data),
    onMutate: () => {
      useLoader.getState().show("Creando tipo de cuenta...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TYPE_ACCOUNTS.LISTS,
      });
      toast.success("Tipo de cuenta creado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al crear tipo de cuenta"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};

export const useTypeAccountUpdateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTypeAccountInput }) =>
      typeAccountService.update(id, data),
    onMutate: () => {
      useLoader.getState().show("Actualizando tipo de cuenta...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TYPE_ACCOUNTS.LISTS,
      });

      toast.success("Tipo de cuenta actualizado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al actualizar tipo de cuenta"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};

export const useTypeAccountDeleteMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => typeAccountService.delete(id),
    onMutate: () => {
      useLoader.getState().show("Eliminando tipo de cuenta...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TYPE_ACCOUNTS.LISTS,
      });
      toast.success("Tipo de cuenta eliminado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al eliminar tipo de cuenta"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};
