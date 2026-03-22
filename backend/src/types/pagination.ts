export type SortOrder = "asc" | "desc";

export type PaginationQuery = {
    page: number;
    limit: number;
    skip: number;
};

export type PaginatedResponse = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};