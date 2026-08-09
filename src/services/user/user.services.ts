import {
  type CreateUser,
  type FindAllResponse,
  type UserFilter,
  UserListPaginatedSchema,
  UserSchema,
  type User,
} from "./user.type";
import { api } from "#/lib/api";
import { parseResponse } from "../type";
import { ENDPOINTS } from "../endpoints";
import { z } from "zod";

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

  async create(input: CreateUser, avatar?: File) {
    const fd = new FormData();
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined && value !== null) {
        fd.append(key, String(value));
      }
    }
    if (avatar) {
      fd.append("avatar", avatar);
    }

    const result = await parseResponse(
      api.post(ENDPOINTS.USERS.BASE, fd),
      z.null(),
    );

    return result;
  }
}

const userService = new UserService();
export default userService;
