import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Button$1 } from "./button-DORldgde.mjs";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Route$1, useDialog, useLoader } from "./router-DYX03kjF.mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { useMutation, useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { toast } from "../_libs/sonner.mjs";
import { Eye, EyeOff, Pencil, Trash2 } from "../_libs/lucide-react.mjs";
import { QUERY_KEYS } from "./query-keys-C2BKfhUN.mjs";
import { Input$1 } from "./input-D-ih8VQd.mjs";
import { Select$1, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./table-ceAvqM03.mjs";
import { Label$1 } from "./label-VZjntShW.mjs";
import { Field, FieldGroup } from "./field-BnhY_mcb.mjs";
import { DataTable } from "./data-table-CAVOHc46.mjs";
import { getApiError } from "./get-api-error-B0LFU43N.mjs";
import { ConfirmDialog } from "./confirm-dialog-bSLAfSUX.mjs";
import { useUserListQuery, userService } from "./useQuery.user-DTgrFzwu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-DnkONvxJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useUserCreateMutation = (dialogId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => userService.create(data),
		onMutate: () => {
			useLoader.getState().show("Creando usuario...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LISTS });
			toast.success("Usuario creado exitosamente");
			useLoader.getState().hide();
			if (dialogId) useDialog.getState().close(dialogId);
		},
		onError: (error) => {
			toast.error(getApiError(error, "Error al crear usuario"));
		},
		onSettled: () => {
			useLoader.getState().hide();
		}
	});
};
var useUserUpdateMutation = (dialogId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => userService.update(id, data),
		onMutate: () => {
			useLoader.getState().show("Actualizando usuario...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LISTS });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.ME });
			toast.success("Usuario actualizado exitosamente");
			useLoader.getState().hide();
			if (dialogId) useDialog.getState().close(dialogId);
		},
		onError: (error) => {
			toast.error(getApiError(error, "Error al actualizar usuario"));
		},
		onSettled: () => {
			useLoader.getState().hide();
		}
	});
};
var useUserDeleteMutation = (dialogId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => userService.delete(id),
		onMutate: () => {
			useLoader.getState().show("Eliminando usuario...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LISTS });
			toast.success("Usuario eliminado exitosamente");
			useLoader.getState().hide();
			if (dialogId) useDialog.getState().close(dialogId);
		},
		onError: (error) => {
			toast.error(getApiError(error, "Error al eliminar usuario"));
		},
		onSettled: () => {
			useLoader.getState().hide();
		}
	});
};
var ROLE_OPTIONS = [{
	label: "Admin",
	value: "admin"
}, {
	label: "Estudiante",
	value: "student"
}];
function FormUser({ dialogId, close, user }) {
	const createMutation = useUserCreateMutation(dialogId);
	const updateMutation = useUserUpdateMutation(dialogId);
	const isEdit = !!user;
	const mutation = isEdit ? updateMutation : createMutation;
	const [role, setRole] = (0, import_react.useState)(user?.role ?? "student");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
		className: "sm:max-w-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				const form = e.currentTarget;
				const formData = new FormData(form);
				const name = String(formData.get("name") ?? "").trim();
				const email = String(formData.get("email") ?? "").trim();
				const password = String(formData.get("password") ?? "").trim();
				if (isEdit && user) updateMutation.mutate({
					id: user.id,
					data: {
						name,
						email: email || void 0,
						password: password || void 0,
						role
					}
				});
				else createMutation.mutate({
					name,
					email,
					password,
					role
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: isEdit ? "Editar Usuario" : "Crear Usuario" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: isEdit ? "Modifica los datos del usuario." : "Completa los datos para crear un nuevo usuario." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "name-1",
						children: "Nombre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "name-1",
						name: "name",
						placeholder: "Pedro Duarte",
						defaultValue: user?.name ?? ""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "email-1",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "email-1",
						name: "email",
						type: "email",
						placeholder: "m@example.com",
						defaultValue: user?.email ?? ""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "password-1",
						children: isEdit ? "Nueva contraseña (opcional)" : "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							id: "password-1",
							name: "password",
							type: showPassword ? "text" : "password",
							placeholder: isEdit ? "Dejar en blanco para no cambiarla" : "••••••••",
							className: "pr-10"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setShowPassword((prev) => !prev),
							className: "absolute right-0 top-0 h-full px-3 flex items-center text-muted-foreground hover:text-foreground",
							tabIndex: -1,
							children: [showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
							})]
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "role-1",
						children: "Rol"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
						value: role,
						onValueChange: (value) => setRole(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "role-1",
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecciona un rol" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ROLE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: option.value,
							children: option.label
						}, option.value)) })]
					})] })
				] }),
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
						children: mutation.isPending ? "Guardando..." : "Guardar"
					})]
				})
			]
		})
	});
}
function DeleteUserDialog({ dialogId, close, user }) {
	const mutation = useUserDeleteMutation(dialogId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		dialogId,
		close,
		title: "Eliminar Usuario",
		description: `¿Estás seguro de que deseas eliminar a "${user.name}"? Esta acción no se puede deshacer.`,
		confirmLabel: "Eliminar",
		isLoading: mutation.isPending,
		onConfirm: () => mutation.mutate(user.id)
	});
}
function ViewUser({ dialogId, user }) {
	const close = useDialog((s) => s.close);
	if (!user) {
		close(dialogId);
		return null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-2 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Nombre"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: user.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: user.email ?? "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Rol"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: user.role }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Creado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: user.created_at.toLocaleString("es-AR") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Actualizado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: user.updated_at.toLocaleString("es-AR") })
		]
	});
}
var ROLES = [
	{
		value: "all",
		label: "Todos",
		color: "",
		colorSelected: ""
	},
	{
		value: "admin",
		label: "Admin",
		color: "border-sky-500 text-sky-600",
		colorSelected: "bg-sky-600 hover:bg-sky-700 text-white"
	},
	{
		value: "student",
		label: "Estudiante",
		color: "border-violet-500 text-violet-600",
		colorSelected: "bg-violet-600 hover:bg-violet-700 text-white"
	}
];
var columns = [
	{
		accessorKey: "name",
		header: "Nombre",
		enableSorting: true
	},
	{
		accessorKey: "email",
		header: "Email",
		enableSorting: true
	},
	{
		accessorKey: "role",
		header: "Rol",
		enableSorting: true
	},
	{
		accessorKey: "created_at",
		header: "Creado",
		enableSorting: true,
		cell: ({ row }) => row.original.created_at.toLocaleString("es-AR")
	},
	{
		id: "acciones",
		header: "Acciones",
		cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon-xs",
					onClick: () => {
						useDialog.getState().open({
							title: `Usuario: ${row.original.name}`,
							component: ViewUser,
							props: { user: row.original }
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon-xs",
					onClick: () => {
						useDialog.getState().open({
							title: `Editar Usuario: ${row.original.name}`,
							component: FormUser,
							props: { user: row.original }
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon-xs",
					onClick: () => {
						useDialog.getState().open({
							title: `Eliminar Usuario: ${row.original.name}`,
							component: DeleteUserDialog,
							props: { user: row.original }
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
				})
			]
		})
	}
];
function UserPage() {
	const search = Route$1.useSearch();
	const navigate = useNavigate();
	const { data, isFetching } = useUserListQuery(search);
	const paginated = data?.data;
	const tableData = paginated?.items ?? [];
	const pageCount = paginated?.total_pages ?? -1;
	const sortingState = search.sort ? [{
		id: search.sort,
		desc: search.order === "desc"
	}] : [];
	const handleSortingChange = (updater) => {
		const sort = (typeof updater === "function" ? updater(sortingState) : updater)[0];
		navigate({
			from: "/dashboard/user/",
			search: {
				...search,
				sort: sort?.id ?? "created_at",
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
			from: "/dashboard/user/",
			search: {
				...search,
				page: next.pageIndex + 1,
				per_page: next.pageSize
			},
			replace: true
		});
	};
	const currentRole = search.roles ?? "all";
	const setRole = (role) => {
		navigate({
			from: "/dashboard/user/",
			search: {
				...search,
				roles: role === "all" ? void 0 : role,
				page: 1
			},
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					placeholder: "Buscar por nombre...",
					value: search.name ?? "",
					onChange: (e) => {
						navigate({
							from: "/dashboard/user/",
							search: {
								...search,
								name: e.target.value || void 0,
								page: 1
							},
							replace: true
						});
					},
					className: "max-w-xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					onClick: () => {
						useDialog.getState().open({
							title: "Crear Usuario",
							component: FormUser
						});
					},
					children: "Crear Usuario"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: ROLES.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: currentRole === role.value ? "default" : "outline",
					className: currentRole === role.value ? role.colorSelected : role.color,
					size: "sm",
					onClick: () => setRole(role.value),
					children: role.label
				}, role.value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				columns,
				data: tableData,
				isLoading: isFetching,
				sorting: sortingState,
				onSortingChange: handleSortingChange,
				pagination: paginationState,
				onPaginationChange: handlePaginationChange,
				pageCount
			})
		]
	});
}
//#endregion
export { UserPage as component };
