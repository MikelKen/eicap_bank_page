import type { CreateAccountInput } from "#/services/account/account.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import accountService from "#/services/account/account.service";
import { useLoader } from "#/stores/loader.store";
import { QUERY_KEYS } from "../query-keys";
import { useDialog } from "#/stores/dialog.store";
import { toast } from "sonner";
import { getApiError } from "#/lib/get-api-error";

export const useAccountCreateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateAccountInput) => accountService.create(input),
    onMutate: () => {
      useLoader.getState().show("Creando cuenta...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNTS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK_OPERATIONS.ACTIVE_SESSION.ALL,
      });
      toast.success("Cuenta creada exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al crear la cuenta"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};
