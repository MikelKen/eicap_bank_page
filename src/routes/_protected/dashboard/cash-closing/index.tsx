import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { DataTable } from "#/components/table/data-table";
import { useCashSessionsQuery } from "#/hooks/cash-session/useQuery.cash-session";
import {
  type CashCount,
  type CashSession,
  type CashSessionFilter,
  CashSessionFilterSchema,
} from "#/services/cash-session/cash-session.type";
import { usePermission } from "#/stores/permission.store";

const ALLOWED_ROLES = ["admin"];

const BILL_DENOMINATIONS = ["200", "100", "50", "20", "10"];
const COIN_DENOMINATIONS = ["5", "2", "1"];

function formatCurrency(value: string): string {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return value;
  return numeric.toLocaleString("es-BO", {
    style: "currency",
    currency: "BOB",
  });
}

function quantityByValue(
  counts: CashCount[] | undefined,
  value: string,
): number {
  if (!counts) return 0;
  const count = counts.find(
    (c) => c.type === "closing" && c.denomination_value === value,
  );
  return count?.quantity ?? 0;
}

function denominationColumns(
  denominations: string[],
  label: string,
): ColumnDef<CashSession>[] {
  return denominations.map((value) => ({
    accessorKey: `count_${value}`,
    header: `${label} ${Number(value).toLocaleString("es-BO")}`,
    meta: { align: "right" },
    size: 80,
    cell: ({ row }) => quantityByValue(row.original.counts, value),
  }));
}

const CLOSING_COLUMNS: ColumnDef<CashSession>[] = [
  {
    accessorKey: "operation_code",
    header: "Código Op. Cierre",
    cell: ({ row }) => row.original.operation_code ?? "—",
  },
  ...denominationColumns(BILL_DENOMINATIONS, ""),
  ...denominationColumns(COIN_DENOMINATIONS, ""),
  {
    accessorKey: "expected_amount",
    header: "Importe Transacciones",
    meta: { align: "right" },
    cell: ({ row }) =>
      row.original.expected_amount
        ? formatCurrency(row.original.expected_amount)
        : "—",
  },
  {
    accessorKey: "closing_amount",
    header: "Importes Entregado",
    meta: { align: "right" },
    cell: ({ row }) =>
      row.original.closing_amount
        ? formatCurrency(row.original.closing_amount)
        : "—",
  },
  {
    accessorKey: "difference_amount",
    header: "Diferencia",
    meta: { align: "right" },
    size: 120,
    cell: ({ row }) => {
      const expected = Number(row.original.expected_amount);
      const closing = Number(row.original.closing_amount);

      if (Number.isNaN(expected) || Number.isNaN(closing)) return "—";

      const difference = closing - expected;
      const colorClass =
        difference < 0
          ? "text-red-600"
          : difference > 0
            ? "text-green-600"
            : "";

      return (
        <span className={colorClass}>{formatCurrency(String(difference))}</span>
      );
    },
  },
  {
    accessorKey: "closing_date",
    header: "Fecha",
    enableSorting: true,
    cell: ({ row }) =>
      row.original.closing_date
        ? row.original.closing_date.toLocaleString("es-AR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "—",
  },
];

export const Route = createFileRoute("/_protected/dashboard/cash-closing/")({
  beforeLoad: () => {
    const permission = usePermission.getState().permission;
    if (!permission || !ALLOWED_ROLES.includes(permission)) {
      throw redirect({ to: "/unauthorized" });
    }
  },
  validateSearch: CashSessionFilterSchema,
  component: CashClosingReportPage,
});

function CashClosingReportPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const filter: CashSessionFilter = { ...search, state: "closed" };
  const { data, isFetching } = useCashSessionsQuery(filter);

  const paginated = data?.data;
  const sessions = paginated?.items ?? [];
  const pageCount = paginated?.total_pages ?? -1;

  const sortingState: SortingState = [
    {
      id: search.sort === "created_at" ? "closing_date" : search.sort,
      desc: search.order === "desc",
    },
  ];

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    const next =
      typeof updater === "function" ? updater(sortingState) : updater;
    const sort = next[0];
    navigate({
      from: "/dashboard/cash-closing/",
      search: {
        ...search,
        sort: sort?.id ?? "closing_date",
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
      from: "/dashboard/cash-closing/",
      search: {
        ...search,
        page: next.pageIndex + 1,
        per_page: next.pageSize,
      },
      replace: true,
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold">Reporte de Cierre</h2>
        <p className="text-sm text-muted-foreground">
          Listado de cierres de caja registrados
        </p>
      </div>

      <DataTable<CashSession>
        columns={CLOSING_COLUMNS}
        data={sessions}
        isLoading={isFetching}
        sorting={sortingState}
        onSortingChange={handleSortingChange}
        pagination={paginationState}
        onPaginationChange={handlePaginationChange}
        pageCount={pageCount}
      />
    </div>
  );
}
