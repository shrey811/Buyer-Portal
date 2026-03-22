import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import type { UserRole } from "../../features/auth/types";
import { Spinner } from "../ui/spinner";


type RoleRouteProps = {
    allowedRoles: UserRole[];
};

export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
    const { token, user, isAuthenticated, isLoading } = useAuth();

    if (token && isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <Spinner />
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};