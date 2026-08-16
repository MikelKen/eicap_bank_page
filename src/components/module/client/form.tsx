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
  useClientCreateMutation,
  useClientUpdateMutation,
} from "#/hooks/client/useMutation";
import type { DialogContentProps } from "@/stores/dialog.store";
import { useState } from "react";
import { DatePicker, toISODate } from "@/components/ui/date-picker";
import type { Client } from "#/services/client/client.type";

const SEX_OPTIONS = [
  { label: "Masculino", value: "M" },
  { label: "Femenino", value: "F" },
] as const;

interface FormClientProps extends DialogContentProps {
  client?: Client | null;
}

function toDate(plainDate: Client["birth_date"]): Date | undefined {
  if (!plainDate) return undefined;
  return new Date(plainDate.year, plainDate.month - 1, plainDate.day);
}

export function FormClient({ dialogId, close, client }: FormClientProps) {
  const createMutation = useClientCreateMutation(dialogId);
  const updateMutation = useClientUpdateMutation(dialogId);
  const isEdit = !!client;
  const mutation = isEdit ? updateMutation : createMutation;
  const [sex, setSex] = useState<"M" | "F">(
    client?.sex === "F" ? "F" : "M",
  );
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    client ? toDate(client.birth_date) ?? new Date() : new Date(),
  );

  return (
    <DialogContent className="sm:max-w-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);

          const name = String(formData.get("name") ?? "").trim();
          const ci = String(formData.get("ci") ?? "").trim();

          const data = {
            name,
            ci,
            sex,
            birth_date: toISODate(birthDate),
          };

          if (isEdit && client) {
            updateMutation.mutate({ id: client.id, data });
          } else {
            createMutation.mutate(data);
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Cliente" : "Crear Cliente"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifica los datos del cliente."
              : "Completa los datos para crear un nuevo cliente."}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name-1">Nombre</Label>
            <Input
              id="name-1"
              name="name"
              placeholder="Pedro Duarte"
              defaultValue={client?.name ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="ci-1">Cédula</Label>
            <Input
              id="ci-1"
              name="ci"
              placeholder="12345678"
              defaultValue={client?.ci ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="sex-1">Género</Label>
            <Select
              value={sex}
              onValueChange={(value) => setSex(value as "M" | "F")}
            >
              <SelectTrigger id="sex-1" className="w-full">
                <SelectValue placeholder="Selecciona un género" />
              </SelectTrigger>
              <SelectContent>
                {SEX_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <DatePicker
            id="birth_date-1"
            label="Fecha de nacimiento"
            value={birthDate}
            onChange={setBirthDate}
          />
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
