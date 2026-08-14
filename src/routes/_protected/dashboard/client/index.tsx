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
import { type Client, ClientFilterSchema } from "#/services/client/client.type";
import { Calculator, ExternalLink, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { useDialog } from "#/stores/dialog.store";
import { ViewClient } from "#/components/module/client/view.client";
import { usePermission } from "#/stores/permission.store";
import { useClientMineListQuery } from "#/hooks/client/useQuery.client";
import { FormClient } from "#/components/module/client/form.client";
import { DataTable } from "#/components/table/data-table";

const ROLES = [
  { value: "all", label: "Todos", color: "", colorSelected: "" },
] as const;

const ALLOWED_ROLES = ["admin", "student"];

const columns: ColumnDef<Client>[] = [
  { accessorKey: "name", header: "Nombre", enableSorting: true },
  { accessorKey: "ci", header: "Cédula", enableSorting: true },
  {
    accessorKey: "sex",
    header: "Género",
    enableSorting: true,
    cell: ({ row }) => (row.original.sex === "M" ? "Masculino" : "Femenino"),
  },
  {
    accessorKey: "birth_date",
    header: "Fecha de nacimiento",
    enableSorting: true,
    cell: ({ row }) =>
      row.original.birth_date.toLocaleString("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
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
          render={
            <Link
              to="/dashboard/client/$clientId"
              params={{ clientId: row.original.id }}
            />
          }
        >
          <ExternalLink />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          render={
            <Link
              to="/dashboard/credit/$clientId"
              params={{ clientId: row.original.id }}
            />
          }
          title="Calcular Crédito"
        >
          <Calculator />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => {
            useDialog.getState().open({
              title: `Cliente: ${row.original.name}`,
              component: ViewClient,
              props: { client: row.original },
            });
          }}
        >
          <Eye />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => alert("Editar client — no implementado")}
        >
          <Pencil />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => alert("Eliminar cliente — no implementado")}
        >
          <Trash2 />
        </Button>
      </div>
    ),
  },
];

export const Route = createFileRoute("/_protected/dashboard/client/")({
  beforeLoad: () => {
    const permission = usePermission.getState().permission;
    console.log("[Route] beforeLoad — permission:", permission);
    if (!permission || !ALLOWED_ROLES.includes(permission)) {
      throw redirect({ to: "/unauthorized" });
    }
  },
  validateSearch: ClientFilterSchema,
  component: ClientPage,
});

function ClientPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { data, isFetching } = useClientMineListQuery(search);
  console.log("[ClientPage] data:", data);

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
      from: "/dashboard/client/",
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
      from: "/dashboard/client/",
      search: {
        ...search,
        page: next.pageIndex + 1,
        per_page: next.pageSize,
      },
      replace: true,
    });
  };

  const currentRole = search.search ?? "all";

  const setCi = (searchData: string) => {
    navigate({
      from: "/dashboard/client/",
      search: {
        ...search,
        search: searchData === "all" ? undefined : searchData,
        page: 1,
      },
      replace: true,
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Buscar por nombre o cédula..."
          value={search.search ?? ""}
          onChange={(e) => {
            navigate({
              from: "/dashboard/client/",
              search: {
                ...search,
                search: e.target.value || undefined,
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
              title: "Crear Cliente",
              component: FormClient,
            });
          }}
        >
          Crear Cliente
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {ROLES.map((role) => (
          <Button
            key={role.value}
            variant={currentRole === role.value ? "default" : "outline"}
            className={
              currentRole === role.value ? role.colorSelected : role.color
            }
            size="sm"
            onClick={() => setCi(role.value)}
          >
            {role.label}
          </Button>
        ))}
      </div>

      <DataTable<Client>
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
