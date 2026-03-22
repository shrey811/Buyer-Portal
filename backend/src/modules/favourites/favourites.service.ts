
import { prisma } from "../../config/db";
import { Prisma } from "../../generated/prisma/client";
import { ApiError } from "../../utils/apiError";

type GetUserFavouritesOptions = {
    userId: string;
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
};

export const getUserFavourites = async ({
    userId,
    page,
    limit,
    sortOrder,
}: GetUserFavouritesOptions) => {
    const skip = (page - 1) * limit;

    const [favourites, total] = await Promise.all([
        prisma.favourite.findMany({
            where: {
                userId,
            },
            include: {
                property: true,
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: sortOrder,
            },
        }),
        prisma.favourite.count({
            where: {
                userId,
            },
        }),
    ]);

    return {
        favourites,
        total,
    };
};

export const addFavourite = async (userId: string, propertyId: string) => {
    const property = await prisma.property.findUnique({
        where: { id: propertyId },
        select: { id: true },
    });

    if (!property) {
        throw new ApiError(404, "Property not found");
    }

    try {
        return await prisma.favourite.create({
            data: {
                userId,
                propertyId,
            },
            include: {
                property: true,
            },
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new ApiError(409, "Property is already in favourites");
        }

        throw error;
    }
};

export const removeFavourite = async (userId: string, propertyId: string) => {
    try {
        await prisma.favourite.delete({
            where: {
                userId_propertyId: {
                    userId,
                    propertyId,
                },
            },
        });

        return null;
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new ApiError(404, "Favourite not found");
        }

        throw error;
    }
};