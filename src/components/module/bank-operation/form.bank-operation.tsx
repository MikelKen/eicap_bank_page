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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useBankOperationCreateMutation } from "#/hooks/bank-operation/useMutation.bank-operation";
import { useAccountsByClientQuery } from "#/hooks/account/useQuery.account";
import { useTypeOperationListQuery } from "#/hooks/type-operation/useQuery.type-operation";
import { defaultPagination } from "#/services/pagination/pagination.type";
import type { DialogContentProps } from "@/stores/dialog.store";
import { useState } from "react";

interface FormBankOperationProps extends DialogContentProps {
  clientId: string;
  clientName?: string;
}

// APCA/CICA se registran automáticamente al abrir/cerrar la caja.
const SYSTEM_OPERATION_CODES = new Set(["APCA", "CICA"]);

function formatCurrency(value: string): string {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return value;
  return numeric.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

export function FormBankOperation({
  dialogId,
  close,
  clientId,
  clientName,
}: FormBankOperationProps) {
  const mutation = useBankOperationCreateMutation(dialogId);
  const { data: typesData, isFetching: typesLoading } =
    useTypeOperationListQuery({ ...defaultPagination(), page: 1, per_page: 100 });
  const { data: accountsData, isFetching: accountsLoading } =
    useAccountsByClientQuery(clientId, {
      page: 1,
      per_page: 100,
      sort: "created_at",
      order: "desc",
    });

  const types = (typesData?.data.items ?? []).filter(
    (type) => !SYSTEM_OPERATION_CODES.has(type.code),
  );
  const accounts = accountsData?.data.items ?? [];

  const [typeOperationCode, setTypeOperationCode] = useState("");
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [origin, setOrigin] = useState("");
  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | null>(null);

  const requiresAccount =
    typeOperationCode === "ING" ||
    typeOperationCode === "EGR" ||
    typeOperationCode === "APC";
  const requiresInfo =
    typeOperationCode === "ING" || typeOperationCode === "EGR";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!typeOperationCode) {
      setError("Seleccioná un tipo de operación.");
      return;
    }

    const amountNumber = Number(amount);
    if (!amount || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setError("El monto debe ser un número mayor a cero.");
      return;
    }

    if (requiresAccount && !accountId) {
      setError("Seleccioná una cuenta para esta operación.");
      return;
    }

    if (
      requiresInfo &&
      (!origin.trim() || !reason.trim() || !destination.trim())
    ) {
      setError("Completá origen, motivo y destino de la operación.");
      return;
    }

    setError(null);

    mutation.mutate({
      type_operation_code: typeOperationCode,
      account_id: accountId || undefined,
      amount: amountNumber,
      info: {
        origin: origin.trim(),
        reason: reason.trim(),
        destination: destination.trim(),
        details: details.trim(),
      },
    });
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Nueva Operación Bancaria</DialogTitle>
          <DialogDescription>
            {clientName ? `Cliente: ${clientName}.` : "Registrá una operación."}
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <Label htmlFor="bo-type">Tipo de Operación</Label>
            {typesLoading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <Select
                value={typeOperationCode}
                onValueChange={(value) => setTypeOperationCode(value)}
              >
                <SelectTrigger id="bo-type" className="w-full">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.id} value={type.code}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </Field>

          <Field>
            <Label htmlFor="bo-account">Cuenta</Label>
            {accountsLoading ? (
              <Skeleton className="h-9 w-full" />
            ) : accounts.length === 0 ? (
              <Input
                id="bo-account"
                disabled
                placeholder="El cliente no tiene cuentas"
              />
            ) : (
              <Select
                value={accountId}
                onValueChange={(value) => setAccountId(value)}
              >
                <SelectTrigger id="bo-account" className="w-full">
                  <SelectValue placeholder="Selecciona una cuenta" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.number} · {account.type_account_name ?? "—"} (
                      {formatCurrency(account.balance)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </Field>

          <Field>
            <Label htmlFor="bo-amount">Monto</Label>
            <Input
              id="bo-amount"
              type="number"
              min={0}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </Field>

          <Field>
            <Label htmlFor="bo-origin">Origen</Label>
            <Input
              id="bo-origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Origen de la operación"
            />
          </Field>

          <Field>
            <Label htmlFor="bo-reason">Motivo</Label>
            <Input
              id="bo-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Motivo de la operación"
            />
          </Field>

          <Field>
            <Label htmlFor="bo-destination">Destino</Label>
            <Input
              id="bo-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destino de la operación"
            />
          </Field>

          <Field>
            <Label htmlFor="bo-details">Detalles</Label>
            <Textarea
              id="bo-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Detalles adicionales (opcional)"
            />
          </Field>
        </FieldGroup>

        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

        <DialogFooter className="mt-4">
          <Button variant="outline" type="button" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Registrando..." : "Registrar Operación"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
