import type { User } from "#/services/user/user.type";
import { useDialog } from "#/stores/dialog.store";

interface ViewUserProps {
  dialogId: string;
  user?: User | null;
}

export function ViewUser({ dialogId, user }: ViewUserProps) {
  const close = useDialog((s) => s.close);

  if (!user) {
    close(dialogId);
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <span className="font-medium">Nombre</span>
      <span>{user.name}</span>
      <span className="font-medium">Email</span>
      <span>{user.email ?? "—"}</span>
      <span className="font-medium">Rol</span>
      <span>{user.role}</span>
      <span className="font-medium">Creado</span>
      <span>{user.created_at.toLocaleString("es-AR")}</span>
      <span className="font-medium">Actualizado</span>
      <span>{user.updated_at.toLocaleString("es-AR")}</span>
    </div>
  );
}
