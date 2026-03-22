import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { Spinner } from "../ui/spinner";


export const ProtectedRoute = () => {
    const location = useLocation();
    const { token, isAuthenticated, isLoading } = useAuth();

    if (token && isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <Spinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};