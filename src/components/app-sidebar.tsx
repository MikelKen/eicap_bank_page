"use client";

import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  type LucideIcon,
  UserRound,
  UsersRound,
} from "lucide-react";
import type * as React from "react";

import { NavMain } from "#/components/nav-main.tsx";
import { NavUser } from "#/components/nav-user.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "#/components/ui/sidebar.tsx";
import { useMeQuery } from "#/hooks/user/useQuery.user";
import { useAuthStore } from "#/stores/auth.store";
import type { Permission } from "#/lib/permission";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

function getNavGroups(role: Permission | null): NavGroup[] {
  return [
    {
      label: "Usuario",
      items: [
        { title: "Perfil", url: "/user/me", icon: UserRound },
        ...(role === "student"
          ? [
              {
                title: "Matrículas",
                url: "/user/enrollment",
                icon: ClipboardList,
              },
            ]
          : []),
      ],
    },
    {
      label: "Administración",
      items:
        role === "admin"
          ? [
              { title: "Usuarios", url: "/user", icon: UsersRound },
              { title: "Cursos", url: "/course", icon: BookOpen },
            ]
          : [],
    },
    {
      label: "Cursos",
      items:
        role === "admin"
          ? [
              {
                title: "Mis Cursos",
                url: "/course/me",
                icon: GraduationCap,
              },
            ]
          : [],
    },
  ].filter((g) => g.items.length > 0);
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: meData } = useMeQuery();
  const storeUser = useAuthStore((s) => s.user);
  const user = meData ?? storeUser;
  const role = (user?.role as Permission | undefined) ?? null;
  const groups = getNavGroups(role);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <NavMain groups={groups} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
