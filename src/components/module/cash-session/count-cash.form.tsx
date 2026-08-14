import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDenominationListQuery } from "#/hooks/denomination/useQuery.denomination";
import { defaultPagination } from "#/services/pagination/pagination.type";
import {
  useCashSessionCloseMutation,
  useCashSessionOpenMutation,
} from "#/hooks/cash-session/useMutation.cash-session";
import type { DialogContentProps } from "@/stores/dialog.store";
import { useState } from "react";

interface CountCashFormProps extends DialogContentProps {
  mode: "open" | "close";
  sessionId?: string;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

export function CountCashForm({
  dialogId,
  close,
  mode,
  sessionId,
}: CountCashFormProps) {
  const { data, isFetching } = useDenominationListQuery({
    ...defaultPagination(),
    page: 1,
    per_page: 100,
    sort: "value",
    order: "desc",
  });
  const openMutation = useCashSessionOpenMutation(dialogId);
  const closeMutation = useCashSessionCloseMutation(dialogId);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const denominations = data?.data.items ?? [];
  const isPending =
    mode === "open" ? openMutation.isPending : closeMutation.isPending;

  const total = denominations.reduce((acc, denomination) => {
    const quantity = Math.max(
      0,
      Math.floor(Number(quantities[denomination.id]) || 0),
    );
    return acc + (Number(denomination.value) || 0) * quantity;
  }, 0);

  const setQuantity = (id: string, raw: string) => {
    setQuantities((prev) => ({ ...prev, [id]: raw }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const counts = denominations
      .map((denomination) => ({
        denomination_id: denomination.id,
        quantity: Math.floor(Number(quantities[denomination.id]) || 0),
      }))
      .filter((count) => count.quantity > 0);

    if (counts.length === 0) {
      setError(
        "Ingresá al menos una denominación con cantidad mayor a cero.",
      );
      return;
    }

    setError(null);

    if (mode === "open") {
      openMutation.mutate(counts);
    } else if (sessionId) {
      closeMutation.mutate({ sessionId, counts });
    }
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>
            {mode === "open" ? "Abrir Caja" : "Cerrar Caja"}
          </DialogTitle>
          <DialogDescription>
            Ingresá la cantidad de billetes y monedas para cada denominación.
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <div className="flex max-h-[50vh] flex-col gap-2 overflow-y-auto pr-1">
            {denominations.map((denomination) => (
              <div
                key={denomination.id}
                className="flex items-center justify-between gap-3 rounded-lg border p-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{denomination.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(Number(denomination.value))}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Cantidad
                  </span>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    value={quantities[denomination.id] ?? ""}
                    onChange={(e) =>
                      setQuantity(denomination.id, e.target.value)
                    }
                    placeholder="0"
                    className="w-24 text-right"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between rounded-lg border bg-muted/50 p-3">
          <span className="text-sm font-medium">Total contado</span>
          <span className="text-lg font-semibold">
            {formatCurrency(total)}
          </span>
        </div>

        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

        <DialogFooter className="mt-4">
          <Button variant="outline" type="button" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? mode === "open"
                ? "Abriendo..."
                : "Cerrando..."
              : mode === "open"
                ? "Abrir Caja"
                : "Cerrar Caja"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
