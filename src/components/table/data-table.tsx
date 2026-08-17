import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useMemo } from "react";

import { DataTablePagination } from "#/components/table/data-table-pagination.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/table/table.tsx";
import { Skeleton } from "#/components/ui/skeleton";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  enableRowNumbers?: boolean;
  isLoading?: boolean;

  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;

  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  pageCount: number;
}

export function DataTable<TData>({
  columns: rawColumns,
  data,
  enableRowNumbers = false,
  isLoading = false,

  sorting,
  onSortingChange,

  pagination,
  onPaginationChange,
  pageCount,
}: DataTableProps<TData>) {
  const columns = useMemo(() => {
    if (!enableRowNumbers) return rawColumns;

    return [
      {
        id: "_rowNumber",
        header: "#",
        enableSorting: false,
        size: 50,
        cell: ({
          row,
          table,
        }: {
          row: { index: number };
          table: { getState: () => { pagination: PaginationState } };
        }) => {
          const { pageSize, pageIndex } = table.getState().pagination;
          return pageSize * pageIndex + row.index + 1;
        },
      } as ColumnDef<TData>,
      ...rawColumns,
    ];
  }, [rawColumns, enableRowNumbers]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange,
    state: {
      sorting,
      pagination,
    },
    manualPagination: true,
    onPaginationChange,
    pageCount,
  });

  const totalMinWidth = useMemo(() => {
    return columns.reduce((sum, col) => sum + (col.size ?? 150), 0);
  }, [columns]);

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <Table
          className="whitespace-nowrap"
          style={{ minWidth: totalMinWidth }}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      ...(header.getSize() !== 150
                        ? { width: header.getSize() }
                        : {}),
                    }}
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <span className="text-muted-foreground">
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="size-3.5" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="size-3.5" />
                            ) : (
                              <ArrowUpDown className="size-3.5 opacity-50" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: Math.min(pagination.pageSize, 10) }).map(
                (_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton rows
                  <TableRow key={`skeleton-${i}`}>
                    {columns.map((col, j) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton cells
                      <TableCell key={`${col.id ?? "col"}-${j}`}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ),
              )
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
