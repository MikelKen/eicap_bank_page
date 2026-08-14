import type { CashCountInput } from "#/services/cash-session/cash-session.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cashSessionService from "#/services/cash-session/cash-session.service";
import { useLoader } from "#/stores/loader.store";
import { QUERY_KEYS } from "../query-keys";
import { useDialog } from "#/stores/dialog.store";
import { toast } from "sonner";
import { getApiError } from "#/lib/get-api-error";

export const useCashSessionOpenMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (counts: CashCountInput[]) => cashSessionService.open(counts),
    onMutate: () => {
      useLoader.getState().show("Abriendo caja...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CASH_SESSIONS.MINE_OPEN,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK_OPERATIONS.ACTIVE_SESSION.ALL,
      });
      toast.success("Caja abierta exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al abrir la caja"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};

export const useCashSessionCloseMutation = (dialogId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      counts,
    }: {
      sessionId: string;
      counts: CashCountInput[];
    }) => cashSessionService.close(sessionId, counts),
    onMutate: () => {
      useLoader.getState().show("Cerrando caja...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CASH_SESSIONS.MINE_OPEN,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK_OPERATIONS.ACTIVE_SESSION.ALL,
      });
      toast.success("Caja cerrada exitosamente");
      useLoader.getState().hide();
      if (dialogId) {
        useDialog.getState().close(dialogId);
      }
    },
    onError: (error) => {
      toast.error(getApiError(error, "Error al cerrar la caja"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};
