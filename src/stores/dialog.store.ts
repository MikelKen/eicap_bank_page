import type { ComponentType } from "react";
import { create } from "zustand";

export interface DialogContentProps {
  dialogId: string;
  close: () => void;
}

interface DialogOffset {
  x: number;
  y: number;
}

interface DialogInstance {
  id: string;
  title?: string;
  component: ComponentType<any>;
  props: Record<string, unknown>;
  width: string;
  offset: DialogOffset;
}

interface DialogStore {
  stack: DialogInstance[];
  open: <T extends Record<string, unknown> = Record<string, unknown>>(config: {
    title?: string;
    component: ComponentType<DialogContentProps & T>;
    props?: T;
    width?: string;
  }) => string;
  close: (id: string) => void;
  clear: () => void;
  updateOffset: (id: string, offset: DialogOffset) => void;
}

let counter = 0;

export const useDialog = create<DialogStore>((set) => ({
  stack: [],
  open: (config) => {
    const id = `dialog-${Date.now()}-${++counter}`;

    set((s) => ({
      stack: [
        ...s.stack,
        {
          id,
          title: config.title,
          component: config.component,
          props: config.props ?? {},
          width: config.width ?? "480px",
          offset: { x: 0, y: 0 },
        },
      ],
    }));
    return id;
  },
  close: (id) => set((s) => ({ stack: s.stack.filter((d) => d.id !== id) })),
  clear: () => set({ stack: [] }),
  updateOffset: (id, offset) =>
    set((s) => ({
      stack: s.stack.map((d) => (d.id === id ? { ...d, offset } : d)),
    })),
}));
