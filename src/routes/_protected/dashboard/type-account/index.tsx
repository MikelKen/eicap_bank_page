import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  type TypeAccount,
  TypeAccountFilterSchema,
} from "#/services/type-account/type-account.type";
import { FormTypeAccount } from "#/components/module/type-account/form.type-account";
import { DeleteTypeAccountDialog } from "#/components/module/type-account/delete.type-account";
import { Button } from "#/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useDialog } from "#/stores/dialog.store";
import { usePermission } from "#/stores/permission.store";
import { useTypeAccountListQuery } from "#/hooks/type-account/useQuery.type-account";
import { Input } from "#/components/ui/input";
import { DataTable } from "#/components/table/data-table";

const ALLOWED_ROLES = ["admin", "student"];

const columns: ColumnDef<TypeAccount>[] = [
  { accessorKey: "name", header: "Nombre", enableSorting: true },
  {
    accessorKey: "created_at",
    header: "Creado",
    enableSorting: true,
    cell: ({ row }) =>
      (row.original.created_at as unknown as Date).toLocaleString("es-AR"),
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => {
            useDialog.getState().open({
              title: `Editar Tipo de Cuenta: ${row.original.name}`,
              component: FormTypeAccount,
              props: { typeAccount: row.original },
            });
          }}
        >
          <Pencil />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => {
            useDialog.getState().open({
              title: `Eliminar Tipo de Cuenta: ${row.original.name}`,
              component: DeleteTypeAccountDialog,
              props: { typeAccount: row.original },
            });
          }}
        >
          <Trash2 />
        </Button>
      </div>
    ),
  },
];

export const Route = createFileRoute("/_protected/dashboard/type-account/")({
  beforeLoad: () => {
    const permission = usePermission.getState().permission;
    if (!permission || !ALLOWED_ROLES.includes(permission)) {
      throw redirect({ to: "/unauthorized" });
    }
  },
  validateSearch: TypeAccountFilterSchema,
  component: TypeAccountPage,
});

function TypeAccountPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { data, isFetching } = useTypeAccountListQuery(search);

  const paginated = data?.data;
  const tableData = paginated?.items ?? [];
  const pageCount = paginated?.total_pages ?? -1;

  const sortingState: SortingState = search.sort
    ? [{ id: search.sort, desc: search.order === "desc" }]
    : [];

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    const next =
      typeof updater === "function" ? updater(sortingState) : updater;
    const sort = next[0];
    navigate({
      from: "/dashboard/type-account/",
      search: {
        ...search,
        sort: sort?.id ?? "created_at",
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
      from: "/dashboard/type-account/",
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
      <div className="flex items-center gap-2">
        <Input
          placeholder="Buscar por nombre..."
          value={search.name ?? ""}
          onChange={(e) => {
            navigate({
              from: "/dashboard/type-account/",
              search: {
                ...search,
                name: e.target.value || undefined,
                page: 1,
              },
              replace: true,
            });
          }}
          className="max-w-xs"
        />
        <Button
          onClick={() => {
            useDialog.getState().open({
              title: "Crear Tipo de Cuenta",
              component: FormTypeAccount,
            });
          }}
        >
          Crear Tipo de Cuenta
        </Button>
      </div>

      <DataTable<TypeAccount>
        columns={columns}
        data={tableData}
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
