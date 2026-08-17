import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateTypeOperationInput,
  UpdateTypeOperationInput,
} from "#/services/type-operation/type-operation.type";
import TypeOperationService from "#/services/type-operation/type-operation.service";
import { useDialog } from "#/stores/dialog.store";
import { useLoader } from "#/stores/loader.store";
import { QUERY_KEYS } from "../query-keys";
import { toast } from "sonner";
import { getApiError } from "#/lib/get-api-error";

export const useTypeOperationCreateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTypeOperationInput) =>
      TypeOperationService.create(data),
    onMutate: () => {
      useLoader.getState().show("Creando tipo de operación...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TYPE_OPERATIONS.LISTS,
      });
      toast.success("Tipo de operación creado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al crear tipo de operación"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};

export const useTypeOperationUpdateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTypeOperationInput;
    }) => TypeOperationService.update(id, data),
    onMutate: () => {
      useLoader.getState().show("Actualizando tipo de operación...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TYPE_OPERATIONS.LISTS,
      });

      toast.success("Tipo de operación actualizado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al actualizar tipo de operación"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};

export const useTypeOperationDeleteMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => TypeOperationService.delete(id),
    onMutate: () => {
      useLoader.getState().show("Eliminando tipo de operación...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TYPE_OPERATIONS.LISTS,
      });
      toast.success("Tipo de operación eliminado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al eliminar tipo de operación"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};
