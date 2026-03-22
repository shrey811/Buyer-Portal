import { apiClient } from "../api/client";
import type { PropertiesQueryParams, Property } from "../features/properties/types";
import type { ApiSuccessResponse } from "../types/api";


type PropertiesResponse = ApiSuccessResponse<Property[]>;

export const propertiesApi = {
    getAll: async (params: PropertiesQueryParams) => {
        const response = await apiClient.get<PropertiesResponse>("/properties", {
            params,
        });

        return response.data;
    },

    create: async (payload: {
        title: string;
        address: string;
        price: number;
    }) => {
        const response = await apiClient.post<ApiSuccessResponse<Property>>(
            "/properties",
            payload
        );

        return response.data.data;
    },

    update: async (
        propertyId: string,
        payload: {
            title?: string;
            address?: string;
            price?: number;
        }
    ) => {
        const response = await apiClient.patch<ApiSuccessResponse<Property>>(
            `/properties/${propertyId}`,
            payload
        );

        return response.data.data;
    },

    delete: async (propertyId: string) => {
        const response = await apiClient.delete<ApiSuccessResponse<null>>(
            `/properties/${propertyId}`
        );

        return response.data.data;
    },
};