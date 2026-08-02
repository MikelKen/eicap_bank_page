import { Link, useRouter } from "@tanstack/react-router";

export function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center py-24">
      <div className="island-shell flex flex-col items-center gap-6 px-8 py-12 text-center">
        <h1 className="text-7xl font-bold tracking-tight text-foreground">
          404
        </h1>
        <p className="max-w-sm text-lg text-muted-foreground">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <div className="mt-2 flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.history.back()}
            className="inline-flex items-center rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
          >
            ← Ir atrás
          </button>
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
