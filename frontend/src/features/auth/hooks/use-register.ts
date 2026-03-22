import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../../api/auth.api";
import type { RegisterFormValues } from "../schemas/auth.schema";


export const useRegister = () => {
    return useMutation({
        mutationFn: async (values: RegisterFormValues) => {
            const { ...payload } = values;
            return authApi.register(payload);
        },
    });
};