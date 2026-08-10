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
    console.log("[API] findAll result:", result);

    return result;
  }

  async findMe(): Promise<User> {
    const result = await parseResponse(api.get(ENDPOINTS.USERS.ME), UserSchema);

    return result.data;
  }

  async create(input: CreateUser) {
    const result = await parseResponse(
      api.post(ENDPOINTS.USERS.BASE, input),
      z.null(),
    );

    return result;
  }
}

const userService = new UserService();
export default userService;
