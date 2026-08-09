import type { ReactNode } from "react";
import type { Permission } from "#/lib/permission";
import { usePermission } from "#/stores/permission.store";

interface CanProps {
	permission: Permission | Permission[];
	fallback?: ReactNode;
	children: ReactNode;
}

export function Can({ permission, fallback = null, children }: CanProps) {
	const userPermission = usePermission((state) => state.permission);

	if (!userPermission) return <>{fallback}</>;

	const allowed = Array.isArray(permission)
		? permission.includes(userPermission)
		: userPermission === permission;

	if (allowed) return <>{children}</>;
	return <>{fallback}</>;
}
