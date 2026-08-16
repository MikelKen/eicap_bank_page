import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Button$1, cn } from "./button-DORldgde.mjs";
import { Temporal } from "../_libs/temporal-polyfill+[...].mjs";
import { Image, Pencil, Trash2, Upload, X } from "../_libs/lucide-react.mjs";
import { Card, CardContent, CardHeader, CardTitle } from "./card-DxU141PH.mjs";
import { Separator$1 } from "./separator-ej13Y-Of.mjs";
import { Label$1 } from "./label-VZjntShW.mjs";
import { Skeleton } from "./skeleton-CshgZ90g.mjs";
import { Avatar$1, AvatarFallback, AvatarImage } from "./avatar-ClaSGglh.mjs";
import { useMeQuery } from "./useQuery.user-DTgrFzwu.mjs";
import { useDropzone } from "../_libs/react-dropzone.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/me-DDzAUQ3b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_ACCEPT = {
	"image/jpeg": [],
	"image/png": [],
	"image/webp": []
};
var DEFAULT_MAX_SIZE = 5242880;
function formatFileSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
function ImageDropzone({ value, onChange, accept = DEFAULT_ACCEPT, maxSize = DEFAULT_MAX_SIZE, className, placeholder = "Arrastrá una imagen aquí o hacé click para seleccionar" }) {
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!value) {
			setPreview(null);
			return;
		}
		const url = URL.createObjectURL(value);
		setPreview(url);
		return () => URL.revokeObjectURL(url);
	}, [value]);
	const onDrop = (0, import_react.useCallback)((acceptedFiles, rejections) => {
		setError(null);
		if (rejections.length > 0) {
			const err = rejections[0].errors[0];
			if (err.code === "file-too-large") setError(`El archivo supera el tamaño máximo de ${formatFileSize(maxSize)}`);
			else if (err.code === "file-invalid-type") setError("Tipo de archivo no permitido");
			else setError(err.message);
			return;
		}
		if (acceptedFiles.length > 0) onChange(acceptedFiles[0]);
	}, [onChange, maxSize]);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept,
		maxSize,
		multiple: false
	});
	const handleRemove = (0, import_react.useCallback)((e) => {
		e.stopPropagation();
		onChange(null);
		setError(null);
	}, [onChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			...getRootProps(),
			className: cn("relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 transition-colors", "hover:border-primary/50 hover:bg-primary/5", isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25", error && "border-destructive", className),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { ...getInputProps() }), preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-32 w-32 overflow-hidden rounded-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: preview,
						alt: "Preview",
						className: "h-full w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleRemove,
						className: "absolute top-1 right-1 rounded-full bg-background/80 p-1 transition-colors hover:bg-destructive hover:text-destructive-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: value?.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: formatFileSize(value?.size ?? 0)
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2 text-muted-foreground",
				children: [
					isDragActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-8 w-8 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-8 w-8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: placeholder
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs",
						children: [
							Object.values(accept).flat().join(", ") || "Cualquier imagen",
							" · Máx. ",
							formatFileSize(maxSize)
						]
					})
				]
			})]
		}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-destructive",
			children: error
		})]
	});
}
function ImagePreview({ src, alt = "Imagen", onChange, onRemove, className, imageClassName, aspectRatio = "video" }) {
	const [status, setStatus] = (0, import_react.useState)(src ? "loading" : "error");
	const aspectClass = {
		square: "aspect-square",
		video: "aspect-video",
		auto: "auto"
	}[aspectRatio];
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center justify-center rounded-md border border-dashed border-muted-foreground/25 bg-muted/50", aspectClass, className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-8 w-8 text-muted-foreground/50" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group relative", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("overflow-hidden rounded-md border", aspectClass),
			children: [status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt,
				className: cn("h-full w-full object-cover transition-opacity", status === "loaded" ? "opacity-100" : "opacity-0", imageClassName),
				onLoad: () => setStatus("loaded"),
				onError: () => setStatus("error")
			})]
		}), (onChange || onRemove) && status === "loaded" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex items-center justify-center gap-2 rounded-md bg-background/60 opacity-0 transition-opacity group-hover:opacity-100",
			children: [onChange && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onChange,
				className: "rounded-full bg-background p-2 shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
			}), onRemove && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRemove,
				className: "rounded-full bg-background p-2 shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
			})]
		})]
	});
}
function ImageField({ value, onChange, label = "Imagen", currentImageUrl, accept, maxSize, className, placeholder }) {
	const [mode, setMode] = (0, import_react.useState)(() => value ? "upload" : currentImageUrl ? "preview" : "upload");
	const hasNewFile = !!value;
	const hasExistingImage = !!currentImageUrl;
	const handleRemove = () => {
		onChange(null);
		setMode("upload");
	};
	const handleChange = () => {
		setMode("upload");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, { children: label }), mode === "preview" && hasExistingImage && !hasNewFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreview, {
				src: currentImageUrl,
				aspectRatio: "video",
				onChange: handleChange,
				onRemove: handleRemove
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: handleChange,
				children: "Cambiar imagen"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageDropzone, {
				value,
				onChange: (file) => {
					onChange(file);
					if (file) setMode("upload");
				},
				accept,
				maxSize,
				placeholder
			}), hasExistingImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "button",
				variant: "ghost",
				size: "sm",
				className: "mt-1",
				onClick: () => setMode("preview"),
				children: "Cancelar"
			})]
		})]
	});
}
function formatDate(value) {
	if (!value) return "—";
	return (typeof value === "string" ? Temporal.Instant.from(value) : value).toLocaleString("es-AR", {
		timeZone: "America/La_Paz",
		dateStyle: "long"
	});
}
var ROLE_STYLES = {
	admin: {
		label: "Admin",
		className: "border-sky-500 text-sky-600 bg-sky-50"
	},
	student: {
		label: "Estudiante",
		className: "border-violet-500 text-violet-600 bg-violet-50"
	}
};
function MePage() {
	const { data: meData } = useMeQuery();
	const [avatarFile, setAvatarFile] = (0, import_react.useState)(null);
	const user = meData;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "py-8 text-center text-muted-foreground",
			children: "No hay información de usuario disponible."
		}) })
	});
	const initials = user.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) ?? "??";
	const roleStyle = ROLE_STYLES[user.role] ?? {
		label: user.role,
		className: "border-gray-500 text-gray-600 bg-gray-50"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
				size: "lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
					src: user.avatar,
					alt: user.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: user.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: user.email
			})] })]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, { className: "mb-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground",
							children: "Nombre"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: user.name || "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: user.email || "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground",
							children: "Rol"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium", roleStyle.className),
							children: roleStyle.label
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground",
							children: "Miembro desde"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: formatDate(user.created_at)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground",
							children: "Última actualización"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: formatDate(user.updated_at)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, { className: "my-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Avatar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
						value: avatarFile,
						onChange: setAvatarFile,
						currentImageUrl: user.avatar,
						label: "Foto de perfil",
						placeholder: "Arrastrá tu avatar aquí"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex gap-2" })
				]
			})
		] })] })
	});
}
//#endregion
export { MePage as component };
