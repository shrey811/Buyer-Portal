import { apiClient } from "./client";
import type { ApiSuccessResponse } from "../types/api";
import type { AuthResponse, AuthUser, LoginRequest, RegisterRequest } from "../features/auth/types";

export const authApi = {
    login: async (payload: LoginRequest) => {
        const response = await apiClient.post<ApiSuccessResponse<AuthResponse>>(
            "/auth/login",
            payload
        );

        return response.data.data;
    },

    register: async (payload: RegisterRequest) => {
        const response = await apiClient.post<ApiSuccessResponse<AuthResponse>>(
            "/auth/register",
            payload
        );

        return response.data.data;
    },

    me: async () => {
        const response = await apiClient.get<ApiSuccessResponse<AuthUser>>(
            "/auth/me"
        );

        return response.data.data;
    },
};