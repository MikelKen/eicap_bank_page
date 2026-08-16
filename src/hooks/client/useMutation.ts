import type {
  CreateClientInput,
  UpdateClientInput,
} from "#/services/client/client.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clientService from "#/services/client/client.service";
import { useLoader } from "#/stores/loader.store";
import { QUERY_KEYS } from "../query-keys";
import { useDialog } from "#/stores/dialog.store";
import { toast } from "sonner";
import { getApiError } from "#/lib/get-api-error";

export const useClientCreateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientInput) => clientService.create(data),
    onMutate: () => {
      useLoader.getState().show("Creando cliente...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.LISTS });
      toast.success("Cliente creado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al crear cliente"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};

export const useClientUpdateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClientInput }) =>
      clientService.update(id, data),
    onMutate: () => {
      useLoader.getState().show("Actualizando cliente...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.LISTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.DETAILS });
      toast.success("Cliente actualizado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al actualizar cliente"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};

export const useClientDeleteMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientService.delete(id),
    onMutate: () => {
      useLoader.getState().show("Eliminando cliente...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.LISTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.DETAILS });
      toast.success("Cliente eliminado exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al eliminar cliente"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};
