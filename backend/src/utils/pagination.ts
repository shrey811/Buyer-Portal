import { PaginatedResponse, PaginationQuery } from "../types/pagination";

export const getPagination = (page: number, limit: number): PaginationQuery => {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 100);

    return {
        page: safePage,
        limit: safeLimit,
        skip: (safePage - 1) * safeLimit,
    };
};

export const buildPaginationMeta = (
    page: number,
    limit: number,
    total: number
): PaginatedResponse => {
    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
    };
};