import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/login-page";
import { AdminPropertiesPage } from "../features/properties/pages/admin-properties-page";
import { ProtectedRoute } from "../components/layout/protected-route";
import { RoleRoute } from "../components/layout/role-route";
import { DashboardPage } from "../features/dashboard/pages/dashboard-pages";
import { RegisterPage } from "../features/auth/pages/register-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage />,
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <RoleRoute allowedRoles={["SUPER_ADMIN"]} />,
                children: [
                    {
                        path: "/admin/properties",
                        element: <AdminPropertiesPage />,
                    },
                ],
            },
        ],
    },
]);