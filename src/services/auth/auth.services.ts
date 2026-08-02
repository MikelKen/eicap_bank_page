import type { Login, LoginResponse } from "#/services/auth/auth.type";
import { parseResponse } from "../type";
import { api } from "#/lib/api";
import { ENDPOINTS } from "../endpoints";
import { UserSchema } from "../user/user.type";

class AuthService {
  async login(login: Login): Promise<LoginResponse> {
    const result = parseResponse(
      api.post(ENDPOINTS.AUTH.LOGIN, login),
      UserSchema,
    );
    return result;
  }
}

const authService = new AuthService();
export default authService;
