import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./query-client";
import type { ReactNode } from "react";

type AppProvidersProps = {
    children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "12px",
                        background: "#111827",
                        color: "#ffffff",
                    },
                }}
            />
        </QueryClientProvider>
    );
};