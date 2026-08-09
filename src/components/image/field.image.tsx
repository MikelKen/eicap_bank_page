import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { ImageDropzone } from "./dropzone.image";
import { ImagePreview } from "./preview.image";

interface ImageFieldProps {
	value: File | null;
	onChange: (file: File | null) => void;
	label?: string;
	currentImageUrl?: string | null;
	accept?: Record<string, string[]>;
	maxSize?: number;
	className?: string;
	placeholder?: string;
}

export function ImageField({
	value,
	onChange,
	label = "Imagen",
	currentImageUrl,
	accept,
	maxSize,
	className,
	placeholder,
}: ImageFieldProps) {
	const [mode, setMode] = useState<"preview" | "upload">(() =>
		value ? "upload" : currentImageUrl ? "preview" : "upload",
	);

	const hasNewFile = !!value;
	const hasExistingImage = !!currentImageUrl;

	const handleRemove = () => {
		onChange(null);
		setMode("upload");
	};

	const handleChange = () => {
		setMode("upload");
	};

	return (
		<div className={className}>
			<Label>{label}</Label>

			{mode === "preview" && hasExistingImage && !hasNewFile ? (
				<div className="mt-2 flex flex-col gap-2">
					<ImagePreview
						src={currentImageUrl}
						aspectRatio="video"
						onChange={handleChange}
						onRemove={handleRemove}
					/>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={handleChange}
					>
						Cambiar imagen
					</Button>
				</div>
			) : (
				<div className="mt-2">
					<ImageDropzone
						value={value}
						onChange={(file) => {
							onChange(file);
							if (file) setMode("upload");
						}}
						accept={accept}
						maxSize={maxSize}
						placeholder={placeholder}
					/>
					{hasExistingImage && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="mt-1"
							onClick={() => setMode("preview")}
						>
							Cancelar
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
