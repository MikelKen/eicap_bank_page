import {
  type FindAllResponse,
  type UserFilter,
  UserListPaginatedSchema,
  UserSchema,
  type User,
} from "./user.type";
import { api } from "#/lib/api";
import { parseResponse } from "../type";
import { ENDPOINTS } from "../endpoints";

class UserService {
  async findAll(filter: UserFilter): Promise<FindAllResponse> {
    const result = await parseResponse(
      api.get(ENDPOINTS.USERS.BASE, { params: filter }),
      UserListPaginatedSchema,
    );

    return result;
  }

  async findMe(): Promise<User> {
    const result = await parseResponse(api.get(ENDPOINTS.USERS.ME), UserSchema);

    return result.data;
  }
}

const userService = new UserService();
export default userService;
