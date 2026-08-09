import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Temporal } from "temporal-polyfill";
import { ImageField } from "#/components/image/field.image";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";
import { useMeQuery } from "#/hooks/user/useQuery.user";
import { cn } from "#/lib/utils";

function formatDate(
  value: Temporal.Instant | string | undefined | null,
): string {
  if (!value) return "—";
  const instant =
    typeof value === "string" ? Temporal.Instant.from(value) : value;
  return instant.toLocaleString("es-AR", {
    timeZone: "America/La_Paz",
    dateStyle: "long",
  });
}

export const Route = createFileRoute("/_protected/dashboard/user/me")({
  component: MePage,
});

const ROLE_STYLES: Record<string, { label: string; className: string }> = {
  admin: {
    label: "Admin",
    className: "border-sky-500 text-sky-600 bg-sky-50",
  },
  student: {
    label: "Estudiante",
    className: "border-violet-500 text-violet-600 bg-violet-50",
  },
};

function MePage() {
  const { data: meData } = useMeQuery();
  // const updateAvatarMutation = useMeUpdateAvatarMutation();
  // const deleteAvatarMutation = useMeDeleteAvatarMutation();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // useEffect(() => {
  //   if (updateAvatarMutation.isSuccess) setAvatarFile(null);
  // }, [updateAvatarMutation.isSuccess]);

  const user = meData;

  if (!user) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No hay información de usuario disponible.
          </CardContent>
        </Card>
      </div>
    );
  }

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "??";

  const roleStyle = ROLE_STYLES[user.role] ?? {
    label: user.role,
    className: "border-gray-500 text-gray-600 bg-gray-50",
  };

  // function handleAvatarUpload() {
  //   if (!avatarFile) return;
  //   updateAvatarMutation.mutate(avatarFile);
  // }

  // function handleAvatarDelete() {
  //   deleteAvatarMutation.mutate(undefined);
  // }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-6" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Nombre
              </p>
              <p className="text-sm">{user.name || "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Email</p>
              <p className="text-sm">{user.email || "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Rol</p>
              <span
                className={cn(
                  "inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium",
                  roleStyle.className,
                )}
              >
                {roleStyle.label}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Miembro desde
              </p>
              <p className="text-sm">{formatDate(user.created_at)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Última actualización
              </p>
              <p className="text-sm">{formatDate(user.updated_at)}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Avatar</h3>
            <ImageField
              value={avatarFile}
              onChange={setAvatarFile}
              currentImageUrl={user.avatar}
              label="Foto de perfil"
              placeholder="Arrastrá tu avatar aquí"
            />
            <div className="flex gap-2">
              {/* <Button
                type="button"
                size="sm"
                disabled={!avatarFile || updateAvatarMutation.isPending}
                onClick={handleAvatarUpload}
              >
                {updateAvatarMutation.isPending
                  ? "Subiendo..."
                  : "Guardar avatar"}
              </Button> */}
              {/* {user.avatar && (
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  disabled={deleteAvatarMutation.isPending}
                  onClick={handleAvatarDelete}
                >
                  {deleteAvatarMutation.isPending
                    ? "Eliminando..."
                    : "Eliminar avatar"}
                </Button>
              )} */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
