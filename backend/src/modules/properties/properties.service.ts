
import { prisma } from "../../config/db";
import { Prisma } from "../../generated/prisma/client";
import { ApiError } from "../../utils/apiError";

type GetPropertiesOptions = {
    page: number;
    limit: number;
    sortBy: "createdAt" | "price" | "title";
    sortOrder: "asc" | "desc";
    search?: string;
};

type CreatePropertyInput = {
    title: string;
    address: string;
    price: number;
};

type UpdatePropertyInput = {
    propertyId: string;
    title?: string;
    address?: string;
    price?: number;
};

export const getAllProperties = async ({
    page,
    limit,
    sortBy,
    sortOrder,
    search,
}: GetPropertiesOptions) => {
    const skip = (page - 1) * limit;

    const where = search
        ? {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive" as const,
                    },
                },
                {
                    address: {
                        contains: search,
                        mode: "insensitive" as const,
                    },
                },
            ],
        }
        : {};

    const [properties, total] = await Promise.all([
        prisma.property.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder,
            },
        }),
        prisma.property.count({ where }),
    ]);

    return {
        properties,
        total,
    };
};

export const createProperty = async (input: CreatePropertyInput) => {
    return prisma.property.create({
        data: {
            title: input.title.trim(),
            address: input.address.trim(),
            price: input.price,
        },
    });
};

export const updateProperty = async ({
    propertyId,
    title,
    address,
    price,
}: UpdatePropertyInput) => {
    try {
        return await prisma.property.update({
            where: { id: propertyId },
            data: {
                ...(title !== undefined ? { title: title.trim() } : {}),
                ...(address !== undefined ? { address: address.trim() } : {}),
                ...(price !== undefined ? { price } : {}),
            },
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new ApiError(404, "Property not found");
        }

        throw error;
    }
};

export const deleteProperty = async (propertyId: string) => {
    try {
        await prisma.property.delete({
            where: { id: propertyId },
        });

        return null;
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new ApiError(404, "Property not found");
        }

        throw error;
    }
};