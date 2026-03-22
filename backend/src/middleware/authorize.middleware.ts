import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/apiError";
import { UserRole } from "../generated/prisma/client";

export const authorize =
    (...allowedRoles: UserRole[]) =>
        (req: Request, _res: Response, next: NextFunction) => {
            if (!req.user) {
                return next(new ApiError(401, "Unauthorized"));
            }

            if (!allowedRoles.includes(req.user.role)) {
                return next(new ApiError(403, "Forbidden"));
            }

            next();
        };