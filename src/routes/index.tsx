//routes/index.tsx
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { useAuthLoginMutation } from "#/hooks/auth/useMutation.auth";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const login = useAuthLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("[LoginPage] useEffect — isSuccess changed:", login.isSuccess);
    if (login.isSuccess) {
      console.log("[LoginPage] navigating to /dashboard");
      navigate({ to: "/dashboard" });
    }
  }, [login.isSuccess, navigate]);

  useEffect(() => {
    if (login.isError) {
      console.log("[LoginPage] error effect — login.error:", login.error);
    }
  }, [login.isError, login.error]);

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      const payload = { email: value.identifier, password: value.password };

      console.log(
        "[LoginPage] onSubmit — payload:",
        JSON.stringify(payload, null, 2),
      );

      login.mutate(payload);
    },
  });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="p-6 md:p-10 flex flex-col justify-center"
            >
              <FieldGroup className="gap-5">
                <div className="flex flex-col items-center gap-2 text-center mb-2">
                  <h1 className="text-2xl font-bold">Welcome</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your account
                  </p>
                </div>

                <form.Field
                  name="identifier"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? "Identifier is required" : undefined,
                  }}
                >
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor="identifier">Email</FieldLabel>
                      <Input
                        id="identifier"
                        type="text"
                        placeholder="m@example.com"
                        required
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? "Password is required" : undefined,
                  }}
                >
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          className="pr-10"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-0 top-0 h-full px-3 flex items-center text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                          <span className="sr-only">
                            {showPassword
                              ? "Ocultar contraseña"
                              : "Mostrar contraseña"}
                          </span>
                        </button>
                      </div>
                    </Field>
                  )}
                </form.Field>
                {login.isError && (
                  <p className="text-sm text-destructive text-center">
                    Invalid credentials
                  </p>
                )}

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Field>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={!canSubmit || login.isPending}
                      >
                        {isSubmitting || login.isPending
                          ? "Logging in..."
                          : "Login"}
                      </Button>
                    </Field>
                  )}
                </form.Subscribe>

                <FieldDescription className="text-center">
                  ESCUELA DE INNOVACIÓN, CAPACITACIÓN Y ASESORAMIENTO
                  PROFESIONAL
                </FieldDescription>
              </FieldGroup>
            </form>

            <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-slate-500/20 to-slate-900/40 backdrop-blur-md p-4">
              <img
                src="/image.png"
                alt="Eicap"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
