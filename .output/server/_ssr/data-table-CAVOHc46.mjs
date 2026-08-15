import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Button$1 } from "./button-DORldgde.mjs";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "../_libs/lucide-react.mjs";
import { Skeleton } from "./skeleton-CshgZ90g.mjs";
import { Select$1, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table-ceAvqM03.mjs";
import { flexRender, getCoreRowModel, useReactTable } from "../_libs/@tanstack/react-table+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-table-CAVOHc46.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DataTablePagination({ table }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between px-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-muted-foreground flex-1 text-sm",
			children: [table.getFilteredRowModel().rows.length, " row(s)"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-6 lg:gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Rows per page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
						value: String(table.getState().pagination.pageSize),
						onValueChange: (value) => table.setPageSize(Number(value)),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 w-17.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
							side: "top",
							children: [
								10,
								20,
								30,
								40,
								50
							].map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: String(size),
								children: size
							}, size))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-25 items-center justify-center text-sm font-medium",
					children: [
						"Page ",
						table.getState().pagination.pageIndex + 1,
						" of",
						" ",
						table.getPageCount()
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "outline",
							size: "icon-xs",
							onClick: () => table.setPageIndex(0),
							disabled: !table.getCanPreviousPage(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "outline",
							size: "icon-xs",
							onClick: () => table.previousPage(),
							disabled: !table.getCanPreviousPage(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "outline",
							size: "icon-xs",
							onClick: () => table.nextPage(),
							disabled: !table.getCanNextPage(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "outline",
							size: "icon-xs",
							onClick: () => table.setPageIndex(table.getPageCount() - 1),
							disabled: !table.getCanNextPage(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, {})
						})
					]
				})
			]
		})]
	});
}
function DataTable({ columns: rawColumns, data, enableRowNumbers = false, isLoading = false, sorting, onSortingChange, pagination, onPaginationChange, pageCount }) {
	const columns = (0, import_react.useMemo)(() => {
		if (!enableRowNumbers) return rawColumns;
		return [{
			id: "_rowNumber",
			header: "#",
			enableSorting: false,
			size: 50,
			cell: ({ row, table }) => {
				const { pageSize, pageIndex } = table.getState().pagination;
				return pageSize * pageIndex + row.index + 1;
			}
		}, ...rawColumns];
	}, [rawColumns, enableRowNumbers]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualSorting: true,
		onSortingChange,
		state: {
			sorting,
			pagination
		},
		manualPagination: true,
		onPaginationChange,
		pageCount
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-md border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				style: { ...header.getSize() !== 150 ? { width: header.getSize() } : {} },
				className: header.column.getCanSort() ? "cursor-pointer select-none" : "",
				onClick: header.column.getToggleSortingHandler(),
				children: header.isPlaceholder ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [flexRender(header.column.columnDef.header, header.getContext()), header.column.getCanSort() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: header.column.getIsSorted() === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3.5" }) : header.column.getIsSorted() === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "size-3.5 opacity-50" })
					})]
				})
			}, header.id)) }, headerGroup.id)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: isLoading ? Array.from({ length: Math.min(pagination.pageSize, 10) }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: columns.map((col, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }) }, `${col.id ?? "col"}-${j}`)) }, `skeleton-${i}`)) : table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: columns.length,
				className: "h-24 text-center",
				children: "No results."
			}) }) })] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, { table })]
	});
}
//#endregion
export { DataTable };
