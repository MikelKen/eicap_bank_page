import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Landmark, Plus, X } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import { DataTable } from "#/components/table/data-table";
import { useMyOpenCashSessionQuery } from "#/hooks/cash-session/useQuery.cash-session";
import { useBankOperationsByActiveSessionQuery } from "#/hooks/bank-operation/useQuery.bank-operation";
import { useClientMineListQuery } from "#/hooks/client/useQuery.client";
import { usePermission } from "#/stores/permission.store";
import { useDialog } from "#/stores/dialog.store";
import { CountCashForm } from "#/components/module/cash-session/count-cash.form";
import { FormBankOperation } from "#/components/module/bank-operation/form.bank-operation";
import {
  type BankOperation,
  type BankOperationFilter,
  BankOperationFilterSchema,
} from "#/services/bank-operation/bank-operation.type";
import { defaultPagination } from "#/services/pagination/pagination.type";
import type { Client } from "#/services/client/client.type";

const ALLOWED_ROLES = ["admin", "student"];

const TYPE_LABELS: Record<string, string> = {
  ING: "Ingreso",
  EGR: "Egreso",
  APC: "Apertura de Cuenta",
  APCA: "Apertura de Caja",
  CICA: "Cierre de Caja",
};

function formatCurrency(value: string): string {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return value;
  return numeric.toLocaleString("es-BO", {
    style: "currency",
    currency: "BOB",
  });
}

const OPERATION_COLUMNS: ColumnDef<BankOperation>[] = [
  { accessorKey: "code", header: "Código" },

  {
    accessorKey: "type_operation_code",
    header: "Tipo",
    size: 150,
    cell: ({ row }) =>
      TYPE_LABELS[row.original.type_operation_code] ??
      row.original.type_operation_code,
  },
  {
    accessorKey: "account_number",
    header: "Cuenta",
    size: 110,
    cell: ({ row }) => row.original.account_number ?? "—",
  },
  {
    accessorKey: "import",
    header: "Importe",
    meta: { align: "right" },
    cell: ({ row }) => formatCurrency(row.original.import),
  },
  //   {
  //     accessorKey: "info",
  //     header: "Origen",
  //     cell: ({ row }) => row.original.info?.origin || "—",
  //   },
  //   {
  //     accessorKey: "info",
  //     header: "Destino",
  //     cell: ({ row }) => row.original.info?.destination || "—",
  //   },
  {
    accessorKey: "info",
    header: "Detalles",
    cell: ({ row }) => row.original.info?.details || "—",
  },
  {
    accessorKey: "date",
    header: "Fecha",
    enableSorting: true,
    cell: ({ row }) =>
      row.original.date.toLocaleString("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
];

export const Route = createFileRoute("/_protected/dashboard/account/")({
  beforeLoad: () => {
    const permission = usePermission.getState().permission;
    if (!permission || !ALLOWED_ROLES.includes(permission)) {
      throw redirect({ to: "/unauthorized" });
    }
  },
  validateSearch: BankOperationFilterSchema,
  component: AccountPage,
});

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  );
}

function AccountPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { data: sessionData, isFetching: sessionLoading } =
    useMyOpenCashSessionQuery();
  const openSession = sessionData ?? null;

  const operationsFilter: BankOperationFilter = { ...search };
  const { data: operationsData, isFetching: operationsLoading } =
    useBankOperationsByActiveSessionQuery(operationsFilter, !!openSession);

  const clientsFilter = useMemo(
    () => ({
      ...defaultPagination(),
      page: 1,
      per_page: 50,
    }),
    [],
  );
  const { data: clientsData, isFetching: clientsLoading } =
    useClientMineListQuery(clientsFilter);
  const clients = clientsData?.data.items ?? [];

  const paginated = operationsData?.data;
  const operations = paginated?.items ?? [];
  const pageCount = paginated?.total_pages ?? -1;

  const sortingState: SortingState = [
    {
      id: search.sort === "created_at" ? "date" : search.sort,
      desc: search.order === "desc",
    },
  ];

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    const next =
      typeof updater === "function" ? updater(sortingState) : updater;
    const sort = next[0];
    navigate({
      from: "/dashboard/account/",
      search: {
        ...search,
        sort: sort?.id ?? "date",
        order: sort?.desc ? "desc" : "asc",
      },
      replace: true,
    });
  };

  const paginationState: PaginationState = {
    pageIndex: search.page - 1,
    pageSize: search.per_page,
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const next =
      typeof updater === "function" ? updater(paginationState) : updater;
    navigate({
      from: "/dashboard/account/",
      search: {
        ...search,
        page: next.pageIndex + 1,
        per_page: next.pageSize,
      },
      replace: true,
    });
  };

  const openCashRegister = () => {
    useDialog.getState().open({
      title: "Abrir Caja",
      component: CountCashForm,
      props: { mode: "open" } as const,
    });
  };

  const closeCashRegister = () => {
    useDialog.getState().open({
      title: "Cerrar Caja",
      component: CountCashForm,
      props: { mode: "close", sessionId: openSession?.id } as const,
    });
  };

  const openOperationDialog = (client: Client) => {
    useDialog.getState().open({
      title: `Nueva Operación — ${client.name}`,
      component: FormBankOperation,
      props: { clientId: client.id, clientName: client.name },
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold">Caja</h2>
          <p className="text-sm text-muted-foreground">
            {openSession
              ? "Sesión de caja activa"
              : "Abrí tu caja para comenzar a registrar operaciones"}
          </p>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-2 xl:grid-cols-[1fr_310px]">
        <div className="flex min-w-0 flex-col gap-2">
          {sessionLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : openSession ? (
            <DataTable<BankOperation>
              columns={OPERATION_COLUMNS}
              data={operations}
              isLoading={operationsLoading}
              sorting={sortingState}
              onSortingChange={handleSortingChange}
              pagination={paginationState}
              onPaginationChange={handlePaginationChange}
              pageCount={pageCount}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Sin sesión de caja activa</CardTitle>
                <CardDescription>
                  Abrí la caja para comenzar a registrar las operaciones
                  bancarias de tus clientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={openCashRegister}>
                  <Landmark />
                  Abrir Caja
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <aside className="flex flex-col gap-2">
          <Card>
            <CardHeader>
              <CardTitle>Sesión de Caja</CardTitle>
              <CardDescription>
                {sessionLoading
                  ? "Cargando..."
                  : openSession
                    ? "Estado: Abierta"
                    : "No hay sesión activa"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {sessionLoading ? (
                <Skeleton className="h-9 w-full" />
              ) : openSession ? (
                <>
                  <InfoItem
                    label="Apertura"
                    value={openSession.opening_date.toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  />
                  <InfoItem
                    label="Monto de apertura"
                    value={formatCurrency(openSession.opening_amount)}
                  />
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={closeCashRegister}
                  >
                    <X />
                    Cerrar Caja
                  </Button>
                </>
              ) : (
                <Button className="w-full" onClick={openCashRegister}>
                  <Landmark />
                  Abrir Caja
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>
                {clientsLoading
                  ? "Cargando..."
                  : `${clients.length} cliente(s)`}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex max-h-[480px]  flex-col gap-2 overflow-y-auto">
              {clientsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))
              ) : clients.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No tenés clientes registrados.
                </p>
              ) : (
                clients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between gap-2 rounded-lg border p-2"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <p className="truncate text-sm font-medium">
                        {client.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Cédula: {client.ci ?? "—"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!openSession}
                      onClick={() => openOperationDialog(client)}
                    >
                      <Plus />
                      Operación
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
