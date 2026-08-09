import { useAuthStore } from "#/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import type { Login } from "#/services/auth/auth.type";
import type { Permission } from "#/lib/permission";
import authService from "#/services/auth/auth.services";
import { useLoader } from "#/stores/loader.store";
import { toast } from "sonner";
import { getApiError } from "#/lib/get-api-error";
import { usePermission } from "#/stores/permission.store";

export const useAuthLoginMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const setPermission = usePermission((state) => state.setPermission);

  return useMutation({
    mutationFn: (login: Login) => {
      return authService.login(login);
    },
    onMutate: () => {
      useLoader.getState().show("Iniciando sesión...");
    },
    onSuccess: (response) => {
      setUser(response.data);
      if (response.data.token) {
        setToken(response.data.token);
      }
      setPermission(response.data.role as Permission);
      toast.success("Inicio de sesión exitoso");
      useLoader.getState().hide();
    },
    onError: (error) => {
      toast.error(getApiError(error, "Credenciales inválidas"));
    },
    onSettled: () => {
      useLoader.getState().hide();
    },
  });
};
