import { ConfirmDialog } from "@/components/core/confirm-dialog";
import { useUserDeleteMutation } from "#/hooks/user/useMutation.user";
import type { User } from "#/services/user/user.type";

interface DeleteUserDialogProps {
  dialogId: string;
  close: () => void;
  user: User;
}

export function DeleteUserDialog({
  dialogId,
  close,
  user,
}: DeleteUserDialogProps) {
  const mutation = useUserDeleteMutation(dialogId);

  return (
    <ConfirmDialog
      dialogId={dialogId}
      close={close}
      title="Eliminar Usuario"
      description={`¿Estás seguro de que deseas eliminar a "${user.name}"? Esta acción no se puede deshacer.`}
      confirmLabel="Eliminar"
      isLoading={mutation.isPending}
      onConfirm={() => mutation.mutate(user.id)}
    />
  );
}
