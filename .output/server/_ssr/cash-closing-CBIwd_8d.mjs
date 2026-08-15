import { require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { Route$6 } from "./router-LQQOMst4.mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { DataTable } from "./data-table-CAVOHc46.mjs";
import { useCashSessionsQuery } from "./useQuery.cash-session-Dyk99yo7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cash-closing-CBIwd_8d.js
var import_jsx_runtime = require_jsx_runtime();
var BILL_DENOMINATIONS = [
	"200",
	"100",
	"50",
	"20",
	"10"
];
var COIN_DENOMINATIONS = [
	"5",
	"2",
	"1"
];
function formatCurrency(value) {
	const numeric = Number(value);
	if (Number.isNaN(numeric)) return value;
	return numeric.toLocaleString("es-BO", {
		style: "currency",
		currency: "BOB"
	});
}
function quantityByValue(counts, value) {
	if (!counts) return 0;
	const target = Number(value);
	return counts.find((c) => c.type === "closing" && Number(c.denomination_value) === target)?.quantity ?? 0;
}
function denominationColumns(denominations, label) {
	return denominations.map((value) => ({
		accessorKey: `count_${value}`,
		header: `${label} ${Number(value).toLocaleString("es-BO")}`,
		meta: { align: "right" },
		size: 80,
		cell: ({ row }) => quantityByValue(row.original.counts, value)
	}));
}
var CLOSING_COLUMNS = [
	{
		accessorKey: "operation_code",
		header: "Código Op. Cierre",
		cell: ({ row }) => row.original.operation_code ?? "—"
	},
	...denominationColumns(BILL_DENOMINATIONS, ""),
	...denominationColumns(COIN_DENOMINATIONS, ""),
	{
		accessorKey: "expected_amount",
		header: "Importe Transacciones",
		meta: { align: "right" },
		cell: ({ row }) => row.original.expected_amount ? formatCurrency(row.original.expected_amount) : "—"
	},
	{
		accessorKey: "closing_amount",
		header: "Importes Entregado",
		meta: { align: "right" },
		cell: ({ row }) => row.original.closing_amount ? formatCurrency(row.original.closing_amount) : "—"
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
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: difference < 0 ? "text-red-600" : difference > 0 ? "text-green-600" : "",
				children: formatCurrency(String(difference))
			});
		}
	},
	{
		accessorKey: "closing_date",
		header: "Fecha",
		enableSorting: true,
		cell: ({ row }) => row.original.closing_date ? row.original.closing_date.toLocaleString("es-AR", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		}) : "—"
	}
];
function CashClosingReportPage() {
	const search = Route$6.useSearch();
	const navigate = useNavigate();
	const filter = {
		...search,
		state: "closed"
	};
	const { data, isFetching } = useCashSessionsQuery(filter);
	const paginated = data?.data;
	const sessions = paginated?.items ?? [];
	const pageCount = paginated?.total_pages ?? -1;
	const sortingState = [{
		id: search.sort === "created_at" ? "closing_date" : search.sort,
		desc: search.order === "desc"
	}];
	const handleSortingChange = (updater) => {
		const sort = (typeof updater === "function" ? updater(sortingState) : updater)[0];
		navigate({
			from: "/dashboard/cash-closing/",
			search: {
				...search,
				sort: sort?.id ?? "closing_date",
				order: sort?.desc ? "desc" : "asc"
			},
			replace: true
		});
	};
	const paginationState = {
		pageIndex: search.page - 1,
		pageSize: search.per_page
	};
	const handlePaginationChange = (updater) => {
		const next = typeof updater === "function" ? updater(paginationState) : updater;
		navigate({
			from: "/dashboard/cash-closing/",
			search: {
				...search,
				page: next.pageIndex + 1,
				per_page: next.pageSize
			},
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-base font-semibold",
			children: "Reporte de Cierre"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Listado de cierres de caja registrados"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			columns: CLOSING_COLUMNS,
			data: sessions,
			isLoading: isFetching,
			sorting: sortingState,
			onSortingChange: handleSortingChange,
			pagination: paginationState,
			onPaginationChange: handlePaginationChange,
			pageCount
		})]
	});
}
//#endregion
export { CashClosingReportPage as component };
