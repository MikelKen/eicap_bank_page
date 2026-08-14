import * as React from "react";
import { Bot, Home, Command, UserRound, type LucideIcon } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth.store";
import { usePermission } from "@/stores/permission.store";

type PermissionRole = "admin" | "student";

type NavSubItem = {
  title: string;
  url: string;
  allowedRoles: PermissionRole[];
};

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  allowedRoles: PermissionRole[];
  items?: NavSubItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: Home,
    isActive: true,
    allowedRoles: ["admin", "student"],
  },
  {
    title: "Usuarios",
    url: "/dashboard/user",
    icon: UserRound,
    isActive: true,
    allowedRoles: ["admin"],
  },
  {
    title: "Operaciones Bancarias",
    url: "/dashboard",
    icon: Bot,
    allowedRoles: ["admin"],
    items: [
      {
        title: "Clientes",
        url: "/dashboard/client",
        allowedRoles: ["admin"],
      },
      {
        title: "Caja",
        url: "/dashboard",
        allowedRoles: ["admin"],
      },
      {
        title: "Reporte de Cierre",
        url: "/dashboard",
        allowedRoles: ["admin"],
      },
    ],
  },
  {
    title: "Creditos",
    url: "/dashboard",
    icon: UserRound,
    allowedRoles: ["admin", "student"],
    items: [
      {
        title: "Calcular Credito",
        url: "/dashboard",
        allowedRoles: ["admin"],
      },
    ],
  },
];

function hasAccess(
  role: PermissionRole | null,
  allowedRoles: PermissionRole[],
) {
  return role !== null && allowedRoles.includes(role);
}

function getNavItems(role: PermissionRole | null) {
  return NAV_ITEMS.flatMap((item) => {
    if (!hasAccess(role, item.allowedRoles)) {
      return [];
    }

    const filteredItems = item.items?.filter((subItem) =>
      hasAccess(role, subItem.allowedRoles),
    );

    if (item.items && filteredItems?.length === 0) {
      return [];
    }

    return [
      {
        ...item,
        items: filteredItems,
      },
    ];
  });
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const permission = usePermission((state) => state.permission);
  const storeUser = useAuthStore((state) => state.user);
  const user = storeUser;
  const role = permission ?? (user?.role as PermissionRole | undefined) ?? null;
  const navMain = getNavItems(role);

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />}>
              <>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="flex flex-col justify-center flex-1 text-left text-sm leading-tight ml-2">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.role}</span>
                </div>
              </>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
