import type { CreateBankOperationInput } from "#/services/bank-operation/bank-operation.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import bankOperationService from "#/services/bank-operation/bank-operation.service";
import { useLoader } from "#/stores/loader.store";
import { QUERY_KEYS } from "../query-keys";
import { useDialog } from "#/stores/dialog.store";
import { toast } from "sonner";
import { getApiError } from "#/lib/get-api-error";

export const useBankOperationCreateMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBankOperationInput) =>
      bankOperationService.create(input),
    onMutate: () => {
      useLoader.getState().show("Registrando operación...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK_OPERATIONS.ACTIVE_SESSION.ALL,
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNTS.ALL });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CASH_SESSIONS.ALL });
      toast.success("Operación registrada exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al registrar la operación"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};
