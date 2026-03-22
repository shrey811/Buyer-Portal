import { z } from "zod";

export const getPropertiesQuerySchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(10),
        sortBy: z.enum(["createdAt", "price", "title"]).default("createdAt"),
        sortOrder: z.enum(["asc", "desc"]).default("desc"),
        search: z.string().trim().optional(),
    }),
});

export const propertyIdParamSchema = z.object({
    params: z.object({
        propertyId: z.string().uuid("Invalid property id"),
    }),
});

export const createPropertySchema = z.object({
    body: z.object({
        title: z.string().trim().min(2).max(200),
        address: z.string().trim().min(2).max(200),
        price: z.number().int().positive(),
    }),
});

export const updatePropertySchema = z.object({
    params: z.object({
        propertyId: z.string().uuid("Invalid property id"),
    }),
    body: z.object({
        title: z.string().trim().min(2).max(200).optional(),
        address: z.string().trim().min(2).max(200).optional(),
        price: z.number().int().positive().optional(),
    }),
});