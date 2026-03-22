import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { storage } from "../lib/storage";

export const AUTH_ME_QUERY_KEY = ["auth", "me"] as const;

export const useAuth = () => {
    const token = storage.getToken();

    const query = useQuery({
        queryKey: AUTH_ME_QUERY_KEY,
        queryFn: authApi.me,
        enabled: Boolean(token),
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    return {
        token,
        user: query.data ?? null,
        isAuthenticated: Boolean(token && query.data),
        isLoading: Boolean(token) && query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
    };
};