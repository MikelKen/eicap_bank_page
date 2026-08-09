import { ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { cn } from "#/lib/utils";

interface ImageDropzoneProps {
	value: File | null;
	onChange: (file: File | null) => void;
	accept?: Record<string, string[]>;
	maxSize?: number;
	className?: string;
	placeholder?: string;
}

const DEFAULT_ACCEPT: Record<string, string[]> = {
	"image/jpeg": [],
	"image/png": [],
	"image/webp": [],
};

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB

function formatFileSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImageDropzone({
	value,
	onChange,
	accept = DEFAULT_ACCEPT,
	maxSize = DEFAULT_MAX_SIZE,
	className,
	placeholder = "Arrastrá una imagen aquí o hacé click para seleccionar",
}: ImageDropzoneProps) {
	const [preview, setPreview] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!value) {
			setPreview(null);
			return;
		}
		const url = URL.createObjectURL(value);
		setPreview(url);
		return () => URL.revokeObjectURL(url);
	}, [value]);

	const onDrop = useCallback(
		(acceptedFiles: File[], rejections: FileRejection[]) => {
			setError(null);

			if (rejections.length > 0) {
				const err = rejections[0].errors[0];
				if (err.code === "file-too-large") {
					setError(
						`El archivo supera el tamaño máximo de ${formatFileSize(maxSize)}`,
					);
				} else if (err.code === "file-invalid-type") {
					setError("Tipo de archivo no permitido");
				} else {
					setError(err.message);
				}
				return;
			}

			if (acceptedFiles.length > 0) {
				onChange(acceptedFiles[0]);
			}
		},
		[onChange, maxSize],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept,
		maxSize,
		multiple: false,
	});

	const handleRemove = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			onChange(null);
			setError(null);
		},
		[onChange],
	);

	return (
		<div className="flex flex-col gap-2">
			<div
				{...getRootProps()}
				className={cn(
					"relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 transition-colors",
					"hover:border-primary/50 hover:bg-primary/5",
					isDragActive
						? "border-primary bg-primary/5"
						: "border-muted-foreground/25",
					error && "border-destructive",
					className,
				)}
			>
				<input {...getInputProps()} />

				{preview ? (
					<div className="flex flex-col items-center gap-2">
						<div className="relative h-32 w-32 overflow-hidden rounded-md">
							<img
								src={preview}
								alt="Preview"
								className="h-full w-full object-cover"
							/>
							<button
								type="button"
								onClick={handleRemove}
								className="absolute top-1 right-1 rounded-full bg-background/80 p-1 transition-colors hover:bg-destructive hover:text-destructive-foreground"
							>
								<X className="h-3 w-3" />
							</button>
						</div>
						<div className="text-center">
							<p className="text-sm font-medium">{value?.name}</p>
							<p className="text-xs text-muted-foreground">
								{formatFileSize(value?.size ?? 0)}
							</p>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center gap-2 text-muted-foreground">
						{isDragActive ? (
							<ImageIcon className="h-8 w-8 text-primary" />
						) : (
							<Upload className="h-8 w-8" />
						)}
						<p className="text-sm">{placeholder}</p>
						<p className="text-xs">
							{Object.values(accept).flat().join(", ") || "Cualquier imagen"} ·
							Máx. {formatFileSize(maxSize)}
						</p>
					</div>
				)}
			</div>

			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	);
}
