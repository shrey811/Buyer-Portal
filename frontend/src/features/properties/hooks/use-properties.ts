import { useQuery } from "@tanstack/react-query";
import type { PropertiesQueryParams } from "../types";
import { propertiesApi } from "../../../app/properties.api";

export const useProperties = (params: PropertiesQueryParams) => {
    return useQuery({
        queryKey: ["properties", params],
        queryFn: () => propertiesApi.getAll(params),
    });
};