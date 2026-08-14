import type { Client } from "#/services/client/client.type";
import { useDialog } from "#/stores/dialog.store";

interface ViewClientProps {
  dialogId: string;
  client?: Client | null;
}

const SEX_LABELS: Record<string, string> = {
  M: "Masculino",
  F: "Femenino",
};

export function ViewClient({ dialogId, client }: ViewClientProps) {
  const close = useDialog((s) => s.close);

  if (!client) {
    close(dialogId);
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <span className="font-medium">Nombre</span>
      <span>{client.name}</span>
      <span className="font-medium">Cédula</span>
      <span>{client.ci ?? "—"}</span>
      <span className="font-medium">Género</span>
      <span>{client.sex ? (SEX_LABELS[client.sex] ?? client.sex) : "—"}</span>
      <span className="font-medium">Fecha de nacimiento</span>
      <span>
        {client.birth_date
          ? client.birth_date.toLocaleString("es-AR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "—"}
      </span>
      <span className="font-medium">Creado</span>
      <span>{client.created_at.toLocaleString("es-AR")}</span>
      <span className="font-medium">Actualizado</span>
      <span>{client.updated_at.toLocaleString("es-AR")}</span>
    </div>
  );
}
