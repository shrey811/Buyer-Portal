export type Property = {
    id: string;
    title: string;
    address: string;
    price: number;
    createdAt: string;
};

export type PropertiesQueryParams = {
    page: number;
    limit: number;
    sortBy: "createdAt" | "price" | "title";
    sortOrder: "asc" | "desc";
    search?: string;
};