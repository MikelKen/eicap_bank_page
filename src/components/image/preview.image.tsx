import { ImageIcon, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "#/components/ui/skeleton";
import { cn } from "#/lib/utils";

interface ImagePreviewProps {
	src: string | null;
	alt?: string;
	onChange?: () => void;
	onRemove?: () => void;
	className?: string;
	imageClassName?: string;
	aspectRatio?: "square" | "video" | "auto";
}

export function ImagePreview({
	src,
	alt = "Imagen",
	onChange,
	onRemove,
	className,
	imageClassName,
	aspectRatio = "video",
}: ImagePreviewProps) {
	const [status, setStatus] = useState<"loading" | "loaded" | "error">(
		src ? "loading" : "error",
	);

	const aspectClass = {
		square: "aspect-square",
		video: "aspect-video",
		auto: "auto",
	}[aspectRatio];

	if (!src) {
		return (
			<div
				className={cn(
					"flex items-center justify-center rounded-md border border-dashed border-muted-foreground/25 bg-muted/50",
					aspectClass,
					className,
				)}
			>
				<ImageIcon className="h-8 w-8 text-muted-foreground/50" />
			</div>
		);
	}

	return (
		<div className={cn("group relative", className)}>
			<div className={cn("overflow-hidden rounded-md border", aspectClass)}>
				{status === "loading" && <Skeleton className="h-full w-full" />}
				<img
					src={src}
					alt={alt}
					className={cn(
						"h-full w-full object-cover transition-opacity",
						status === "loaded" ? "opacity-100" : "opacity-0",
						imageClassName,
					)}
					onLoad={() => setStatus("loaded")}
					onError={() => setStatus("error")}
				/>
			</div>

			{(onChange || onRemove) && status === "loaded" && (
				<div className="absolute inset-0 flex items-center justify-center gap-2 rounded-md bg-background/60 opacity-0 transition-opacity group-hover:opacity-100">
					{onChange && (
						<button
							type="button"
							onClick={onChange}
							className="rounded-full bg-background p-2 shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
						>
							<Pencil className="h-4 w-4" />
						</button>
					)}
					{onRemove && (
						<button
							type="button"
							onClick={onRemove}
							className="rounded-full bg-background p-2 shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
						>
							<Trash2 className="h-4 w-4" />
						</button>
					)}
				</div>
			)}
		</div>
	);
}
