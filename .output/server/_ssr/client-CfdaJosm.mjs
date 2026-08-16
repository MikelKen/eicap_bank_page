import { __toESM } from "../_runtime.mjs";
import { PopoverPopup, PopoverPortal, PopoverPositioner, PopoverRoot, PopoverTrigger as PopoverTrigger$1, require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { cva } from "../_libs/class-variance-authority+clsx.mjs";
import { Button$1, buttonVariants, cn } from "./button-DORldgde.mjs";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Route$5, useDialog, useLoader } from "./router-DYX03kjF.mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { useMutation, useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { toast } from "../_libs/sonner.mjs";
import { Calculator, Calendar as Calendar$1, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Eye, Pencil, Trash2 } from "../_libs/lucide-react.mjs";
import { QUERY_KEYS } from "./query-keys-C2BKfhUN.mjs";
import { clientService, useClientMineListQuery } from "./useQuery-DwFiERs1.mjs";
import { Input$1 } from "./input-D-ih8VQd.mjs";
import { Select$1, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./table-ceAvqM03.mjs";
import { Label$1 } from "./label-VZjntShW.mjs";
import { Field, FieldGroup, FieldLabel } from "./field-BnhY_mcb.mjs";
import { DataTable } from "./data-table-CAVOHc46.mjs";
import { getApiError } from "./get-api-error-B0LFU43N.mjs";
import "./textarea-xe32PdQR.mjs";
import { ConfirmDialog } from "./confirm-dialog-bSLAfSUX.mjs";
import { DayPicker, getDefaultClassNames } from "../_libs/react-day-picker.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-CfdaJosm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SEX_LABELS = {
	M: "Masculino",
	F: "Femenino"
};
function ViewClient({ dialogId, client }) {
	const close = useDialog((s) => s.close);
	if (!client) {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Cédula"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.ci ?? "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Género"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.sex ? SEX_LABELS[client.sex] ?? client.sex : "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Fecha de nacimiento"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.birth_date ? client.birth_date.toLocaleString("es-AR", {
				day: "numeric",
				month: "long",
				year: "numeric"
			}) : "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Creado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.created_at.toLocaleString("es-AR") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Actualizado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.updated_at.toLocaleString("es-AR") })
		]
	});
}
var useClientCreateMutation = (dialogId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => clientService.create(data),
		onMutate: () => {
			useLoader.getState().show("Creando cliente...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.LISTS });
			toast.success("Cliente creado exitosamente");
			useLoader.getState().hide();
			if (dialogId) useDialog.getState().close(dialogId);
		},
		onError: (error) => {
			toast.error(getApiError(error, "Error al crear cliente"));
		},
		onSettled: () => {
			useLoader.getState().hide();
		}
	});
};
var useClientUpdateMutation = (dialogId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => clientService.update(id, data),
		onMutate: () => {
			useLoader.getState().show("Actualizando cliente...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.LISTS });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.DETAILS });
			toast.success("Cliente actualizado exitosamente");
			useLoader.getState().hide();
			if (dialogId) useDialog.getState().close(dialogId);
		},
		onError: (error) => {
			toast.error(getApiError(error, "Error al actualizar cliente"));
		},
		onSettled: () => {
			useLoader.getState().hide();
		}
	});
};
var useClientDeleteMutation = (dialogId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => clientService.delete(id),
		onMutate: () => {
			useLoader.getState().show("Eliminando cliente...");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.LISTS });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.DETAILS });
			toast.success("Cliente eliminado exitosamente");
			useLoader.getState().hide();
			if (dialogId) useDialog.getState().close(dialogId);
		},
		onError: (error) => {
			toast.error(getApiError(error, "Error al eliminar cliente"));
		},
		onSettled: () => {
			useLoader.getState().hide();
		}
	});
};
function DeleteClientDialog({ dialogId, close, client }) {
	const mutation = useClientDeleteMutation(dialogId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		dialogId,
		close,
		title: "Eliminar Cliente",
		description: `¿Estás seguro de que deseas eliminar a "${client.name}"? Esta acción no se puede deshacer.`,
		confirmLabel: "Eliminar",
		isLoading: mutation.isPending,
		onConfirm: () => mutation.mutate(client.id)
	});
}
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", locale, formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		locale,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("relative rounded-(--cell-radius)", defaultClassNames.dropdown_root),
			dropdown: cn("absolute inset-0 bg-popover opacity-0", defaultClassNames.dropdown),
			caption_label: cn("font-medium select-none", captionLayout === "label" ? "text-sm" : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground", defaultClassNames.caption_label),
			month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-[0.8rem] text-muted-foreground select-none", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)", props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)" : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)", defaultClassNames.day),
			range_start: cn("relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted", defaultClassNames.range_end),
			today: cn("rounded-(--cell-radius) bg-muted text-foreground data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className),
					...props
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: ({ ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDayButton, {
				locale,
				...props
			}),
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, locale, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(locale?.code),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5", className),
		...props
	});
}
var inputGroupAddonVariants = cva("flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
		"inline-end": "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
		"block-start": "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
		"block-end": "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
var inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
		"data-slot": "input-group-control",
		className: cn("flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent", className),
		...props
	});
}
function Popover$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverRoot, {
		"data-slot": "popover",
		...props
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger$1, {
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPositioner, {
		align,
		alignOffset,
		side,
		sideOffset,
		className: "isolate z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPopup, {
			"data-slot": "popover-content",
			className: cn("z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props
		})
	}) });
}
function formatDisplayDate(date) {
	if (!date) return "";
	return date.toLocaleDateString("es-ES", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
}
function toISODate(date) {
	if (!date) return "";
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function isValidDate(date) {
	return !!date && !isNaN(date.getTime());
}
function DatePicker({ id = "date-picker", label, value, defaultToToday = true, onChange, placeholder = "Selecciona una fecha", className }) {
	const [open, setOpen] = import_react.useState(false);
	const [internalDate, setInternalDate] = import_react.useState(value ?? (defaultToToday ? /* @__PURE__ */ new Date() : void 0));
	const date = value !== void 0 ? value : internalDate;
	const [month, setMonth] = import_react.useState(date);
	const [textValue, setTextValue] = import_react.useState(formatDisplayDate(date));
	import_react.useEffect(() => {
		setTextValue(formatDisplayDate(date));
		setMonth(date);
	}, [date?.getTime()]);
	const updateDate = (newDate) => {
		if (value === void 0) setInternalDate(newDate);
		onChange?.(newDate);
	};
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
			id,
			value: textValue,
			placeholder,
			onChange: (e) => {
				const parsed = new Date(e.target.value);
				setTextValue(e.target.value);
				if (isValidDate(parsed)) updateDate(parsed);
			},
			onKeyDown: (e) => {
				if (e.key === "ArrowDown") {
					e.preventDefault();
					setOpen(true);
				}
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
			align: "inline-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover$1, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroupButton, {
					variant: "ghost",
					size: "icon-xs",
					"aria-label": "Seleccionar fecha",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Seleccionar fecha"
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
					className: "w-auto overflow-hidden p-0",
					align: "end",
					alignOffset: -8,
					sideOffset: 10,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
						mode: "single",
						selected: date,
						month,
						onMonthChange: setMonth,
						onSelect: (newDate) => {
							updateDate(newDate);
							setOpen(false);
						}
					})
				})]
			})
		})]
	});
	if (!label) return content;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
		htmlFor: id,
		children: label
	}), content] });
}
var SEX_OPTIONS = [{
	label: "Masculino",
	value: "M"
}, {
	label: "Femenino",
	value: "F"
}];
function toDate(plainDate) {
	if (!plainDate) return void 0;
	return new Date(plainDate.year, plainDate.month - 1, plainDate.day);
}
function FormClient({ dialogId, close, client }) {
	const createMutation = useClientCreateMutation(dialogId);
	const updateMutation = useClientUpdateMutation(dialogId);
	const isEdit = !!client;
	const mutation = isEdit ? updateMutation : createMutation;
	const [sex, setSex] = (0, import_react.useState)(client?.sex === "F" ? "F" : "M");
	const [birthDate, setBirthDate] = (0, import_react.useState)(client ? toDate(client.birth_date) ?? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
		className: "sm:max-w-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				const form = e.currentTarget;
				const formData = new FormData(form);
				const data = {
					name: String(formData.get("name") ?? "").trim(),
					ci: String(formData.get("ci") ?? "").trim(),
					sex,
					birth_date: toISODate(birthDate)
				};
				if (isEdit && client) updateMutation.mutate({
					id: client.id,
					data
				});
				else createMutation.mutate(data);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: isEdit ? "Editar Cliente" : "Crear Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: isEdit ? "Modifica los datos del cliente." : "Completa los datos para crear un nuevo cliente." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "name-1",
						children: "Nombre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "name-1",
						name: "name",
						placeholder: "Pedro Duarte",
						defaultValue: client?.name ?? ""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "ci-1",
						children: "Cédula"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "ci-1",
						name: "ci",
						placeholder: "12345678",
						defaultValue: client?.ci ?? ""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "sex-1",
						children: "Género"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
						value: sex,
						onValueChange: (value) => setSex(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "sex-1",
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecciona un género" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SEX_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: option.value,
							children: option.label
						}, option.value)) })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
						id: "birth_date-1",
						label: "Fecha de nacimiento",
						value: birthDate,
						onChange: setBirthDate
					})
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
var ROLES = [{
	value: "all",
	label: "Todos",
	color: "",
	colorSelected: ""
}];
var columns = [
	{
		accessorKey: "name",
		header: "Nombre",
		enableSorting: true
	},
	{
		accessorKey: "ci",
		header: "Cédula",
		enableSorting: true
	},
	{
		accessorKey: "sex",
		header: "Género",
		enableSorting: true,
		cell: ({ row }) => row.original.sex === "M" ? "Masculino" : "Femenino"
	},
	{
		accessorKey: "birth_date",
		header: "Fecha de nacimiento",
		enableSorting: true,
		cell: ({ row }) => row.original.birth_date.toLocaleString("es-AR", {
			day: "2-digit",
			month: "long",
			year: "numeric"
		})
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
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard/client/$clientId",
						params: { clientId: row.original.id }
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon-xs",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard/credit/$clientId",
						params: { clientId: row.original.id }
					}),
					title: "Calcular Crédito",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon-xs",
					onClick: () => {
						useDialog.getState().open({
							title: `Cliente: ${row.original.name}`,
							component: ViewClient,
							props: { client: row.original }
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon-xs",
					onClick: () => {
						useDialog.getState().open({
							title: `Editar Cliente: ${row.original.name}`,
							component: FormClient,
							props: { client: row.original }
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon-xs",
					onClick: () => {
						useDialog.getState().open({
							title: `Eliminar Cliente: ${row.original.name}`,
							component: DeleteClientDialog,
							props: { client: row.original }
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
				})
			]
		})
	}
];
function ClientPage() {
	const search = Route$5.useSearch();
	const navigate = useNavigate();
	const { data, isFetching } = useClientMineListQuery(search);
	console.log("[ClientPage] data:", data);
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
			from: "/dashboard/client/",
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
			from: "/dashboard/client/",
			search: {
				...search,
				page: next.pageIndex + 1,
				per_page: next.pageSize
			},
			replace: true
		});
	};
	const currentRole = search.search ?? "all";
	const setCi = (searchData) => {
		navigate({
			from: "/dashboard/client/",
			search: {
				...search,
				search: searchData === "all" ? void 0 : searchData,
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
					placeholder: "Buscar por nombre o cédula...",
					value: search.search ?? "",
					onChange: (e) => {
						navigate({
							from: "/dashboard/client/",
							search: {
								...search,
								search: e.target.value || void 0,
								page: 1
							},
							replace: true
						});
					},
					className: "max-w-xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					onClick: () => {
						useDialog.getState().open({
							title: "Crear Cliente",
							component: FormClient
						});
					},
					children: "Crear Cliente"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: ROLES.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: currentRole === role.value ? "default" : "outline",
					className: currentRole === role.value ? role.colorSelected : role.color,
					size: "sm",
					onClick: () => setCi(role.value),
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
export { ClientPage as component };
