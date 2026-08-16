import type { TypeAccount } from "#/services/type-account/type-account.type";
import { useTypeAccountDeleteMutation } from "#/hooks/type-account/useMutation.type-account";
import { ConfirmDialog } from "#/components/core/confirm-dialog";

interface DeleteTypeAccoutDialogProps {
  dialogId: string;
  close: () => void;
  typeAccount: TypeAccount;
}

export function DeleteTypeAccountDialog({
  dialogId,
  close,
  typeAccount,
}: DeleteTypeAccoutDialogProps) {
  const mutation = useTypeAccountDeleteMutation(dialogId);

  return (
    <ConfirmDialog
      dialogId={dialogId}
      close={close}
      title="Eliminar Tipo de Cuenta"
      description={`¿Estás seguro de que deseas eliminar el tipo de cuenta "${typeAccount.name}"? Esta acción no se puede deshacer.`}
      confirmLabel="Eliminar"
      isLoading={mutation.isPending}
      onConfirm={() => mutation.mutate(typeAccount.id)}
    />
  );
}
