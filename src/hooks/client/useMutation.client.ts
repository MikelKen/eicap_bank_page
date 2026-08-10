import type { CreateClientInput } from "#/services/client/client.type";
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
