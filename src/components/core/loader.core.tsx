import { useLoader } from "#/stores/loader.store";
import { Loader2 } from "lucide-react";

export function Loader() {
  const isLoading = useLoader((s) => s.isLoading);
  const message = useLoader((s) => s.message);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      aria-busy="true"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-12 animate-spin text-white" />
        {message && <p className="text-lg font-medium text-white">{message}</p>}
      </div>
    </div>
  );
}
