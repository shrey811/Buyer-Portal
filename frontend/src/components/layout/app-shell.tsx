import { useLogout } from "../../features/auth/hooks/use-logout";
import { useAuth } from "../../hooks/use-auth";
import { Button } from "../ui/button";
import type { ReactNode } from "react";

type AppShellProps = {
    title: string;
    children: ReactNode;
};

export const AppShell = ({ title, children }: AppShellProps) => {
    const { user } = useAuth();
    const logout = useLogout();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                        {user && (
                            <p className="text-sm text-gray-600">
                                Signed in as {user.name} | Role:{user.role}
                            </p>
                        )}
                    </div>

                    <Button type="button" onClick={logout}>
                        Logout
                    </Button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
        </div>
    );
};