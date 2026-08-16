import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useTypeAccountCreateMutation,
  useTypeAccountUpdateMutation,
} from "#/hooks/type-account/useMutation.type-account";
import type { TypeAccount } from "#/services/type-account/type-account.type";
import { Button } from "@/components/ui/button";
import type { DialogContentProps } from "@/stores/dialog.store";

interface FormTypeAccountProps extends DialogContentProps {
  typeAccount?: TypeAccount | null;
}
export function FormTypeAccount({
  dialogId,
  close,
  typeAccount,
}: FormTypeAccountProps) {
  const createMutation = useTypeAccountCreateMutation(dialogId);
  const updateMutation = useTypeAccountUpdateMutation(dialogId);
  const isEdit = !!typeAccount;
  const mutation = isEdit ? updateMutation : createMutation;

  return (
    <DialogContent className="sm:max-w-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const data = {
            name: String(formData.get("name") ?? "").trim(),
          };

          if (isEdit && typeAccount) {
            updateMutation.mutate({ id: typeAccount.id, data });
          } else {
            createMutation.mutate(data);
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar Tipo Cuenta" : "Crear Tipo Cuenta"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifica los datos del tipo de cuenta."
              : "Completa los datos para crear un nuevo tipo de cuenta."}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name-1">Nombre</Label>
            <Input
              id="name-1"
              name="name"
              placeholder="Caja de Ahorro"

              defaultValue={typeAccount?.name ?? ""}
            />
          </Field>
        </FieldGroup>
        <DialogFooter className="mt-4">
          <Button variant="outline" type="button" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
