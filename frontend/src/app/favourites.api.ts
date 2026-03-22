import { apiClient } from "../api/client";
import type { Favourite, FavouritesQueryParams } from "../features/favourites/types";
import type { ApiSuccessResponse } from "../types/api";


type FavouritesResponse = ApiSuccessResponse<Favourite[]>;

export const favouritesApi = {
    getAll: async (params: FavouritesQueryParams) => {
        const response = await apiClient.get<FavouritesResponse>("/favourites", {
            params,
        });

        return response.data;
    },

    add: async (propertyId: string) => {
        const response = await apiClient.post<ApiSuccessResponse<Favourite>>(
            `/favourites/${propertyId}`
        );

        return response.data.data;
    },

    remove: async (propertyId: string) => {
        const response = await apiClient.delete<ApiSuccessResponse<null>>(
            `/favourites/${propertyId}`
        );

        return response.data.data;
    },
};