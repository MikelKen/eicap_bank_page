export const Permissions = {
  admin: "admin",
  student: "student",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];
