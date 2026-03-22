import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { PasswordInput } from "../../../components/ui/password-input";

import { useAuth } from "../../../hooks/use-auth";
import { useRegister } from "../hooks/use-register";
import { registerSchema, type RegisterFormValues, } from "../schemas/auth.schema";
import type { ApiErrorResponse } from "../../../types/api";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        if (user.role === "SUPER_ADMIN") {
            navigate("/admin/properties", { replace: true });
        } else {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    const errorMessage =
        registerMutation.error instanceof AxiosError
            ? (registerMutation.error.response?.data as ApiErrorResponse | undefined)
                ?.message || "Registration failed"
            : null;

    const onSubmit = async (values: RegisterFormValues) => {
        try {
            await registerMutation.mutateAsync(values);

            toast.success("Account created successfully");
            navigate("/login", { replace: true });
        } catch {
            toast.error(errorMessage || "Registration failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900">Create account</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Register to access the buyer portal.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Input placeholder="Your name" {...register("name")} />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

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
                            placeholder="Create a password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Confirm password
                        </label>
                        <PasswordInput
                            placeholder="Re-enter your password"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={registerMutation.isPending}
                    >
                        {registerMutation.isPending ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                <p className="mt-4 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-gray-900 underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};