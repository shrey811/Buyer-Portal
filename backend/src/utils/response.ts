import { Response } from "express";
import { PaginatedResponse } from "../types/pagination";

export const sendSuccess = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const sendPaginated = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T,
    meta: PaginatedResponse
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        meta,
    });
};