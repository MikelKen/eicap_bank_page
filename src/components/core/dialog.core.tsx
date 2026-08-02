import { useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { useDialog } from "#/stores/dialog.store";

export function DialogRenderer() {
  const stack = useDialog((s) => s.stack);
  const close = useDialog((s) => s.close);

  return stack.map((dialog) => (
    <DialogInstance
      key={dialog.id}
      dialog={dialog}
      onClose={() => close(dialog.id)}
    />
  ));
}

interface DragState {
  dragging: boolean;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
}

function DialogInstance({
  dialog,
  onClose,
}: {
  dialog: ReturnType<typeof useDialog.getState>["stack"][number];
  onClose: () => void;
}) {
  const updateOffset = useDialog((s) => s.updateOffset);
  const dragRef = useRef<DragState>({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;

      const state = dragRef.current;
      state.dragging = true;
      state.startX = e.clientX;
      state.startY = e.clientY;
      state.origX = dialog.offset.x;
      state.origY = dialog.offset.y;

      const handleMouseMove = (me: MouseEvent) => {
        if (!state.dragging) return;
        updateOffset(dialog.id, {
          x: state.origX + (me.clientX - state.startX),
          y: state.origY + (me.clientY - state.startY),
        });
      };

      const handleMouseUp = () => {
        state.dragging = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [dialog.id, dialog.offset.x, dialog.offset.y, updateOffset],
  );

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="translate-x-0 translate-y-0"
        style={{
          top: `calc(50% + ${dialog.offset.y}px)`,
          left: `calc(50% + ${dialog.offset.x}px)`,
          transform: "translate(-50%, -50%)",
          width: dialog.width,
        }}
        onEscapeKeyDown={(e) => {
          const top = useDialog.getState().stack;
          if (top[top.length - 1]?.id !== dialog.id) {
            e.preventDefault();
          }
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader
          className="cursor-move select-none"
          onMouseDown={handleMouseDown}
        >
          {dialog.title && <DialogTitle>{dialog.title}</DialogTitle>}
        </DialogHeader>
        <dialog.component
          dialogId={dialog.id}
          close={onClose}
          {...dialog.props}
        />
      </DialogContent>
    </Dialog>
  );
}
