import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import { verifyToken } from "../utils/jwt";

export const authenticate = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(401, "Authorization token missing or invalid"));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch {
        next(new ApiError(401, "Invalid or expired token"));
    }
};