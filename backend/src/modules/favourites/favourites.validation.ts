import { z } from "zod";

export const propertyIdParamSchema = z.object({
    params: z.object({
        propertyId: z.string().uuid("Invalid property id"),
    }),
});

export const getFavouritesQuerySchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(10),
        sortBy: z.enum(["createdAt"]).default("createdAt"),
        sortOrder: z.enum(["asc", "desc"]).default("desc"),
    }),
});