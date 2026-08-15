import { __toESM } from "./_runtime.mjs";
import { require_jsx_runtime, require_react } from "./_libs/@base-ui/react+[...].mjs";
import { Button$1, cn } from "./_ssr/button-DORldgde.mjs";
import { Route$4, defaultPagination } from "./_ssr/router-LQQOMst4.mjs";
import { Link, useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { ArrowLeft } from "./_libs/lucide-react.mjs";
import { Input$1 } from "./_ssr/input-D-ih8VQd.mjs";
import { Skeleton } from "./_ssr/skeleton-CshgZ90g.mjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./_ssr/card-DxU141PH.mjs";
import { DataTable } from "./_ssr/data-table-CAVOHc46.mjs";
import { useAccountsByClientQuery, useBankOperationsByClientQuery } from "./_ssr/useQuery.account-CMSGsAvW.mjs";
import { useClientDetailQuery } from "./_ssr/useQuery-CItDbTTk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_clientId-Cd6tMKxK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPE_LABELS = {
	ING: "Ingreso",
	EGR: "Egreso",
	APC: "Apertura de Cuenta",
	APCA: "Apertura de Caja",
	CICA: "Cierre de Caja"
};
function formatCurrency(value) {
	const numeric = Number(value);
	if (Number.isNaN(numeric)) return value;
	return numeric.toLocaleString("es-BO", {
		style: "currency",
		currency: "BOB"
	});
}
var OPERATION_COLUMNS = [
	{
		accessorKey: "code",
		header: "Código"
	},
	{
		accessorKey: "date",
		header: "Fecha",
		enableSorting: true,
		cell: ({ row }) => row.original.date.toLocaleString("es-AR", {
			day: "2-digit",
			month: "short",
			year: "numeric"
		})
	},
	{
		accessorKey: "account_number",
		header: "Número de Cuenta",
		cell: ({ row }) => row.original.account_number ?? "—"
	},
	{
		accessorKey: "type_operation_code",
		header: "Tipo de Operación",
		cell: ({ row }) => TYPE_LABELS[row.original.type_operation_code] ?? row.original.type_operation_code
	},
	{
		accessorKey: "previous_balance",
		header: "Saldo Anterior",
		meta: { align: "right" },
		cell: ({ row }) => formatCurrency(row.original.previous_balance)
	},
	{
		accessorKey: "import",
		header: "Monto",
		meta: { align: "right" },
		cell: ({ row }) => formatCurrency(row.original.import)
	},
	{
		accessorKey: "end_balance",
		header: "Saldo Final",
		meta: { align: "right" },
		cell: ({ row }) => formatCurrency(row.original.end_balance)
	}
];
function InfoItem({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: value || "—"
		})]
	});
}
function ClientDetailPage() {
	const { clientId } = Route$4.useParams();
	const search = Route$4.useSearch();
	const navigate = useNavigate();
	const { data: client } = useClientDetailQuery(clientId);
	const [accountSearchInput, setAccountSearchInput] = (0, import_react.useState)("");
	const accountSearch = (0, import_react.useDeferredValue)(accountSearchInput);
	const accountsFilter = (0, import_react.useMemo)(() => ({
		...defaultPagination(),
		page: 1,
		per_page: 100,
		search: accountSearch || void 0
	}), [accountSearch]);
	const { data: accountsData, isFetching: accountsLoading } = useAccountsByClientQuery(clientId, accountsFilter);
	const accounts = accountsData?.data.items ?? [];
	const selectedAccountId = search.account_id;
	const selectedAccount = accounts.find((account) => account.id === selectedAccountId) ?? null;
	const operationsFilter = { ...search };
	const { data: operationsData, isFetching: operationsLoading } = useBankOperationsByClientQuery(clientId, operationsFilter);
	const paginated = operationsData?.data;
	const operations = paginated?.items ?? [];
	const pageCount = paginated?.total_pages ?? -1;
	const sortingState = [{
		id: search.sort === "created_at" ? "date" : search.sort,
		desc: search.order === "desc"
	}];
	const handleSortingChange = (updater) => {
		const sort = (typeof updater === "function" ? updater(sortingState) : updater)[0];
		navigate({
			from: "/dashboard/client/$clientId",
			search: {
				...search,
				sort: sort?.id ?? "date",
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
			from: "/dashboard/client/$clientId",
			search: {
				...search,
				page: next.pageIndex + 1,
				per_page: next.pageSize
			},
			replace: true
		});
	};
	const handleSelectAccount = (account) => {
		navigate({
			from: "/dashboard/client/$clientId",
			search: {
				...search,
				account_id: selectedAccountId === account.id ? void 0 : account.id,
				page: 1
			},
			replace: true
		});
	};
	const tableTitle = selectedAccount ? `Operaciones Bancarias - ${selectedAccount.number}` : "Operaciones Bancarias";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "ghost",
				size: "sm",
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/client" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), "Volver a Clientes"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: tableTitle
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid flex-1 grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [selectedAccount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						size: "sm",
						onClick: () => handleSelectAccount(selectedAccount),
						children: "Mostrar todas las operaciones"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					columns: OPERATION_COLUMNS,
					data: operations,
					isLoading: operationsLoading,
					sorting: sortingState,
					onSortingChange: handleSortingChange,
					pagination: paginationState,
					onPaginationChange: handlePaginationChange,
					pageCount
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Información del Cliente" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: client ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							label: "Nombre",
							value: client.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							label: "Cédula",
							value: client.ci
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							label: "Fecha de registro",
							value: client.created_at.toLocaleString("es-AR", {
								day: "2-digit",
								month: "long",
								year: "numeric"
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-2/3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/2" })
					]
				}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Cuentas del Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: accountsLoading ? "Cargando..." : `${accounts.length} cuenta(s)` })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						placeholder: "Buscar cuenta...",
						value: accountSearchInput,
						onChange: (e) => setAccountSearchInput(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex max-h-[400px] flex-col gap-3 overflow-y-auto pr-1",
						children: accountsLoading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }, i)) : accounts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Sin cuentas."
						}) : accounts.map((account) => {
							const isSelected = account.id === selectedAccountId;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("flex items-center justify-between gap-2 rounded-lg border p-2", isSelected && "border-primary bg-muted/50"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 space-y-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: account.number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: account.type_account_name ?? "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold",
											children: formatCurrency(account.balance)
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									variant: isSelected ? "default" : "outline",
									size: "sm",
									onClick: () => handleSelectAccount(account),
									children: isSelected ? "Mostrar todas" : "Ver operaciones"
								})]
							}, account.id);
						})
					})]
				})] })]
			})]
		})]
	});
}
//#endregion
export { ClientDetailPage as component };
