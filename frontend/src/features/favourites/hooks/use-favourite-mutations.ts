import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favouritesApi } from "../../../app/favourites.api";

export const useAddFavourite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: favouritesApi.add,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favourites"] });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
    });
};

export const useRemoveFavourite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: favouritesApi.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favourites"] });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
    });
};