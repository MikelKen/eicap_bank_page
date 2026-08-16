import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DialogContentProps } from "@/stores/dialog.store";

interface ConfirmDialogProps extends DialogContentProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
}

export function ConfirmDialog({
  close,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  isLoading = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-4">
        <Button variant="outline" type="button" onClick={close}>
          {cancelLabel}
        </Button>
        <Button
          variant="destructive"
          type="button"
          disabled={isLoading}
          onClick={onConfirm}
        >
          {isLoading ? "Eliminando..." : confirmLabel}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
