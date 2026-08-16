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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useUserCreateMutation,
  useUserUpdateMutation,
} from "#/hooks/user/useMutation.user";
import type { DialogContentProps } from "@/stores/dialog.store";
import { useState } from "react";
import type { Permission } from "#/lib/permission";
import type { User } from "#/services/user/user.type";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Estudiante", value: "student" },
] as const;

interface FormUserProps extends DialogContentProps {
  user?: User | null;
}

export function FormUser({ dialogId, close, user }: FormUserProps) {
  const createMutation = useUserCreateMutation(dialogId);
  const updateMutation = useUserUpdateMutation(dialogId);
  const isEdit = !!user;
  const mutation = isEdit ? updateMutation : createMutation;
  const [role, setRole] = useState<Permission>(
    (user?.role as Permission) ?? "student",
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <DialogContent className="sm:max-w-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);

          const name = String(formData.get("name") ?? "").trim();
          const email = String(formData.get("email") ?? "").trim();
          const password = String(formData.get("password") ?? "").trim();

          if (isEdit && user) {
            updateMutation.mutate({
              id: user.id,
              data: {
                name,
                email: email || undefined,
                password: password || undefined,
                role,
              },
            });
          } else {
            createMutation.mutate({
              name,
              email,
              password,
              role,
            });
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Usuario" : "Crear Usuario"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifica los datos del usuario."
              : "Completa los datos para crear un nuevo usuario."}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name-1">Nombre</Label>
            <Input
              id="name-1"
              name="name"
              placeholder="Pedro Duarte"
              defaultValue={user?.name ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="email-1">Email</Label>
            <Input
              id="email-1"
              name="email"
              type="email"
              placeholder="m@example.com"
              defaultValue={user?.email ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="password-1">
              {isEdit ? "Nueva contraseña (opcional)" : "Password"}
            </Label>
            <div className="relative">
              <Input
                id="password-1"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={isEdit ? "Dejar en blanco para no cambiarla" : "••••••••"}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-0 top-0 h-full px-3 flex items-center text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                </span>
              </button>
            </div>
          </Field>
          <Field>
            <Label htmlFor="role-1">Rol</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as Permission)}
            >
              <SelectTrigger id="role-1" className="w-full">
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
