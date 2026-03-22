import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/apiError";
import { buildPaginationMeta } from "../../utils/pagination";
import { sendPaginated, sendSuccess } from "../../utils/response";
import {
    addFavourite,
    getUserFavourites,
    removeFavourite,
} from "./favourites.service";

export const getFavourites = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const sortOrder = req.query.sortOrder as "asc" | "desc";

    const result = await getUserFavourites({
        userId: req.user.userId,
        page,
        limit,
        sortOrder,
    });

    const meta = buildPaginationMeta(page, limit, result.total);

    return sendPaginated(
        res,
        200,
        "Favourites fetched successfully",
        result.favourites,
        meta
    );
});

export const createFavourite = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    const propertyId = req.params.propertyId as string;

    const favourite = await addFavourite(req.user.userId, propertyId);

    return sendSuccess(res, 201, "Property added to favourites", favourite);
});

export const deleteFavourite = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    const propertyId = req.params.propertyId as string;

    await removeFavourite(req.user.userId, propertyId);

    return sendSuccess(res, 200, "Property removed from favourites", null);
});