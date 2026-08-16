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
import { Skeleton } from "@/components/ui/skeleton";
import { useAccountCreateMutation } from "#/hooks/account/useMutation.account";
import { useTypeAccountListQuery } from "#/hooks/type-account/useQuery.type-account";
import { defaultPagination } from "#/services/pagination/pagination.type";
import type { DialogContentProps } from "@/stores/dialog.store";
import { useState } from "react";

interface FormAccountProps extends DialogContentProps {
  clientId: string;
  clientName?: string;
}

export function FormAccount({
  dialogId,
  close,
  clientId,
  clientName,
}: FormAccountProps) {
  const mutation = useAccountCreateMutation(dialogId);
  const { data: typesData, isFetching: typesLoading } =
    useTypeAccountListQuery({ ...defaultPagination(), page: 1, per_page: 100 });

  const typeAccounts = typesData?.data.items ?? [];

  const [typeAccountId, setTypeAccountId] = useState("");
  const [interest, setInterest] = useState("0");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!typeAccountId) {
      setError("Seleccioná un tipo de cuenta.");
      return;
    }

    const interestNumber = Number(interest);
    if (interest === "" || Number.isNaN(interestNumber) || interestNumber < 0) {
      setError("La tasa de interés debe ser un número mayor o igual a cero.");
      return;
    }

    setError(null);

    mutation.mutate({
      client_id: clientId,
      type_account_id: typeAccountId,
      interest: interestNumber.toString(),
    });
  };

  return (
    <DialogContent className="sm:max-w-sm">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Nueva Cuenta</DialogTitle>
          <DialogDescription>
            {clientName
              ? `Cliente: ${clientName}.`
              : "Crea una nueva cuenta para el cliente."}
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <Label htmlFor="acc-type">Tipo de Cuenta</Label>
            {typesLoading ? (
              <Skeleton className="h-9 w-full" />
            ) : typeAccounts.length === 0 ? (
              <Input
                id="acc-type"
                disabled
                placeholder="No hay tipos de cuenta disponibles"
              />
            ) : (
              <Select
                value={typeAccountId}
                onValueChange={(value) => setTypeAccountId(value)}
              >
                <SelectTrigger id="acc-type" className="w-full">
                  <SelectValue placeholder="Selecciona un tipo de cuenta" />
                </SelectTrigger>
                <SelectContent>
                  {typeAccounts.map((typeAccount) => (
                    <SelectItem key={typeAccount.id} value={typeAccount.id}>
                      {typeAccount.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </Field>

          <Field>
            <Label htmlFor="acc-interest">Tasa de interés (%)</Label>
            <Input
              id="acc-interest"
              type="number"
              min={0}
              step="0.01"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="0.00"
            />
          </Field>
        </FieldGroup>

        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

        <DialogFooter className="mt-4">
          <Button variant="outline" type="button" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creando..." : "Crear Cuenta"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
