import { ConfirmDialog } from "@/components/core/confirm-dialog";
import { useClientDeleteMutation } from "#/hooks/client/useMutation.client";
import type { Client } from "#/services/client/client.type";

interface DeleteClientDialogProps {
  dialogId: string;
  close: () => void;
  client: Client;
}

export function DeleteClientDialog({
  dialogId,
  close,
  client,
}: DeleteClientDialogProps) {
  const mutation = useClientDeleteMutation(dialogId);

  return (
    <ConfirmDialog
      dialogId={dialogId}
      close={close}
      title="Eliminar Cliente"
      description={`¿Estás seguro de que deseas eliminar a "${client.name}"? Esta acción no se puede deshacer.`}
      confirmLabel="Eliminar"
      isLoading={mutation.isPending}
      onConfirm={() => mutation.mutate(client.id)}
    />
  );
}
