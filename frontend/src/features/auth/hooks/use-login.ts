import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../../../api/auth.api";
import { AUTH_ME_QUERY_KEY } from "../../../hooks/use-auth";
import { storage } from "../../../lib/storage";

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: async (data) => {
            storage.setToken(data.token);
            await queryClient.invalidateQueries({ queryKey: AUTH_ME_QUERY_KEY });
        },
    });
};