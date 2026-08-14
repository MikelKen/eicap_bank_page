import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { ArrowLeft } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { DataTable } from "#/components/table/data-table";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Skeleton } from "#/components/ui/skeleton";
import { useAccountsByClientQuery } from "#/hooks/account/useQuery.account";
import { useBankOperationsByClientQuery } from "#/hooks/bank-operation/useQuery.bank-operation";
import { useClientDetailQuery } from "#/hooks/client/useQuery";
import {
  type Account,
  type AccountFilter,
} from "#/services/account/account.type";
import {
  type BankOperation,
  type BankOperationFilter,
  BankOperationFilterSchema,
} from "#/services/bank-operation/bank-operation.type";
import { defaultPagination } from "#/services/pagination/pagination.type";
import { usePermission } from "#/stores/permission.store";
import { cn } from "#/lib/utils";

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
    accessorKey: "date",
    header: "Fecha",
    enableSorting: true,
    cell: ({ row }) =>
      row.original.date.toLocaleString("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
      }),
  },
  {
    accessorKey: "account_number",
    header: "Número de Cuenta",
    cell: ({ row }) => row.original.account_number ?? "—",
  },
  {
    accessorKey: "type_operation_code",
    header: "Tipo de Operación",
    cell: ({ row }) =>
      TYPE_LABELS[row.original.type_operation_code] ??
      row.original.type_operation_code,
  },
  {
    accessorKey: "previous_balance",
    header: "Saldo Anterior",
    meta: { align: "right" },
    cell: ({ row }) => formatCurrency(row.original.previous_balance),
  },
  {
    accessorKey: "import",
    header: "Monto",
    meta: { align: "right" },
    cell: ({ row }) => formatCurrency(row.original.import),
  },
  {
    accessorKey: "end_balance",
    header: "Saldo Final",
    meta: { align: "right" },
    cell: ({ row }) => formatCurrency(row.original.end_balance),
  },
];

export const Route = createFileRoute("/_protected/dashboard/client/$clientId")({
  beforeLoad: () => {
    const permission = usePermission.getState().permission;
    if (!permission || !ALLOWED_ROLES.includes(permission)) {
      throw redirect({ to: "/unauthorized" });
    }
  },
  validateSearch: BankOperationFilterSchema,
  component: ClientDetailPage,
});

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  );
}

function ClientDetailPage() {
  const { clientId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { data: client } = useClientDetailQuery(clientId);

  const [accountSearchInput, setAccountSearchInput] = useState("");
  const accountSearch = useDeferredValue(accountSearchInput);

  const accountsFilter: AccountFilter = useMemo(
    () => ({
      ...defaultPagination(),
      page: 1,
      per_page: 100,
      search: accountSearch || undefined,
    }),
    [accountSearch],
  );

  const { data: accountsData, isFetching: accountsLoading } =
    useAccountsByClientQuery(clientId, accountsFilter);
  const accounts = accountsData?.data.items ?? [];

  const selectedAccountId = search.account_id;
  const selectedAccount =
    accounts.find((account) => account.id === selectedAccountId) ?? null;

  const operationsFilter: BankOperationFilter = { ...search };

  const { data: operationsData, isFetching: operationsLoading } =
    useBankOperationsByClientQuery(clientId, operationsFilter);
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
      from: "/dashboard/client/$clientId",
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
      from: "/dashboard/client/$clientId",
      search: {
        ...search,
        page: next.pageIndex + 1,
        per_page: next.pageSize,
      },
      replace: true,
    });
  };

  const handleSelectAccount = (account: Account) => {
    navigate({
      from: "/dashboard/client/$clientId",
      search: {
        ...search,
        account_id: selectedAccountId === account.id ? undefined : account.id,
        page: 1,
      },
      replace: true,
    });
  };

  const tableTitle = selectedAccount
    ? `Operaciones Bancarias - ${selectedAccount.number}`
    : "Operaciones Bancarias";

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          render={<Link to="/dashboard/client" />}
        >
          <ArrowLeft />
          Volver a Clientes
        </Button>
        <h2 className="text-base font-semibold">{tableTitle}</h2>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          {selectedAccount && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSelectAccount(selectedAccount)}
              >
                Mostrar todas las operaciones
              </Button>
            </div>
          )}
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
        </div>

        <div className="flex flex-col gap-2">
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              {client ? (
                <div className="grid grid-cols-1 gap-2">
                  <InfoItem label="Nombre" value={client.name} />
                  <InfoItem label="Cédula" value={client.ci} />
                  <InfoItem
                    label="Fecha de registro"
                    value={client.created_at.toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cuentas del Cliente</CardTitle>
              <CardDescription>
                {accountsLoading
                  ? "Cargando..."
                  : `${accounts.length} cuenta(s)`}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Input
                placeholder="Buscar cuenta..."
                value={accountSearchInput}
                onChange={(e) => setAccountSearchInput(e.target.value)}
              />
              <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto pr-1">
                {accountsLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))
                ) : accounts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Sin cuentas.</p>
                ) : (
                  accounts.map((account) => {
                    const isSelected = account.id === selectedAccountId;
                    return (
                      <div
                        key={account.id}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-lg border p-2",
                          isSelected && "border-primary bg-muted/50",
                        )}
                      >
                        <div className="min-w-0 space-y-0.5">
                          <p className="text-sm font-medium">
                            {account.number}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {account.type_account_name ?? "—"}
                          </p>
                          <p className="text-sm font-semibold">
                            {formatCurrency(account.balance)}
                          </p>
                        </div>
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleSelectAccount(account)}
                        >
                          {isSelected ? "Mostrar todas" : "Ver operaciones"}
                        </Button>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
