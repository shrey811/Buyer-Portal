import type { Property } from "../properties/types";


export type Favourite = {
    id: string;
    userId: string;
    propertyId: string;
    createdAt: string;
    property: Property;
};

export type FavouritesQueryParams = {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
};