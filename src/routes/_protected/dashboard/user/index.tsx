import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { FormUser } from "#/components/module/user/form.user";
import { DeleteUserDialog } from "#/components/module/user/delete.user";
import { DataTable } from "#/components/table/data-table";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { useUserListQuery } from "#/hooks/user/useQuery.user";
import { type User, UserFilterSchema } from "#/services/user/user.type";
import { useDialog } from "#/stores/dialog.store";
import { usePermission } from "#/stores/permission.store";
import { ViewUser } from "@/components/module/user/view.user";

const ROLES = [
  { value: "all", label: "Todos", color: "", colorSelected: "" },
  {
    value: "admin",
    label: "Admin",
    color: "border-sky-500 text-sky-600",
    colorSelected: "bg-sky-600 hover:bg-sky-700 text-white",
  },
  {
    value: "student",
    label: "Estudiante",
    color: "border-violet-500 text-violet-600",
    colorSelected: "bg-violet-600 hover:bg-violet-700 text-white",
  },
] as const;

const ALLOWED_ROLES = ["admin"];

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Nombre", enableSorting: true },
  { accessorKey: "email", header: "Email", enableSorting: true },
  { accessorKey: "role", header: "Rol", enableSorting: true },
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
              title: `Usuario: ${row.original.name}`,
              component: ViewUser,
              props: { user: row.original },
            });
          }}
        >
          <Eye />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => {
            useDialog.getState().open({
              title: `Editar Usuario: ${row.original.name}`,
              component: FormUser,
              props: { user: row.original },
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
              title: `Eliminar Usuario: ${row.original.name}`,
              component: DeleteUserDialog,
              props: { user: row.original },
            });
          }}
        >
          <Trash2 />
        </Button>
      </div>
    ),
  },
];

export const Route = createFileRoute("/_protected/dashboard/user/")({
  beforeLoad: () => {
    const permission = usePermission.getState().permission;
    console.log("[Route] beforeLoad — permission:", permission);
    if (!permission || !ALLOWED_ROLES.includes(permission)) {
      throw redirect({ to: "/unauthorized" });
    }
  },
  validateSearch: UserFilterSchema,
  component: UserPage,
});

function UserPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { data, isFetching } = useUserListQuery(search);

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
      from: "/dashboard/user/",
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
      from: "/dashboard/user/",
      search: {
        ...search,
        page: next.pageIndex + 1,
        per_page: next.pageSize,
      },
      replace: true,
    });
  };

  const currentRole = search.roles ?? "all";

  const setRole = (role: string) => {
    navigate({
      from: "/dashboard/user/",
      search: {
        ...search,
        roles: role === "all" ? undefined : role,
        page: 1,
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
              from: "/dashboard/user/",
              search: { ...search, name: e.target.value || undefined, page: 1 },
              replace: true,
            });
          }}
          className="max-w-xs"
        />
        <Button
          onClick={() => {
            useDialog.getState().open({
              title: "Crear Usuario",
              component: FormUser,
            });
          }}
        >
          Crear Usuario
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
            onClick={() => setRole(role.value)}
          >
            {role.label}
          </Button>
        ))}
      </div>

      <DataTable<User>
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
