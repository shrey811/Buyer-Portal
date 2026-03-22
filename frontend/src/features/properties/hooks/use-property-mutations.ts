import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertiesApi } from "../../../app/properties.api";

export const useCreateProperty = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: propertiesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
    });
};

export const useUpdateProperty = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            propertyId,
            payload,
        }: {
            propertyId: string;
            payload: {
                title?: string;
                address?: string;
                price?: number;
            };
        }) => propertiesApi.update(propertyId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
    });
};

export const useDeleteProperty = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: propertiesApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["properties"] });
            queryClient.invalidateQueries({ queryKey: ["favourites"] });
        },
    });
};