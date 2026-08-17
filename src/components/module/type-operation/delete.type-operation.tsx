import type { TypeOperation } from "#/services/type-operation/type-operation.type";
import { useTypeOperationDeleteMutation } from "#/hooks/type-operation/useMutation.type-operation";
import { ConfirmDialog } from "#/components/core/confirm-dialog";

interface DeleteTypeOperationDialogProps {
  dialogId: string;
  close: () => void;
  typeOperation: TypeOperation;
}

export function DeleteTypeOperationDialog({
  dialogId,
  close,
  typeOperation,
}: DeleteTypeOperationDialogProps) {
  const mutation = useTypeOperationDeleteMutation(dialogId);

  return (
    <ConfirmDialog
      dialogId={dialogId}
      close={close}
      title="Eliminar Tipo de Operación"
      description={`¿Estás seguro de que deseas eliminar el tipo de operación "${typeOperation.name}"? Esta acción no se puede deshacer.`}
      confirmLabel="Eliminar"
      isLoading={mutation.isPending}
      onConfirm={() => mutation.mutate(typeOperation.id)}
    />
  );
}
