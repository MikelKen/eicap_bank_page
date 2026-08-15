import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Button$1 } from "./button-DORldgde.mjs";
import { datetime, object, string } from "../_libs/zod.mjs";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, PaginatedResponse, PaginationSchema, Route$7, defaultPagination, parseResponse, useDialog, useLoader } from "./router-LQQOMst4.mjs";
import { Temporal } from "../_libs/temporal-polyfill+[...].mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { useMutation, useQuery, useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { toast } from "../_libs/sonner.mjs";
import { Landmark, Plus, X } from "../_libs/lucide-react.mjs";
import { Input$1 } from "./input-D-ih8VQd.mjs";
import { Skeleton } from "./skeleton-CshgZ90g.mjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card-DxU141PH.mjs";
import { Select$1, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./table-ceAvqM03.mjs";
import { DataTable } from "./data-table-CAVOHc46.mjs";
import { QUERY_KEYS } from "./query-keys-DJLdofVW.mjs";
import { ENDPOINTS, api } from "./endpoints-DlQq3h-Y.mjs";
import { bankOperationService, useAccountsByClientQuery, useBankOperationsByActiveSessionQuery } from "./useQuery.account-CMSGsAvW.mjs";
import { useClientMineListQuery } from "./useQuery-CItDbTTk.mjs";
import { Label$1 } from "./label-VZjntShW.mjs";
import { Field, FieldGroup } from "./field-BnhY_mcb.mjs";
import { cashSessionService, useMyOpenCashSessionQuery } from "./useQuery.cash-session-Dyk99yo7.mjs";
import { getApiError } from "./get-api-error-B0LFU43N.mjs";
import { Textarea } from "./textarea-xe32PdQR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-b5Lbp-IV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DenominationSchema = object({
	id: string(),
	type: string(),
	value: string(),
	name: string(),
	created_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	updated_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	deleted_at: datetime({ offset: true }).nullish().transform((v) => v ? Temporal.Instant.from(v) : null)
});
PaginationSchema.extend({ type: string().optional() });
var DenominationListPaginatedSchema = PaginatedResponse(DenominationSchema);
var DenominationService = class {
	async findAll(filter) {
		return await parseResponse(api.get(ENDPOINTS.DENOMINATIONS.BASE, { params: filter }), DenominationListPaginatedSchema);
	}
};
var denominationService = new DenominationService();
var useDenominationListQuery = (filter) => {
	return useQuery({
		queryKey: QUERY_KEYS.DENOMINATIONS.LIST(filter),
		queryFn: () => denominationService.findAll(filter)
	});
};
var useCashSessionOpenMutation = (dialogId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (counts) => cashSessionService.open(counts),
		onMutate: () => {
			useLoader.getState().show("Abriendo caja...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CASH_SESSIONS.MINE_OPEN });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BANK_OPERATIONS.ACTIVE_SESSION.ALL });
			toast.success("Caja abierta exitosamente");
			useLoader.getState().hide();
			if (dialogId) useDialog.getState().close(dialogId);
		},
		onError: (error) => {
			toast.error(getApiError(error, "Error al abrir la caja"));
		},
		onSettled: () => {
			useLoader.getState().hide();
		}
	});
};
var useCashSessionCloseMutation = (dialogId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ sessionId, counts }) => cashSessionService.close(sessionId, counts),
		onMutate: () => {
			useLoader.getState().show("Cerrando caja...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CASH_SESSIONS.MINE_OPEN });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BANK_OPERATIONS.ACTIVE_SESSION.ALL });
			toast.success("Caja cerrada exitosamente");
			useLoader.getState().hide();
			if (dialogId) useDialog.getState().close(dialogId);
		},
		onError: (error) => {
			toast.error(getApiError(error, "Error al cerrar la caja"));
		},
		onSettled: () => {
			useLoader.getState().hide();
		}
	});
};
function formatCurrency$2(value) {
	return value.toLocaleString("es-BO", {
		style: "currency",
		currency: "BOB"
	});
}
function CountCashForm({ dialogId, close, mode, sessionId }) {
	const { data, isFetching } = useDenominationListQuery({
		...defaultPagination(),
		page: 1,
		per_page: 100,
		sort: "value",
		order: "desc"
	});
	const openMutation = useCashSessionOpenMutation(dialogId);
	const closeMutation = useCashSessionCloseMutation(dialogId);
	const [quantities, setQuantities] = (0, import_react.useState)({});
	const [error, setError] = (0, import_react.useState)(null);
	const denominations = data?.data.items ?? [];
	const isPending = mode === "open" ? openMutation.isPending : closeMutation.isPending;
	const total = denominations.reduce((acc, denomination) => {
		const quantity = Math.max(0, Math.floor(Number(quantities[denomination.id]) || 0));
		return acc + (Number(denomination.value) || 0) * quantity;
	}, 0);
	const setQuantity = (id, raw) => {
		setQuantities((prev) => ({
			...prev,
			[id]: raw
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const counts = denominations.map((denomination) => ({
			denomination_id: denomination.id,
			quantity: Math.floor(Number(quantities[denomination.id]) || 0)
		})).filter((count) => count.quantity > 0);
		if (counts.length === 0) {
			setError("Ingresá al menos una denominación con cantidad mayor a cero.");
			return;
		}
		setError(null);
		if (mode === "open") openMutation.mutate(counts);
		else if (sessionId) closeMutation.mutate({
			sessionId,
			counts
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
		className: "sm:max-w-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: mode === "open" ? "Abrir Caja" : "Cerrar Caja" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Ingresá la cantidad de billetes y monedas para cada denominación." })] }),
				isFetching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full" }, i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex max-h-[50vh] flex-col gap-2 overflow-y-auto pr-1",
					children: denominations.map((denomination) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 rounded-lg border p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: denomination.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: formatCurrency$2(Number(denomination.value))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Cantidad"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "number",
								min: 0,
								step: 1,
								value: quantities[denomination.id] ?? "",
								onChange: (e) => setQuantity(denomination.id, e.target.value),
								placeholder: "0",
								className: "w-24 text-right"
							})]
						})]
					}, denomination.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between rounded-lg border bg-muted/50 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "Total contado"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-semibold",
						children: formatCurrency$2(total)
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-destructive",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						type: "button",
						onClick: close,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "submit",
						disabled: isPending,
						children: isPending ? mode === "open" ? "Abriendo..." : "Cerrando..." : mode === "open" ? "Abrir Caja" : "Cerrar Caja"
					})]
				})
			]
		})
	});
}
var useBankOperationCreateMutation = (dialogId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (input) => bankOperationService.create(input),
		onMutate: () => {
			useLoader.getState().show("Registrando operación...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BANK_OPERATIONS.ACTIVE_SESSION.ALL });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNTS.ALL });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CASH_SESSIONS.ALL });
			toast.success("Operación registrada exitosamente");
			useLoader.getState().hide();
			if (dialogId) useDialog.getState().close(dialogId);
		},
		onError: (error) => {
			toast.error(getApiError(error, "Error al registrar la operación"));
		},
		onSettled: () => {
			useLoader.getState().hide();
		}
	});
};
var TypeOperationSchema = object({
	id: string(),
	code: string(),
	name: string(),
	created_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	updated_at: datetime({ offset: true }).transform(Temporal.Instant.from),
	deleted_at: datetime({ offset: true }).nullish().transform((v) => v ? Temporal.Instant.from(v) : null)
});
PaginationSchema.extend({
	name: string().optional(),
	code: string().optional()
});
var TypeOperationListPaginatedSchema = PaginatedResponse(TypeOperationSchema);
var TypeOperationService = class {
	async findAll(filter) {
		return await parseResponse(api.get(ENDPOINTS.TYPE_OPERATIONS.BASE, { params: filter }), TypeOperationListPaginatedSchema);
	}
};
var typeOperationService = new TypeOperationService();
var useTypeOperationListQuery = (filter) => {
	return useQuery({
		queryKey: QUERY_KEYS.TYPE_OPERATIONS.LIST(filter),
		queryFn: () => typeOperationService.findAll(filter)
	});
};
var SYSTEM_OPERATION_CODES = /* @__PURE__ */ new Set(["APCA", "CICA"]);
function formatCurrency$1(value) {
	const numeric = Number(value);
	if (Number.isNaN(numeric)) return value;
	return numeric.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS"
	});
}
function FormBankOperation({ dialogId, close, clientId, clientName }) {
	const mutation = useBankOperationCreateMutation(dialogId);
	const { data: typesData, isFetching: typesLoading } = useTypeOperationListQuery({
		...defaultPagination(),
		page: 1,
		per_page: 100
	});
	const { data: accountsData, isFetching: accountsLoading } = useAccountsByClientQuery(clientId, {
		page: 1,
		per_page: 100,
		sort: "created_at",
		order: "desc"
	});
	const types = (typesData?.data.items ?? []).filter((type) => !SYSTEM_OPERATION_CODES.has(type.code));
	const accounts = accountsData?.data.items ?? [];
	const [typeOperationCode, setTypeOperationCode] = (0, import_react.useState)("");
	const [accountId, setAccountId] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [origin, setOrigin] = (0, import_react.useState)("");
	const [reason, setReason] = (0, import_react.useState)("");
	const [destination, setDestination] = (0, import_react.useState)("");
	const [details, setDetails] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const requiresAccount = typeOperationCode === "ING" || typeOperationCode === "EGR" || typeOperationCode === "APC";
	const requiresInfo = typeOperationCode === "ING" || typeOperationCode === "EGR";
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!typeOperationCode) {
			setError("Seleccioná un tipo de operación.");
			return;
		}
		const amountNumber = Number(amount);
		if (!amount || Number.isNaN(amountNumber) || amountNumber <= 0) {
			setError("El monto debe ser un número mayor a cero.");
			return;
		}
		if (requiresAccount && !accountId) {
			setError("Seleccioná una cuenta para esta operación.");
			return;
		}
		if (requiresInfo && (!origin.trim() || !reason.trim() || !destination.trim())) {
			setError("Completá origen, motivo y destino de la operación.");
			return;
		}
		setError(null);
		mutation.mutate({
			type_operation_code: typeOperationCode,
			account_id: accountId || void 0,
			amount: amountNumber,
			info: {
				origin: origin.trim(),
				reason: reason.trim(),
				destination: destination.trim(),
				details: details.trim()
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
		className: "sm:max-w-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nueva Operación Bancaria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: clientName ? `Cliente: ${clientName}.` : "Registrá una operación." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "bo-type",
						children: "Tipo de Operación"
					}), typesLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
						value: typeOperationCode,
						onValueChange: (value) => setTypeOperationCode(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "bo-type",
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecciona un tipo" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: types.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: type.code,
							children: type.name
						}, type.id)) })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "bo-account",
						children: "Cuenta"
					}), accountsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full" }) : accounts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "bo-account",
						disabled: true,
						placeholder: "El cliente no tiene cuentas"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
						value: accountId,
						onValueChange: (value) => setAccountId(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "bo-account",
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecciona una cuenta" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: accounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: account.id,
							children: [
								account.number,
								" · ",
								account.type_account_name ?? "—",
								" (",
								formatCurrency$1(account.balance),
								")"
							]
						}, account.id)) })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "bo-amount",
						children: "Monto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "bo-amount",
						type: "number",
						min: 0,
						step: "0.01",
						value: amount,
						onChange: (e) => setAmount(e.target.value),
						placeholder: "0.00"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "bo-origin",
						children: "Origen"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "bo-origin",
						value: origin,
						onChange: (e) => setOrigin(e.target.value),
						placeholder: "Origen de la operación"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "bo-reason",
						children: "Motivo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "bo-reason",
						value: reason,
						onChange: (e) => setReason(e.target.value),
						placeholder: "Motivo de la operación"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "bo-destination",
						children: "Destino"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "bo-destination",
						value: destination,
						onChange: (e) => setDestination(e.target.value),
						placeholder: "Destino de la operación"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "bo-details",
						children: "Detalles"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "bo-details",
						value: details,
						onChange: (e) => setDetails(e.target.value),
						placeholder: "Detalles adicionales (opcional)"
					})] })
				] }),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-destructive",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						type: "button",
						onClick: close,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "submit",
						disabled: mutation.isPending,
						children: mutation.isPending ? "Registrando..." : "Registrar Operación"
					})]
				})
			]
		})
	});
}
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
		accessorKey: "type_operation_code",
		header: "Tipo",
		size: 150,
		cell: ({ row }) => TYPE_LABELS[row.original.type_operation_code] ?? row.original.type_operation_code
	},
	{
		accessorKey: "account_number",
		header: "Cuenta",
		size: 110,
		cell: ({ row }) => row.original.account_number ?? "—"
	},
	{
		accessorKey: "import",
		header: "Importe",
		meta: { align: "right" },
		cell: ({ row }) => formatCurrency(row.original.import)
	},
	{
		accessorKey: "info",
		header: "Detalles",
		cell: ({ row }) => row.original.info?.details || "—"
	},
	{
		accessorKey: "date",
		header: "Fecha",
		enableSorting: true,
		cell: ({ row }) => row.original.date.toLocaleString("es-AR", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		})
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
function AccountPage() {
	const search = Route$7.useSearch();
	const navigate = useNavigate();
	const { data: sessionData, isFetching: sessionLoading } = useMyOpenCashSessionQuery();
	const openSession = sessionData ?? null;
	const operationsFilter = { ...search };
	const { data: operationsData, isFetching: operationsLoading } = useBankOperationsByActiveSessionQuery(operationsFilter, !!openSession);
	const clientsFilter = (0, import_react.useMemo)(() => ({
		...defaultPagination(),
		page: 1,
		per_page: 50
	}), []);
	const { data: clientsData, isFetching: clientsLoading } = useClientMineListQuery(clientsFilter);
	const clients = clientsData?.data.items ?? [];
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
			from: "/dashboard/account/",
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
			from: "/dashboard/account/",
			search: {
				...search,
				page: next.pageIndex + 1,
				per_page: next.pageSize
			},
			replace: true
		});
	};
	const openCashRegister = () => {
		useDialog.getState().open({
			title: "Abrir Caja",
			component: CountCashForm,
			props: { mode: "open" }
		});
	};
	const closeCashRegister = () => {
		useDialog.getState().open({
			title: "Cerrar Caja",
			component: CountCashForm,
			props: {
				mode: "close",
				sessionId: openSession?.id
			}
		});
	};
	const openOperationDialog = (client) => {
		useDialog.getState().open({
			title: `Nueva Operación — ${client.name}`,
			component: FormBankOperation,
			props: {
				clientId: client.id,
				clientName: client.name
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-between gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: "Caja"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: openSession ? "Sesión de caja activa" : "Abrí tu caja para comenzar a registrar operaciones"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid flex-1 grid-cols-1 gap-2 xl:grid-cols-[1fr_310px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-w-0 flex-col gap-2",
				children: sessionLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-64" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full" })]
				}) : openSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					columns: OPERATION_COLUMNS,
					data: operations,
					isLoading: operationsLoading,
					sorting: sortingState,
					onSortingChange: handleSortingChange,
					pagination: paginationState,
					onPaginationChange: handlePaginationChange,
					pageCount
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Sin sesión de caja activa" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Abrí la caja para comenzar a registrar las operaciones bancarias de tus clientes." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					onClick: openCashRegister,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, {}), "Abrir Caja"]
				}) })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Sesión de Caja" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: sessionLoading ? "Cargando..." : openSession ? "Estado: Abierta" : "No hay sesión activa" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "flex flex-col gap-2",
					children: sessionLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full" }) : openSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							label: "Apertura",
							value: openSession.opening_date.toLocaleString("es-AR", {
								day: "2-digit",
								month: "short",
								year: "numeric",
								hour: "2-digit",
								minute: "2-digit"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							label: "Monto de apertura",
							value: formatCurrency(openSession.opening_amount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "destructive",
							className: "w-full",
							onClick: closeCashRegister,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), "Cerrar Caja"]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						className: "w-full",
						onClick: openCashRegister,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, {}), "Abrir Caja"]
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Clientes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: clientsLoading ? "Cargando..." : `${clients.length} cliente(s)` })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "flex max-h-[480px]  flex-col gap-2 overflow-y-auto",
					children: clientsLoading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 w-full" }, i)) : clients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No tenés clientes registrados."
					}) : clients.map((client) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 rounded-lg border p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: client.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Cédula: ", client.ci ?? "—"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "outline",
							size: "sm",
							disabled: !openSession,
							onClick: () => openOperationDialog(client),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Operación"]
						})]
					}, client.id))
				})] })]
			})]
		})]
	});
}
//#endregion
export { AccountPage as component };
