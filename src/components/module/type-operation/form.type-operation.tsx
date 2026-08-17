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
  useTypeOperationCreateMutation,
  useTypeOperationUpdateMutation,
} from "#/hooks/type-operation/useMutation.type-operation";
import type { TypeOperation } from "#/services/type-operation/type-operation.type";
import { Button } from "@/components/ui/button";
import type { DialogContentProps } from "@/stores/dialog.store";

interface FormTypeOperationProps extends DialogContentProps {
  typeOperation?: TypeOperation | null;
}
export function FormTypeOperation({
  dialogId,
  close,
  typeOperation,
}: FormTypeOperationProps) {
  const createMutation = useTypeOperationCreateMutation(dialogId);
  const updateMutation = useTypeOperationUpdateMutation(dialogId);
  const isEdit = !!typeOperation;
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
            code: String(formData.get("code") ?? "").trim(),
          };

          if (isEdit && typeOperation) {
            updateMutation.mutate({ id: typeOperation.id, data });
          } else {
            createMutation.mutate(data);
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar Tipo de Operación" : "Crear Tipo de Operación"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifica los datos del tipo de operación."
              : "Completa los datos para crear un nuevo tipo de operación."}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="code">Código</Label>
            <Input
              id="code"
              name="code"
              placeholder="Caja de Ahorro"

              defaultValue={typeOperation?.code ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              placeholder="Apertura de Cuenta"

              defaultValue={typeOperation?.name ?? ""}
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
