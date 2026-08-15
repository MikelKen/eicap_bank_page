import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Button$1 } from "./button-DORldgde.mjs";
import { UserSchema, parseResponse, useAuthStore, useLoader, usePermission } from "./router-LQQOMst4.mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { useMutation } from "../_libs/tanstack__react-query.mjs";
import { toast } from "../_libs/sonner.mjs";
import { Eye, EyeOff } from "../_libs/lucide-react.mjs";
import { Input$1 } from "./input-D-ih8VQd.mjs";
import { Card, CardContent } from "./card-DxU141PH.mjs";
import { ENDPOINTS, api } from "./endpoints-DlQq3h-Y.mjs";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field-BnhY_mcb.mjs";
import { getApiError } from "./get-api-error-B0LFU43N.mjs";
import { useForm } from "../_libs/@tanstack/react-form+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BuzmDrps.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthService = class {
	async login(login) {
		return parseResponse(api.post(ENDPOINTS.AUTH.LOGIN, login), UserSchema);
	}
};
var authService = new AuthService();
var useAuthLoginMutation = () => {
	const setUser = useAuthStore((state) => state.setUser);
	const setToken = useAuthStore((state) => state.setToken);
	const setPermission = usePermission((state) => state.setPermission);
	return useMutation({
		mutationFn: (login) => {
			return authService.login(login);
		},
		onMutate: () => {
			useLoader.getState().show("Iniciando sesión...");
		},
		onSuccess: (response) => {
			setUser(response.data);
			if (response.data.token) setToken(response.data.token);
			setPermission(response.data.role);
			toast.success("Inicio de sesión exitoso");
			useLoader.getState().hide();
		},
		onError: (error) => {
			toast.error(getApiError(error, "Credenciales inválidas"));
		},
		onSettled: () => {
			useLoader.getState().hide();
		}
	});
};
function RouteComponent() {
	const login = useAuthLoginMutation();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		console.log("[LoginPage] useEffect — isSuccess changed:", login.isSuccess);
		if (login.isSuccess) {
			console.log("[LoginPage] navigating to /dashboard");
			navigate({ to: "/dashboard" });
		}
	}, [login.isSuccess, navigate]);
	(0, import_react.useEffect)(() => {
		if (login.isError) console.log("[LoginPage] error effect — login.error:", login.error);
	}, [login.isError, login.error]);
	const form = useForm({
		defaultValues: {
			identifier: "",
			password: ""
		},
		onSubmit: ({ value }) => {
			const payload = {
				email: value.identifier,
				password: value.password
			};
			console.log("[LoginPage] onSubmit — payload:", JSON.stringify(payload, null, 2));
			login.mutate(payload);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-sm md:max-w-4xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "grid p-0 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						},
						className: "p-6 md:p-10 flex flex-col justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
							className: "gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center gap-2 text-center mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-2xl font-bold",
										children: "Welcome"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-balance text-muted-foreground",
										children: "Login to your account"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
									name: "identifier",
									validators: { onChange: ({ value }) => !value ? "Identifier is required" : void 0 },
									children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "identifier",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										id: "identifier",
										type: "text",
										placeholder: "m@example.com",
										required: true,
										value: field.state.value,
										onBlur: field.handleBlur,
										onChange: (e) => field.handleChange(e.target.value)
									})] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
									name: "password",
									validators: { onChange: ({ value }) => !value ? "Password is required" : void 0 },
									children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "password",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "password",
											type: showPassword ? "text" : "password",
											required: true,
											className: "pr-10",
											value: field.state.value,
											onBlur: field.handleBlur,
											onChange: (e) => field.handleChange(e.target.value)
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
									})] })
								}),
								login.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-destructive text-center",
									children: "Invalid credentials"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
									selector: (state) => [state.canSubmit, state.isSubmitting],
									children: ([canSubmit, isSubmitting]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										type: "submit",
										className: "w-full",
										disabled: !canSubmit || login.isPending,
										children: isSubmitting || login.isPending ? "Logging in..." : "Login"
									}) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
									className: "text-center",
									children: "ESCUELA DE INNOVACIÓN, CAPACITACIÓN Y ASESORAMIENTO PROFESIONAL"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative hidden md:flex items-center justify-center bg-gradient-to-br from-slate-500/20 to-slate-900/40 backdrop-blur-md p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/image.png",
							alt: "Eicap",
							className: "w-full h-full object-contain drop-shadow-2xl"
						})
					})]
				})
			})
		})
	});
}
//#endregion
export { RouteComponent as component };
