import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  type TypeOperation,
  TypeOperationFilterSchema,
} from "#/services/type-operation/type-operation.type";
import { FormTypeOperation } from "#/components/module/type-operation/form.type-operation";
import { DeleteTypeOperationDialog } from "#/components/module/type-operation/delete.type-operation";
import { Button } from "#/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useDialog } from "#/stores/dialog.store";
import { usePermission } from "#/stores/permission.store";
import { useTypeOperationListQuery } from "#/hooks/type-operation/useQuery.type-operation";
import { Input } from "#/components/ui/input";
import { DataTable } from "#/components/table/data-table";

const ALLOWED_ROLES = ["admin", "student"];

const columns: ColumnDef<TypeOperation>[] = [
  { accessorKey: "name", header: "Nombre", enableSorting: true },
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
              title: `Editar Tipo de Operación: ${row.original.name}`,
              component: FormTypeOperation,
              props: { typeOperation: row.original },
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
              title: `Eliminar Tipo de Operación: ${row.original.name}`,
              component: DeleteTypeOperationDialog,
              props: { typeOperation: row.original },
            });
          }}
        >
          <Trash2 />
        </Button>
      </div>
    ),
  },
];

export const Route = createFileRoute("/_protected/dashboard/type-operation/")({
  beforeLoad: () => {
    const permission = usePermission.getState().permission;
    if (!permission || !ALLOWED_ROLES.includes(permission)) {
      throw redirect({ to: "/unauthorized" });
    }
  },
  validateSearch: TypeOperationFilterSchema,
  component: TypeOperationPage,
});

function TypeOperationPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { data, isFetching } = useTypeOperationListQuery(search);

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
      from: "/dashboard/type-operation/",
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
      from: "/dashboard/type-operation/",
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
              from: "/dashboard/type-operation/",
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
              title: "Crear Tipo de Operación",
              component: FormTypeOperation,
            });
          }}
        >
          Crear Tipo de Operación
        </Button>
      </div>

      <DataTable<TypeOperation>
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
