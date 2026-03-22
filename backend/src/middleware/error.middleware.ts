import { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";
import { ApiError } from "../utils/apiError";
import { Prisma } from "../generated/prisma/client";

export const errorMiddleware = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            details: err.details ?? null,
        });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            details: err.flatten(),
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "Resource already exists",
                details: err.meta ?? null,
            });
        }

        if (err.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
                details: err.meta ?? null,
            });
        }

        if (err.code === "P2003") {
            return res.status(400).json({
                success: false,
                message: "Invalid related resource reference",
                details: err.meta ?? null,
            });
        }
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error",
        details: null,
    });
};