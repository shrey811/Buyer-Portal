import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useAuth } from "../../../hooks/use-auth";
import { useLogin } from "../hooks/use-login";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schema";
import type { ApiErrorResponse } from "../../../types/api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { PasswordInput } from "../../../components/ui/password-input";


export const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
    const loginMutation = useLogin();

    const from = (location.state as { from?: { pathname?: string } } | null)?.from
        ?.pathname;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const result = await loginMutation.mutateAsync(values);
            toast.success('Login successful!');
            if (result.user.role === "SUPER_ADMIN") {
                navigate("/admin/properties", { replace: true });
                return;
            }

            navigate(from || "/dashboard", { replace: true });
        } catch {
            toast.error('Login failed. Please check your credentials and try again.');
        }
    };

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        if (user.role === "SUPER_ADMIN") {
            navigate("/admin/properties", { replace: true });
        } else {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    const errorMessage =
        loginMutation.error instanceof AxiosError
            ? (loginMutation.error.response?.data as ApiErrorResponse | undefined)
                ?.message || "Login failed"
            : null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Sign in to access your buyer portal.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <PasswordInput
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="font-medium text-gray-900 underline">
                            Create one
                        </Link>
                    </p>
                    {errorMessage && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {errorMessage}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </div>
        </div>
    );
};