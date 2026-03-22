import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { buildPaginationMeta } from "../../utils/pagination";
import { sendPaginated, sendSuccess } from "../../utils/response";
import {
    createProperty,
    deleteProperty,
    getAllProperties,
    updateProperty,
} from "./properties.service";

type CreatePropertyBody = {
    title: string;
    address: string;
    price: number;
};

type UpdatePropertyBody = {
    title?: string;
    address?: string;
    price?: number;
};

export const getProperties = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const sortBy = req.query.sortBy as "createdAt" | "price" | "title";
    const sortOrder = req.query.sortOrder as "asc" | "desc";
    const search =
        typeof req.query.search === "string" && req.query.search.trim() !== ""
            ? req.query.search.trim()
            : undefined;

    const result = await getAllProperties({
        page,
        limit,
        sortBy,
        sortOrder,
        search,
    });

    const meta = buildPaginationMeta(page, limit, result.total);

    return sendPaginated(
        res,
        200,
        "Properties fetched successfully",
        result.properties,
        meta
    );
});

export const createPropertyHandler = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as CreatePropertyBody;

    const property = await createProperty(body);

    return sendSuccess(res, 201, "Property created successfully", property);
});

export const updatePropertyHandler = asyncHandler(async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId as string;
    const body = req.body as UpdatePropertyBody;

    const property = await updateProperty({
        propertyId,
        ...body,
    });

    return sendSuccess(res, 200, "Property updated successfully", property);
});

export const deletePropertyHandler = asyncHandler(async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId as string;

    await deleteProperty(propertyId);

    return sendSuccess(res, 200, "Property deleted successfully", null);
});