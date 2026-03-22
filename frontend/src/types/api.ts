export type ApiSuccessResponse<T> = {
    success: true;
    message: string;
    data: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type ApiErrorResponse = {
    success: false;
    message: string;
    details: unknown;
};