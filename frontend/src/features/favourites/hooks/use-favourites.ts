import { useQuery } from "@tanstack/react-query";
import type { FavouritesQueryParams } from "../types";
import { favouritesApi } from "../../../app/favourites.api";

export const useFavourites = (params: FavouritesQueryParams) => {
    return useQuery({
        queryKey: ["favourites", params],
        queryFn: () => favouritesApi.getAll(params),
    });
};