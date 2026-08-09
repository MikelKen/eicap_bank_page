import { Button } from "@/components/ui/button";
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
import type { DialogContentProps } from "@/stores/dialog.store";
import { useUserCreateMutation } from "#/hooks/user/useMutation.user";
import * as ShadcnSelect from "#/components/ui/select";
import { usePermission } from "#/stores/permission.store";

interface FormUserProps {
  dialogId: string;
}

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Estudiante", value: "student" },
] as const;

export function FormUser({ dialogId }: FormUserProps) {
  const mutation = useUserCreateMutation(dialogId);
  const permission = usePermission((s) => s.permission);

  return (
    <DialogContent className="sm:max-w-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: llamar a tu mutation de crear usuario aquí
        }}
      >
        <DialogHeader>
          <DialogTitle>Crear Usuario</DialogTitle>
          <DialogDescription>
            Completa los datos para crear un nuevo usuario.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name-1">Nombre</Label>
            <Input id="name-1" name="name" placeholder="Pedro Duarte" />
          </Field>
          <Field>
            <Label htmlFor="email-1">Email</Label>
            <Input
              id="email-1"
              name="email"
              type="email"
              placeholder="m@example.com"
            />
          </Field>
          <Field>
            <Label htmlFor="password-1">Password</Label>
            <Input
              id="password-1"
              name="password"
              type="password"
              placeholder="••••••••"
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
